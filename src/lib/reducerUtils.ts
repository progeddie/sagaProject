import { AnyAction } from 'redux';
import { AsyncActionCreatorBuilder, getType } from 'typesafe-actions';

export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
};

export const asyncState = {
  initial: <T, E>(initialData?: any): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T, E>(data?: T | null): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E>(data: T): AsyncState<T, E> => ({
    data,
    loading: false,
    error: null,
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    error,
    loading: false,
    data: null,
  }),
};

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export const transformToArray = <AC extends AnyAsyncActionCreator>(asyncActionCreator: AC) => {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
};

export const createAsyncReducer = <S, AC extends AnyAsyncActionCreator, K extends keyof S>(
  asyncActionCreator: AC,
  key: K
) => {
  return (state: S, action: AnyAction) => {
    const [request, success, failure] = transformToArray(asyncActionCreator).map(getType);

    switch (action.type) {
      case request:
        // console.log('????', action, state);
        return {
          ...state,
          [key]: asyncState.load(),
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case failure:
        // console.log('xxxx', action, action.type, '|', request, '|', success, '|', failure);
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
};

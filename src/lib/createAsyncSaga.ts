import { AsyncActionCreatorBuilder, PayloadAction } from 'typesafe-actions';
import { call, put } from 'redux-saga/effects';

type PromiseCreatorFuntion<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

const isPayloadAction = (action: any): action is PayloadAction<string, any> => {
  return action.payload !== undefined;
};

const createAsyncSaga = <T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
  >,
  propmiseCreator: PromiseCreatorFuntion<P1, P2>
) => {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result: P2 = isPayloadAction(action)
        ? yield call(propmiseCreator, action.payload)
        : yield call(propmiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      yield put(asyncActionCreator.failure(e));
    }
  };
};

export default createAsyncSaga;

import { createAction, ActionType, createReducer } from 'typesafe-actions';

const GET_SIDO = 'common/GET_SIDO';
const SET_SIDO = 'common/SET_SIDO';

const GET_GUNGU = 'common/GET_GUNGU';
const SET_GUNGU = 'common/SET_GUNGU';

const GET_DONG = 'common/GET_DONG';
const SET_DONG = 'common/SET_DONG';

const GET_RI = 'common/GET_RI';
const SET_RI = 'common/SET_RI';

const getSido = createAction(GET_SIDO)();
const getGungu = createAction(GET_GUNGU)();
const getDong = createAction(GET_DONG)();
const getRi = createAction(GET_RI)();

export const setSido = createAction(SET_SIDO)<string>();
export const setGungu = createAction(SET_GUNGU)<string>();
export const setDong = createAction(SET_DONG)<string>();
export const setRi = createAction(SET_RI)<string>();

interface AreaState {
  sido: string;
  gungu: string;
  dong: string;
  ri: string;
}
// export const setSido = (sido:string) => ({type:SET_SIDO, sido});
// export const setGungu = (gungu:string) => ({type:SET_GUNGU, gungu});
// export const setDong = (dong:string) => ({type:SET_DONG, dong});
// export const setRi = (ri:string) => ({type:SET_RI, ri});

const areaState: AreaState = {
  sido: '',
  gungu: '',
  dong: '',
  ri: '',
};

const actions = { getSido, setSido, getGungu, setGungu, getDong, setDong, getRi, setRi };
type AreaAction = ActionType<typeof actions>;

const areaStateInfo = createReducer<AreaState, AreaAction>(areaState)
  .handleAction(setSido, (state, action) => ({ ...state, sido: action.payload }))
  .handleAction(setGungu, (state, action) => ({ ...state, gungu: action.payload }))
  .handleAction(setDong, (state, action) => ({ ...state, dong: action.payload }))
  .handleAction(setRi, (state, action) => ({ ...state, ri: action.payload }));

export default areaStateInfo;

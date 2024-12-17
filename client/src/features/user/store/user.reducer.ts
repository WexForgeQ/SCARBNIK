import { USER_ACTIONS } from '../constants';
import { UserSliceDataState, UserSliceState } from './user.slice';

type ActionType = (typeof USER_ACTIONS)[keyof typeof USER_ACTIONS];
type PayloadType = boolean | string;

interface Action {
	type: ActionType;
	payload: PayloadType;
}
type MapFnc = (data: UserSliceDataState, payload: any) => UserSliceDataState;

const actions = new Map<ActionType, MapFnc>([
	[
		USER_ACTIONS.SET_INVALID_DATA,
		(data: UserSliceDataState, payload: boolean) => {
			return { ...data, invalid_data: payload };
		},
	],
	[
		USER_ACTIONS.SET_USER_ID,
		(data: UserSliceDataState, payload: string) => {
			return { ...data, id: payload };
		},
	],
]);

export const userReducer = (state: UserSliceState, action: Action): UserSliceState => {
	if (actions.has(action.type)) {
		return { ...state, data: actions.get(action.type)!(state.data, action.payload) };
	} else {
		return state;
	}
};

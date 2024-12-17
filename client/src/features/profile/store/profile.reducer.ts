import { AUTH_ACTIONS } from '../../auth';
import { UserProfileSliceDataState, UserProfileSliceState } from './profile.slice';

type ActionType = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];
type PayloadType = boolean | string;

interface Action {
	type: ActionType;
	payload: PayloadType;
}
type MapFnc = (data: UserProfileSliceDataState, payload: any) => UserProfileSliceDataState;

const actions = new Map<ActionType, MapFnc>([]);

export const userProfileReducer = (
	state: UserProfileSliceState,
	action: Action,
): UserProfileSliceState => {
	if (actions.has(action.type)) {
		return { ...state, data: actions.get(action.type)!(state.data, action.payload) };
	} else {
		return state;
	}
};

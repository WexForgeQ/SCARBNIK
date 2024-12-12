import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { createAsyncCases, SliceInitialState } from '../../../core/utils/fetch/create-cases.util';
import { authReducer } from './auth.reducer';

export interface UserSliceDataState {
	id: string;
	email: string;
	login: string;
	role: number;
	registration_date: Date;
	isApproved: false;
	isBanned: false;
	isOauthProfile: true;
	public_id: 0;
	password: string;
	refresh_token: string;
	access_token: string;
}

export interface UserSliceState extends SliceInitialState {
	data: UserSliceDataState;
}

const initialState = {
	fetch_data: {
		group: '',
		fetch_name: '',
	},
	loading: false,
	status: 0,
	error: null,
	data: {
		id: '',
		email: '',
		login: '',
		role: 0,
		registration_date: new Date(''),
		isApproved: false,
		isBanned: false,
		isOauthProfile: false,
		public_id: 0,
		password: '',
		refresh_token: '',
		access_token: '',
	},
};

export const authSlice = createSlice({
	name: 'responseData',
	initialState: initialState,
	reducers: {
		authReducer,
	},
	extraReducers: (builder) => {
		createAsyncCases(
			builder,
			authLogin,
			(state: UserSliceState, action) => {
				toast.success('Успешный вход');
				// console.log(action.payload);
				// localStorage.setItem('access_token', action.payload.payload.tokenData.access_token);
				// localStorage.setItem(
				// 	'refresh_token',
				// 	action.payload.payload.tokenData.refresh_token,
				// );
			},
			(state: AuthSliceState, action) => toast.error(state.error),
		);
		createAsyncCases(builder, authGoogle);
		// createAsyncCases(builder, smsCodeApprove, (state: AuthSliceState, action) => {
		// 	console.log(action.payload);
		// });
		createAsyncCases(
			builder,
			authRegistration,
			(state: AuthSliceState, action) => {
				toast.success(action.payload.payload.message);
			},
			(state: AuthSliceState, action) => toast.error(state.error),
		);
		// createAsyncCases(builder, fileUpload, (state: AuthSliceState, action) => {
		// 	console.log(action.payload);
		// });
		// createAsyncCases(builder, logout, (state: AuthSliceState, action) => {
		// 	console.log(action.payload);
		// });
	},
});

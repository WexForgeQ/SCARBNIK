import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { createAsyncCases, SliceInitialState } from '../../../core/utils/fetch/create-cases.util';
import { getUser, self } from '../services/user.services';
import { userReducer } from './user.reducer';

export interface UserSliceDataState {
	id: string;
	email: string;
	login: string;
	role: number;

	isApproved: boolean;
	isBanned: boolean;
	isOauthProfile: boolean;
	public_id: number;
	password: string;
	userprofile: {
		registration_date: Date;
		fio: string;
		phone: string;
		photo: string;
	};
}

export interface UserSliceState extends SliceInitialState {
	data: UserSliceDataState;
}

const initialState: UserSliceState = {
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
		userprofile: {
			registration_date: new Date(''),
			fio: '',
			phone: '',
			photo: '',
		},
		isApproved: false,
		isBanned: false,
		isOauthProfile: false,
		public_id: 0,
		password: '',
	},
};

export const userSlice = createSlice({
	name: 'responseData',
	initialState: initialState,
	reducers: {
		userReducer,
	},
	extraReducers: (builder) => {
		createAsyncCases(
			builder,
			getUser,
			(state: UserSliceState, action) => {},
			(state: UserSliceState, action) => {
				console.log(state);
				toast.error(state.error);
			},
		);
		createAsyncCases(
			builder,
			self,
			(state: UserSliceState, action) => {},
			(state: UserSliceState, action) => {
				console.log(state);
				toast.error(state.error);
			},
		);
	},
});

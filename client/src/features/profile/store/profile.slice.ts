import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { createAsyncCases, SliceInitialState } from '../../../core/utils/fetch/create-cases.util';
import { getUserProfile } from '../services/user-profile.services';
import { userProfileReducer } from './profile.reducer';

export interface UserProfileSliceDataState {
	registration_date: Date;
	fio: string;
	phone: string;
	photo: string;
}

export interface UserProfileSliceState extends SliceInitialState {
	data: UserProfileSliceDataState;
}

const initialState: UserProfileSliceState = {
	fetch_data: {
		group: '',
		fetch_name: '',
	},
	loading: false,
	status: 0,
	error: null,
	data: {
		registration_date: new Date(''),
		fio: '',
		phone: '',
		photo: '',
	},
};

export const userProfileSlice = createSlice({
	name: 'responseData',
	initialState: initialState,
	reducers: {
		userProfileReducer,
	},
	extraReducers: (builder) => {
		createAsyncCases(
			builder,
			getUserProfile,
			(state: UserProfileSliceState, action) => {
				toast.success('Успешное получение  профиля');
			},
			(state: UserProfileSliceState, action) => {
				console.log(state);
				toast.error(state.error);
			},
		);
	},
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { fetchApi } from '../../../api-gen';
import { USER_FETCH_ROUTES } from '../constants';

export const getUser = createAsyncThunk(
	USER_FETCH_ROUTES.getOne.async_thunk_route,
	async (userId: string, thunkAPI) => {
		try {
			const response = await fetchApi.api.usersDetail(userId);
			return {
				payload: response,
				fetch_data: {
					group: USER_FETCH_ROUTES.group,
					fetch_name: USER_FETCH_ROUTES.getOne.fetch_name,
				},
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue({ error: error.response?.data.message });
			}
			return thunkAPI.rejectWithValue({ error: 'Unknown error' });
		}
	},
);

export const self = createAsyncThunk(
	USER_FETCH_ROUTES.self.async_thunk_route,
	async (_, thunkAPI) => {
		try {
			const response = await fetchApi.api.usersSelfList();
			return {
				payload: response,
				fetch_data: {
					group: USER_FETCH_ROUTES.self,
					fetch_name: USER_FETCH_ROUTES.self.fetch_name,
				},
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue({ error: error.response?.data.message });
			}
			return thunkAPI.rejectWithValue({ error: 'Unknown error' });
		}
	},
);

// export const authRegistration = createAsyncThunk(
// 	AUTH_FETCH_ROUTES.registration.async_thunk_route,
// 	async (registrationData: RegistrationFormData, thunkAPI) => {
// 		try {
// 			const response = await fetchApi.api.authRegistrationCreate(registrationData);
// 			return {
// 				payload: response.data,
// 				fetch_data: {
// 					group: AUTH_FETCH_ROUTES.group,
// 					fetch_name: AUTH_FETCH_ROUTES.registration.fetch_name,
// 				},
// 			};
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				return thunkAPI.rejectWithValue({ error: error.response?.data.message });
// 			}
// 			return thunkAPI.rejectWithValue({ error: 'Unknown error' });
// 		}
// 	},
// );

// export const authGoogle = createAsyncThunk(
// 	AUTH_FETCH_ROUTES.google.async_thunk_route,
// 	async (_, thunkAPI) => {
// 		try {
// 			const response = await fetchApi.api.authGoogleList();
// 			return {
// 				payload: response.data,
// 				fetch_data: {
// 					group: AUTH_FETCH_ROUTES.group,
// 					fetch_name: AUTH_FETCH_ROUTES.google.fetch_name,
// 				},
// 			};
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				return thunkAPI.rejectWithValue({ error: error.response?.data.message });
// 			}
// 			return thunkAPI.rejectWithValue({ error: 'Unknown error' });
// 		}
// 	},
// );

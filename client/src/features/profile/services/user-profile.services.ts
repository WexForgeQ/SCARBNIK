import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { fetchApi } from '../../../api-gen';
import { USER_PROFILE_FETCH_ROUTES } from '../constants/fetch-routes/profile-fetch.routes';

export const getUserProfile = createAsyncThunk(
	USER_PROFILE_FETCH_ROUTES.get.async_thunk_route,
	async (userId: string, thunkAPI) => {
		try {
			const response = await fetchApi.api.userprofilesDetail(userId);
			return {
				payload: response,
				fetch_data: {
					group: USER_PROFILE_FETCH_ROUTES.group,
					fetch_name: USER_PROFILE_FETCH_ROUTES.get.fetch_name,
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

// export const update = createAsyncThunk(
// 	USER_PROFILE_FETCH_ROUTES.update.async_thunk_route,
// 	async (userId: string, thunkAPI) => {
// 		try {
// 			const response = await fetchApi.api.userprofilesUpdate(userId);
// 			return {
// 				payload: response,
// 				fetch_data: {
// 					group: USER_PROFILE_FETCH_ROUTES.group,
// 					fetch_name: USER_PROFILE_FETCH_ROUTES.update.fetch_name,
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

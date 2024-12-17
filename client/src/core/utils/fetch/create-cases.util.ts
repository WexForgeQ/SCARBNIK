import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';

export interface SliceInitialState {
	fetch_data: {
		group: string;
		fetch_name: string;
	} | null;
	loading: boolean;
	status: number;
	error: any;
	data: any;
}

export function createAsyncCases<T extends SliceInitialState>(
	builder: ActionReducerMapBuilder<T>,
	asyncThunk: AsyncThunk<any, any, any>,
	onSuccess?: (state: Draft<T>, action: PayloadAction<any>) => void,
	onError?: (state: Draft<T>, action: PayloadAction<any>) => void,
) {
	const handleSuccess = (state: Draft<T>, action: PayloadAction<any>) => {
		console.log(action);
		state.fetch_data = action.payload.fetch_data;
		state.status = action.payload.payload.status;
		if (action.payload.payload.status === 200) {
			console.log(123);
			state.error = null;
			state.data = action.payload.payload.data;
			console.log(state.data);
			console.log(action.payload);
		} else {
			state.data = null;
			state.error = action.payload.data;
		}
		if (onSuccess) {
			onSuccess(state, action);
		}
	};

	const handleError = (state: Draft<T>, action: PayloadAction<any>) => {
		state.fetch_data = null;
		state.error = 'Unknown error';
		if ('error' in action.payload) {
			state.error = action.payload.error;
		} else if ('message' in action.payload) {
			state.error = action.payload.message;
		} else if (typeof action.payload === 'string') {
			state.error = action.payload;
		}

		if (onError) {
			onError(state, action);
		}
	};

	builder
		.addCase(asyncThunk.pending, (state: Draft<T>) => {
			state.loading = true;
		})
		.addCase(asyncThunk.fulfilled, (state: Draft<T>, action) => handleSuccess(state, action))
		.addCase(asyncThunk.rejected, (state: Draft<T>, action) => handleError(state, action));
}

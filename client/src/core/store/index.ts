import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../features/auth/store';
import { userSlice } from '../../features/user/store';

const rootReducer = combineReducers({
	authData: authSlice.reducer,
	userData: userSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

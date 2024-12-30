import { APP_ROUTES } from '@core';
import { AUTH_ROUTES, LANDING_ROUTES } from '@features';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../core/store';
import { COLLECCTION_ROUTES } from '../features/collections/constants';
import { ITEMS_ROUTES } from '../features/items/constants';
import { PROFILE_ROUTES } from '../features/profile/constants/routes/profile-routes';

export const AppRouter = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route path={APP_ROUTES.auth.route} element={APP_ROUTES.auth.element}>
					<Route path={AUTH_ROUTES.login.route} element={AUTH_ROUTES.login.element} />
					<Route
						path={AUTH_ROUTES.email_approve.route}
						element={AUTH_ROUTES.email_approve.element}
					/>
					<Route
						path={AUTH_ROUTES.registration.route}
						element={AUTH_ROUTES.registration.element}
					/>
				</Route>
				<Route path={APP_ROUTES.landing.route} element={APP_ROUTES.landing.element}>
					<Route path={LANDING_ROUTES.home.route} element={LANDING_ROUTES.home.element} />
					<Route
						path={LANDING_ROUTES.orders.route}
						element={LANDING_ROUTES.orders.element}
					/>
					<Route
						path={PROFILE_ROUTES.profile.route}
						element={PROFILE_ROUTES.profile.element}
					/>
					<Route
						path={ITEMS_ROUTES.myItems.route}
						element={ITEMS_ROUTES.myItems.element}
					/>
					<Route
						path={COLLECCTION_ROUTES.myCollections.route}
						element={COLLECCTION_ROUTES.myCollections.element}
					/>
					<Route
						path={COLLECCTION_ROUTES.collection.route}
						element={COLLECCTION_ROUTES.collection.element}
					/>
					<Route path={ITEMS_ROUTES.item.route} element={ITEMS_ROUTES.item.element} />
				</Route>
			</Routes>
		</Provider>
	);
};

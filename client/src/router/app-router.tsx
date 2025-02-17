import { APP_ROUTES } from '@core';
import { AUTH_ROUTES, LANDING_ROUTES } from '@features';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { store } from '../core/store';
import { ADMIN_ROUTES } from '../features/admin/router';
import { ADV_ROUTES } from '../features/adverts/router';
import { COLLECCTION_ROUTES } from '../features/collections/constants';
import { ITEMS_ROUTES } from '../features/items/constants';
import { NOT_FOUND_ROUTES } from '../features/notfound/router';
import { PROFILE_ROUTES } from '../features/profile/constants/routes/profile-routes';
import { REQUEST_ROUTERS } from '../features/requests/router';

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
					<Route
						path={COLLECCTION_ROUTES.allCollections.route}
						element={COLLECCTION_ROUTES.allCollections.element}
					/>
					<Route
						path={COLLECCTION_ROUTES.favoriteCollections.route}
						element={COLLECCTION_ROUTES.favoriteCollections.element}
					/>
					<Route
						path={REQUEST_ROUTERS.requests.route}
						element={REQUEST_ROUTERS.requests.element}
					/>
					<Route
						path={ADMIN_ROUTES.adminPanel.route}
						element={ADMIN_ROUTES.adminPanel.element}
					/>
					<Route path={ADV_ROUTES.adverts.route} element={ADV_ROUTES.adverts.element} />
					<Route path={ITEMS_ROUTES.item.route} element={ITEMS_ROUTES.item.element} />
				</Route>
				<Route path="*" element={NOT_FOUND_ROUTES.adminPanel.element} />
			</Routes>
		</Provider>
	);
};

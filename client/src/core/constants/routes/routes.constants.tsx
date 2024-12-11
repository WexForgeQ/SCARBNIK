import { AuthorizationScreen, HomeScreen, LandingScreen } from '@features';

export const APP_ROUTES = {
	auth: {
		route: '/auth',
		element: <AuthorizationScreen />,
	},
	home: {
		route: '/profile',
		element: <HomeScreen />,
	},
	landing: {
		route: '/',
		element: <LandingScreen />,
	},
};

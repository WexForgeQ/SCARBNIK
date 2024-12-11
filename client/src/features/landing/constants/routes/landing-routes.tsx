import { DevScreen } from '../../../dev';
import { HomePageComponent } from '../../presentation/components';

export const LANDING_ROUTES = {
	home: {
		id: 'home-page-id',
		route: 'home',
		element: <HomePageComponent />,
	},
	orders: {
		id: 'orders-page-id',
		route: 'orders',
		element: <DevScreen title="Главная" />,
	},
};

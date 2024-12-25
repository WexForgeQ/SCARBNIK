import { ItemScreen } from '../../presentation/item.screen';
import { ItemsScreen } from '../../presentation/items.screen';

export const ITEMS_ROUTES = {
	myItems: {
		id: 'items',
		route: 'my-items',
		element: <ItemsScreen />,
	},
	item: {
		id: 'item',
		route: 'item',
		element: <ItemScreen />,
	},
};

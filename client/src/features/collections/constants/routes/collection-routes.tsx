import { ItemScreen } from '../../presentation/collection.screen';
import { CollectionsScreen } from '../../presentation/collections.screen';

export const COLLECCTION_ROUTES = {
	myCollections: {
		id: 'my-collections',
		route: 'my-collections',
		element: <CollectionsScreen />,
	},
	item: {
		id: 'item',
		route: 'item',
		element: <ItemScreen />,
	},
};

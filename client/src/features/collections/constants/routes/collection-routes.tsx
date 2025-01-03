import { AllCollectionsScreen } from '../../presentation/all-collections.screen';
import { CollectionScreen } from '../../presentation/collection.screen';
import { CollectionsScreen } from '../../presentation/collections.screen';
import { FavoritesCollectionsScreen } from '../../presentation/favorites-collections.screen';

export const COLLECCTION_ROUTES = {
	myCollections: {
		id: 'my-collections',
		route: 'my-collections',
		element: <CollectionsScreen />,
	},
	allCollections: {
		id: 'all-collections',
		route: 'all-collections',
		element: <AllCollectionsScreen />,
	},
	favoriteCollections: {
		id: 'favorite-collections',
		route: 'favorite-collections',
		element: <FavoritesCollectionsScreen />,
	},
	collection: {
		id: 'collection',
		route: 'collection',
		element: <CollectionScreen />,
	},
};

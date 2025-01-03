import { EntityConfig } from '@core';
import { AdvSchema } from './adverts.validation';

export const AdvFormDataConfig: EntityConfig = {
	schema: AdvSchema,
	defaultValues: {
		category_id: '',
		item_id: '',
	},
};

import { EntityConfig } from '@core';
import { ExSchema } from './exchange.validation';

export const ExFormDataConfig: EntityConfig = {
	schema: ExSchema,
	defaultValues: {
		item_id: '',
		second_item_id: '',
	},
};

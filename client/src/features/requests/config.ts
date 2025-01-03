import { EntityConfig } from '@core';
import { ReqSchema } from './requests.validation';

export const ReqFormDataConfig: EntityConfig = {
	schema: ReqSchema,
	defaultValues: {
		category_id: '',
		item_id: '',
	},
};

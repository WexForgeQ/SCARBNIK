import { EntityConfig } from '@core';
import { ReportSchema } from './report.validation';

export const ReportFormDataConfig: EntityConfig = {
	schema: ReportSchema,
	defaultValues: {
		type_id: '',
		report_text: '',
	},
};

import { z } from 'zod';

export const ReportSchema = z.object({
	type_id: z.string().min(1, 'Обязательно для заполнения'),
	report_text: z.string().min(1, 'Обязательно для заполнения'),
});

export type ReportFormData = z.infer<typeof ReportSchema>;

import { z } from 'zod';

export const ReqSchema = z.object({
	request_description: z.string().min(1, 'Обязательно для заполнения'),
	category_id: z.string().min(1, 'Обязательно для заполнения'),
	item_title: z.string().min(1, 'Обязательно для заполнения'),
});

export type ReqFormData = z.infer<typeof ReqSchema>;

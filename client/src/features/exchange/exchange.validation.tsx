import { z } from 'zod';

export const ExSchema = z.object({
	item_id: z.string().min(1, 'Обязательно для заполнения'),
	second_item_id: z.string().min(1, 'Обязательно для заполнения'),
});

export type ExFormData = z.infer<typeof ExSchema>;

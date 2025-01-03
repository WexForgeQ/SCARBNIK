import { z } from 'zod';

export const AdvSchema = z.object({
	advertisement_description: z.string().min(1, 'Обязательно для заполнения'),
	item_id: z.string().min(1, 'Обязательно для заполнения'),
	category_id: z.string().min(1, 'Обязательно для заполнения'),
});

export type AdvFormData = z.infer<typeof AdvSchema>;

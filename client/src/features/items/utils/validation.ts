import { z } from 'zod';

export const ItemSchema = z.object({
	title: z.string().min(1, 'Обязательно для заполнения'),
	item_description: z.string().optional(),
});

export type ItemFormData = z.infer<typeof ItemSchema>;

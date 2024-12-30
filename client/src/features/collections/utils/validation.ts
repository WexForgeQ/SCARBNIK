import { z } from 'zod';

export const CollectionSchema = z.object({
	title: z.string().min(1, 'Обязательно для заполнения'),
	category_id: z.string().min(1, 'Обязательно для заполнения'),
});

export type CollectionFormData = z.infer<typeof CollectionSchema>;

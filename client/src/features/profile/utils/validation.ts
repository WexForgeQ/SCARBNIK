import { z } from 'zod';

export const ProfileScmema = z.object({
	fio: z.string().min(1, 'Обязательно для заполнения'),
	phone: z
		.string()
		.min(1, 'Поле обязательно для заполнения')
		.min(10, 'Неверный формат номера телефона')
		.refine((value) => !value.includes('_'), 'Неверный формат номера телефона'),
});

export type UserProfileFormData = z.infer<typeof ProfileScmema>;

import { z } from 'zod';
const LoginFormDataSchema = z.object({
	email: z.string().min(1, 'Поле обязательно для заполнения'),
	password: z.string().min(1, 'Пароль обязателен для заполнения'),
});

type LoginFormDataSchemaType = z.infer<typeof LoginFormDataSchema>;

const ApproveFormDataSchema = z.object({
	phoneNumber: z
		.string()
		.min(1, 'Поле обязательно для заполнения')
		.min(10, 'Неверный формат номера телефона')
		.refine((value) => !value.includes('_'), 'Неверный формат номера телефона'),
	code: z
		.string()
		.min(1, 'Поле обязательно для заполнения')
		.min(4, 'Неверный формат кода подтверждения')
		.refine((value) => !value.includes('_'), 'Неверный формат кода подтверждения'),
});

type ApproveFormDataSchemaType = z.infer<typeof ApproveFormDataSchema>;

const RegistrationFormDataSchema = z
	.object({
		email: z.string().min(1, 'Поле обязательно для заполнения').email('Неверный формат email'),
		login: z.string().min(6, 'Логин должен содержать минимум 6 знаков'),
		password: z
			.string()
			.min(1, 'Поле обязательно для заполнения')
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
			.regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
			.regex(/[@$!%*?&#]/, 'Пароль должен содержать хотя бы один специальный символ'),
		secondPassword: z.string().min(1, 'Поле обязательно для заполнения'),
	})
	.superRefine(({ password, secondPassword }, ctx) => {
		if (password !== secondPassword) {
			ctx.addIssue({
				path: ['secondPassword'],
				code: z.ZodIssueCode.custom,
				message: 'Пароли должны совпадать',
			});
			ctx.addIssue({
				path: ['password'],
				code: z.ZodIssueCode.custom,
				message: 'Пароли должны совпадать',
			});
		}
	});

type RegistrationFormDataSchemaType = z.infer<typeof RegistrationFormDataSchema>;

export {
	LoginFormDataSchema,
	RegistrationFormDataSchema,
	ApproveFormDataSchema,
	type RegistrationFormDataSchemaType,
	type LoginFormDataSchemaType,
	type ApproveFormDataSchemaType,
};

import {
	Button,
	GoogleIcon,
	Input,
	LogoTextIcon,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
	YandexIcon,
} from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { AUTH_FETCH_ROUTES, AUTH_ROUTES } from '../../../constants';
import { authRegistration } from '../../../services';
import { RegistrationFormData } from '../../../types';
import { RegistrationFormDataConfig } from '../../../utils';

export const RegistrationPage = () => {
	const navigate = useAppNavigate();

	const dispatch = useAppDispatch();

	const authData = useAppSelector((store) => store.authData);

	const [search] = useSearchParams();

	const form = useForm<RegistrationFormData>({
		resolver: zodResolver(RegistrationFormDataConfig.schema),
		defaultValues: RegistrationFormDataConfig.defaultValues,
	});

	const { formState } = form;
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = () => {
		dispatch(
			authRegistration({
				...form.getValues(),
			}),
		);
	};

	console.log(formState.errors);

	useEffect(() => {
		authData.fetch_data?.fetch_name === AUTH_FETCH_ROUTES.registration.fetch_name &&
			navigate('/');
	}, [authData.fetch_data?.fetch_name]);

	return (
		<div className="flex w-[508px] flex-col gap-[23px] rounded-[12px] border border-primary-darkBrown bg-primary-darkBrown px-[32px] py-[23px]">
			<div className="flex h-[64px] flex-row items-center justify-center gap-[10px]">
				<LogoTextIcon />
			</div>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-[20px]">
					<Input
						label={formState.errors.email?.message || 'Введите email'}
						labelClassName={
							formState.errors.email?.message ? 'text-error' : 'text-primary-sand'
						}
						placeholder="Введите email"
						{...form.register('email')}
						error={formState.errors.email?.message}
						inputClassName="bg-primary-sand"
					/>
					<Input
						label={formState.errors.login?.message || 'Введите логин'}
						labelClassName={
							formState.errors.login?.message ? 'text-error' : 'text-primary-sand'
						}
						placeholder="Введите логин"
						{...form.register('login')}
						error={formState.errors.login?.message}
						inputClassName="bg-primary-sand"
					/>
					<Input
						label={formState.errors.password?.message || 'Пароль'}
						labelClassName={
							formState.errors.email?.message ? 'text-error' : 'text-primary-sand'
						}
						{...form.register('password')}
						error={formState.errors.password?.message}
						type={showPassword ? 'password' : 'text'}
						placeholder="Введите пароль"
						Icon={showPassword ? IoMdEyeOff : IoMdEye}
						iconClassName="text-input-label-primary"
						iconPos="right"
						onIconClick={() => setShowPassword(!showPassword)}
						inputClassName="bg-primary-sand"
					/>
					<Input
						label={formState.errors.secondPassword?.message || 'Повторите пароль'}
						labelClassName={
							formState.errors.email?.message ? 'text-error' : 'text-primary-sand'
						}
						{...form.register('secondPassword')}
						error={formState.errors.secondPassword?.message}
						type={showPassword ? 'password' : 'text'}
						placeholder="Введите пароль"
						Icon={showPassword ? IoMdEyeOff : IoMdEye}
						iconClassName="text-input-label-primary"
						iconPos="right"
						onIconClick={() => setShowPassword(!showPassword)}
						inputClassName="bg-primary-sand"
					/>
					<Button variant="primary" className="h-[36px]">
						Зарегистрироваться
					</Button>
					<div className="relative flex w-full max-w-md items-center">
						<div className="flex-grow border-[2px] border-primary-brown"></div>
						<span className="mx-4 flex-shrink text-primary-sand">Или</span>
						<div className="flex-grow border-[2px] border-primary-brown"></div>
					</div>
					<Button
						variant="primary"
						type="submit"
						className="flex h-[50px] items-center bg-primary-brown"
					>
						<GoogleIcon className="h-[25px] w-[25px]" />
						<div className="flex w-full items-center justify-center">
							<p className="text-center text-[15px] text-white">
								Регистрация используя Google
							</p>
						</div>
					</Button>
					<Button
						variant="primary"
						type="submit"
						className="flex h-[50px] items-center bg-primary-brown"
					>
						<YandexIcon className="h-[25px] w-[25px]" />
						<div className="flex w-full items-center justify-center">
							<p className="font-600 text-center text-[15px] text-white">
								Регистрация используя Яндекс
							</p>
						</div>
					</Button>
					<div className="flex items-center justify-center gap-[2px] font-sans text-[14px]">
						<p>Есть аккаунт?</p>
						<p
							onClick={() => navigate('/auth/' + AUTH_ROUTES.login.route)}
							className="cursor-pointer font-semibold underline-offset-auto hover:underline"
						>
							Войти
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

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
import { FormProvider, useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { AUTH_FETCH_ROUTES, AUTH_ROUTES } from '../../../constants';
import { authGoogle, authLogin } from '../../../services';
import { LoginFormData } from '../../../types';
import { LoginFormDataConfig } from '../../../utils';

export const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();
	const authData = useAppSelector((store) => store.authData);

	useEffect(() => {
		authData.fetch_data?.fetch_name === AUTH_FETCH_ROUTES.login.fetch_name && navigate('/');
	}, [authData.fetch_data?.fetch_name]);

	useEffect(() => {
		console.log(authData);
	}, [authData]);

	const form = useForm<LoginFormData>({
		resolver: zodResolver(LoginFormDataConfig.schema),
		defaultValues: LoginFormDataConfig.defaultValues,
	});

	const onSubmit = () => {
		dispatch(
			authLogin({
				email: form.getValues('email'),
				password: form.getValues('password'),
			}),
		);
	};
	const { formState } = form;

	return (
		<FormProvider {...form}>
			<div className="flex w-[508px] flex-col gap-[23px] rounded-[12px] border border-primary-darkBrown bg-primary-darkBrown px-[32px] py-[23px]">
				<div className="flex h-[64px] flex-row items-center justify-center gap-[10px]">
					<LogoTextIcon />
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-[24px]">
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
							label={formState.errors.password?.message || 'Пароль'}
							labelClassName={
								formState.errors.password?.message
									? 'text-error'
									: 'text-primary-sand'
							}
							type={showPassword ? 'password' : 'text'}
							placeholder="Введите пароль"
							Icon={showPassword ? IoMdEyeOff : IoMdEye}
							iconClassName="text-input-label-primary"
							iconPos="right"
							onIconClick={() => setShowPassword(!showPassword)}
							{...form.register('password')}
							error={formState.errors.password?.message}
							inputClassName="bg-primary-sand"
						/>
						<Button variant="primary" type="submit" className="h-[36px]">
							Войти
						</Button>
						<div className="relative flex w-full max-w-md items-center">
							<div className="flex-grow border-[2px] border-primary-brown"></div>
							<span className="mx-4 flex-shrink text-primary-sand">Или</span>
							<div className="flex-grow border-[2px] border-primary-brown"></div>
						</div>
						<Button
							variant="primary"
							className="flex h-[50px] items-center bg-primary-brown"
							onClick={() => dispatch(authGoogle())}
						>
							<GoogleIcon className="h-[25px] w-[25px]" />
							<div className="flex w-full items-center justify-center">
								<p className="text-center text-[15px] text-white">
									Войти используя Google
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
									Войти используя Яндекс
								</p>
							</div>
						</Button>
					</div>
				</form>
				<div className="flex items-center justify-center gap-[2px] font-sans text-[14px]">
					<p>Нет аккаунта?</p>
					<p
						onClick={() => navigate('/auth/' + AUTH_ROUTES.registration.route)}
						className="cursor-pointer font-semibold underline-offset-auto hover:underline"
					>
						Зарегистрироваться
					</p>
				</div>
			</div>
		</FormProvider>
	);
};

import { fetchApi } from '@api-gen';
import { Button, Input, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';
import { getUserProfile } from '../../services/user-profile.services';
import { ProfileFormDataConfig } from '../../utils/config';
import { UserProfileFormData } from '../../utils/validation';

export const ProfileForm = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const form = useForm<UserProfileFormData>({
		resolver: zodResolver(ProfileFormDataConfig.schema),
		defaultValues: ProfileFormDataConfig.defaultValues,
	});
	const onSubmit = async (data: UserProfileFormData) => {
		try {
			const response = await fetchApi.api.userprofilesUpdate(userData.data.id, {
				...data,
				user_id: userData.data.id,
			});

			if (response.status === 200) {
				navigate('/profile', { id: userData.data.id });
				dispatch(getUserProfile(userData.data.id));
				dispatch(self());
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const { formState } = form;

	useEffect(() => {
		form.reset(userProfile.data);
	}, [userProfile.data]);

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-[24px] bg-primary-brown">
					<Input
						label={formState.errors?.fio?.message || 'Введите ФИО'}
						labelClassName={
							formState.errors.fio?.message ? 'text-error' : 'text-primary-sand'
						}
						placeholder="Введите ФИО"
						{...form.register('fio')}
						error={formState.errors.fio?.message}
						inputClassName="bg-primary-sand text-black"
					/>
					<Input
						label={formState.errors.phone?.message || 'Номер телефона'}
						labelClassName={
							formState.errors.phone?.message ? 'text-error' : 'text-primary-sand'
						}
						error={formState.errors.phone?.message}
						{...form.register(`phone`)}
						defaultValue={userProfile.data.phone}
						placeholder="+375 (29) 21-21-211"
						mask="+375 (99) 999-99-99"
						inputClassName="bg-primary-sand text-black"
					/>
					<Button variant="primary" type="submit" className="h-[36px]">
						Сохранить
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

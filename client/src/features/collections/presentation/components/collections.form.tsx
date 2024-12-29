import { fetchApi } from '@api-gen';
import { Button, Input, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';


export const ItemForm = (setItems: any) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const [search] = useSearchParams();
	const form = useForm<ItemFormData>({
		resolver: zodResolver(ItemFormDataConfig.schema),
		defaultValues: ItemFormDataConfig.defaultValues,
	});

	const onSubmit = async (data: ItemFormData) => {
		try {
			let response;
			if (search.get('edit')) {
				response = await fetchApi.api.itemsUpdate(search.get('itemId')!, {
					...data,
					owner_id: userData.data.id,
					name: '',
				});
			} else if (search.get('add')) {
				response = await fetchApi.api.itemsCreate({
					...data,
					owner_id: userData.data.id,
					name: '',
				});
			}
			if (response) {
				if (response.status === 200) {
					navigate('/my-items', { id: userData.data.id });
					dispatch(self());
				} else if (response.status === 401) {
					toast.error('Не авторизован');
				} else {
					toast.error('Ошибка:' + response.statusText);
				}
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const { formState } = form;
	const getItem = async () => {
		if (search.get('itemId')) {
			const response = await fetchApi.api.itemsDetail(search.get('itemId')!);
			if (response) {
				form.reset(response.data);
			}
		}
	};

	useEffect(() => {
		getItem();
	}, [search.get('itemId')]);

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-[24px] bg-primary-brown">
					<Input
						label={formState.errors?.title?.message || 'Введите название'}
						labelClassName={
							formState.errors.title?.message ? 'text-error' : 'text-primary-sand'
						}
						maxLength={20}
						placeholder="Введите название"
						{...form.register('title')}
						error={formState.errors.title?.message}
						inputClassName="bg-primary-sand text-black"
					/>
					<Input
						label={formState.errors.item_description?.message || 'Описание предмета'}
						labelClassName={
							formState.errors.item_description?.message
								? 'text-error'
								: 'text-primary-sand'
						}
						maxLength={200}
						error={formState.errors.item_description?.message}
						{...form.register('item_description')}
						placeholder="Введите описание"
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

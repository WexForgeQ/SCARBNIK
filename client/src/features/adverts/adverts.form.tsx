import { fetchApi } from '@api-gen';
import {
	Button,
	FormElementLabel,
	SelectValues,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../user/services/user.services';
import { AdvFormData } from './adverts.validation';
import { AdvFormDataConfig } from './config';

export const AdvForm = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const [search] = useSearchParams();
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [items, setItems] = useState<Array<SelectValues>>([]);
	const form = useForm<AdvFormData>({
		resolver: zodResolver(AdvFormDataConfig.schema),
		defaultValues: AdvFormDataConfig.defaultValues,
	});
	const { formState } = form;

	const getItems = async (user_id: string, name?: string) => {
		try {
			const response = await fetchApi.api.itemsList({ owner_id: user_id, name: name });

			if (response.status === 200) {
				setItems(response.data.map((ct) => ({ label: ct.title!, value: ct.id! })));
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const getCategories = async () => {
		const response = await fetchApi.api.categoriesList();
		if (response.status === 200) {
			setCategories(response.data.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	useEffect(() => {
		getCategories();
		getItems(userData.data.id);
	}, []);

	const onSubmit = async (data: AdvFormData) => {
		try {
			let response;
			if (search.get('edit')) {
				response = await fetchApi.api.itemadvertisementsUpdate(search.get('advId')!, {
					...data,
					user_id: userData.data.id,
				});
			} else if (search.get('add')) {
				response = await fetchApi.api.itemadvertisementsCreate({
					...data,
					user_id: userData.data.id,
				});
			}
			if (response) {
				if (response.status === 200) {
					navigate('/advertisements', { id: userData.data.id });
					dispatch(self());
					toast.success('Объявление создано');
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

	return (
		<FormProvider {...form}>
			<form className="w-[400px] self-center" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex h-[300px] flex-col gap-[24px] self-center bg-primary-brown">
					<FormElementLabel className="text-primary-sand">
						{formState.errors.category_id?.message || 'Категория'}
					</FormElementLabel>
					<Select
						options={categories}
						className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							form.setValue('category_id', value?.value!);
						}}
						classNames={{
							control: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
							menu: () => 'rounded-[10px] h-[100px] bg-primary-sand',
							menuList: () =>
								'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
							container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						}}
					/>
					<FormElementLabel className="text-primary-sand">
						{formState.errors.item_id?.message || 'Предмет'}
					</FormElementLabel>
					<Select
						options={items}
						className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							form.setValue('item_id', value?.value!);
						}}
						classNames={{
							control: () => 'rounded-[10px]  h-[40px] bg-primary-sand border-none',
							menu: () =>
								'rounded-[10px] max-h-[200px] overflow-auto bg-primary-sand',
							menuList: () =>
								'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
							container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						}}
					/>
					<textarea
						maxLength={400}
						placeholder="Введите описание"
						{...form.register('advertisement_description')}
						className="max-w-[500px] rounded-lg bg-primary-sand p-[20px] text-start text-black"
					/>
				</div>
				<Button variant="primary" type="submit" className="mt-[100px] h-[36px]">
					Сохранить
				</Button>
			</form>
		</FormProvider>
	);
};

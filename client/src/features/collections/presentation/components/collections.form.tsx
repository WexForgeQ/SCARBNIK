import { fetchApi } from '@api-gen';
import { Button, Input, SelectValues, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';
import { CollectionFormDataConfig } from '../../utils/config';
import { CollectionFormData } from '../../utils/validation';

export const CollectionForm = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const [search] = useSearchParams();
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const form = useForm<CollectionFormData>({
		resolver: zodResolver(CollectionFormDataConfig.schema),
		defaultValues: CollectionFormDataConfig.defaultValues,
	});

	const onSubmit = async (data: CollectionFormData) => {
		try {
			let response;
			if (search.get('edit')) {
				response = await fetchApi.api.collectionsUpdate(search.get('collectionId')!, {
					...data,
					owner_id: userData.data.id,
				});
			} else if (search.get('add')) {
				response = await fetchApi.api.collectionsCreate({
					...data,
					owner_id: userData.data.id,
				});
			}
			if (response) {
				if (response.status === 200) {
					navigate('/my-collections', { id: userData.data.id });
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
	}, []);

	const { formState } = form;
	console.log(formState.errors);
	const getItem = async () => {
		if (search.get('collectionId')) {
			const response = await fetchApi.api.collectionsDetail(search.get('collectionId')!);
			if (response) {
				form.reset(response.data);
			}
		}
	};

	useEffect(() => {
		getItem();
	}, [search.get('collectionId')]);

	return (
		<FormProvider {...form}>
			<form className="w-[400px] self-center" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex h-[400px] flex-col gap-[24px] self-center bg-primary-brown">
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

					<Button variant="primary" type="submit" className="mt-[100px] h-[36px]">
						Сохранить
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

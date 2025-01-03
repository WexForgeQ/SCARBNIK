import { fetchApi } from '@api-gen';
import {
	Button,
	FormElementLabel,
	Input,
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
import { ReqFormDataConfig } from './config';
import { ReqFormData } from './requests.validation';

export const RequestForm = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const [search] = useSearchParams();
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [items, setItems] = useState<Array<SelectValues>>([]);
	const [photo, setPhoto] = useState<File>();
	const form = useForm<ReqFormData>({
		resolver: zodResolver(ReqFormDataConfig.schema),
		defaultValues: ReqFormDataConfig.defaultValues,
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

	const onSubmit = async (data: ReqFormData) => {
		try {
			let response;
			if (search.get('edit')) {
				response = await fetchApi.api.itemrequestsUpdate(search.get('reqId')!, {
					...data,
					item_photo: photo!,
					user_id: userData.data.id,
				});
			} else if (search.get('add')) {
				response = await fetchApi.api.itemrequestsCreate({
					...data,
					item_photo: photo!,
					user_id: userData.data.id,
				});
			}
			if (response) {
				if (response.status === 200) {
					navigate('/requests', { id: userData.data.id });
					dispatch(self());
					toast.success('Запрос создан');
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
				<div className="flex h-[500px] flex-col gap-[24px] self-center bg-primary-brown">
					<div className="flex flex-col items-center py-[20px]">
						<p>Фото файла:</p>
						<input
							type="file"
							accept=".jpg, .jpeg, .png"
							onChange={(e) => {
								const file = e.target.files![0];
								setPhoto(file);
							}}
						/>
					</div>
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
					<Input
						label={formState.errors?.item_title?.message || 'Введите название'}
						labelClassName={
							formState.errors.item_title?.message
								? 'text-error'
								: 'text-primary-sand'
						}
						maxLength={20}
						placeholder="Введите название"
						{...form.register('item_title')}
						error={formState.errors.item_title?.message}
						inputClassName="bg-primary-sand text-black"
					/>
					<textarea
						maxLength={400}
						placeholder="Введите описание"
						{...form.register('request_description')}
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

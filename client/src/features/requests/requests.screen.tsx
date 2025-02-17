import { fetchApi, UserFavorite } from '@api-gen';
import {
	Button,
	FormElementLabel,
	Input,
	SelectValues,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { ExchangeModal } from '../exchange/exchange.modal';
import { self } from '../user/services/user.services';
import { RequestListComponent } from './request-list.component';
import { EditRequestsModal } from './requests.modal';

export const RequestsScreen = () => {
	const filtersForm = useForm({
		defaultValues: {
			category: '',
			mine: false,
			favorite: false,
		},
	});
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const { watch, getValues } = filtersForm;
	const [favorites, setFavorites] = useState<Array<UserFavorite>>([]);
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [requests, setRequests] = useState<Array<any>>([]);

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

	const getUserFavorites = async () => {
		try {
			const response = await fetchApi.api.getAllFavorites({
				favoritable_type: 'REQUEST',
				userId: userData.data.id,
			});
			if (response.status === 200) {
				dispatch(self());
				setFavorites((response.data as any).rows);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			}
		}
	};

	useEffect(() => {
		if (userData.data.id) {
			getUserFavorites();
		}
	}, [userData.data.id]);

	const category = watch('category');
	const mine = watch('mine');
	const favorite = watch('favorite');
	const getData = async () => {
		try {
			const response = await fetchApi.api.itemrequestsList({
				category_id: category,
				user_id: mine ? userData.data.id : '',
			});
			if (response.status === 200) {
				favorite
					? setRequests(
							response.data.itemRequests.filter((row: any) =>
								favorites.some((fv) => fv.favoritable_id === row.id),
							),
						)
					: setRequests(response.data.itemRequests);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};
	const [search] = useSearchParams();
	const navigate = useAppNavigate();
	useEffect(() => {
		dispatch(self());
		getCategories();
	}, []);

	const deleteItem = async (item_id: string) => {
		try {
			const response = await fetchApi.api.itemrequestsDelete(item_id);

			if (response.status === 204) {
				getData();
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const handleSetFavorites = (items: UserFavorite[]) => {
		setFavorites(items);
		return {};
	};

	useEffect(() => {
		if (userData.data.id) {
			getUserFavorites();
		}
		getData();
	}, [category, search.get('modal'), mine, favorite]);

	return (
		<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">Запросы</p>
			</div>
			<FormProvider {...filtersForm}>
				<div className="flex h-fit w-full items-center justify-between rounded-t-[20px]">
					<FormElementLabel className="text-primary-sand">Категория</FormElementLabel>
					<Select
						options={categories}
						className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							filtersForm.setValue('category', value?.value!);
						}}
						classNames={{
							control: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
							menu: () => 'rounded-[10px] h-[100px] bg-primary-sand',
							menuList: () =>
								'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
							container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						}}
					/>
					{userData.data.id && (
						<>
							<FormElementLabel className="text-primary-sand">
								Только мои
							</FormElementLabel>
							<Input
								type="checkbox"
								className="h-[30px] border-0"
								onChange={() => {
									filtersForm.setValue('mine', !mine);
								}}
							/>
							<FormElementLabel className="text-primary-sand">
								Избранное
							</FormElementLabel>
							<Input
								type="checkbox"
								className="h-[30px] border-0"
								onChange={() => {
									filtersForm.setValue('favorite', !favorite);
								}}
							/>
						</>
					)}
					{
						<Button
							variant="primary"
							type="submit"
							onClick={() =>
								navigate('/requests', {
									id: userData.data.id,
									modal: true,
									add: true,
								})
							}
							className="h-[40px]"
						>
							Создать запрос
						</Button>
					}
				</div>
			</FormProvider>
			<div className="flex flex-wrap gap-5">
				{requests &&
					requests.map((item) => (
						<RequestListComponent
							getData={() => getData}
							onDelete={deleteItem}
							setFavorites={handleSetFavorites}
							favorites={favorites}
							key={item.id}
							item={item}
						/>
					))}
			</div>
			<EditRequestsModal
				getData={() => getData()}
				isOpen={!!search.get('modal') && !search.get('exchange')}
				isEditMode={!!search.get('edit')}
			/>
			<ExchangeModal
				getData={() => getData()}
				isOpen={!!search.get('modal') && !!search.get('exchange')}
				isEditMode={!!search.get('edit')}
			/>
		</div>
	);
};

import { Collection, fetchApi, UserFavorite } from '@api-gen';
import {
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
import { self } from '../../user/services/user.services';
import { CollectionListComponent } from './components/collection.component';
import { EditCollectionModal } from './components/collection.modal';

export const FavoritesCollectionsScreen = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const filtersForm = useForm({
		defaultValues: {
			name: '',
			category: '',
		},
	});
	const { watch, getValues } = filtersForm;
	const [collections, setCollections] = useState<Array<Collection>>([]);
	const [isPublicView, SetPublicView] = useState(false);
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [favorites, setFavorites] = useState<Array<UserFavorite>>([]);
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
	const name = watch('name');
	const category = watch('category');
	const [search] = useSearchParams();
	useEffect(() => {
		dispatch(self());
		getCategories();
	}, []);

	const getUserFavorites = async () => {
		try {
			const response = await fetchApi.api.getAllFavorites({
				favoritable_type: 'COLLECTION',
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

	const getData = async () => {
		try {
			const response = await fetchApi.api.collectionsList({
				title: name,
				category_id: category,
				isPublic: true,
			});
			if (response.status === 200) {
				console.log(favorites);
				setCollections(
					response.data.rows.filter((row: any) =>
						favorites.some((fv) => fv.favoritable_id === row.id),
					),
				);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const deleteItem = async (item_id: string) => {
		try {
			const response = await fetchApi.api.collectionsDelete(item_id);

			if (response.status === 204) {
				if (userData.data.id) {
					if (name) {
						getData();
					} else {
						getData();
					}
				}
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	useEffect(() => {
		getUserFavorites();
	}, [userData.data.id]);

	useEffect(() => {
		getData();
	}, [favorites, category, name]);

	return (
		<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">Избранные коллекции</p>
			</div>
			<FormProvider {...filtersForm}>
				<div className="flex h-fit w-full items-center justify-between rounded-t-[20px]">
					<Input
						label={'Название'}
						labelClassName={'text-primary-sand'}
						placeholder="Название коллекции"
						{...filtersForm.register('name')}
						inputClassName="bg-primary-sand text-black"
						wrapperClassName="flex flex-row items-center gap-[20px]"
					/>
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
				</div>
			</FormProvider>
			<div className="flex flex-wrap gap-5">
				{collections.map((item) => (
					<CollectionListComponent
						getData={getData}
						onDelete={deleteItem}
						key={item.id}
						item={item}
					/>
				))}
			</div>
			<EditCollectionModal
				getData={(user_id: string, name?: string) => {
					return {};
				}}
				isOpen={!!search.get('modal')}
				isEditMode={!!search.get('edit')}
			/>
		</div>
	);
};

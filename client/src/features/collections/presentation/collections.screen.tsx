import { Collection, fetchApi } from '@api-gen';
import {
	Button,
	FormElementLabel,
	Input,
	SelectValues,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../../user/services/user.services';
import { CollectionListComponent } from './components/collection.component';
import { EditCollectionModal } from './components/collection.modal';

export const CollectionsScreen = () => {
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
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
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

	const getData = async (user_id: string, name?: string, category?: string) => {
		try {
			const response = await fetchApi.api.collectionsList({
				owner_id: user_id,
				title: name,
				category_id: category,
			});

			if (response.status === 200) {
				setCollections(response.data.rows);
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
		if (userData.data.id) {
			if (name) {
				getData(userData.data.id, name);
			} else {
				getData(userData.data.id);
			}
		}
	}, [search.get('modal')]);

	const deleteItem = async (item_id: string) => {
		try {
			const response = await fetchApi.api.collectionsDelete(item_id);

			if (response.status === 204) {
				if (userData.data.id) {
					if (name) {
						getData(userData.data.id, name);
					} else {
						getData(userData.data.id);
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
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	useEffect(() => {
		if (userData.data.id) {
			getData(userData.data.id, name, category);
		}
	}, [userData.data.id, name, category, dispatch]);

	return (
		<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">Мои коллекции</p>
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

					<Button
						variant="primary"
						type="submit"
						onClick={() =>
							navigate('/my-collections', {
								id: userData.data.id,
								modal: true,
								add: true,
							})
						}
						className="h-[40px]"
					>
						Создать коллекцию
					</Button>
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
				getData={() => getData(userData.data.id)}
				isOpen={!!search.get('modal')}
				isEditMode={!!search.get('edit')}
			/>
		</div>
	);
};

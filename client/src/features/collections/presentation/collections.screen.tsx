import { Collection, fetchApi } from '@api-gen';
import { Button, Input, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../../user/services/user.services';
import { CollectionListComponent } from './components/collection.component';

export const CollectionsScreen = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const filtersForm = useForm({
		defaultValues: {
			name: '',
			category: {},
		},
	});
	const { watch, getValues } = filtersForm;
	const [collections, setCollections] = useState<Array<Collection>>([]);
	const name = watch('name');
	const [search] = useSearchParams();
	useEffect(() => {
		dispatch(self());
	}, []);

	const getData = async (user_id: string, name?: string) => {
		try {
			const response = await fetchApi.api.collectionsList({ owner_id: user_id, title: name });

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
			const response = await fetchApi.api.itemsDelete(item_id);

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
	useEffect(() => {}, [userData.data.id, name, dispatch]);
	console.log(filtersForm.watch('category'));
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
					<Controller
						render={({ field }) => (
							<Select
								{...field}
								value={field.value || ''}
								className="w-[300px] rounded-[10px]"
								classNames={{
									control: () =>
										'border border-gray-300 bg-primary-sand rounded-[10px] h-[40px]',
								}}
								options={options}
							></Select>
						)}
						name="category"
						control={filtersForm.control}
					/>

					<Button
						variant="primary"
						type="submit"
						onClick={() =>
							navigate('/my-items', { id: userData.data.id, modal: true, add: true })
						}
						className="h-[40px]"
					>
						Создать предмет
					</Button>
				</div>
			</FormProvider>
			<div className="flex flex-col gap-5">
				{collections.map((item) => (
					<CollectionListComponent
						getData={getData}
						onDelete={deleteItem}
						key={item.id}
						item={item}
					/>
				))}
			</div>
			{/* <EditItemModal
				getData={() => getData(userData.data.id)}
				isOpen={!!search.get('modal')}
				isEditMode={!!search.get('edit')}
			/> */}
		</div>
	);
};

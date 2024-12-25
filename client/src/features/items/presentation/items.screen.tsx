import { fetchApi, Item } from '@api-gen';
import { Button, Input, useAppNavigate, useAppSelector } from '@core';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ItemListComponent } from './components/item-list.component';

export const ItemsScreen = () => {
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const filtersForm = useForm({
		defaultValues: {
			name: '',
		},
	});
	const { watch, getValues } = filtersForm;
	const [items, setItems] = useState<Array<Item>>([]);
	const name = watch('name');

	const getData = async (user_id: string, name?: string) => {
		try {
			const response = await fetchApi.api.itemsList({ owner_id: user_id, name: name });

			if (response.status === 200) {
				setItems(response.data);
				console.log(response.data);
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

	useEffect(() => {
		if (userData.data.id) {
			if (name) {
				getData(userData.data.id, name);
			} else {
				getData(userData.data.id);
			}
		}
	}, [userData.data.id, name]);

	return (
		<div className="flex w-[1000px] flex-col justify-center gap-5 self-center">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">Мои предметы</p>
			</div>
			<FormProvider {...filtersForm}>
				<div className="flex h-fit w-full items-center justify-between rounded-t-[20px]">
					<Input
						label={'Название'}
						labelClassName={'text-primary-sand'}
						placeholder="Название предмета"
						{...filtersForm.register('name')}
						inputClassName="bg-primary-sand text-black"
						wrapperClassName="flex flex-row items-center gap-[20px]"
					/>
					<Button variant="primary" type="submit" className="h-[40px]">
						Создать предмет
					</Button>
				</div>
			</FormProvider>
			<div className="flex flex-col gap-5">
				{items.map((item) => (
					<ItemListComponent onDelete={deleteItem} key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

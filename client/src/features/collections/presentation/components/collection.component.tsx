import { fetchApi } from '@api-gen';
import {
	Button,
	SelectValues,
	Separator,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';
export type Props = {
	item: any;
	onDelete: (id: string) => {};
	getData: (user_id: string, name?: string) => {};
};

export const CollectionListComponent = ({ item, onDelete, getData }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const [activeItem, setAciveItem] = useState<string>('');
	const [search] = useSearchParams();
	const [items, setItems] = useState<Array<SelectValues>>();

	const handleAddItem = async (id: string) => {
		if (id) {
			try {
				const response = await fetchApi.api.collectionitemsAdditemCreate({
					collectionId: item.id,
					itemId: id,
				});
				if (response.status === 200) {
					dispatch(self());
					getData(userData.data.id);
					toast.success('Предмет успешно добавлен');
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
		} else {
			toast.error('Выберите предмет');
		}
	};

	const getItems = async () => {
		const response = await fetchApi.api.itemsList({ owner_id: userData.data.id });
		if (response.status === 200) {
			setItems(response.data.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className="flex h-fit w-[490px] flex-wrap items-center justify-between gap-[20px] overflow-auto rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<Button
				variant="primary"
				type="submit"
				onClick={() =>
					navigate('/collection', {
						id: item.id,
					})
				}
				className="h-[40px] bg-primary-darkBrown"
			>
				<FaEye />
			</Button>
			<div className="flex w-full flex-row justify-between">
				<Button
					variant="primary"
					type="submit"
					onClick={() => handleAddItem(activeItem)}
					className="h-[40px] bg-primary-darkBrown"
				>
					Добавить предмет
				</Button>
				<Select
					options={items}
					className="w-[200px] rounded-[10px] border border-gray-300 bg-primary-sand"
					onChange={(value) => {
						setAciveItem(value?.value!);
					}}
					classNames={{
						control: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						menu: () => 'rounded-[10px] max-h-[300px] bg-primary-sand',
						menuList: () =>
							'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
						container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
					}}
				/>
			</div>

			<div className="flex w-[400px] flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название:</p>
					<p className="font-bold">{item.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Категория:</p>
					<p className="font-bold">{item.category.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Владелец:</p>
					<p className="font-bold">{item.user.login}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Количество предметов:</p>
					<p className="font-bold">{item.collectionitems.length}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-row justify-between gap-[10px]">
					<p className="font-bold">Рейтинг:</p>
					<p className="font-bold">
						{0 ||
							(
								item.collectionratings.reduce(
									(acc: any, rating: { rate: any }) => acc + rating.rate,
									0,
								) / item.collectionratings.length || 0
							).toFixed(2)}
					</p>
					<p className="font-bold">Оценок:</p>
					<p className="font-bold">{item.collectionratings.length}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
			</div>

			<div className="flex h-full w-full flex-row justify-between gap-[20px]">
				<Button
					variant="primary"
					type="submit"
					onClick={() =>
						navigate('/my-collections', {
							id: userData.data.id,
							collectionId: item.id,
							modal: true,
							edit: true,
						})
					}
					className="h-[40px] bg-primary-brown"
				>
					Редактировать
				</Button>
				<Button
					variant="primary"
					type="submit"
					onClick={() => onDelete(item.id!)}
					className="h-[40px] bg-red-950"
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};

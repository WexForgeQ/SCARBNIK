import { fetchApi } from '@api-gen';
import { Button, Input, Separator, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiMailSend, BiPhone } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { CollectionItemListComponent } from '../../items/presentation/components/collection-items-list.component';
import { ItemInfoModal } from '../../items/presentation/components/item-info.modal';
import { self } from '../../user/services/user.services';

export const CollectionScreen = () => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const [search] = useSearchParams();
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const commentaryForm = useForm({
		defaultValues: {
			rate: 0,
			rate_text: '',
		},
	});

	const [currentCollection, setCurrentCollection] = useState<any>();

	const getCollection = async (id: string) => {
		try {
			const response = await fetchApi.api.collectionsDetail(search.get('id')!);
			if (response.status === 200) {
				dispatch(self());
				setCurrentCollection(response.data);
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

	const deleteItemFromCollection = async (id: string) => {
		try {
			const response = await fetchApi.api.collectionitemsDelete(id);
			if (response.status === 200) {
				dispatch(self());
				if (search.get('id')) {
					getCollection(search.get('id')!);
				}
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
	const options = [
		{ label: '5', value: 5 },
		{ label: '4', value: 4 },
		{ label: '3', value: 3 },
		{ label: '2', value: 2 },
		{ label: '1', value: 1 },
	];

	const addCommentary = async () => {
		if (commentaryForm.getValues('rate') !== 0) {
			try {
				const response = await fetchApi.api.postRating({
					user_id: userData.data.id,
					collection_id: search.get('id')!,
					...commentaryForm.getValues(),
				});
				if (response.status === 200) {
					dispatch(self());
					if (search.get('id')) {
						getCollection(search.get('id')!);
					}
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
			toast.error('Выберите оценку');
		}
	};

	const deleteCommentary = async () => {
		try {
			const response = await fetchApi.api.deleteRating({
				user_id: userData.data.id,
				collection_id: search.get('id')!,
			});
			if (response.status === 200) {
				dispatch(self());
				if (search.get('id')) {
					getCollection(search.get('id')!);
				}
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
		if (search.get('id')) {
			getCollection(search.get('id')!);
		}
	}, [search.get('id')]);

	return (
		currentCollection && (
			<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
				<div className="flex h-[50px] max-h-[700px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
					<p className="text-[30px] text-primary-sand">
						Коллекция: {currentCollection.title}
					</p>
				</div>
				<div className="flex h-[150px] max-h-[700px] w-full items-center gap-[20px] rounded-[20px] bg-primary-green px-[20px]">
					<img
						className="h-[100px] w-[100px] rounded-[15px] object-cover"
						src={currentCollection.user.userprofile.photo}
						alt="User profile"
					/>
					<div className="flex-row">
						<p className="text-[30px] text-primary-sand">
							Владелец: {currentCollection.user.login}
						</p>
						<p className="flex items-center gap-[5px] text-[30px] text-primary-sand">
							<BiMailSend />
							{currentCollection.user.email}
						</p>
						<p className="flex items-center gap-[5px] text-[30px] text-primary-sand">
							<BiPhone />
							{currentCollection.user.userprofile.phone}
						</p>
					</div>
				</div>
				<div className="flex h-[50px] max-h-[700px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
					<p className="text-[30px] text-primary-sand">
						Предметы коллекции: {currentCollection.title}
					</p>
				</div>
				<div className="flex max-h-[700px] flex-col gap-5 overflow-auto">
					{currentCollection.collectionitems.map((item: any) => (
						<CollectionItemListComponent
							onDelete={() => deleteItemFromCollection(item.id)}
							key={item.id}
							item={item.item}
						/>
					))}
				</div>
				<div className="flex h-[50px] max-h-[700] w-full items-center justify-center gap-[20px] rounded-t-[20px] bg-primary-darkBrown text-[30px] text-primary-sand">
					<p className="">Оценки коллекции: {currentCollection.title}</p>
					<p className="font-bold">Рейтинг:</p>
					<p className="font-bold">
						{0 ||
							(
								currentCollection.collectionratings.reduce(
									(acc: any, rating: { rate: any }) => acc + rating.rate,
									0,
								) / currentCollection.collectionratings.length || 0
							).toFixed(2)}
					</p>
					<p className="font-bold">Оценок:</p>
					<p className="font-bold">{currentCollection.collectionratings.length}</p>
				</div>
				<p className="text-primary-sand">
					Введите короткий комментарий(не более 100 символов)
				</p>
				<div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-primary-green p-[30px] px-[20px]">
					<div className="flex h-fit flex-row">
						<Input
							maxLength={100}
							placeholder="Введите комментарий"
							{...commentaryForm.register('rate_text')}
							inputClassName="bg-primary-sand text-black w-[800px]"
						/>
						<Select
							options={options}
							className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
							onChange={(value) => {
								commentaryForm.setValue('rate', value?.value!);
							}}
							classNames={{
								control: () =>
									'rounded-[10px] h-[40px] bg-primary-sand border-none',
								menu: () => 'rounded-[10px] max-h-[100px] bg-primary-sand',
								menuList: () =>
									'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
								container: () =>
									'rounded-[10px] h-[40px] bg-primary-sand border-none',
							}}
						/>
					</div>
					<div className="flex justify-between">
						<Button
							variant="primary"
							type="submit"
							className="h-[40px] w-fit bg-primary-brown"
							onClick={addCommentary}
						>
							Сохранить
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="h-[40px] w-fit bg-red-950"
							onClick={deleteCommentary}
						>
							Удалить мою оценку
						</Button>
					</div>
				</div>
				<div className="flex max-h-[500px] flex-col gap-5 overflow-auto">
					{currentCollection.collectionratings.map((item: any) => (
						<div className="flex h-fit w-full items-center gap-[20px] rounded-[10px] bg-primary-green p-[30px]">
							<img
								className="h-[100px] w-[100px] rounded-[15px] object-cover"
								src={item.user.userprofile.photo}
								alt="User profile"
							/>
							<div className="flex flex-col">
								<div className="flex gap-[20px]">
									<p className="text-[20px]">{item.user.login}</p>
									<p className="text-[20px]">Оценка:</p>
									<p className="text-[20px]">{item.rate}</p>
								</div>
								<Separator className="border-primary-darkBrown" />
								{item.rate_text || 'Нет комментария'}
							</div>
						</div>
					))}
				</div>
				<ItemInfoModal
					isOpen={!!search.get('itemId') && !!search.get('info')}
					isEditMode
					getData={() => {}}
				/>
			</div>
		)
	);
};

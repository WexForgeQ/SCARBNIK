import { fetchApi, UserFavorite } from '@api-gen';
import { Button, Separator, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { BiSolidStar, BiStar } from 'react-icons/bi';
import { toast } from 'sonner';
import { self } from '../user/services/user.services';
export type Props = {
	item: any;
	onDelete: (itemId: string) => {};
	getData: () => {};
	favorites: UserFavorite[];
	setFavorites: (item: UserFavorite[]) => {};
};
export const RequestListComponent = ({
	item,
	onDelete,
	getData,
	favorites,
	setFavorites,
}: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const handleResponse = async () => {
		try {
			const response = await fetchApi.api.itemRequestsResponse({
				user_id: userData.data.id,
				owner_id: item.user.id,
				item_id: item.id,
			});
			if (response) {
				if (response.status === 200) {
					dispatch(self());
					toast.success('Вы откликнулись на запрос, проверьте почту');
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

	useEffect(() => {
		if (userData.data.id) {
			getUserFavorites();
		}
	}, []);

	useEffect(() => {
		getData();
	}, [favorites]);

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

	const handleAddCollectionToFavorites = async (id: string) => {
		try {
			const response = await fetchApi.api.userfavoritesAddFavoriteCreate({
				favoritableId: id,
				favoritableType: 'REQUEST',
				userId: userData.data.id,
			});
			if (response.status === 200) {
				dispatch(self());
				getUserFavorites();
				getData();
				toast.success('Запрос в избранном');
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

	const handleDeleteCollectionFromFavorites = async (id: string) => {
		try {
			const response = await fetchApi.api.userfavoritesRemoveFavoriteCreate({
				favoritableId: id,
				favoritableType: 'REQUEST',
				userId: userData.data.id,
			});
			if (response.status === 200) {
				dispatch(self());
				getUserFavorites();
				getData();
				toast.success('Запрос убран из избранного');
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

	return (
		<div className="flex h-fit w-full flex-row items-center gap-[20px] rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<div className="flex w-[300px] flex-col self-start pt-[30px]">
				{item.request_photo ? (
					<img
						className="h-[200px] w-[200px] rounded-[15px] object-cover"
						src={item.request_photo}
						alt="User profile"
					/>
				) : (
					<div className="h-[200px] w-[200px] rounded-[15px] bg-primary-sand"></div>
				)}
				<Separator className="border-primary-darkBrown" />
				<p className="font-bold">Автор:</p>
				<div className="flex flex-col items-center gap-[10px]">
					{item.user.userprofile.photo ? (
						<img
							className="h-[100px] w-[100px] rounded-[15px] object-cover"
							src={item.user.userprofile.photo}
							alt="User profile"
						/>
					) : (
						<div className="h-[50px] w-[50px] rounded-[15px] bg-primary-sand"></div>
					)}
					<p className="font-bold">{item.user.login}</p>
					<p className="font-bold">{item.user.userprofile.phone}</p>
					<p className="font-bold">{item.user.email}</p>
				</div>
			</div>
			<div className="flex w-full flex-col flex-wrap gap-[10px] self-start pt-[30px] text-[20px]">
				<div>
					<Button
						variant="primary"
						type="submit"
						onClick={() =>
							!favorites?.some((fv) => fv.favoritable_id === item.id)
								? handleAddCollectionToFavorites(item.id)
								: handleDeleteCollectionFromFavorites(item.id)
						}
						className="h-[40px] bg-primary-brown"
					>
						{!favorites?.some((fv) => fv.favoritable_id === item.id) ? (
							<BiStar />
						) : (
							<BiSolidStar />
						)}
					</Button>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название желанного предмета:</p>
					<p className="font-bold">{item.item_title}</p>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Категория:</p>
					<p className="font-bold">{item.category.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex max-h-[300px] max-w-[700px] flex-wrap overflow-y-auto text-wrap">
					<p className="font-bold">Описание:</p>
					<p
						className="h-fit w-full text-wrap text-[15px] font-bold"
						title={item.request_description}
						style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
					>
						{item.request_description}
					</p>
				</div>
				<div className="flex flex-row justify-between pt-[200px]">
					{userData.data.id !== item.user.id && (
						<Button
							variant="primary"
							type="submit"
							onClick={() => {
								navigate('/requests', {
									reqId: item.id,
									modal: true,
									exchange: true,
								});
							}}
							className="h-[40px] bg-primary-darkBrown"
						>
							Предложить обмен
						</Button>
					)}
					{userData.data.id === item.user.id ||
						(userData.data.role === 1 && (
							<Button
								variant="primary"
								type="submit"
								onClick={() => onDelete(item.id!)}
								className="h-[40px] bg-red-950"
							>
								Удалить запрос
							</Button>
						))}
					{userData.data.id === item.user.id && (
						<Button
							variant="primary"
							type="submit"
							onClick={() => {
								navigate('/requests', {
									reqId: item.id,
									modal: true,
									edit: true,
								});
							}}
							className="h-[40px] bg-primary-brown"
						>
							Редактировать
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

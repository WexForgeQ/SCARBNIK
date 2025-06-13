import { fetchApi, Item } from '@api-gen';
import { Button, Separator, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';

export type Props = {
	item: Item;
	onDelete: (id: string) => {};
	getData: (user_id: string, name?: string) => {};
};

export const ItemListComponent = ({ item, onDelete, getData }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.files && e.target.files[0]) {
				const file = e.target.files[0];
				const response = await fetchApi.api.itemsUploadCreate(item.id!, {
					photo: file,
				});
				if (response.status === 200) {
					toast.success('Успешное подтверждение');
					dispatch(self());
					getData(userData.data.id);
				} else {
					toast.error('Ошибка при изменении');
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			}
		}
	};

	return (
		<div className="flex h-fit w-full flex-row items-center justify-between gap-[20px] rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<div className="flex flex-col">
				{item.photo ? (
					<img
						className="h-[200px] w-[200px] rounded-[15px] object-cover"
						src={item.photo}
						alt="User profile"
					/>
				) : (
					<div className="h-[200px] w-[200px] rounded-[15px] bg-primary-sand"></div>
				)}
				<p>Изменить фото предмета:</p>
				<input type="file" accept=".jpg, .jpeg, .png" onChange={handlePhotoUpload} />
			</div>
			<div className="flex w-[400px] flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название:</p>
					<p className="font-bold">{item.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-wrap overflow-y-auto truncate">
					<p className="font-bold">Описание:</p>

					<p
						className="h-fit w-full truncate text-[15px] font-bold"
						title={item.item_description}
					>
						{item.item_description}
					</p>
				</div>
			</div>
			<div className="flex h-full flex-col justify-between gap-[20px]">
				<Button
					variant="primary"
					type="submit"
					onClick={() =>
						navigate('/my-items', {
							id: userData.data.id,
							itemId: item.id,
							info: true,
						})
					}
					className="h-[40px] bg-primary-brown"
				>
					Инфо
				</Button>
				<Button
					variant="primary"
					type="submit"
					onClick={() =>
						navigate('/my-items', {
							id: userData.data.id,
							itemId: item.id,
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

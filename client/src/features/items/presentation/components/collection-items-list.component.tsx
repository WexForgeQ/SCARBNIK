import { Item } from '@api-gen';
import { Button, Separator, useAppDispatch, useAppNavigate, useAppSelector } from '@core';

export type Props = {
	item: Item;
	onDelete: (itemId: string) => {};
};

export const CollectionItemListComponent = ({ item, onDelete }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	return (
		<div className="flex h-fit w-full flex-row items-center gap-[20px] rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
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
			</div>
			<div className="flex w-[700px] flex-col gap-[10px] py-[20px] text-[20px]">
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
			<Button
				variant="primary"
				type="submit"
				onClick={() =>
					navigate('', {
						id: userData.data.id,
						itemId: item.id,
						info: true,
					})
				}
				className="h-[40px] bg-primary-brown"
			>
				Инфо
			</Button>
			{userData.data.id === item.owner_id && (
				<Button
					variant="primary"
					type="submit"
					onClick={() => onDelete(item.id!)}
					className="h-[40px] bg-red-950"
				>
					Удалить из коллекции
				</Button>
			)}
		</div>
	);
};

import { Item } from '@api-gen';
import { Button, Separator, useAppSelector } from '@core';

export type Props = {
	item: Item;
	onDelete: (id: string) => {};
};

export const ItemListComponent = ({ item, onDelete }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	return (
		<div className="flex h-[300px] w-full flex-row items-center justify-between gap-[20px] overflow-auto rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<img
				className="h-[200px] w-[200px] rounded-[15px] object-cover"
				src={userProfileData.data.photo}
				alt="User profile"
			/>
			<div className="flex w-[500px] flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название:</p>
					<p className="font-bold">{item.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-wrap overflow-y-auto truncate">
					<p className="w-full text-[15px] font-bold">{item.item_description}</p>
				</div>
			</div>
			<div className="flex h-full flex-col justify-between gap-[20px]">
				<Button
					variant="primary"
					type="submit"
					onClick={() => onDelete(item.id!)}
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

import { Item } from '@api-gen';
import { Separator, useAppSelector } from '@core';

export type Props = {
	item: Item;
};

export const ItemListComponent = ({ item }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	return (
		<div className="flex h-[300px] w-full flex-row items-center justify-between gap-[20px] overflow-auto rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<img
				className="h-[200px] w-[200px] rounded-[15px] object-cover"
				src={userProfileData.data.photo}
				alt="User profile"
			/>
			<div className="flex w-full flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название:</p>
					<p className="font-bold">{item.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex w-full flex-wrap overflow-auto">
					<p className="w-full text-[15px] font-bold">{item.item_description}</p>
				</div>
			</div>
		</div>
	);
};

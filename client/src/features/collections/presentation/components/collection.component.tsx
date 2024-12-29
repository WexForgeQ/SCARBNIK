import { Collection } from '@api-gen';
import { Button, Separator, useAppDispatch, useAppNavigate, useAppSelector } from '@core';

export type Props = {
	item: Collection;
	onDelete: (id: string) => {};
	getData: (user_id: string, name?: string) => {};
};

export const CollectionListComponent = ({ item, onDelete, getData }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	return (
		<div className="flex h-fit w-full flex-row items-center justify-between gap-[20px] overflow-auto rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none">
			<div className="flex w-[400px] flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Название:</p>
					<p className="font-bold">{item.title}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
			</div>
			<div className="flex h-full flex-col justify-between gap-[20px]">
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

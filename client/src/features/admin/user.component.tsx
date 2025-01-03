import { fetchApi } from '@api-gen';
import {
	Button,
	formatDate,
	Separator,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { toast } from 'sonner';

export type Props = {
	item: any;
	onDelete: (itemId: string) => {};
	getData: () => {};
};

export const UserComponent = ({ item, onDelete, getData }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();
	interface RoleMapping {
		[key: number]: string;
	}

	const roleMapping: RoleMapping = {
		1: 'Админ',
		2: 'Пользователь',
	};

	const updateUser = async (id: string, type: string) => {
		let updateData;

		if (type === 'isAdmin') {
			updateData = { role: 1 };
		} else if (type === 'block') {
			updateData = { isBanned: true };
		} else if (type === 'unblock') {
			updateData = { isBanned: false };
		} else {
			toast.error('Неверный тип обновления');
			return;
		}

		const response = await fetchApi.api.usersUpdate(id, {
			...updateData,
			email: item.email!,
			login: item.login!,
			role: updateData.role || 2,
		});

		if (response.status === 200) {
			getData();
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	return (
		<div className="flex h-fit w-[900px] flex-row items-center gap-[20px] rounded-lg bg-primary-green scrollbar-none">
			<div className="flex flex-col">
				{item.userprofile.photo ? (
					<img
						className="h-[100px] w-[100px] rounded-[15px] object-cover"
						src={item.userprofile.photo}
						alt="User profile"
					/>
				) : (
					<div className="h-[100px] w-[100px] rounded-[15px] bg-primary-sand"></div>
				)}
			</div>
			<div className="flex w-[700px] flex-col gap-[10px] py-[20px] text-[20px]">
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Логин:</p>
					<p className="font-bold">{item.login}</p>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">ФИО:</p>
					<p className="font-bold">{item.userprofile.fio}</p>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Роль:</p>
					<p className="font-bold">{roleMapping[item.role as number]}</p>
				</div>
				<Separator className="border-primary-darkBrown" />
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Почта:</p>
					<p className="font-bold">{item.email}</p>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Телефон:</p>
					<p className="font-bold">{item.userprofile.phone}</p>
				</div>
				<div className="flex flex-row gap-[10px]">
					<p className="font-bold">Дата регистрации:</p>
					<p className="font-bold">
						{formatDate(String(item.userprofile.registration_date))}
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-[10px]">
				{item.role !== 1 && (
					<>
						<Button
							variant="primary"
							type="submit"
							onClick={() => onDelete(item.id!)}
							className="h-[40px] w-fit bg-red-950"
						>
							Удалить
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={() => updateUser(item.id, 'isAdmin')}
							className="h-[40px] w-fit bg-red-950"
						>
							Сделать админом
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={
								item.isBanned
									? () => updateUser(item.id, 'unblock')
									: () => updateUser(item.id, 'block')
							}
							className="h-[40px] w-fit bg-red-950"
						>
							{!item.isBanned ? 'Заблокировать' : 'Разблокировать'}
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

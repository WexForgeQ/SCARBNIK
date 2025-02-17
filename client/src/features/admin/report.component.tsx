import { fetchApi } from '@api-gen';
import { Button, formatDate, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { toast } from 'sonner';

export type Props = {
	item: any;
	users: any[];
	onDelete: (itemId: string) => {};
	getData: () => {};
};

export const ReportComponent = ({ item, onDelete, getData, users }: Props) => {
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

	const deleteReport = async (id: string) => {
		const response = await fetchApi.api.userreportsDelete(id);
		if (response.status === 200) {
			toast.success('Успешное удаление');
			getData();
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	return (
		<div className="flex h-fit w-[900px] flex-row gap-[20px] rounded-lg border border-primary-darkBrown bg-primary-green p-[10px] scrollbar-none">
			<div className="flex flex-col">
				<div className="flex flex-col text-[20px]">
					<p>От</p>
					<div className="flex w-[300px] flex-row gap-[10px]">
						<p className="font-bold">Логин:</p>
						<p className="font-bold">
							{users.find((user) => user.id === item.reporter_id).login}
						</p>
					</div>
				</div>
				<div className="flexf lex-col text-[20px]">
					<p>На</p>
					<div className="flex flex-row gap-[10px]">
						<p className="font-bold">Логин:</p>
						<p className="font-bold">
							{users.find((user) => user.id === item.user_id).login}
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-col text-[20px]">
					<div className="flex w-[300px] flex-row gap-[10px]">
						<p className="font-bold">Дата жалобы:</p>
						<p className="font-bold">{formatDate(String(item.report_date))}</p>
					</div>
				</div>
				<div className="flex flex-col text-[20px]">
					<div className="flex flex-row gap-[10px]">
						<p className="font-bold">Описание жалобы:</p>
						<p className="font-bold">{item.report_text}</p>
					</div>
				</div>
			</div>
			<div className="flex w-fit flex-col gap-[10px] py-[20px] text-[20px]"></div>
			<div className="flex flex-col gap-[10px]">
				{users.find((user) => user.id === item.user_id).role !== 1 && (
					<>
						<Button
							variant="primary"
							type="submit"
							onClick={
								users.find((user) => user.id === item.user_id).isBanned
									? () =>
											updateUser(
												users.find((user) => user.id === item.user_id).id,
												'unblock',
											)
									: () =>
											updateUser(
												users.find((user) => user.id === item.user_id).id,
												'block',
											)
							}
							className="h-[40px] w-fit bg-red-950"
						>
							{!users.find((user) => user.id === item.user_id).isBanned
								? 'Заблокировать'
								: 'Разблокировать'}
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={() => deleteReport(item.id)}
							className="h-[40px] w-fit bg-red-950"
						>
							Удалить жалобу
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

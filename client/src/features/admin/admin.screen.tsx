import { fetchApi } from '@api-gen';
import {
	Button,
	FormElementLabel,
	Input,
	SelectValues,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../user/services/user.services';
import { ReportComponent } from './report.component';
import { UserComponent } from './user.component';

export const AdminPanelScreen = () => {
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();
	const constsForm = useForm({
		defaultValues: {
			currentCategory: '',
			newCategory: '',
			currentReport: '',
			newReport: '',
			userControlType: '1',
			userName: '',
		},
	});
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [reports, setReports] = useState<Array<SelectValues>>([]);
	const [advertisements, setAdv] = useState<Array<SelectValues>>([]);
	const [req, setReq] = useState<Array<SelectValues>>([]);
	const [col, setCol] = useState<Array<SelectValues>>([]);
	const [userReports, setUserReports] = useState<any[]>([]);
	const [users, setUsers] = useState<Array<any>>([]);

	useEffect(() => {
		dispatch(self);
	}, []);

	useEffect(() => {
		checkRole();
		if (userData.data.role === 2) {
			toast.error('Нет доступа');
			navigate('/home');
		}
	}, [userData]);

	const userControlTypeOptions = [
		{
			label: 'Все пользователи',
			value: '1',
		},
		{
			label: 'Заблокированные',
			value: '2',
		},
		{
			label: 'Жалобы',
			value: '3',
		},
	];

	const checkRole = async () => {
		const response = await fetchApi.api.usersSelfList();
		if (!response.data.id) {
			toast.error('Нет доступа');
			navigate('/home');
		} else if (response.status === 401) {
			toast.error('Нет доступа');
			navigate('/home');
		} else {
		}
	};

	const getCategories = async () => {
		const response = await fetchApi.api.categoriesList();
		if (response.status === 200) {
			setCategories(response.data.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getUsers = async () => {
		const response = await fetchApi.api.usersList(
			constsForm.watch('userControlType') === '2' ? { isBanned: true } : {},
		);
		if (response.status === 200) {
			setUsers(response.data.users);
			getUserReports();
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getUserReports = async () => {
		const response = await fetchApi.api.userreportsList();
		if (response.status === 200) {
			setUserReports(response.data as any[]);
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const deleteUser = async (id: string) => {
		const response = await fetchApi.api.usersDelete(id);
		if (response.status === 200) {
			getUsers();
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getReports = async () => {
		const response = await fetchApi.api.userreporttypesList();
		if (response.status === 200) {
			setReports(response.data.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getAdverts = async () => {
		const response = await fetchApi.api.itemadvertisementsList();
		if (response.status === 200) {
			setAdv(
				response.data.itemAdvertisements.map((ct) => ({ label: ct.title!, value: ct.id! })),
			);
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getRequests = async () => {
		const response = await fetchApi.api.itemrequestsList();
		if (response.status === 200) {
			setReq(response.data.itemRequests.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const getCollections = async () => {
		const response = await fetchApi.api.collectionsList();
		if (response.status === 200) {
			setCol(response.data.rows.map((ct) => ({ label: ct.title!, value: ct.id! })));
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
	};

	const createReport = async () => {
		try {
			const response = await fetchApi.api.userreporttypesCreate({
				title: newReport,
			});
			if (response.status === 200) {
				dispatch(self());
				getReports();
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

	const editReport = async () => {
		try {
			if (!currentReport) {
				toast.error('Выберите тип жалобы');
				return {};
			}
			const response = await fetchApi.api.userreporttypesUpdate(currentReport, {
				title: newReport,
			});
			if (response.status === 200) {
				dispatch(self());
				getReports();
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

	const deleteReport = async () => {
		try {
			if (!currentReport) {
				toast.error('Выберите тип жалобы');
				return {};
			}
			const response = await fetchApi.api.userreporttypesDelete(currentReport);
			if (response.status === 200) {
				dispatch(self());
				getReports();
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

	const [currentCategory, newCategory, currentReport, newReport, userControlType] =
		constsForm.watch([
			'currentCategory',
			'newCategory',
			'currentReport',
			'newReport',
			'userControlType',
		]);

	const createCategory = async () => {
		try {
			const response = await fetchApi.api.categoriesCreate({
				title: newCategory,
				name: newCategory,
			});
			if (response.status === 200) {
				dispatch(self());
				getCategories();
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

	const editCategory = async () => {
		try {
			if (!currentCategory) {
				toast.error('Выберите категорию');
				return {};
			}
			const response = await fetchApi.api.categoriesUpdate(currentCategory, {
				title: newCategory,
				name: newCategory,
			});
			if (response.status === 200) {
				dispatch(self());
				getCategories();
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

	const deleteCategory = async () => {
		try {
			if (!currentCategory) {
				toast.error('Выберите категорию');
				return {};
			}
			const response = await fetchApi.api.categoriesDelete(currentCategory);
			if (response.status === 200) {
				dispatch(self());
				getCategories();
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
		getCategories();
		getReports();
		getUsers();
		getUserReports();
		getAdverts();
		getRequests();
		getCollections();
	}, [constsForm.watch('userControlType')]);

	return (
		<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">{'Панель администратора'}</p>
			</div>
			<div className="flex h-fit flex-col items-center rounded-[20px] bg-primary-green p-[30px]">
				<p className="text-[30px] text-primary-darkBrown">
					{'Панель управления константами'}
				</p>
				<div className="flex w-full flex-row justify-between px-[30px]">
					<div className="flex flex-col gap-[10px]">
						<FormElementLabel className="text-primary-sand">Категории</FormElementLabel>
						<Select
							options={categories}
							className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
							onChange={(value) => {
								constsForm.setValue('currentCategory', value?.value!);
							}}
							classNames={{
								control: () =>
									'rounded-[10px] h-[40px] bg-primary-sand border-none',
								menu: () => 'rounded-[10px] h-[100px] bg-primary-sand',
								menuList: () =>
									'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
								container: () =>
									'rounded-[10px] h-[40px] bg-primary-sand border-none',
							}}
						/>
						<FormElementLabel className="text-primary-sand">
							Новое название/категория
						</FormElementLabel>
						<Input
							labelClassName={'text-primary-sand'}
							placeholder="Новое название/категория"
							{...constsForm.register('newCategory')}
							inputClassName="bg-primary-sand text-black"
							wrapperClassName="flex flex-row items-center gap-[20px]"
						/>
						<Button
							variant="primary"
							type="submit"
							onClick={() => createCategory()}
							className="h-[40px] bg-primary-brown"
						>
							Создать
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={() => editCategory()}
							className="h-[40px] bg-primary-darkBrown"
						>
							Редактировать выбор
						</Button>
						<Button
							variant="primary"
							type="submit"
							onClick={() => deleteCategory()}
							className="h-[40px] bg-red-950"
						>
							Удалить
						</Button>
					</div>
					<div className="flex flex-row">
						<div className="flex flex-col gap-[10px]">
							<FormElementLabel className="text-primary-sand">
								Причины жалоб
							</FormElementLabel>
							<Select
								options={reports}
								className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
								onChange={(value) => {
									constsForm.setValue('currentReport', value?.value!);
								}}
								classNames={{
									control: () =>
										'rounded-[10px] h-[40px] bg-primary-sand border-none',
									menu: () => 'rounded-[10px] h-[100px] bg-primary-sand',
									menuList: () =>
										'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
									container: () =>
										'rounded-[10px] h-[40px] bg-primary-sand border-none',
								}}
							/>
							<FormElementLabel className="text-primary-sand">
								Новое название/тип
							</FormElementLabel>
							<Input
								labelClassName={'text-primary-sand'}
								placeholder="Новое название/тип"
								{...constsForm.register('newReport')}
								inputClassName="bg-primary-sand text-black"
								wrapperClassName="flex flex-row items-center gap-[20px]"
							/>
							<Button
								variant="primary"
								type="submit"
								onClick={() => createReport()}
								className="h-[40px] bg-primary-brown"
							>
								Создать
							</Button>
							<Button
								variant="primary"
								type="submit"
								onClick={() => editReport()}
								className="h-[40px] bg-primary-darkBrown"
							>
								Редактировать выбор
							</Button>
							<Button
								variant="primary"
								type="submit"
								onClick={() => deleteReport()}
								className="h-[40px] bg-red-950"
							>
								Удалить
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex h-fit flex-col items-center gap-[30px] rounded-[20px] bg-primary-green p-[30px]">
				<p className="text-[30px] text-primary-darkBrown">
					{'Панель управления пользователями'}
				</p>
				<div className="flex gap-[20px]">
					<Select
						options={userControlTypeOptions}
						value={userControlTypeOptions.find((uc) => {
							uc.value === constsForm.getValues('userControlType');
						})}
						className="w-[300px] self-start rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							constsForm.setValue('userControlType', value?.value!);
						}}
						classNames={{
							control: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
							menu: () => 'rounded-[10px] h-[100px] bg-primary-sand',
							menuList: () =>
								'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
							container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						}}
					/>
					<Input
						labelClassName={'text-primary-sand'}
						placeholder="Имя пользователя"
						{...constsForm.register('userName')}
						inputClassName="bg-primary-sand text-black"
						wrapperClassName="flex flex-row items-center gap-[20px]"
					/>
				</div>

				<div className="flex flex-wrap gap-5">
					{constsForm.getValues('userControlType') !== '3' ? (
						<>
							{!!users.length &&
								users
									.filter((user) =>
										(user.login as string).includes(
											constsForm.watch('userName'),
										),
									)
									.map((item) => (
										<UserComponent
											getData={getUsers}
											onDelete={deleteUser}
											key={item.id}
											item={item}
										/>
									))}
						</>
					) : (
						<>
							{!!users.length &&
								userReports &&
								userReports
									.filter((item) =>
										users
											.find((user) => user.id === item.user_id)
											.login.includes(constsForm.watch('userName')),
									)
									.map((item) => (
										<ReportComponent
											getData={getUsers}
											onDelete={deleteUser}
											key={item.id}
											item={item}
											users={users}
										/>
									))}
						</>
					)}
				</div>
			</div>
			<div className="flex h-fit flex-col items-center gap-[30px] rounded-[20px] bg-primary-green p-[30px]">
				<p className="text-[30px] text-primary-darkBrown">
					{'Статистика по пользователям'}
				</p>
				<div className="flex flex-col gap-[20px]">
					<FormElementLabel className="text-[30px]">
						Общее число пользователей системы: {users.length}
					</FormElementLabel>
					<FormElementLabel className="text-[30px]">
						Заблокированных пользователей:{' '}
						{users.filter((user) => user.isBanned).length}
					</FormElementLabel>
				</div>
			</div>
			<div className="flex h-fit flex-col items-center gap-[30px] rounded-[20px] bg-primary-green p-[30px]">
				<p className="text-[30px] text-primary-darkBrown">{'Статистика'}</p>
				<div className="flex flex-col gap-[20px]">
					<FormElementLabel className="text-[30px]">
						Объявлений в системе: {advertisements.length}
					</FormElementLabel>
					<FormElementLabel className="text-[30px]">
						Запросов в системе: {req.length}
					</FormElementLabel>
					<FormElementLabel className="text-[30px]">
						Коллекций в системе: {col.length}
					</FormElementLabel>
				</div>
			</div>
		</div>
	);
};

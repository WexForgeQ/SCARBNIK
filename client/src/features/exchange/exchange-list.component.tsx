import { fetchApi, UserFavorite } from '@api-gen';
import {
	Button,
	formatDate,
	Separator,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { self } from '../user/services/user.services';
export type Props = {
	item: any;
	onDelete: (itemId: string) => {};
	getData: () => {};
	favorites: UserFavorite[];
	setFavorites: (item: UserFavorite[]) => {};
};
export const ExListComponent = ({ item, onDelete, getData, favorites, setFavorites }: Props) => {
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const navigate = useAppNavigate();
	const dispatch = useAppDispatch();

	const handleSubmitByOwner = async () => {
		try {
			const response = await fetchApi.api.exchangeSubmitOwner({
				exchange_id: item.id,
			});
			if (response.status === 200) {
				dispatch(self());
				getData();
				toast.success('Обмен подтвержден');
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

	const handleSubmitByProposer = async () => {
		try {
			const response = await fetchApi.api.exchangeSubmitProposer({
				exchange_id: item.id,
			});
			if (response.status === 200) {
				dispatch(self());
				getData();
				toast.success('Обмен подтвержден');
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

	const handleSubmitByDelete = async () => {
		try {
			const response = await fetchApi.api.exchangeSubmitDelete({
				exchange_id: item.id,
			});
			if (response.status === 200) {
				dispatch(self());
				getData();
				toast.success('Обмен отменен');
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
	console.log(userData);
	return (
		<div
			className={twMerge(
				'flex h-fit w-full flex-row justify-between rounded-lg bg-primary-green px-[30px] py-[10px] scrollbar-none',
				item.submitted_by_owner && item.submitted_by_user ? 'bg-input-label-primary' : '',
			)}
		>
			<div className="flex w-[200px] flex-col rounded-[10px] bg-primary-darkBrown p-[10px] font-bold text-primary-sand">
				<p>Обмен № {item.public_id}</p>
				<p>
					Дата обмена:
					{formatDate(String(item.createdAt))}
				</p>
				<div className="flex flex-col gap-[10px]">
					{item.owner_id === userData.data.id && !item.submitted_by_owner && (
						<Button
							variant="primary"
							type="button"
							className="mt-[10px] h-[36px] bg-primary-brown"
							onClick={handleSubmitByOwner}
						>
							Подтвердить
						</Button>
					)}
					{item.owner_id === userData.data.id && !item.submitted_by_owner && (
						<Button
							variant="primary"
							type="button"
							className="mt-[10px] h-[36px] bg-red-950"
							onClick={handleSubmitByDelete}
						>
							Отказаться
						</Button>
					)}
					{item.proposalItem.user.id === userData.data.id && !item.submitted_by_user && (
						<Button
							variant="primary"
							type="button"
							className="mt-[10px] h-[36px] bg-primary-brown"
							onClick={handleSubmitByProposer}
						>
							Подтвердить
						</Button>
					)}
					{item.proposalItem.user.id === userData.data.id && !item.submitted_by_user && (
						<Button
							variant="primary"
							type="button"
							className="mt-[10px] h-[36px] bg-red-950"
							onClick={handleSubmitByDelete}
						>
							Отказаться
						</Button>
					)}
					{item.exchangeItem.owner_id !== userData.data.id && (
						<Button
							variant="primary"
							type="submit"
							onClick={() => {
								navigate('', {
									report: true,
									user_id: item.exchangeItem.owner_id,
									modal: true,
								});
							}}
							className="h-[40px] bg-primary-brown"
						>
							Отправить жалобу
						</Button>
					)}
					{item.proposalItem.owner_id !== userData.data.id && (
						<Button
							variant="primary"
							type="submit"
							onClick={() => {
								navigate('', {
									user_id: item.proposalItem.owner_id,
									report: true,
									modal: true,
								});
							}}
							className="h-[40px] bg-primary-brown"
						>
							Отправить жалобу
						</Button>
					)}
				</div>
			</div>
			<div className="flex w-[300px] flex-col self-start pt-[30px]">
				<p>Предложение владельца</p>
				{item.exchangeItem.photo ? (
					<img
						className={twMerge(
							'h-[200px] w-[200px] rounded-[15px] object-cover',
							'border-[10px]',
							item.submitted_by_owner ? 'border-green-950' : 'border-error',
						)}
						src={item.exchangeItem.photo}
						alt="Item profile"
					/>
				) : (
					<div
						className={twMerge(
							'h-[200px] w-[200px] rounded-[15px] object-cover',
							'border-[10px] bg-primary-sand',
							item.submitted_by_owner ? 'border-green-950' : 'border-error',
						)}
					></div>
				)}
				<p className="font-bold">{item.exchangeItem.title}</p>
				<Separator className="border-primary-darkBrown" />
				<p className="font-bold">Владелец:</p>
				<div className="flex flex-col gap-[10px]">
					{item.exchangeItem.user.userprofile.photo ? (
						<img
							className="h-[100px] w-[100px] rounded-[15px] object-cover"
							src={item.exchangeItem.user.userprofile.photo}
							alt="User profile"
						/>
					) : (
						<div className="size-[100px] rounded-[15px] bg-primary-sand"></div>
					)}
					<p className="font-bold">{item.exchangeItem.user.login}</p>
					<p className="font-bold">{item.exchangeItem.user.userprofile.phone}</p>
					<p className="font-bold">{item.exchangeItem.user.email}</p>
				</div>
			</div>
			<div className="flex w-[300px] flex-col self-start pt-[30px]">
				<p>Предлагаемый предмет</p>
				{item.proposalItem.photo ? (
					<img
						className={twMerge(
							'h-[200px] w-[200px] rounded-[15px] object-cover',
							'border-[10px]',
							item.submitted_by_user ? 'border-green-950' : 'border-error',
						)}
						src={item.proposalItem.photo}
						alt="Item profile"
					/>
				) : (
					<div
						className={twMerge(
							'h-[200px] w-[200px] rounded-[15px] object-cover',
							'border-[10px] bg-primary-sand',
							item.submitted_by_user ? 'border-green-950' : 'border-error',
						)}
					></div>
				)}
				<p className="font-bold">{item.proposalItem.title}</p>
				<Separator className="border-primary-darkBrown" />
				<p className="font-bold">Владелец:</p>
				<div className="flex flex-col gap-[10px]">
					{item.proposalItem.user.userprofile.photo ? (
						<img
							className="h-[100px] w-[100px] rounded-[15px] object-cover"
							src={item.proposalItem.user.userprofile.photo}
							alt="User profile"
						/>
					) : (
						<div className="size-[100px] rounded-[15px] bg-primary-sand"></div>
					)}
					<p className="font-bold">{item.proposalItem.user.login}</p>
					<p className="font-bold">{item.proposalItem.user.userprofile.phone}</p>
					<p className="font-bold">{item.proposalItem.user.email}</p>
				</div>
			</div>
		</div>
	);
};

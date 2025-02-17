import { fetchApi, UserFavorite } from '@api-gen';
import {
	FormElementLabel,
	Input,
	SelectValues,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ReportModal } from '../reports/report.modal';
import { self } from '../user/services/user.services';
import { ExListComponent } from './exchange-list.component';

export const ExchScreen = () => {
	const filtersForm = useForm({
		defaultValues: {
			category: '',
			active: false,
			favorite: false,
		},
	});
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const { watch, getValues } = filtersForm;
	const [favorites, setFavorites] = useState<Array<UserFavorite>>([]);
	const [categories, setCategories] = useState<Array<SelectValues>>([]);
	const [exchanges, setExchanges] = useState<Array<any>>([]);

	const category = watch('category');
	const mine = watch('active');
	const favorite = watch('favorite');
	const getData = async () => {
		try {
			const response = await fetchApi.api.exchangeList({
				user_id: userData.data.id,
			});
			if (response.status === 200) {
				if (mine)
					setExchanges(
						response.data.exchanges.filter(
							(ex: any) =>
								(ex.owner_id === userData.data.id ||
									ex.proposalItem.user.id === userData.data.id) &&
								!ex.submitted_by_owner &&
								!ex.submitted_by_user,
						),
					);
				else
					setExchanges(
						response.data.exchanges.filter(
							(ex: any) =>
								ex.owner_id === userData.data.id ||
								ex.proposalItem.user.id === userData.data.id,
						),
					);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};
	const [search] = useSearchParams();
	const navigate = useAppNavigate();
	useEffect(() => {
		getData();
		dispatch(self());
	}, []);

	const deleteItem = async (item_id: string) => {
		try {
			const response = await fetchApi.api.itemadvertisementsDelete(item_id);

			if (response.status === 204) {
				getData();
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const handleSetFavorites = (items: UserFavorite[]) => {
		setFavorites(items);
		return {};
	};

	useEffect(() => {
		if (userData.data.id) {
			getData();
		}
	}, [category, search.get('modal'), mine, favorite, search, userData.data.id]);

	return (
		<div className="flex w-[1000px] flex-col justify-start gap-5 self-start">
			<div className="flex h-[50px] w-full items-center justify-center rounded-t-[20px] bg-primary-darkBrown">
				<p className="text-[30px] text-primary-sand">Мои обмены</p>
			</div>
			<FormProvider {...filtersForm}>
				<div className="flex h-fit w-full items-center gap-[20px] rounded-t-[20px]">
					{userData.data.id && (
						<>
							<FormElementLabel className="text-primary-sand">
								Только активные
							</FormElementLabel>
							<Input
								type="checkbox"
								className="h-[30px] border-0"
								onChange={() => {
									filtersForm.setValue('active', !mine);
								}}
							/>
						</>
					)}
				</div>
			</FormProvider>
			<div className="flex flex-wrap gap-5">
				{exchanges &&
					exchanges.map((item) => (
						<ExListComponent
							getData={getData}
							onDelete={deleteItem}
							setFavorites={handleSetFavorites}
							favorites={favorites}
							key={item.id}
							item={item}
						/>
					))}
			</div>
			<ReportModal
				getData={() => getData()}
				isOpen={!!search.get('modal') && !!search.get('report')}
				isEditMode={!!search.get('edit')}
			/>
		</div>
	);
};

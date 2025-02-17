import { fetchApi } from '@api-gen';
import { Button, FormElementLabel, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { self } from '../user/services/user.services';
import { ReportFormData } from './report.validation';
import { ReportFormDataConfig } from './reportconfig';

export const ReportForm = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((store) => store.userData);
	const userProfile = useAppSelector((store) => store.userProfileData);
	const navigate = useAppNavigate();
	const [search] = useSearchParams();
	const [collections, setCollections] = useState<any[]>([]);
	const [items, setItems] = useState<any[]>([]);
	const [userItems, setUserItems] = useState<Array<any>>([]);
	const [advert, setAdvert] = useState<any>();
	const [request, setRequest] = useState<any>();
	const form = useForm<ReportFormData>({
		resolver: zodResolver(ReportFormDataConfig.schema),
		defaultValues: ReportFormDataConfig.defaultValues,
	});
	const { formState } = form;

	const getReportTypes = async () => {
		try {
			const response = await fetchApi.api.userreporttypesList();

			if (response.status === 200) {
				setItems(
					response.data.map((ct) => ({
						label: ct.title!,
						value: ct.id!,
					})),
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
	const getCollections = async () => {
		try {
			console.log(request);
			const response = await fetchApi.api.collectionsList({
				owner_id: !!search.get('advId') ? advert.owner_id : request.user_id,
				isPublic: true,
			});
			if (response.status === 200) {
				setCollections(response.data.rows);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};
	useEffect(() => {
		const uniqueItems = collections.flatMap((row) =>
			row.collectionitems.map((collectionIte: any) => ({
				value: collectionIte.item.id,
				label: collectionIte.item.title,
				image: collectionIte.item.photo,
			})),
		);
		setUserItems(uniqueItems);
	}, [collections]);
	const getExch = async () => {
		try {
			const response = await fetchApi.api.exchangeList();

			if (response.status === 200) {
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const getAdvert = async () => {
		try {
			const response = await fetchApi.api.itemadvertisementsDetail(search.get('advId')!);
			if (response.status === 200) {
				setAdvert(response.data);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const getRequest = async () => {
		try {
			const response = await fetchApi.api.itemrequestsDetail(search.get('reqId')!);
			if (response.status === 200) {
				setRequest(response.data);
			} else if (response.status === 401) {
				toast.error('Не авторизован');
			} else {
				toast.error('Ошибка:' + response.statusText);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	useEffect(() => {
		getCollections();
		getReportTypes();
		getExch();
	}, [search]);

	const onSubmit = async () => {
		try {
			let response;
			response = await fetchApi.api.userreportsCreate({
				reporter_id: userData.data.id,
				user_id: search.get('user_id')!,
				report_text: form.watch('report_text'),
				report_date: new Date(),
				report_type_id: form.watch('type_id'),
			});
			if (response) {
				if (response.status === 200) {
					navigate('');
					dispatch(self());
					toast.success('Жалоба отправлена');
				} else if (response.status === 401) {
					toast.error('Не авторизован');
				} else {
					toast.error('Ошибка:' + response.statusText);
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			}
		}
	};

	return (
		<form className="flex w-fit flex-col self-center" onSubmit={form.handleSubmit(onSubmit)}>
			<div className="flex h-fit flex-col gap-[24px] bg-primary-brown">
				<FormElementLabel className="text-primary-sand">
					{formState.errors.type_id?.message || 'Тип жалобы'}
				</FormElementLabel>
				<div className="flex w-fit gap-[10px] self-start">
					<Select
						options={items}
						isDisabled={!!search.get('advId')}
						className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							form.setValue('type_id', value?.value!);
						}}
						classNames={{
							control: () => 'rounded-[10px]  h-[40px] bg-primary-sand border-none',
							menu: () =>
								'rounded-[10px] max-h-[200px] overflow-auto bg-primary-sand',
							menuList: () =>
								'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
							container: () => 'rounded-[10px] h-[40px] bg-primary-sand border-none',
						}}
					/>
				</div>
				<FormElementLabel className="text-primary-sand">
					{formState.errors.report_text?.message || 'Текс жалобы'}
				</FormElementLabel>
				<textarea
					maxLength={400}
					placeholder="Введите описание"
					{...form.register('report_text')}
					className="max-w-[500px] rounded-lg bg-primary-sand p-[20px] text-start text-black"
				/>
			</div>
			<Button variant="primary" type="submit" className="mt-[100px] h-[36px]">
				Предложить
			</Button>
		</form>
	);
};

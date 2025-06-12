import { fetchApi } from '@api-gen';
import { Button, FormElementLabel, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { self } from '../user/services/user.services';
import { ExFormDataConfig } from './exchange.config';
import { ExFormData } from './exchange.validation';

export const ExchangeForm = () => {
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
	const form = useForm<ExFormData>({
		resolver: zodResolver(ExFormDataConfig.schema),
		defaultValues: ExFormDataConfig.defaultValues,
	});
	const { formState } = form;

	const getItems = async (user_id: string, name?: string) => {
		try {
			const response = await fetchApi.api.itemsList({ owner_id: user_id, name: name });

			if (response.status === 200) {
				setItems(
					response.data.map((ct) => ({
						label: ct.title!,
						value: ct.id!,
						image: ct.photo,
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
		getItems(userData.data.id);
		if (search.get('reqId')) {
			getRequest();
		} else {
			form.setValue('second_item_id', '123');
			getAdvert();
		}
		getExch();
	}, [search]);

	useEffect(() => {
		getCollections();
		if (advert) {
			search.get('advId') && form.setValue('second_item_id', advert.item.id);
		}
	}, [advert, request]);

	const onSubmit = async () => {
		try {
			let response;
			response = await fetchApi.api.exchangeCreate({
				exch_item_id: form.watch('second_item_id'),
				proposal_item_id: form.watch('item_id'),
				owner_id: search.get('advId') ? advert.owner_id : request.user_id,
				user_id: userData.data.id,
			});
			if (response) {
				if (response.status === 200) {
					dispatch(self());
					toast.success('Предложение отправлено');
					window.history.back();
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
					{formState.errors.second_item_id?.message || 'Предмет пользователя'}
				</FormElementLabel>
				<div className="flex w-fit gap-[10px] self-start">
					{userItems.length &&
						userItems.find(
							(item: any) => item.value === form.watch('second_item_id'),
						) &&
						(userItems &&
						userItems.find((item: any) => item.value === form.watch('second_item_id'))
							.image ? (
							<img
								className={twMerge('size-[100px] rounded-[15px] object-cover')}
								src={
									userItems.find(
										(item: any) => item.value === form.watch('second_item_id'),
									).image
								}
								alt="Item profile"
							/>
						) : (
							<div
								className={
									'size-[100px] rounded-[15px] bg-primary-sand object-cover'
								}
							></div>
						))}
					{!search.get('advId') ? (
						<Select
							options={userItems}
							isDisabled={!!search.get('advId')}
							className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
							onChange={(value) => {
								form.setValue('second_item_id', value?.value!);
							}}
							classNames={{
								control: () =>
									'rounded-[10px]  h-[40px] bg-primary-sand border-none',
								menu: () =>
									'rounded-[10px] max-h-[200px] overflow-auto bg-primary-sand',
								menuList: () =>
									'rounded-[10px] text-primary-brown absolute bg-primary-sand border-none',
								container: () =>
									'rounded-[10px] h-[40px] bg-primary-sand border-none',
							}}
						/>
					) : (
						<p>
							{userItems.find(
								(item: any) => item.value === form.watch('second_item_id'),
							)
								? userItems.find(
										(item: any) => item.value === form.watch('second_item_id'),
									).label
								: ''}
						</p>
					)}
				</div>
			</div>
			<div className="flex h-fit flex-col gap-[24px] self-center bg-primary-brown">
				<FormElementLabel className="text-primary-sand">
					{formState.errors.item_id?.message || 'Предмет для обмена'}
				</FormElementLabel>
				<div className="flex w-fit gap-[10px] self-start">
					<Select
						options={items}
						className="w-[300px] rounded-[10px] border border-gray-300 bg-primary-sand"
						onChange={(value) => {
							form.setValue('item_id', value?.value!);
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
					{items.length &&
						items.find((item: any) => item.value === form.watch('item_id')) &&
						(items &&
						items.find((item: any) => item.value === form.watch('item_id')).image ? (
							<img
								className={twMerge('size-[100px] rounded-[15px] object-cover')}
								src={
									items.find((item: any) => item.value === form.watch('item_id'))
										.image
								}
								alt="Item profile"
							/>
						) : (
							<div
								className={
									'size-[100px] rounded-[15px] bg-primary-sand object-cover'
								}
							></div>
						))}
				</div>
			</div>
			<Button variant="primary" type="submit" className="mt-[100px] h-[36px]">
				Предложить
			</Button>
		</form>
	);
};

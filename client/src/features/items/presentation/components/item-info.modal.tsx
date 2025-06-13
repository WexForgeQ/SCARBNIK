import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useEffect, useRef, useState } from 'react';

import { fetchApi } from '@api-gen';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ModalProps } from '../../../auth';

const formatTextToHtml = (text: string) => {
	return text
		.split('\n\n') // Разбиваем на абзацы
		.map(
			(paragraph) => `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`, // Поддержка внутренних переносов строк
		)
		.join('');
};

export const ItemInfoModal = ({ isOpen, isEditMode = false, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);
	const [loading, setLoading] = useState(true);
	const [search] = useSearchParams();
	const [info, setInfo] = useState<any>();

	const getItemInfo = async () => {
		setLoading(true);
		const response = await fetchApi.api.itemInfo(search.get('itemId')!);
		if (response.status === 200) {
			console.log(response.data);
			setInfo(response.data);
		} else if (response.status === 401) {
			toast.error('Не авторизован');
		} else {
			toast.error('Ошибка:' + response.statusText);
		}
		setLoading(false);
	};

	const onClose = () => {
		window.history.back();
	};

	useEffect(() => {
		if (search.get('itemId')) getItemInfo();
	}, [search]);

	return (
		<Modal
			headerTitle={'Информация о предмете'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			{loading ? (
				'Загрузка...'
			) : (
				<div
					dangerouslySetInnerHTML={{
						__html: formatTextToHtml(info),
					}}
				/>
			)}
		</Modal>
	);
};

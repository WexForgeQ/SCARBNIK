import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';

import { ModalProps } from '../../../auth';
import { ItemForm } from './item.form';

export const EditItemModal = ({ isOpen, isEditMode, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const handleConfirm = () => {
		formRef.current?.handleSubmit();
	};

	const onClose = () => {
		navigate('/my-items', { id: userData.data.id });
		getData();
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать предмет' : 'Создать предмет'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<ItemForm />
		</Modal>
	);
};

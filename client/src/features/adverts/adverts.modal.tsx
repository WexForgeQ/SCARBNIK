import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';
import { ModalProps } from '../auth';
import { AdvForm } from './adverts.form';

export const EditAdvertsModal = ({ isOpen, isEditMode, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const onClose = () => {
		navigate('/advertisements');
		getData();
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать объявление' : 'Создать объявление'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<AdvForm />
		</Modal>
	);
};

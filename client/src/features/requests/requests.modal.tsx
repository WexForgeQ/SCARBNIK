import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';
import { ModalProps } from '../auth';
import { RequestForm } from './requests.form';

export const EditRequestsModal = ({ isOpen, isEditMode, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const onClose = () => {
		navigate('/requests');
		getData();
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать запрос' : 'Создать запрос'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<RequestForm />
		</Modal>
	);
};

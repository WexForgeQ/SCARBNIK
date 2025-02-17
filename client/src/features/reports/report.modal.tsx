import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';
import { ModalProps } from '../auth';
import { ReportForm } from './report.form';

export const ReportModal = ({ isOpen, isEditMode, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const onClose = () => {
		navigate('');
		getData();
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать запрос' : 'Отправить жалобу'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<ReportForm />
		</Modal>
	);
};

import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';

import { ModalProps } from '../../../auth';
import { ProfileForm } from '../forms/profile.form.component';

export const EditProfileModal = ({ isOpen, isEditMode }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const handleConfirm = () => {
		formRef.current?.handleSubmit();
	};

	const onClose = () => {
		navigate('/profile', { id: userData.data.id });
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать профиль' : 'Создать профиль'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<ProfileForm />
		</Modal>
	);
};

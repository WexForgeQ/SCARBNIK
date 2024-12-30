import { FormHandler, Modal, useAppNavigate, useAppSelector } from '@core';
import { useRef } from 'react';

import { ModalProps } from '../../../auth';
import { CollectionForm } from './collections.form';

export const EditCollectionModal = ({ isOpen, isEditMode, getData }: ModalProps) => {
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const formRef = useRef<FormHandler>(null);

	const onClose = () => {
		navigate('/my-collections', { id: userData.data.id });
		getData();
	};

	return (
		<Modal
			headerTitle={isEditMode ? 'Редактировать коллекцию' : 'Создать коллекцию'}
			onClose={onClose}
			className="bg-primary-darkBrown text-primary-sand"
			isOpen={isOpen}
		>
			<CollectionForm />
		</Modal>
	);
};

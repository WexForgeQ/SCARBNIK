import { fetchApi } from '@api-gen';
import { Button, formatDate, Separator, useAppDispatch, useAppSelector } from '@core';
import React, { useState } from 'react';

export const ProfileScreen = () => {
	const dispatch = useAppDispatch();
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const response = await fetchApi.api.userprofilesUploadImageCreate({
				image: file,
				userId: userData.data.id,
			});
		}
	};

	return (
		<div className="flex w-full justify-center py-[50px]">
			<div className="flex w-[700px] flex-col justify-center self-center">
				<div className="flex h-[50px] w-fit flex-row items-center rounded-t-[10px] bg-primary-sand px-[20px] font-bold">
					Профиль пользователя: {userData.data.login}
				</div>
				<div className="flex h-[400px] w-full flex-col items-center rounded-b-[10px] rounded-tr-[10px] bg-primary-green px-[50px]">
					<div className="flex flex-row gap-5">
						<div className="flex flex-col items-center py-[20px]">
							<img
								className="w-48 rounded-full"
								src={userProfileData.data.photo}
								alt="User profile"
							/>
							<p>Изменить фото профиля:</p>
							<input type="file" onChange={handlePhotoUpload} />
						</div>
						<div className="flex flex-col gap-[10px] py-[20px] text-[20px]">
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Ф.И.О:</p>
								<p className="font-bold">{userProfileData.data.fio}</p>
							</div>
							<Separator className="border-primary-darkBrown" />
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Номер телефона:</p>
								<p className="font-bold">{userProfileData.data.phone}</p>
							</div>
							<Separator className="border-primary-darkBrown" />
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Дата регистрации:</p>
								<p className="font-bold">
									{formatDate(String(userProfileData.data.registration_date))}
								</p>
							</div>
							<Separator className="border-primary-darkBrown" />
						</div>
					</div>
					<Button variant="primary" className="w-[300px] bg-primary-darkBrown">
						Редактировать профиль
					</Button>
				</div>
			</div>
		</div>
	);
};

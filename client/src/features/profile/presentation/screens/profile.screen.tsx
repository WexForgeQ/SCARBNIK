import { fetchApi } from '@api-gen';
import {
	Button,
	formatDate,
	Separator,
	useAppDispatch,
	useAppNavigate,
	useAppSelector,
} from '@core';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { self } from '../../../user/services/user.services';
import { getUserProfile } from '../../services/user-profile.services';
import { EditProfileModal } from '../modals/profile-edit.modal';

export const ProfileScreen = () => {
	const dispatch = useAppDispatch();
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);

	const navigate = useAppNavigate();

	const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.files && e.target.files[0]) {
				const file = e.target.files[0];
				const response = await fetchApi.api.userprofilesUploadImageCreate({
					image: file,
					userId: userData.data.id,
				});
				if (response.status === 200) {
					dispatch(getUserProfile(userData.data.id));
					console.log(userProfileData);
					dispatch(self());
				} else {
					toast.error(response.data.message);
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			}
		}
	};
	useEffect(() => {
		dispatch(getUserProfile(userData.data.id));
	}, [userData.data.id]);
	const [search] = useSearchParams();

	return (
		<div className="flex w-full justify-center py-[50px]">
			<div className="flex w-fit flex-col justify-center self-center">
				<div className="flex h-[50px] w-fit flex-row items-center rounded-t-[10px] bg-primary-sand px-[20px] font-bold">
					Профиль пользователя: {userData.data.login}
				</div>
				<div className="flex h-fit w-full flex-col items-center rounded-b-[10px] rounded-tr-[10px] bg-primary-green px-[50px] py-20">
					<div className="flex flex-row gap-5">
						<div className="flex flex-col items-center py-[20px]">
							<img
								className="h-[200px] w-[200px] rounded-[15px] object-cover"
								src={userData.data.userprofile.photo}
								alt="User profile"
							/>
							<p>Изменить фото профиля:</p>
							<input
								type="file"
								accept=".jpg, .jpeg, .png"
								onChange={handlePhotoUpload}
							/>
						</div>
						<div className="flex flex-col gap-[10px] py-[20px] text-[20px]">
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Логин:</p>
								<p className="font-bold">{userData.data.login}</p>
							</div>
							<Separator className="border-primary-darkBrown" />
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Ф.И.О:</p>
								<p className="font-bold">{userProfileData.data.fio}</p>
							</div>
							<Separator className="border-primary-darkBrown" />
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">E-mail:</p>
								<p className="font-bold">{userData.data.email}</p>
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
					<Button
						variant="primary"
						onClick={() => navigate('/profile', { id: userData.data.id, modal: true })}
						className="w-[300px] bg-primary-darkBrown"
					>
						Редактировать профиль
					</Button>
				</div>
			</div>

			<EditProfileModal getData={null} isOpen={!!search.get('modal')} isEditMode={true} />
		</div>
	);
};

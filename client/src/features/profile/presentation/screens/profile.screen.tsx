import { useAppDispatch, useAppSelector } from '@core';

export const ProfileScreen = () => {
	const dispatch = useAppDispatch();
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const userData = useAppSelector((store) => store.userData);
	console.log(userProfileData);
	return (
		<div className="flex w-full justify-center py-[50px]">
			<div className="flex w-[700px] flex-col justify-center self-center">
				<div className="flex h-[50px] w-fit flex-row items-center rounded-t-[10px] bg-primary-sand px-[20px] font-bold">
					Профиль пользователя: {userData.data.login}
				</div>
				<div className="flex h-[500px] w-full flex-col rounded-b-[10px] rounded-tr-[10px] bg-primary-green px-[50px]">
					<div className="flex flex-row gap-20">
						<div className="flex flex-col py-[20px]">
							<img
								className="w-[200px] rounded-full"
								src={userProfileData.data.photo}
							/>
						</div>
						<div className="flex flex-col py-[20px]">
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Ф.И.О:</p>
								<p className="font-bold">{userProfileData.data.fio}</p>
							</div>
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Номер телефона:</p>
								<p className="font-bold">{userProfileData.data.phone}</p>
							</div>
							<div className="flex flex-row gap-[10px]">
								<p className="font-bold">Дата регистрации:</p>
								<p className="font-bold">
									{String(userProfileData.data.registration_date)}
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-row">Профиль пользователя: {userData.data.login}</div>
				</div>
			</div>
		</div>
	);
};

import { APP_ROUTES, Button, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { useEffect, useState } from 'react';
import { ImExit } from 'react-icons/im';
import { AUTH_ROUTES, logout } from '../../../../auth';
import { PROFILE_ROUTES } from '../../../../profile/constants/routes/profile-routes';
import { getUserProfile } from '../../../../profile/services/user-profile.services';
import { self } from '../../../../user/services/user.services';

export const LogoutHeader = () => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const userData = useAppSelector((store) => store.userData);
	const userProfileData = useAppSelector((store) => store.userProfileData);
	const logoutHandler = () => {
		dispatch(logout()).then(() => {
			dispatch(self());
		});
	};
	useEffect(() => {
		if (userData.data.id) dispatch(getUserProfile(userData.data.id));
	}, [userData.data.id]);

	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const onProfileClick = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};

	return (
		<div className="flex flex-row items-center gap-[21px]">
			{userData.data.id ? (
				<div className="flex items-center gap-2">
					<p className="text-sm font-normal leading-5 tracking-tight text-primary-green">
						{userData.data.login}
					</p>
					<div onClick={onProfileClick} className="relative">
						<div className="border-1 h-[50px] w-[50px] overflow-hidden rounded-full">
							<img
								className="h-full w-full object-cover"
								alt={userData.data.login}
								src={userData.data.userprofile.photo}
							/>
							{isDropdownVisible && (
								<div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-primary-sand shadow-lg">
									<ul>
										<li
											className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
											onClick={() =>
												navigate('/' + PROFILE_ROUTES.profile.route, {
													id: userData.data.id,
												})
											}
										>
											Профиль
										</li>
										<li
											className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
											onClick={() => navigate('/my-collections')}
										>
											Мои коллекции
										</li>
										<li
											className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
											onClick={() =>
												navigate('/my-items', { id: userData.data.id })
											}
										>
											Мои предметы
										</li>
										<li
											className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
											onClick={() => navigate('/favorites')}
										>
											Избранное
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>

					<div
						className="relative size-[32px] cursor-pointer rounded-lg border border-solid border-primary-green"
						onClick={logoutHandler}
					>
						<ImExit className="absolute left-[6px] top-[6px] size-[20px] text-primary-green hover:text-primary-sand" />
					</div>
				</div>
			) : (
				<Button
					variant="primary"
					className="flex items-center bg-primary-green hover:bg-primary-sand"
					onClick={() => navigate(APP_ROUTES.auth.route + '/' + AUTH_ROUTES.login.route)}
				>
					<div className="flex items-center justify-center">
						<p className="text-center text-[15px] text-black">Войти</p>
					</div>
				</Button>
			)}
		</div>
	);
};

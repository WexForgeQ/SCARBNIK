import { APP_ROUTES, Button, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { useEffect } from 'react';
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
		dispatch(getUserProfile(userData.data.id));
	}, [userData.data.id]);
	console.log(userProfileData);
	return (
		<div className="flex flex-row items-center gap-[21px]">
			{userData.data.id ? (
				<div className="flex items-center gap-2">
					<p className="text-sm font-normal leading-5 tracking-tight text-primary-green">
						{userData.data.login}
					</p>
					<div className="border-1 h-[50px] w-[50px] overflow-hidden rounded-full">
						<img
							onClick={() => navigate('/' + PROFILE_ROUTES.profile.route)}
							className="h-full w-full object-cover"
							alt={userData.data.login}
							src={userData.data.userprofile.photo}
						/>
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

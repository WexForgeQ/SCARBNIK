import { APP_ROUTES, Button, useAppDispatch, useAppNavigate, useAppSelector } from '@core';
import { ImExit } from 'react-icons/im';
import { AUTH_ROUTES, logout } from '../../../../auth';
import { self } from '../../../../user/services/user.services';

export const LogoutHeader = () => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const authData = useAppSelector((store) => store.authData);
	const userData = useAppSelector((store) => store.userData);

	const logoutHandler = () => {
		dispatch(logout()).then(() => {
			dispatch(self());
		});
	};

	return (
		<div className="flex flex-row items-center gap-[21px]">
			<p className="text-sm font-normal leading-5 tracking-tight text-primary-green">
				{userData.data.login}
			</p>

			{userData.data.id ? (
				<div
					className="relative size-[32px] cursor-pointer rounded-lg border border-solid border-primary-green"
					onClick={logoutHandler}
				>
					<ImExit className="absolute left-[6px] top-[6px] size-[20px] text-primary-green hover:text-primary-sand" />
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

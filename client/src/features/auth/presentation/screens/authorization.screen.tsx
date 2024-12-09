import { Outlet } from 'react-router-dom';

export const AuthorizationScreen = () => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-primary-brown">
			<div className="flex min-h-screen items-center justify-center pt-[40px]">
				<Outlet />
			</div>
		</div>
	);
};

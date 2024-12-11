import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthorizationScreen = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (window.location.pathname === '/auth' || '/auth/') {
			navigate('/auth/login');
		}
	}, []);

	return (
		<div className="flex min-h-screen w-full flex-col bg-primary-brown">
			<div className="flex min-h-screen items-center justify-center pt-[40px]">
				<Outlet />
			</div>
		</div>
	);
};

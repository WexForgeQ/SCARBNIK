import { useAppDispatch, useAppSelector } from '@core';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { self } from '../../../user/services/user.services';
import { Footer, LandingHeader } from '../components';

export const LandingScreen = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (window.location.pathname === '/' || '/') {
			navigate('/home');
		}
		dispatch(self());
	}, []);
	const userData = useAppSelector((store) => store.userData);
	return (
		<div className="flex h-screen w-screen flex-col overflow-auto">
			<LandingHeader />
			<div className="flex flex-1 flex-row">
				<div className="flex flex-1 justify-center bg-primary-brown px-[200px] py-[50px]">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

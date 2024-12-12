import { Outlet } from 'react-router-dom';
import { Footer, LandingHeader } from '../components';

export const LandingScreen = () => {
	return (
		<div className="flex h-screen w-screen flex-col overflow-auto">
			<LandingHeader />
			<div className="flex flex-1 flex-row">
				<div className="flex flex-1 bg-primary-brown px-[200px] pt-[30px]">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

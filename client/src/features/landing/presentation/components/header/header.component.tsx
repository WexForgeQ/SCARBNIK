import { LogoTextIcon } from '@core';
import { useLocation } from 'react-router-dom';
import { LandingNav } from './landing-nav.component';
import { LogoutHeader } from './logout-header.component';

export const LandingHeader = () => {
	const location = useLocation();

	return (
		<header className="flex w-full flex-row items-center justify-between bg-primary-darkBrown px-[25px] pb-[6px]">
			<div className="flex flex-row items-center justify-center gap-[12px]">
				<LogoTextIcon className="h-[64px] w-[170px]" />
			</div>
			<LandingNav />
			<LogoutHeader />
		</header>
	);
};

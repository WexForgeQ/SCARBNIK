import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderNavItem } from './header-nav-item.component';

export const LandingNav = () => {
	const [currentSectionId, setCurrentSectionId] = useState<string>('');
	const navigate = useNavigate();
	useEffect(() => {
		//scrollto
	}, [currentSectionId]);

	return (
		<div className="flex flex-1 justify-center">
			<div className="text-primary- flex flex-row items-center gap-[30px]">
				<HeaderNavItem
					clickCallback={() => navigate('/home')}
					text={'Главная'}
					isSelected={location.pathname === '/home'}
					id=""
				/>
				<HeaderNavItem
					clickCallback={() => navigate('/orders')}
					text={'Заказы'}
					isSelected={location.pathname === '/orders   '}
					id=""
				/>
				<HeaderNavItem
					clickCallback={() => navigate('/home')}
					text={'Объявления'}
					isSelected={currentSectionId === 'some_id'}
					id=""
				/>
				<HeaderNavItem
					clickCallback={() => navigate('/home')}
					text={'Мои коллекции'}
					isSelected={currentSectionId === 'some_id'}
					id=""
				/>
			</div>
		</div>
	);
};

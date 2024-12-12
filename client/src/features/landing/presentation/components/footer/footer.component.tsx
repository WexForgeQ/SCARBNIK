import { LogoTextIcon } from '@core';
import { useNavigate } from 'react-router-dom';
import { FooterNavItem } from './footer-nav-item.component';

export const Footer = () => {
	const navigate = useNavigate();
	return (
		<div className="flex-10 flex min-h-[300px] justify-between bg-primary-darkBrown px-10">
			<div className="flex flex-row items-center justify-center gap-[12px]">
				<LogoTextIcon className="h-[64px] w-[170px]" />
			</div>
			<div className="flex-end flex flex-col items-start justify-center gap-[30px] text-primary-green">
				<FooterNavItem
					clickCallback={() => navigate('/home')}
					text={'Главная'}
					isSelected={location.pathname === '/home'}
					id=""
				/>
				<FooterNavItem
					clickCallback={() => navigate('/orders')}
					text={'Заказы'}
					isSelected={location.pathname === '/orders   '}
					id=""
				/>
				<FooterNavItem
					clickCallback={() => navigate('/home')}
					text={'Объявления'}
					isSelected={location.pathname === '/orders   '}
					id=""
				/>
				<FooterNavItem
					clickCallback={() => navigate('/home')}
					text={'Мои коллекции'}
					isSelected={location.pathname === '/orders   '}
					id=""
				/>
			</div>
			<div className="flex-end flex flex-col justify-center">
				<p className="w-fit text-center text-[20px] font-[1000] text-primary-green">
					Контакты:
				</p>
				<p className="w-fit text-center text-[20px] font-[1000] text-primary-sand">
					МТС: +375(33)123-33-33
				</p>
				<p className="w-fit text-center text-[20px] font-[1000] text-primary-sand">
					gmail: scarbnikhelp@gmail.com
				</p>
				<p className="mt-[20px] w-fit text-center text-[20px] font-[1000] text-primary-green">
					Адрес:
				</p>
				<p className="w-fit text-center text-[20px] font-[1000] text-primary-sand">
					Минск, ул. Пушкина, д. 100, офис 1004
				</p>
			</div>
		</div>
	);
};

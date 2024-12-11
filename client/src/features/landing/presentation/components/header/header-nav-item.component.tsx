import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNavItemProps {
	clickCallback: () => void;
	isSelected: boolean;
	text: string;
	id: string;
}

export const HeaderNavItem = memo(({ clickCallback, isSelected, text, id }: HeaderNavItemProps) => {
	return (
		<p
			className={twMerge(
				'cursor-pointer text-xl font-medium',
				!isSelected ? 'text-primary-green' : 'text-primary-sand',
			)}
			onClick={() => clickCallback()}
		>
			{text}
		</p>
	);
});

HeaderNavItem.displayName = 'HeaderNavItem';

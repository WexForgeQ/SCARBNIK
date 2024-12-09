import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { SidebarItemProps } from '../../../types';

export const SidebarListItem = memo((props: SidebarItemProps) => {
	return (
		<div
			className={twMerge(
				'tracking-tigh flex cursor-pointer bg-transparent py-[14px] pl-[60px] font-sans text-sm font-normal leading-5 text-[#6F7276]',
				props.isSelected
					? 'border-primary text-primary border-r-[2px] border-solid bg-[#EDF2FA]'
					: '',
			)}
			id={props.id}
			onClick={() => props.setId(props.id)}
		>
			{props.label}
		</div>
	);
});

SidebarListItem.displayName = 'SidebarListItem';

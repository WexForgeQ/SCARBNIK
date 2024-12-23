import { twMerge } from 'tailwind-merge';

interface SeparatorProps {
	text?: string;
	className?: string;
	textclassName?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ text, className, textclassName }) => {
	return (
		<div className="my-4 flex items-center">
			<div className={twMerge('flex-grow border-t border-gray-300', className)} />
			{text && (
				<span className={twMerge('mx-2 font-semibold text-gray-700', className)}>
					{text}
				</span>
			)}
			<div className={twMerge('flex-grow border-t border-gray-300', className)} />
		</div>
	);
};

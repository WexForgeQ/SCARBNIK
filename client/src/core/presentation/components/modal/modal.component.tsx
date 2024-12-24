import type { MotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { Separator } from '../separator/separator';

export interface ModalProps extends PropsWithChildren<MotionProps> {
	headerTitle: string;
	isOpen: boolean;
	onClose: () => void;
	Footer?: () => JSX.Element;
	staticMode?: boolean;
	className?: string;
	contentClassName?: string;
	HeaderButton?: JSX.Element;
}

export const Modal = ({
	isOpen,
	headerTitle,
	HeaderButton,
	Footer,
	onClose,
	staticMode,
	children,
	className,
	contentClassName,
	...props
}: ModalProps) => {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
							ease: 'easeIn',
						}}
						onMouseDown={(e) => e.nativeEvent.stopImmediatePropagation()}
						key="modal-root"
						className="fixed inset-0 z-20 bg-black/40 transition-opacity"
						{...props}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-30 flex items-center justify-center">
						<motion.div
							id="modal-content"
							className={twMerge(
								'relative flex transform flex-col rounded-xl bg-primary-darkBrown shadow',
								'max-h-[98%] w-[90%] min-w-72 max-w-5xl md:w-[40rem]',
								className,
							)}
							initial={{ y: 50, scale: 0.95, opacity: 0.5 }}
							animate={{ y: 0, scale: 1, opacity: 1 }}
							exit={{ y: 50, scale: 0.95, opacity: 0 }}
							key="modal-content"
						>
							<div className="flex flex-row justify-between px-6 pt-4">
								<h3 className="p-semibold-18 line-clamp-2">{headerTitle}</h3>
								<div
									className={twMerge(
										Boolean(HeaderButton) &&
											'flex items-center justify-center gap-1',
									)}
								>
									{HeaderButton}
									<IoCloseOutline
										className="ml-2 h-6 w-6 shrink-0 cursor-pointer"
										onClick={onClose}
									/>
								</div>
							</div>
							<Separator />
							<div
								id="modal-body"
								className={twMerge(
									`p-semibold-16 flex max-h-[80vh] w-full flex-col overflow-hidden overflow-y-auto overflow-x-hidden rounded-xl bg-primary-brown p-4 px-6 py-4`,
									contentClassName,
								)}
							>
								{children}
							</div>
							{Footer && <Footer />}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
};

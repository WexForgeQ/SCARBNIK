import { CheckIcon, LogoTextIcon } from '@core';

export const EmailVerificationPage = () => {
	return (
		<div className="flex w-[508px] flex-col gap-[23px] rounded-[12px] border border-primary-darkBrown bg-primary-darkBrown px-[32px] py-[23px]">
			<div className="flex h-[64px] flex-row items-center justify-center gap-[10px]">
				<LogoTextIcon />
			</div>
			<div className="flex flex-col items-center gap-[20px]">
				<CheckIcon className="h-[200px] w-[200px]" />
			</div>
			<div className="flex flex-col items-center text-[30px] text-primary-green">
				<p>Успешная регистрация!</p>
				<p>Это окно можно закрыть</p>
			</div>
		</div>
	);
};

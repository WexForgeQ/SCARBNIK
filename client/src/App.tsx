import { Toaster } from 'sonner';
import { AppRouter } from './router/app-router';

export const App = () => {
	return (
		<>
			<AppRouter />
			<Toaster
				richColors
				closeButton
				toastOptions={{
					duration: 8000,
				}}
			/>
		</>
	);
};

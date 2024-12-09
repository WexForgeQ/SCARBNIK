import { EmailVerificationPage, LoginPage, RegistrationPage } from '../../presentation';

export const AUTH_ROUTES = {
	login: {
		route: 'login',
		element: <LoginPage />,
	},
	email_approve: {
		route: 'email-verification',
		element: <EmailVerificationPage />,
	},
	registration: {
		route: 'registration',
		element: <RegistrationPage />,
	},
};

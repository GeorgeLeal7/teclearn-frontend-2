import { createContext, useState } from 'react';
import { setCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import { LoginService } from '../../pages/dashboard/services/api/login/LoginService';

const AuthAdmContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const isAuthenticated = !!user;


	const signIn = ({ email, senha }) => {
		LoginService.login({
			email,
			senha,
		}).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			}
			setCookie(null, 'teclearn.token', result.token, {
				maxAge: 60 * 60 * 1, // 1 hour
			});

			setUser(result.admin);
			window.location.href = '/dashboard/geral';
		});
	};

	return (
		<AuthAdmContext.Provider value={{ user, isAuthenticated, signIn }}>
			{children}
		</AuthAdmContext.Provider>
	);
};

export { AuthAdmContext, AuthProvider };

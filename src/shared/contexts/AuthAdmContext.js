import { createContext, useState } from 'react';
import { setCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import { LoginService } from '../../pages/dashboard/services/api/login/LoginService';

const AuthAdmContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
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
			setCookie(null, 'primeiroAcesso', result.usuario.primeiroAcesso, {
				maxAge: 60 * 60 * 1, // 1 hour
			});
			setCookie(null, 'idUsuario', result.usuario.idUsuario, {
				maxAge: 60 * 60 * 1, // 1 hour
			});
			console.log(result);
			if (result.usuario.primeiroAcesso) {
				window.location.href = '/dashboard/login/primeiroAcesso';
				console.log(user);
				console.log(result);
				
			} else {
				window.location.href = '/dashboard/geral';
			}

			
			
		});
	};

	return (
		<AuthAdmContext.Provider value={{ user, isAuthenticated, signIn }}>
			{children}
		</AuthAdmContext.Provider>
	);
};

export { AuthAdmContext, AuthProvider };
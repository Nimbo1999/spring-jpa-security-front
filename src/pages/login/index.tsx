import { FC, FormEventHandler } from 'react';
import Head from 'next/head';

import SingleInput from '../../components/input/SingleInput';
import Button from '../../components/button/Button';

import HttpService from '../../services/HttpService';

import API_ROUTES from '../../constants/ApiRoutes';
import LOCAL_STORAGE_KEYS from '../../constants/LocalStorageKeys';

import type { AuthSuccessResponse } from './login.types';

const Login: FC = () => {
    const onSubmitForm: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();
        const { target } = event;
        const formData = new FormData(target as HTMLFormElement);

        const payload = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
        
        const url = API_ROUTES.BASE_URL + API_ROUTES.V1 + API_ROUTES.AUTH;
        const response = await HttpService.post<AuthSuccessResponse>(url, payload);

        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, new Date(response.expiresIn * 1000).toISOString());
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_TYPE, response.tokenType);
    }

    return (
        <div className="login-page">
            <Head>
                <title>Login</title>
            </Head>

            <div className="spacer" />

            <section>
                <main>
                    <h1>Sistema de clientes</h1>
                    <span>Faça seu acesso ao sistema de clientes</span>

                    <form method="POST" onSubmit={onSubmitForm}>
                        <SingleInput
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Usuário"
                        />

                        <SingleInput id="password" name="password" type="password" placeholder="Senha" />

                        <Button type="submit" variant="primary">Confirmar</Button>
                    </form>
                </main>
            </section>
        </div>
    );
}

export default Login;

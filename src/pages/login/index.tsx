import { FC, FormEventHandler, useState } from 'react';
import Head from 'next/head';

import SingleInput from '../../components/input/SingleInput';
import Button from '../../components/button/Button';

import HttpService from '../../services/HttpService';
import HttpRequestError, { FormErrors } from '../../exceptions/HttpRequestError'

import API_ROUTES from '../../constants/ApiRoutes';
import LOCAL_STORAGE_KEYS from '../../constants/LocalStorageKeys';

import type { AuthSuccessResponse, ErrorState } from './login.types';

const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({
        username: [],
        password: []
    });

    const handleHttpResponseError = (err: HttpRequestError): void => {
        if (err.payload && err.payload.status !== 403) {
            const errors: ErrorState = { password: [], username: [] };
            const requestError: FormErrors = err.payload.content as FormErrors;

            requestError.errors.map(err => {
                if (err.field === 'password') {
                    return errors.password = err.messages;
                } else if (err.field === 'username') {
                    return errors.username = err.messages;
                }
            });

            setErrors(errors);
        }
    }

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();
        setLoading(true);
        const { target } = event;
        const formData = new FormData(target as HTMLFormElement);

        const payload = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        const url = API_ROUTES.BASE_URL + API_ROUTES.V1 + API_ROUTES.AUTH;
        try {
            const response = await HttpService.post<AuthSuccessResponse>(url, payload);
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES_IN, new Date(response.expiresIn * 1000).toISOString());
            localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_TYPE, response.tokenType);
            setLoading(false);
        } catch (err) {
            if (err instanceof HttpRequestError) {
                handleHttpResponseError(err);
            }

            setLoading(false);
        }
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
                            errors={errors.username}
                            onChange={() => {
                                if (errors.username.length) {
                                    setErrors({ ...errors, username: [] });
                                }
                            }}
                        />

                        <SingleInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            errors={errors.password}
                            onChange={() => {
                                if (errors.password.length) {
                                    setErrors({ ...errors, password: [] });
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                        >
                            Confirmar
                        </Button>
                    </form>
                </main>
            </section>
        </div>
    );
}

export default Login;

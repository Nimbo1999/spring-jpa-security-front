import { FC, FormEventHandler, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import SingleInput from '../../components/input/SingleInput';
import Button from '../../components/button/Button';

import HttpService from '../../services/HttpService';
import CookieService from '../../services/CookieService';

import HttpRequestError, { FormErrors } from '../../exceptions/HttpRequestError';

import API_ROUTES from '../../constants/ApiRoutes';

import type { AuthSuccessResponse, ErrorState } from './login.types';
import RouteConstants from '../../constants/RoutesConstants';
import { GetServerSideProps } from 'next';

const Login: FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({
        username: [],
        password: []
    });

    useEffect(() => {
        const cookie = CookieService.getCookie();
        if (cookie) router.push(RouteConstants.CUSTOMERS);
    }, [loading]);

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
            CookieService.setCookie(response);
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const isAuthenticated = Boolean(req.cookies && req.cookies['app-cookie']);

    return isAuthenticated
    ? ({
        props: {}
    }) : ({
        redirect: {
            destination: RouteConstants.LOGIN,
            permanent: false
        }
    })
}

export default Login;

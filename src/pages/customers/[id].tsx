import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import CreateCustomerForm from '../../components/createCustomerForm/CreateCustomerForm';

import CreateCustomerContext from '../../context/CreateCustomerContext';

import RouteConstants from '../../constants/RoutesConstants';
import PageHeader from '../../components/pageHeader/PageHeader';
import Customer from '../../models/Customer';
import HttpService from '../../services/HttpService';
import API_ROUTES from '../../constants/ApiRoutes';
import { AuthSuccessResponse } from '../../utils/login.types';

const UpdateCustomer: FC<{ customer: Customer }> = ({ customer }) => (
    <div className="customers-page">
        <Head>
            <title>Adicionar cliente</title>
        </Head>

        <PageHeader />

        <section>
            <div className="side-bar" />

            <main>
                <h2>Cadastro de cliente</h2>

                <CreateCustomerContext customer={customer}>
                    <CreateCustomerForm />
                </CreateCustomerContext>
            </main>
        </section>
    </div>
);

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const isAuthenticated = Boolean(req.cookies && req.cookies['app-cookie']);
    const redirect = {
        redirect: {
            destination: RouteConstants.HOME,
            permanent: false
        }
    }

    if (!isAuthenticated) {
        return redirect;
    }

    const { id } = params;
    const customeid = id as string;

    const url = API_ROUTES.BASE_URL +
        API_ROUTES.V1 +
        API_ROUTES.CUSTOMER +
        API_ROUTES.PARAM_URL(customeid);

    const authObject: AuthSuccessResponse = JSON.parse(req.cookies['app-cookie']);

    try {
        const customer: Customer = await HttpService.get(url, authObject);
        return {
            props: {
                customer
            }
        }
    } catch(err) {
        return redirect;
    }
}

export default UpdateCustomer;

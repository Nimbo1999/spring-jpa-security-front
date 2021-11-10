import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import CreateCustomerForm from '../../components/createCustomerForm/CreateCustomerForm';

import RouteConstants from '../../constants/RoutesConstants';
import PageHeader from '../../components/pageHeader/PageHeader';

const CreateCustomer: FC = () => {
    return (
        <div className="customers-page">
            <Head>
                <title>Adicionar cliente</title>
            </Head>

            <PageHeader />

            <section>
                <div className="side-bar" />

                <main>
                    <header className="section-header">
                        <h3>Adicionar cliente</h3>
                        <hr />
                    </header>

                    <CreateCustomerForm />
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
            destination: RouteConstants.HOME,
            permanent: false
        }
    })
}

export default CreateCustomer;

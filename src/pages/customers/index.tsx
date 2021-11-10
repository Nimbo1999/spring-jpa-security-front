import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import PageHeader from '../../components/pageHeader/PageHeader';
import CustomerTable from '../../components/customersTable/CustomerTable';

import RouteConstants from '../../constants/RoutesConstants';

const CustomersPage: FC = () => {
    return (
        <div className="customers-page">
            <Head>
                <title>Customers</title>
            </Head>

            <PageHeader />

            <section>
                <div className="side-bar" />

                <main>
                    <CustomerTable />
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

export default CustomersPage;

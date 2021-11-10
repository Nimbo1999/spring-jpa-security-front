import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import RouteConstants from '../../constants/RoutesConstants';

const CustomersPage: FC = () => {
    return (
        <div>
            <Head>
                <title>Customers</title>
            </Head>
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

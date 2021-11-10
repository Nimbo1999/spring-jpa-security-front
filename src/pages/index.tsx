import { FC } from 'react';
import Head from 'next/head';

import RouteConstants from '../constants/RoutesConstants';

import { GetServerSideProps } from 'next';

const Home: FC = () => (
    <div>
        <Head>
            <title>Home page</title>
        </Head>
    </div>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const isAuthenticated = Boolean(req.cookies && req.cookies['app-cookie']);

    return isAuthenticated
    ? ({
        redirect: {
            destination: RouteConstants.CUSTOMERS.ROOT,
            permanent: false
        }
    }) : ({
        redirect: {
            destination: RouteConstants.LOGIN,
            permanent: false
        }
    })
}

export default Home;

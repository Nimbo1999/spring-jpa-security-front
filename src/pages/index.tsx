import { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import RouteConstants from '../constants/RoutesConstants';

const Home: FC = () => {
    const { replace } = useRouter();

    useEffect(() => {
        replace(RouteConstants.LOGIN);
    });

    return (
        <div>
            <Head>
                <title>Home page</title>
            </Head>
        </div>
    );
};

export default Home;

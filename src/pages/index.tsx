import { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Home: FC = () => {
    const { replace } = useRouter();

    useEffect(() => {
        replace('/login');
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

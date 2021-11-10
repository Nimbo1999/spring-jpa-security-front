import React, { FC } from 'react';

import CustomerContextProvider from '../context/CustomersContext';

import '../styles/main.scss';

const MyApp: FC<{ Component: FC; pageProps: unknown }> = ({
  Component,
  pageProps,
}) => (
    <CustomerContextProvider>
        <Component {...pageProps} />
    </CustomerContextProvider>
);

export default MyApp;

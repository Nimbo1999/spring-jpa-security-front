import React, { FC } from 'react';

import '../styles/main.scss';

const MyApp: FC<{ Component: FC; pageProps: unknown }> = ({
  Component,
  pageProps,
}) => <Component {...pageProps} />;

export default MyApp;

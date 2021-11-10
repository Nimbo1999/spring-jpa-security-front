import { FC } from 'react';

import type { LoaderProps } from './Loader.types';

const Loader:FC<LoaderProps> = ({ color = 'primary', size = 'default' }) => {
    return (
        <div className={['spinner', color, size].join(' ')} />
    );
}

export default Loader;

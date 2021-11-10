import { FC } from 'react';
import { useRouter } from 'next/router';

import Button from '../button/Button';
import RouteConstants from '../../constants/RoutesConstants';

const PageHeader: FC = () => {
    const router = useRouter();

    return (
        <header className="page-header">
            <nav>
                {router.pathname !== RouteConstants.CUSTOMERS.ROOT && (
                    <Button onClick={router.back} type="button">{'<-'}</Button>
                )}

                <h2>App name</h2>
            </nav>

            <Button>
                Sair
            </Button>
        </header>
    );
}

export default PageHeader;

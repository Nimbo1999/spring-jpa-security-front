import { FC } from 'react';
import { useRouter } from 'next/router';

import Arrow from '../../assets/icons/Arrow';
import Button from '../button/Button';
import RouteConstants from '../../constants/RoutesConstants';

const PageHeader: FC = () => {
    const router = useRouter();

    return (
        <header className="page-header">
            <nav>
                {router.pathname !== RouteConstants.CUSTOMERS.ROOT && (
                    <Button onClick={router.back} type="button">
                        <Arrow width={24} height={24} />
                    </Button>
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

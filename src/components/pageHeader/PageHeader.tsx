import { FC } from 'react';
import Button from '../button/Button';

const PageHeader: FC = () => {
    return (
        <header className="page-header">
            <h2>App name</h2>

            <Button>
                Sair
            </Button>
        </header>
    );
}

export default PageHeader;

import { FC } from 'react';

import type { SectionHeaderProps } from './SectionHeader.types';

const SectionHeader: FC<SectionHeaderProps> = ({ children, className = '' }) => {
    return (
        <header className={['section-header', className].join(' ')}>
            <h3>{children}</h3>

            <hr />
        </header>
    );
}

export default SectionHeader;

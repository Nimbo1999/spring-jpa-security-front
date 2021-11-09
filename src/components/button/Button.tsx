import { FC } from 'react';

import type { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({ children, variant = 'primary', type = 'button', ...props }) => {
    return (
        <button type={type} {...props} className={variant}>
            {children}
        </button>
    );
}

export default Button;

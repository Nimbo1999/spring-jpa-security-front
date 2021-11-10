import { FC } from 'react';
import Loader from '../loader/Loader';

import type { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({ children, variant = 'primary', type = 'button', loading = false, disabled, ...props }) => {
    const classes: string[] = [variant];
    if (loading) classes.push('loading');

    return (
        <button type={type} {...props} className={classes.join(' ')} disabled={disabled || loading}>
            {children}

            <div className="button-loading">
                <Loader size="small" color={variant === 'primary' ? 'white' : 'primary'} />
            </div>
            {/* {loading && (
                <Loader size="small" color={variant === 'primary' ? 'white' : 'primary'} />
            )} */}
        </button>
    );
}

export default Button;

import { FC } from 'react';

import type { SingleInputProps } from './SingleInput.types';

const SingleInput: FC<SingleInputProps> = ({ errors = [], ...props }) => {
    const classes = ['single-input-wrapper'];
    if (errors.length) classes.push('error');

    return (
        <div className={classes.join(' ')}>
            <input
                {...props}
            />

            {!!errors.length && (
                <ul>
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SingleInput;

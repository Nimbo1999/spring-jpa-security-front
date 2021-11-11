import { FC } from 'react';

import type { SingleSelectProps } from './SingleSelect.types';

const SingleSelect: FC<SingleSelectProps> = ({ options, onChange }) => {
    return (
        <select className="single-select" onChange={onChange}>
            <optgroup label="Tipo do telefone">
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </optgroup>
        </select>
    );
}

export default SingleSelect;

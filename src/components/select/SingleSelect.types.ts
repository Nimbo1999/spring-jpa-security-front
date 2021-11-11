import { InputHTMLAttributes } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

export interface SingleSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[],
}
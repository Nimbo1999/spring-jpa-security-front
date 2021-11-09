import { InputHTMLAttributes } from 'react';

export interface SingleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    errors?: string[]
}
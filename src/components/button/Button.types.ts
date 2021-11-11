import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'danger' | 'success' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean
}
import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}
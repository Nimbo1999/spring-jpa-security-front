import { ChangeEvent } from 'react';
import type { CustomerForm, PhoneNumberForm } from './reducers/CreateCustomerReducer.types';

export interface CreateCustomerContextProps extends CustomerForm {
    getAddressByPostalCode: () => void;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
    onConfirmPhone: (phone:PhoneNumberForm) => void;
    onRemovePhone: (number: string) => void,
    onConfirmEmail: (email: string) => void,
    onRemoveEmail: (email: string) => void,
}

export interface ViaCepResponse {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
}
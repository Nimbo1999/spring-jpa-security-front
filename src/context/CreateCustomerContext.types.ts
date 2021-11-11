import { ChangeEvent, FocusEvent, FormEventHandler } from 'react';
import Email from '../models/Email';
import type { CustomerForm, PhoneNumberForm } from './reducers/CreateCustomerReducer.types';

export interface CreateCustomerContextProps extends CustomerForm {
    getAddressByPostalCode: (event: FocusEvent<HTMLInputElement>) => void;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
    onConfirmPhone: (phone:PhoneNumberForm) => void;
    onRemovePhone: (number: string) => void,
    onConfirmEmail: (email: Email) => void,
    onRemoveEmail: (email: string) => void,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onBlurField: (event: FocusEvent<HTMLInputElement>) => void,
    hasFormErrors: () => boolean,
    errors: object
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
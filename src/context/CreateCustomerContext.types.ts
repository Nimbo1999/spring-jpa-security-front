import { ChangeEvent } from 'react';
import type { CustomerForm } from './reducers/CreateCustomerReducer.tyoes';

export interface CreateCustomerContextProps extends CustomerForm {
    getAddressByPostalCode: () => void;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
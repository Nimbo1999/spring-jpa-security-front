import { Reducer } from 'react';
import type { CustomerForm, ActionTypes } from './CreateCustomerReducer.tyoes';

export const initialState: CustomerForm = {
    name: '',
    cpf: '',
    address: {
        city: '',
        neighborhood: '',
        postalCode: '',
        publicPlace: '',
        uf: '',
        complement: ''
    },
    phones: [],
    emails: []
}

const createCustomerReducer: Reducer<CustomerForm, {type: ActionTypes, payload: any}> = (state, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_NAME':
            return state;

        default:
            return state;
    }
}

export default createCustomerReducer;

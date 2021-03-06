import { Reducer } from 'react';
import Customer from '../../models/Customer';
import Email from '../../models/Email';
import type { ViaCepResponse } from '../CreateCustomerContext.types';
import type { CustomerForm, ActionTypes, AddressForm, PhoneNumberForm } from './CreateCustomerReducer.types';

interface Payload<T> {
    payload: T
}

export const initialState: CustomerForm = {
    id: null,
    name: '',
    cpf: '',
    address: {
        id: null,
        city: '',
        neighborhood: '',
        postalCode: '',
        publicPlace: '',
        uf: '',
        complement: ''
    },
    phones: [],
    emails: [],
    cepFetched: false,
    loading: false
}

const createCustomerReducer: Reducer<CustomerForm, {type: ActionTypes, payload: any}> = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return action.payload as CustomerForm;

        case 'VIACEP_PAYLOAD_ACTION_STARTED': {
            return { ...state, loading: true }
        }

        case 'VIACEP_PAYLOAD_ACTION_SUCCESS': {
            const { payload }: Payload<ViaCepResponse> = action;
            const address:AddressForm = {
                id: state.address.id,
                city: payload.localidade,
                neighborhood: payload.bairro,
                postalCode: payload.cep,
                publicPlace: payload.logradouro,
                uf: payload.uf,
                complement: payload.complemento
            }
            return { ...state, address, cepFetched: true, loading: false };
        }

        case 'ADD_NEW_PHONE_NUMBER': {
            const { payload }: Payload<PhoneNumberForm> = action;

            return {
                ...state,
                phones: [...state.phones, payload]
            }
        }

        case 'REMOVE_PHONE_NUMBER': {
            const { payload }: Payload<string> = action;
            const phones = state.phones.filter(phone => phone.number !== payload);
            return { ...state, phones }
        }

        case 'ADD_EMAIL': {
            const { payload }: Payload<Email> = action;
            return { ...state, emails: [...state.emails, payload] }
        }

        case 'REMOVE_EMAIL': {
            const { payload }: Payload<string> = action;
            const emails = state.emails.filter(email => email.email !== payload);
            return { ...state, emails }
        }

        case 'HYDRATE_CUSTOMER': {
            const { payload }: Payload<Customer> = action;
            return {
                ...state,
                id: payload.id,
                address: payload.address,
                cpf: payload.cpf,
                phones: payload.phones,
                emails: payload.emails,
                name: payload.name,
                cepFetched: true
            }
        }

        default:
            return state;
    }
}

export default createCustomerReducer;

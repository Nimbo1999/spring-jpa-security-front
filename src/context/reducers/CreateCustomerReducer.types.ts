import Address from '../../models/Address';
import PhoneNumber from '../../models/PhoneNumber';

export interface PhoneNumberForm extends Omit<PhoneNumber, 'id'> {}

export interface AddressForm extends Omit<Address, 'id'> {}

export interface CustomerForm {
    name: string;
    cpf: string;
    address: AddressForm;
    phones: PhoneNumberForm[];
    emails: string[],
    cepFetched: boolean,
    loading: boolean
}

export type ActionTypes =
    'UPDATE_STATE' |
    'VIACEP_PAYLOAD_ACTION_STARTED' |
    'VIACEP_PAYLOAD_ACTION_SUCCESS' |
    'ADD_NEW_PHONE_NUMBER' |
    'REMOVE_PHONE_NUMBER' |
    'ADD_EMAIL' |
    'REMOVE_EMAIL';
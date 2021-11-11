import Address from '../../models/Address';
import PhoneNumber from '../../models/PhoneNumber';
import Email from '../../models/Email';

export interface PhoneNumberForm extends PhoneNumber {}

export interface AddressForm extends Address {}

export interface CustomerForm {
    id: number;
    name: string;
    cpf: string;
    address: AddressForm;
    phones: PhoneNumberForm[];
    emails: Email[],
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
    'REMOVE_EMAIL' |
    'HYDRATE_CUSTOMER';
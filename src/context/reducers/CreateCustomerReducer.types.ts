import Address from '../../models/Address';
import PhoneNumber from '../../models/PhoneNumber';

export interface PhoneNumberForm extends Omit<PhoneNumber, 'id'> {}

export interface AddressForm extends Omit<Address, 'id'> {}

export interface CustomerForm {
    name: string;
    cpf: string;
    address: AddressForm;
    phones: PhoneNumberForm[];
    emails: String[],
    cepFetched: boolean
}

export type ActionTypes =
    'UPDATE_STATE' |
    'VIACEP_PAYLOAD_ACTION' |
    'ADD_NEW_PHONE_NUMBER' |
    'REMOVE_PHONE_NUMBER';
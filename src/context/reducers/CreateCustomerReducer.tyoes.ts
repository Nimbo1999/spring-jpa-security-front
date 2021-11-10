import Address from '../../models/Address';
import PhoneNumber from '../../models/PhoneNumber';

interface PhoneNumberForm extends Omit<PhoneNumber, 'id'> {}

interface AddressForm extends Omit<Address, 'id'> {}

export interface CustomerForm {
    name: string;
    cpf: string;
    address: AddressForm;
    phones: PhoneNumberForm[];
    emails: String[]
}

export type ActionTypes = 'SET_CUSTOMER_NAME';
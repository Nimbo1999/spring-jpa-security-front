import Address from './Address';
import Email from './Email';
import PhoneNumber from './PhoneNumber';

interface Customer {
    id: number;
    name: string;
    cpf: string;
    address: Address;
    phones: PhoneNumber[];
    emails: Email[];
}

export default Customer;

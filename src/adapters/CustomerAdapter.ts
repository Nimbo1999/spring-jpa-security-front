import Customer from '../models/Customer';
import type { CustomerTableItem } from '../context/CustomersContext.types';

class CustomerAdapter {

    public static getCustomes(customers: Customer[]): CustomerTableItem[] {
        return customers.map(({ id, name, cpf, address: { city } }) => ({
            id, name, cpf, city
        }));
    }

}

export default CustomerAdapter;

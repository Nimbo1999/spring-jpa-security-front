import User from '../models/User';

export type CustomerList = CustomerTableItem[];

export interface CustomerContextProps {
    getCustomerList: () => Promise<void>;
    onChangePage: (currentPage: number, totalRows: number) => void;
    onChangeRowsPerPage: (currentRowsPerPage: number, currentPage: number) => void;
    onDeleteCustomer: (id: number) => void;
    page: number;
    size: number;
    sortBy: string;
    customerList: CustomerList;
    loading: boolean;
    count: number;
    user: User;
}

export interface CustomerTableItem {
    id: number;
    name: string;
    cpf: string;
    city: string;
}

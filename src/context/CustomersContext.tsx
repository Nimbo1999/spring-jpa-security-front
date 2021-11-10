import { FC, createContext, useContext, useState, useEffect } from 'react';
import API_ROUTES from '../constants/ApiRoutes';

import HttpService from '../services/HttpService';

import Customer from '../models/Customer';
import { CustomerList, CustomerContextProps } from './CustomersContext.types';
import CustomerAdapter from '../adapters/CustomerAdapter';

const CustomerContext = createContext<CustomerContextProps>({
    page: 0,
    getCustomerList: null,
    size: 5,
    sortBy: 'id',
    customerList: [],
    loading: false,
    onChangePage: null,
    onChangeRowsPerPage: null
});

const CustomerContextProvider: FC = ({ children }) => {
    const [customerList, setCustomerList] = useState<CustomerList>([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState('id');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customerList.length) {
            getCustomerList();
        }
    }, [page, size]);

    const getCustomerList = async (): Promise<void> => {
        const url = API_ROUTES.BASE_URL +
        API_ROUTES.V1 +
        API_ROUTES.CUSTOMER +
        API_ROUTES.QUERY_PARAMS({ page, size });

        try {
            const response = await HttpService.get<Customer[]>(url);
            const formattedCustomers = CustomerAdapter.getCustomes([...response]);
            setCustomerList(formattedCustomers);
        } catch (err) {
            // TODO: Add a toasty here!
            console.error(err);
        }
    }

    const onChangePage = (currentPage: number, totalRows: number): void => {
        if (totalRows === size) setPage(currentPage);
    }

    const onChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => setSize(currentRowsPerPage);

    return (
        <CustomerContext.Provider value={{
            getCustomerList,
            onChangePage,
            page,
            size,
            sortBy,
            customerList,
            loading,
            onChangeRowsPerPage
        }}>
            {children}
        </CustomerContext.Provider>
    )
}

const useCustomerContext = () => useContext(CustomerContext);

export { CustomerContextProvider as default, useCustomerContext };

import { FC, createContext, useContext, useState, useEffect } from 'react';
import API_ROUTES from '../constants/ApiRoutes';

import HttpService from '../services/HttpService';

import Customer from '../models/Customer';
import { CustomerList, CustomerContextProps } from './CustomersContext.types';
import CustomerAdapter from '../adapters/CustomerAdapter';
import HttpRequestError from '../exceptions/HttpRequestError';
import CookieService from '../services/CookieService';
import { useRouter } from 'next/router';
import RouteConstants from '../constants/RoutesConstants';
import User from '../models/User';

const CustomerContext = createContext<CustomerContextProps>({
    page: 0,
    getCustomerList: null,
    size: 10,
    sortBy: 'id',
    customerList: [],
    loading: false,
    onChangePage: null,
    onChangeRowsPerPage: null,
    onDeleteCustomer: null,
    count: 0,
    user: null
});

const CustomerContextProvider: FC = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User>(null);
    const [customerList, setCustomerList] = useState<CustomerList>([]);

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy] = useState('id');

    const [loading, setLoading] = useState(false);

    const handleHttpRequestError = () => {
        CookieService.deleteCookie();
        router.replace(RouteConstants.HOME);
    }

    const getUserInfo = async () => {
        const url = API_ROUTES.BASE_URL +
            API_ROUTES.V1 +
            API_ROUTES.USER;

        try {
            const response = await HttpService.get<User>(url);
            setUser(response);
        } catch(err) {
            if (err instanceof HttpRequestError && err.payload) {
                handleHttpRequestError();
            }
        }
    }

    const getCustomerCount = async (): Promise<void> => {
        const url = API_ROUTES.BASE_URL +
            API_ROUTES.V1 +
            API_ROUTES.CUSTOMER +
            API_ROUTES.COUNT;

        try {
            const response = await HttpService.get<{ count: number }>(url);
            setCount(response.count);
            setSize(10);
            setLoading(false);
        } catch(err) {
            if (err instanceof HttpRequestError && err.payload) {
                handleHttpRequestError();
            }
        }
    }

    const getCustomerList = async (callback?: () => void): Promise<void> => {
        setLoading(true);
        setCustomerList([]);
        const url = API_ROUTES.BASE_URL +
        API_ROUTES.V1 +
        API_ROUTES.CUSTOMER +
        API_ROUTES.QUERY_PARAMS({ page: page - 1, size });

        try {
            const response = await HttpService.get<Customer[]>(url);
            const formattedCustomers = CustomerAdapter.getCustomes([...response]);
            setCustomerList(formattedCustomers);
            if (callback) {
                callback();
            } else {
                setLoading(false);
            }
        } catch (err) {
            if (err instanceof HttpRequestError && err.payload) {
                handleHttpRequestError();
            }
        }
    }

    const onChangePage = (currentPage: number, totalRows: number): void => {
        setPage(currentPage);
    }

    const onChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => setSize(currentRowsPerPage);

    const onDeleteCustomer = async (id: number): Promise<void> => {
        const url = API_ROUTES.BASE_URL + 
            API_ROUTES.V1 +
            API_ROUTES.CUSTOMER +
            API_ROUTES.PARAM_URL(String(id));

        try {
            await HttpService.delete(url);
            getCustomerList();
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const blacklistRoutes = [RouteConstants.HOME, RouteConstants.LOGIN];
        if (!blacklistRoutes.includes(router.pathname)) {
            getUserInfo();
        }
    }, [router.pathname]);

    useEffect(() => {
        if(router.pathname === RouteConstants.CUSTOMERS.ROOT) {
            getCustomerCount();
            getCustomerList();
        }
    }, [page, size, router.pathname]);

    return (
        <CustomerContext.Provider value={{
            getCustomerList,
            onChangePage,
            page,
            size,
            sortBy,
            customerList,
            loading,
            onChangeRowsPerPage,
            onDeleteCustomer,
            count,
            user
        }}>
            {children}
        </CustomerContext.Provider>
    )
}

const useCustomerContext = () => useContext(CustomerContext);

export { CustomerContextProvider as default, useCustomerContext };

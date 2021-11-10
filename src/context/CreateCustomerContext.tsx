import { FC, createContext, useContext, useReducer } from 'react';

import createCustomerReducer, { initialState } from './reducers/CreateCustomer.reducer';

const CreateCustomerContext = createContext({});

const CreateCustomerContextProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(createCustomerReducer, initialState);

    return (
        <CreateCustomerContext.Provider value={{ state }}>
            {children}
        </CreateCustomerContext.Provider>
    )
}

const useCreateCustomerContext = () => useContext(CreateCustomerContext);

export { CreateCustomerContextProvider as default, useCreateCustomerContext };

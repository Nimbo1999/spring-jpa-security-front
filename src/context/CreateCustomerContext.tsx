import { FC, createContext, useContext, useReducer, ChangeEventHandler, ChangeEvent } from 'react';

import createCustomerReducer, { initialState } from './reducers/CreateCustomer.reducer';

import type { CreateCustomerContextProps } from './CreateCustomerContext.types';
import API_ROUTES from '../constants/ApiRoutes';
import HttpService from '../services/HttpService';

const CreateCustomerContext = createContext<CreateCustomerContextProps>({
    address: null,
    cpf: null,
    emails: null,
    getAddressByPostalCode: null,
    name: null,
    phones: null,
    onChangeInput: null
});

const CreateCustomerContextProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(createCustomerReducer, initialState);

    const getAddressByPostalCode = async () => {
        const url = API_ROUTES.THIRD_PARTY.VIACEP_URL(state.address.postalCode);
        const result = HttpService.get(url);
        console.log(result);
    }

    const getValueFromNestedParamName = (params: string[]): string => {
        let value: string;
        for (const iterator of params) {
            value = value ? value[iterator] : state[iterator];
        }
        return value;
    }

    const setValueIntoStateFromNestedParamName = (value: string, params: string[]): string => {
        const currentState = { ...state }
        let key: string;
        for (const iterator of params) {
            key = currentState[iterator];
        }
        return value;

        // Parei pensando nessa lógica para alterar dinâmicamente a chave do campo que o usuário está alterando
    }

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
        const target = event.target;
        const params = target.name.split('.');
        const value = event.target.value;

        const newState = setValueIntoStateFromNestedParamName(value, params);

        console.log({ newState, value });
    }

    return (
        <CreateCustomerContext.Provider value={{
            ...state,
            getAddressByPostalCode,
            onChangeInput
        }}>
            {children}
        </CreateCustomerContext.Provider>
    )
}

const useCreateCustomerContext = () => useContext(CreateCustomerContext);

export { CreateCustomerContextProvider as default, useCreateCustomerContext };

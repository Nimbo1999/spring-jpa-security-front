import { FC, createContext, useContext, useReducer, ChangeEventHandler } from 'react';

import createCustomerReducer, { initialState } from './reducers/CreateCustomer.reducer';

import type { CreateCustomerContextProps, ViaCepResponse } from './CreateCustomerContext.types';
import API_ROUTES from '../constants/ApiRoutes';
import HttpService from '../services/HttpService';
import { CustomerForm, PhoneNumberForm } from './reducers/CreateCustomerReducer.types';
import FormatFieldsValues, { Fields } from '../utils/FormatFieldsValues';

const CreateCustomerContext = createContext<CreateCustomerContextProps>({
    address: null,
    cpf: null,
    emails: null,
    getAddressByPostalCode: null,
    name: null,
    phones: null,
    onChangeInput: null,
    cepFetched: null,
    onConfirmPhone: null,
    onRemovePhone: null
});

const CreateCustomerContextProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(createCustomerReducer, initialState);

    const getAddressByPostalCode = async () => {
        if (state.address.postalCode.replace(/\D/g, '').length === 8) {
            const url = API_ROUTES.THIRD_PARTY.VIACEP_URL(state.address.postalCode);
            const result = await HttpService.rawGet<ViaCepResponse>(url);
            dispatch({ type: 'VIACEP_PAYLOAD_ACTION', payload: result });
        }
    }

    const getValueFromNestedParamName = (params: string[]): string => {
        let value: string;
        for (const iterator of params) {
            value = value ? value[iterator] : state[iterator];
        }
        return value;
    }

    const setValueIntoStateFromNestedParamName = (value: string, params: string[]): CustomerForm => {
        const valueSnapshot:object = {}

        for (let i = 0; i < params.length; i++) {
            if (params.length === 1) {
                valueSnapshot[params[i]] = value;
                continue;
            }

            if (i !== 0) {
                valueSnapshot[params[i-1]] = i + 1 === params.length
                    ? {
                        ...valueSnapshot[params[i-1]],
                        [params[i]]: value
                    } : {
                        ...valueSnapshot[params[i-1]],
                        [params[i]]: {
                            ...valueSnapshot[params[i]]
                        }
                    };
                break;
            }

            valueSnapshot[params[i]] = state[params[i]];
        }

        return { ...state, ...valueSnapshot };
    }

    const onConfirmPhone = (phone:PhoneNumberForm) => dispatch({ type: 'ADD_NEW_PHONE_NUMBER', payload: phone })

    const onRemovePhone = (phone:string) => dispatch({ type: 'REMOVE_PHONE_NUMBER', payload: phone })

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
        const target = event.target;
        const params = target.name.split('.');
        const value = FormatFieldsValues[event.target.id as Fields](event.target.value);

        const newState = setValueIntoStateFromNestedParamName(value, params);

        return dispatch({ type: 'UPDATE_STATE', payload: newState });
    }

    return (
        <CreateCustomerContext.Provider value={{
            ...state,
            getAddressByPostalCode,
            onChangeInput,
            onConfirmPhone,
            onRemovePhone
        }}>
            {children}
        </CreateCustomerContext.Provider>
    )
}

const useCreateCustomerContext = () => useContext(CreateCustomerContext);

export { CreateCustomerContextProvider as default, useCreateCustomerContext };

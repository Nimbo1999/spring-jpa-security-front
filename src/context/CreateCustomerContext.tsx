import { FC, createContext, useContext, useReducer, ChangeEventHandler, FormEventHandler, useState, FocusEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import createCustomerReducer, { initialState } from './reducers/CreateCustomer.reducer';

import type { CreateCustomerContextProps, ViaCepResponse } from './CreateCustomerContext.types';
import API_ROUTES from '../constants/ApiRoutes';
import HttpService from '../services/HttpService';
import { CustomerForm, PhoneNumberForm } from './reducers/CreateCustomerReducer.types';
import FormatFieldsValues, { Fields } from '../utils/FormatFieldsValues';
import Customer from '../models/Customer';
import RouteConstants from '../constants/RoutesConstants';
import HttpRequestError, { HttpRequestErrorContent } from '../exceptions/HttpRequestError';
import Email from '../models/Email';

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
    onRemovePhone: null,
    onConfirmEmail: null,
    onRemoveEmail: null,
    loading: false,
    onSubmit: null,
    errors: null,
    onBlurField: null,
    hasFormErrors: null,
    id: null
});

const CreateCustomerContextProvider: FC<{customer: Customer}> = ({ customer, children }) => {
    const router = useRouter();
    const [errors, setErrors] = useState<object>({});
    const [state, dispatch] = useReducer(createCustomerReducer, initialState);

    useEffect(() => {
        if (customer) {
            dispatch({ type: 'HYDRATE_CUSTOMER', payload: customer });
        }
    }, []);

    const onBlurField = (event: FocusEvent<HTMLInputElement>) => {
        if (errors && errors[event.target.name]) {
            setErrors({ ...errors, [event.target.name]: [] });
        }
    }

    const hasFormErrors = () => Object.keys(errors).length
        ? Object.values(errors).every(errorMessages =>
            Boolean(errorMessages && errorMessages.length))
        : false;

    hasFormErrors();

    const getAddressByPostalCode = async (event: FocusEvent<HTMLInputElement>) => {
        onBlurField(event);

        if (state.address.postalCode.replace(/\D/g, '').length === 8) {
            dispatch({ type: 'VIACEP_PAYLOAD_ACTION_STARTED', payload: null });
            const url = API_ROUTES.THIRD_PARTY.VIACEP_URL(state.address.postalCode);
            const result = await HttpService.rawGet<ViaCepResponse>(url);
            dispatch({ type: 'VIACEP_PAYLOAD_ACTION_SUCCESS', payload: result });
        }
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

    const onConfirmEmail = (email:Email) => dispatch({ type: 'ADD_EMAIL', payload: email })

    const onRemoveEmail = (email:string) => dispatch({ type: 'REMOVE_EMAIL', payload: email })

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
        const target = event.target;
        const params = target.name.split('.');
        const value = FormatFieldsValues[event.target.id as Fields](event.target.value);

        const newState = setValueIntoStateFromNestedParamName(value, params);

        return dispatch({ type: 'UPDATE_STATE', payload: newState });
    }

    const getFormPayload = (): Customer => {
        return {
            id: state.id,
            name: state.name,
            cpf: state.cpf,
            address: {
                id: state.id,
                ...state.address
            },
            emails: [...state.emails],
            phones: [...state.phones]
        }
    }

    const handleOnSubmitError = (payload: HttpRequestErrorContent) => {
        const { content } = payload;
        if (content && content['errors'] && typeof content['errors'] === 'object') {
            const errors: object = {};
            for(const iterator of content['errors']) {
                errors[iterator['field']] = iterator['messages'];
            }
            setErrors(errors);
        }
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event): Promise<void> => {
        event.preventDefault();
        const url = !customer ? (
            API_ROUTES.BASE_URL +
            API_ROUTES.V1 +
            API_ROUTES.CUSTOMER
            ) : (
                API_ROUTES.BASE_URL +
                API_ROUTES.V1 +
                API_ROUTES.CUSTOMER +
                API_ROUTES.PARAM_URL(String(state.id))
            );

        try {
            if (customer) {
                await HttpService.put(url, getFormPayload());
            } else {
                await HttpService.post(url, getFormPayload());
            }
            router.push(RouteConstants.CUSTOMERS.ROOT);
        } catch(err) {
            if (err instanceof HttpRequestError && err.payload) {
                handleOnSubmitError(err.payload);
            } 
        }
    }

    return (
        <CreateCustomerContext.Provider value={{
            ...state,
            getAddressByPostalCode,
            onChangeInput,
            onConfirmPhone,
            onRemovePhone,
            onConfirmEmail,
            onRemoveEmail,
            onSubmit,
            errors,
            onBlurField,
            hasFormErrors
        }}>
            {children}
        </CreateCustomerContext.Provider>
    )
}

const useCreateCustomerContext = () => useContext(CreateCustomerContext);

export { CreateCustomerContextProvider as default, useCreateCustomerContext };

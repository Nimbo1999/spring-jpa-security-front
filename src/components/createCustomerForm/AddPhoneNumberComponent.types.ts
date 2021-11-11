import { PhoneNumberForm } from '../../context/reducers/CreateCustomerReducer.types';

export interface AddPhoneNumberComponentProps {
    onConfirmPhone: (phone: PhoneNumberForm) => void;
    onRemovePhone: (number: string) => void;
    phoneList: PhoneNumberForm[];
    canAddContent: boolean;
}
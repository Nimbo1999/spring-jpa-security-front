import { ChangeEventHandler, FC, useState } from 'react';
import validator from 'validator';

import { useCreateCustomerContext } from '../../context/CreateCustomerContext';
import FormatFieldsValues, { Fields } from '../../utils/FormatFieldsValues';
import Button from '../button/Button';
import SingleInput from '../input/SingleInput';
import AddCircle from '../../assets/icons/AddCircle';
import SubtractCircle from '../../assets/icons/SubtractCircle';

import type { AddEmailComponentProps } from './AddEmailComponent.types';

const AddEmailComponent: FC<AddEmailComponentProps> = ({ onConfirmEmail, emailList = [], onRemoveEmail, canAddContent }) => {
    const { errors, onBlurField } = useCreateCustomerContext();

    const [isAddingEmail, setIsAddingEmail] = useState(false);
    const [email, setEmail] = useState('');

    const onClickAddEmail = () => setIsAddingEmail(true);

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
        const value = FormatFieldsValues[event.target.id as Fields](event.target.value);
        setEmail(value);
    }

    const onClickCancel = () => {
        setEmail('');
        setIsAddingEmail(false);
    }

    const onSubmitNewEmail = () => {
        onConfirmEmail({ id: null, email });
        onClickCancel();
    }

    const emailDisabled = !validator.isEmail(email);
    const emailErrors = errors && errors['emails']
        ? errors['emails']
        : emailDisabled && email
            ? ['Informe um email válido']
            : [];

    return (
        <div className="add-phone-number-component">
            <header className="inserted-phones">
                {emailList.map(({ email }) => (
                    <button
                        key={email}
                        className="tag"
                        type="button"
                        onClick={() => onRemoveEmail(email)}
                    >
                        {email}
                    </button>
                ))}
            </header>

            {!isAddingEmail ? canAddContent
                ? (
                    <Button onClick={onClickAddEmail} type="button">
                        Adicionar Email
                    </Button>
                )
                : null
            : (
                <section className="new-number-content">
                    <SingleInput
                        id="emails"
                        name="emails"
                        type="text"
                        placeholder="Email"
                        value={email}
                        errors={emailErrors}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        readOnly={canAddContent}
                    />

                    <div className="action-buttons">
                        <Button type="button" onClick={onClickCancel} variant="danger">
                            <SubtractCircle width={24} height={24} />
                        </Button>

                        <Button
                            type="button"
                            disabled={emailDisabled}
                            className="enforce-disable"
                            onClick={onSubmitNewEmail}
                        >
                            <AddCircle width={24} height={24} />
                        </Button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default AddEmailComponent;

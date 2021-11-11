import { ChangeEventHandler, FC, useState } from 'react';
import validator from 'validator';

import FormatFieldsValues, { Fields } from '../../utils/FormatFieldsValues';
import Button from '../button/Button';
import SingleInput from '../input/SingleInput';

import type { AddEmailComponentProps } from './AddEmailComponent.types';

const AddEmailComponent: FC<AddEmailComponentProps> = ({ onConfirmEmail, emailList = [], onRemoveEmail }) => {
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
        onConfirmEmail(email);
        onClickCancel();
    }

    const emailDisabled = !validator.isEmail(email);
    const emailErrors = emailDisabled && email ? [ 'Informe um email válido' ] : [];

    return (
        <div className="add-phone-number-component">
            <header className="inserted-phones">
                {emailList.map(email => (
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

            {!isAddingEmail ? (
                <Button onClick={onClickAddEmail} type="button">
                    Adicionar Email
                </Button>
            ) : (
                <section className="new-number-content">
                    <SingleInput
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        errors={emailErrors}
                        onChange={onChangeInput}
                    />

                    <div className="action-buttons">
                        <Button type="button" onClick={onClickCancel}>-</Button>

                        <Button
                            type="button"
                            disabled={emailDisabled}
                            className="enforce-disable"
                            onClick={onSubmitNewEmail}
                        >
                            +
                        </Button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default AddEmailComponent;

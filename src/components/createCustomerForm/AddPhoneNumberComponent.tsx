import { ChangeEventHandler, FC, useState } from 'react';

import { PhoneType } from '../../models/PhoneNumber';
import FormatFieldsValues, { Fields } from '../../utils/FormatFieldsValues';
import Button from '../button/Button';
import SingleInput from '../input/SingleInput';
import SingleSelect from '../select/SingleSelect';

import type { AddPhoneNumberComponentProps } from './AddPhoneNumberComponent.types';

const phoneNumberTypes: PhoneType[] = [ 'CELL_PHONE', 'COMMERCIAL', 'RESIDENTIAL' ];
const phoneNumberOptLabel = {
    CELL_PHONE: 'Celular',
    COMMERCIAL: 'Comercial',
    RESIDENTIAL: 'Residencial'
}

const AddPhoneNumberComponent: FC<AddPhoneNumberComponentProps> = ({ onConfirmPhone, phoneList = [], onRemovePhone }) => {
    const [isAddingPhoneNumber, setIsAddingPhoneNumber] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneType, setPhoneNumberType] = useState<PhoneType>('CELL_PHONE');

    const onClickAddPhoneNumber = () => setIsAddingPhoneNumber(true);

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
        const value = FormatFieldsValues[event.target.id as Fields](event.target.value);
        setPhoneNumber(value);
    }

    const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = event => {
        const { value } = event.target;
        setPhoneNumberType(value as PhoneType);
    }

    const onClickCancel = () => {
        setPhoneNumber('');
        setPhoneNumberType('CELL_PHONE');
        setIsAddingPhoneNumber(false);
    }

    const onSubmitNewPhoneNumber = () => {
        onConfirmPhone({ number: phoneNumber, type: phoneType });
        onClickCancel();
    }

    const phoneNumberDisabled = phoneNumber.replace(/\D/g, '').length < 10;

    return (
        <div className="add-phone-number-component">
            <header className="inserted-phones">
                {phoneList.map(({ number }) => (
                    <button
                        key={number}
                        className="tag"
                        type="button"
                        onClick={() => onRemovePhone(number)}
                    >
                        {number} x
                    </button>
                ))}
            </header>

            {!isAddingPhoneNumber ? (
                <Button onClick={onClickAddPhoneNumber} type="button">
                    Adicionar Telefone
                </Button>
            ) : (
                <section className="new-number-content">
                    <SingleInput
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Número"
                        value={phoneNumber}
                        errors={[]}
                        onChange={onChangeInput}
                    />

                    <SingleSelect
                        id="phoneType"
                        name="phoneType"
                        options={phoneNumberTypes.map(opt => ({ value: opt, label: phoneNumberOptLabel[opt] }))}
                        onChange={onChangeSelect}
                    />

                    <div className="action-buttons">
                        <Button type="button" onClick={onClickCancel}>-</Button>

                        <Button
                            type="button"
                            disabled={phoneNumberDisabled}
                            className="enforce-disable"
                            onClick={onSubmitNewPhoneNumber}
                        >
                            +
                        </Button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default AddPhoneNumberComponent;

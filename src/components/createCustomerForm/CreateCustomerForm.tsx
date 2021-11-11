import { FC } from 'react';
import { useCreateCustomerContext } from '../../context/CreateCustomerContext';

import SingleInput from '../input/SingleInput';
import SectionHeader from '../sectionHeader/SectionHeader';
import AddPhoneNumberComponent from './AddPhoneNumberComponent';

const CreateCustomerForm: FC = () => {
    const {
        onChangeInput,
        getAddressByPostalCode,
        onConfirmPhone,
        onRemovePhone,
        address: {
            postalCode,
            city,
            neighborhood,
            publicPlace,
            uf,
            complement
        },
        name,
        cpf,
        cepFetched,
        phones
    } = useCreateCustomerContext();

    return (
        <form method="POST" className="customer-form">
            <SectionHeader>
                Dados do cliente
            </SectionHeader>

            <SingleInput
                id="customerName"
                name="name"
                type="text"
                placeholder="Nome completo"
                value={name}
                errors={[]}
                onChange={onChangeInput}
            />

            <SingleInput
                id="cpf"
                name="cpf"
                type="text"
                placeholder="CPF"
                value={cpf}
                errors={[]}
                onChange={onChangeInput}
            />

            <SectionHeader>
                Endereço do cliente
            </SectionHeader>

            <SingleInput
                id="postalCode"
                name="address.postalCode"
                type="text"
                placeholder="Código postal"
                value={postalCode}
                errors={[]}
                onChange={onChangeInput}
                onBlur={getAddressByPostalCode}
            />

            <SingleInput
                id="city"
                name="address.city"
                type="text"
                placeholder="Cidade"
                value={city}
                errors={[]}
                onChange={onChangeInput}
                disabled={!cepFetched}
            />

            <SingleInput
                id="neighborhood"
                name="address.neighborhood"
                type="text"
                placeholder="Bairro"
                value={neighborhood}
                errors={[]}
                onChange={onChangeInput}
                disabled={!cepFetched}
            />

            <SingleInput
                id="publicPlace"
                name="address.publicPlace"
                type="text"
                placeholder="Logradouro"
                value={publicPlace}
                errors={[]}
                onChange={onChangeInput}
                disabled={!cepFetched}
            />

            <SingleInput
                id="uf"
                name="address.uf"
                type="text"
                placeholder="UF"
                value={uf}
                errors={[]}
                onChange={onChangeInput}
                disabled={!cepFetched}
            />

            <SingleInput
                id="complement"
                name="address.complement"
                type="text"
                placeholder="Complemento"
                value={complement}
                errors={[]}
                onChange={onChangeInput}
                disabled={!cepFetched}
            />

            <AddPhoneNumberComponent
                onConfirmPhone={onConfirmPhone}
                onRemovePhone={onRemovePhone}
                phoneList={phones}
            />
        </form>
    );
}

export default CreateCustomerForm;

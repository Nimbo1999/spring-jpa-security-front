import { useRouter } from 'next/router';
import { FC } from 'react';
import { useCreateCustomerContext } from '../../context/CreateCustomerContext';
import { useCustomerContext } from '../../context/CustomersContext';
import Button from '../button/Button';

import SingleInput from '../input/SingleInput';
import Loader from '../loader/Loader';
import SectionHeader from '../sectionHeader/SectionHeader';
import AddEmailComponent from './AddEmailComponent';
import AddPhoneNumberComponent from './AddPhoneNumberComponent';

const CreateCustomerForm: FC = () => {
    const route = useRouter();
    const { user } = useCustomerContext();
    const {
        onChangeInput,
        getAddressByPostalCode,
        onConfirmPhone,
        onRemovePhone,
        onConfirmEmail,
        onRemoveEmail,
        onSubmit,
        onBlurField,
        hasFormErrors,
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
        phones,
        emails,
        loading,
        errors
    } = useCreateCustomerContext();

    const canEditForm = user && user.authorities.some(authority => authority === 'ALL');

    return (
        <form method="POST" className="customer-form" onSubmit={onSubmit}>
            <SectionHeader>
                Dados do cliente
            </SectionHeader>

            <SingleInput
                id="customerName"
                name="name"
                type="text"
                placeholder="Nome completo"
                value={name}
                errors={errors && errors['name'] ? errors['name'] : []}
                onChange={onChangeInput}
                onBlur={onBlurField}
                readOnly={!canEditForm}
            />

            <SingleInput
                id="cpf"
                name="cpf"
                type="text"
                placeholder="CPF"
                value={cpf}
                errors={errors && errors['cpf'] ? errors['cpf'] : []}
                onChange={onChangeInput}
                onBlur={onBlurField}
                readOnly={!canEditForm}
            />

            <SectionHeader>
                Endereço do cliente
            </SectionHeader>

            <div className="cep-row">
                <SingleInput
                    id="postalCode"
                    name="address.postalCode"
                    type="text"
                    placeholder="Código postal"
                    value={postalCode}
                    errors={errors && errors['address.postalCode'] ? errors['address.postalCode'] : []}
                    onChange={onChangeInput}
                    onBlur={getAddressByPostalCode}
                    readOnly={!canEditForm}
                />

                {loading && <Loader color="primary" size="large" />}
            </div>

            {cepFetched && (
                <>
                    <SingleInput
                        id="city"
                        name="address.city"
                        type="text"
                        placeholder="Cidade"
                        value={city}
                        errors={errors && errors['address.city'] ? errors['address.city'] : []}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        disabled={!cepFetched}
                        readOnly={!canEditForm}
                    />

                    <SingleInput
                        id="neighborhood"
                        name="address.neighborhood"
                        type="text"
                        placeholder="Bairro"
                        value={neighborhood}
                        errors={errors && errors['address.neighborhood'] ? errors['address.neighborhood'] : []}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        disabled={!cepFetched}
                        readOnly={!canEditForm}
                    />

                    <SingleInput
                        id="publicPlace"
                        name="address.publicPlace"
                        type="text"
                        placeholder="Logradouro"
                        value={publicPlace}
                        errors={errors && errors['address.publicPlace'] ? errors['address.publicPlace'] : []}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        disabled={!cepFetched}
                        readOnly={!canEditForm}
                    />

                    <SingleInput
                        id="uf"
                        name="address.uf"
                        type="text"
                        placeholder="UF"
                        value={uf}
                        errors={errors && errors['address.uf'] ? errors['address.uf'] : []}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        disabled={!cepFetched}
                        readOnly={!canEditForm}
                    />

                    <SingleInput
                        id="complement"
                        name="address.complement"
                        type="text"
                        placeholder="Complemento"
                        value={complement}
                        onChange={onChangeInput}
                        onBlur={onBlurField}
                        disabled={!cepFetched}
                        readOnly={!canEditForm}
                    />
                </>
            )}

            <div className="add-box-content">
                <AddPhoneNumberComponent
                    onConfirmPhone={onConfirmPhone}
                    onRemovePhone={onRemovePhone}
                    phoneList={phones}
                    canAddContent={canEditForm}
                />

                <AddEmailComponent
                    emailList={emails}
                    onConfirmEmail={onConfirmEmail}
                    onRemoveEmail={onRemoveEmail}
                    canAddContent={canEditForm}
                />
            </div>

            {hasFormErrors() && (
                <span className="form-erros">O formulário possui erros!</span>
            )}

            <footer>
                <Button type="button" variant="ghost" onClick={route.back}>Voltar</Button>

                {canEditForm && (
                    <Button type="submit" variant="success">Confirmar</Button>
                )}
            </footer>
        </form>
    );
}

export default CreateCustomerForm;

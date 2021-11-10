import { FC } from 'react';
import { useCreateCustomerContext } from '../../context/CreateCustomerContext';

import SingleInput from '../input/SingleInput';
import SectionHeader from '../sectionHeader/SectionHeader';

const CreateCustomerForm: FC = () => {
    const { onChangeInput } = useCreateCustomerContext();

    console.log(onChangeInput);

    return (
        <form method="POST" className="customer-form">
            <SectionHeader>
                Dados do cliente
            </SectionHeader>

            <SingleInput id="name" name="name" type="text" placeholder="Nome completo" errors={[]} />

            <SingleInput id="cpf" name="cpf" type="text" placeholder="CPF" errors={[]} />

            <SectionHeader>
                Endereço do cliente
            </SectionHeader>

            <SingleInput
                id="address.postalCode"
                name="address.postalCode"
                type="text"
                placeholder="Código postal"
                errors={[]}
                onChange={onChangeInput}
            />

            <SingleInput id="address.city" name="address.city" type="text" placeholder="Cidade" errors={[]} />

            <SingleInput id="address.neighborhood" name="address.neighborhood" type="text" placeholder="Bairro" errors={[]} />

            <SingleInput id="address.publicPlace" name="address.publicPlace" type="text" placeholder="Logradouro" errors={[]} />

            <SingleInput id="address.uf" name="address.uf" type="text" placeholder="UF" errors={[]} />

            <SingleInput id="address.complement" name="address.complement" type="text" placeholder="Complemento" errors={[]} />
        </form>
    );
}

export default CreateCustomerForm;

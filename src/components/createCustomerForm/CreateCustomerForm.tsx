import { FC } from 'react';

import SingleInput from '../input/SingleInput';

const CreateCustomerForm: FC = () => {
    return (
        <form method="POST">
            <SingleInput id="customerName" name="customerName" type="text" placeholder="Nome do cliente" errors={[]} />
        </form>
    );
}

export default CreateCustomerForm;

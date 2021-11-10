import { FC, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import Button from '../button/Button';

import { useCustomerContext } from '../../context/CustomersContext';

const CustomerTable: FC = () => {
    const {
        customerList,
        loading,
        page,
        size,
        onChangePage,
        onChangeRowsPerPage,
        getCustomerList
    } = useCustomerContext();

    useEffect(() => {
        getCustomerList();
    }, []);

    const columns = [
        {
            id: 'name',
            name: 'Nome',
            selector: row => row.name
        },
        {
            id: 'cpf',
            name: 'CPF',
            selector: row => row.cpf
        },
        {
            id: 'city',
            name: 'Cidade',
            selector: row => row.city
        },
        {
            id: 'id',
            name: 'Açôes',
            cell: row => {
                return (
                    <Button>
                        editar
                    </Button>
                );
            }
        }
    ];

    return (
        <DataTable
            title="Clientes"
            data={customerList}
            columns={columns}
            noDataComponent="Nenhum registro de usuários"
            progressPending={loading}
            pagination
            paginationServer
            paginationServerOptions={{}}
            paginationDefaultPage={page}
            paginationPerPage={size}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            actions={<Button>
                Adicionar cliente
            </Button>}
        />
    );
}

export default CustomerTable;

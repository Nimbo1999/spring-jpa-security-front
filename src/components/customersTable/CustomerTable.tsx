import { FC, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/router';

import Button from '../button/Button';

import Delete from '../../assets/icons/Delete';
import EditDocument from '../../assets/icons/EditDocument';

import { useCustomerContext } from '../../context/CustomersContext';
import RouteConstants from '../../constants/RoutesConstants';

const CustomerTable: FC = () => {
    const router = useRouter();

    const {
        customerList,
        loading,
        page,
        size,
        onChangePage,
        onChangeRowsPerPage,
        getCustomerList,
        onDeleteCustomer
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
            cell: ({ id }) => (
                <div className="action-buttons">
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => onDeleteCustomer(id)}
                    >
                        <Delete />
                    </Button>

                    <Button type="button">
                        <EditDocument />
                    </Button>
                </div>
            )
        }
    ];

    const navigateToCreateCustomerPage = () => {
        router.push(router.route + RouteConstants.CUSTOMERS.CREATE)
    }

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
            actions={(
                <Button type="button" onClick={navigateToCreateCustomerPage}>
                    Adicionar cliente
                </Button>
            )}
        />
    );
}

export default CustomerTable;

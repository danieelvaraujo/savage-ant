import React, { useState, useEffect, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Button, message, Drawer } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';

import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * Adicionar
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Adicionando');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Adicionado com sucesso');
    return true;
  } catch (error) {
    hide();
    message.error('Falha ao adicionar, tente novamente!');
    return false;
  }
};

/**
 * Atualizar
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configurando');
  try {
    await updateRule({
      uuid: fields.uuid,
      first_name: fields.first_name,
      last_name: fields.last_name,
      emails: fields.emails,
      phones: fields.phones,
      gender: fields.gender,
      address: fields.address,
      city: fields.city,
      postal_code: fields.postal_code,
      country: fields.country,
      linkedinURL: fields.linkedinURL,
      facebookURL: fields.facebookURL,
      birthday: fields.birthday,
      job_function: fields.job_function,
      job_level: fields.job_level,
      job_title: fields.job_title,
      business_name: fields.business_name,
      business_categories: fields.business_categories,
      business_address: fields.business_address,
      business_city: fields.business_city,
      business_postal_code: fields.business_postal_code,
      business_country: fields.business_country,
      num_employees: fields.num_employees,
      revenue_currency: fields.revenue_currency,
      revenue_min: fields.revenue_min,
      revenue_max: fields.revenue_max,
      websites: fields.websites,
    });
    hide();

    message.success('A configuração foi bem sucedida');
    return true;
  } catch (error) {
    hide();
    console.log(error);
    message.error('A configuração falhou, tente novamente!');
    return false;
  }
};

/**
 * Remover
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('deletando');
  if (!selectedRows) return true;
  try {
    await removeRule({
      uuid: selectedRows.map((row) => row.uuid),
    });
    hide();
    message.success('Excluído com sucesso, a lista será atualizada');
    return true;
  } catch (error) {
    hide();
    message.error('A exclusão falhou, por favor tente novamente');
    return false;
  }
};

const TableList: React.FC = () => {
  /** Modal visivel*/
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** Modal de atualização */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [createValues, setCreateValues] = useState<TableListItem>();
  const [ready, setReady] = useState(false);

  /** Configuração internacional */
  const intl = useIntl();

  const checkCustom = (values) => {
    console.log('Checkou customizado');
    if (values.key) {
      setCreateValues({
        ...values,
        custom_fields: {
          json: values.json,
          key: values.key,
        },
      });
      setReady(true);
    } else {
      setCreateValues({ ...values });
      setReady(true);
    }
  };

  const enviarForm = async () => {
    console.log('Enviou o form');
    const success = await handleAdd(createValues as TableListItem);
    if (success && ready) {
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (ready) {
      enviarForm();
    }
  }, [ready]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Sobrenome" />,
      dataIndex: 'last_name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Cidade" />,
      dataIndex: 'city',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="País" />,
      dataIndex: 'country',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Função de trabalho" />
      ),
      dataIndex: 'job_function',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Nível de proficiência" />
      ),
      dataIndex: 'job_level',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Opções" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Editar" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Formulário de inquérito',
        })}
        actionRef={actionRef}
        rowKey="uuid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="Novo" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Escolhido" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="item" />
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="Deletar lote" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="Aprovar lote" />
          </Button>
        </FooterToolbar>
      )}

      <UpdateForm
        onSubmit={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <CreateForm
        onSubmit={async (values) => {
          console.log('Submeteu');
          checkCustom(values);
        }}
        onCancel={() => handleModalVisible(false)}
        createModalVisible={createModalVisible}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.first_name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.first_name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.first_name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

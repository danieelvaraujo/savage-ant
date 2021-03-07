import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Button, message, Input, Drawer } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';

import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
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
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('A configuração foi bem sucedida');
    return true;
  } catch (error) {
    hide();
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

  /** Configuração internacional */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Sobrenome" />,
      dataIndex: 'last_name',
      valueType: 'textarea',
      sorter: true,
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
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Gênero" />,
      dataIndex: 'gender',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Cidade" />,
      dataIndex: 'city',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="País" />,
      dataIndex: 'country',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Função de trabalho" />
      ),
      dataIndex: 'job_function',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Nível de proficiência" />
      ),
      dataIndex: 'job_level',
      valueType: 'textarea',
      sorter: true,
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

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'Criar novo contato',
        })}
        width="800px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="primeiro_nome" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="first_name"
          placeholder="Primeiro nome"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="last_name" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="last_name"
          placeholder="Sobrenome"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="emails" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="emails"
          placeholder="Email"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="phones" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="phones"
          placeholder="Telefone"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="gender" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="gender"
          placeholder="Gênero"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="address" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="address"
          placeholder="Endereço"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="city" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="city"
          placeholder="Cidade"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="postal_code" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="postal_code"
          placeholder="CEP"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="country" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="country"
          placeholder="País"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="linkedinURL" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="linkedinURL"
          placeholder="Seu Linkedin"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="facebookURL" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="facebookURL"
          placeholder="Seu facebook"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="bitrhday" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="bitrhday"
          placeholder="Data de aniversário"
        />{' '}
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="job_function" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="job_function"
          placeholder="Função de trabalho"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="job_level" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="job_level"
          placeholder="Nível de proficiência"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="job_title" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="job_title"
          placeholder="Título do trabalho"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="business_name" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="business_name"
          placeholder="Nome fantasia"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="business_categories" defaultMessage="Campo obrigatório" />
              ),
            },
          ]}
          name="business_categories"
          placeholder="Tipo de empresa"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="business_address" defaultMessage="Campo obrigatório" />
              ),
            },
          ]}
          name="business_address"
          placeholder="Endereço da empresa"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="business_city" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="business_city"
          placeholder="Cidade da empresa"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="business_postal_code" defaultMessage="Campo obrigatório" />
              ),
            },
          ]}
          name="business_postal_code"
          placeholder="CEP da empresa"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="business_country" defaultMessage="Campo obrigatório" />
              ),
            },
          ]}
          name="business_country"
          placeholder="País da empresa"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="num_employees" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="num_employees"
          placeholder="Número de funcionários"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="revenue_currency" defaultMessage="Campo obrigatório" />
              ),
            },
          ]}
          name="revenue_currency"
          placeholder="Valor da moeda"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="revenue_min" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="revenue_min"
          placeholder="Receita mínima"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="revenue_max" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="revenue_max"
          placeholder="Receita máxima"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="websites" defaultMessage="Campo obrigatório" />,
            },
          ]}
          name="websites"
          placeholder="Website"
        />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
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

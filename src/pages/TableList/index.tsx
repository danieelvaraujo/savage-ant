import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Button, message, Drawer, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';

import type { FormValueType } from './components/ModalForm';
import ModalForm from './components/ModalForm';
import type { TableListItem } from './data.d';
import { queryContato, updateContato, removeContato, uploadData } from './service';

const TableList: React.FC = () => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const actionRef = useRef<ActionType>();
  /** Configuração internacional */
  const intl = useIntl();

  /**
   * Atualizar
   *
   * @param fields
   */
  const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configurando');
    try {
      await updateContato({
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

  const handleRemove = async (contato: TableListItem) => {
    const hide = message.loading('deletando');
    if (!contato.uuid) {
      return false;
    } else {
      try {
        const confirmacao = confirm('Você realmente deseja remover este contato?');
        if (confirmacao === true) {
          await removeContato({
            uuid: contato.uuid,
          });
          if (actionRef.current) {
            actionRef.current.reload();
          }
          hide();
          message.success('Excluído com sucesso, a lista será atualizada');
          return true;
        } else {
          hide();
          message.success('Remoção cancelada pelo usuário');
          return false;
        }
      } catch (error) {
        hide();
        message.error('A exclusão falhou, por favor tente novamente');
        return false;
      }
    }
  };

  /**
   * Upload
   */

  const handleUpload = async (file: File) => {
    if (!file) {
      return false;
    } else {
      try {
        await uploadData(file);
        message.success('Contatos carregados com sucesso');
        return true;
      } catch (error) {
        message.error('A exclusão falhou, por favor tente novamente');
        return false;
      }
    }
  };

  const uploadProps = {
    name: 'file',
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        handleUpload(info.file);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Pesquisar valor" />,
      dataIndex: 'pesquisar',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Sobrenome" />,
      dataIndex: 'last_name',
      valueType: 'textarea',
      search: false,
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
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="País" />,
      dataIndex: 'country',
      valueType: 'textarea',
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Função de trabalho" />
      ),
      dataIndex: 'job_function',
      valueType: 'textarea',
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Nível de proficiência" />
      ),
      dataIndex: 'job_level',
      valueType: 'textarea',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Opções" />,
      dataIndex: 'option',
      valueType: 'option',
      search: false,
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
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleRemove(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Deletar" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Lista de contatos',
        })}
        actionRef={actionRef}
        rowKey="uuid"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="Novo" />
          </Button>,
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>,
        ]}
        request={(params, sorter, filter) => queryContato({ ...params, sorter, filter })}
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
          <Button type="primary" danger>
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="Deletar lote" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="Aprovar lote" />
          </Button>
        </FooterToolbar>
      )}

      {/* ATUALIZAR CAMPOS */}
      <ModalForm
        onSubmitUpdate={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onSubmitCreate={() => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
          handleCreateModalVisible(false);
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        createModalVisible={createModalVisible}
        valuesUpdate={currentRow || {}}
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

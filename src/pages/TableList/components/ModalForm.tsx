import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProFormText, StepsForm } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import type { TableListItem } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
  camposCustom?: object;
} & Partial<TableListItem>;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmitUpdate: (values: FormValueType) => Promise<void>;
  onSubmitCreate: (values: FormValueType) => Promise<void>;
  updateModalVisible?: boolean;
  createModalVisible?: boolean;
  valuesUpdate: Partial<TableListItem>;
};

const ListaPessoal: Partial<TableListItem> = {
  first_name: 'first_name',
  last_name: 'last_name',
  emails: 'emails',
  phones: 'phones',
  gender: 'gender',
  address: 'address',
  city: 'city',
  postal_code: 'postal_code',
  country: 'country',
  birthday: 'birthday',
  job_function: 'job_function',
  job_level: 'job_level',
  job_title: 'job_title',
};

const ListaProfissional: Partial<TableListItem> = {
  business_name: 'business_name',
  business_categories: 'business_categories',
  business_address: 'business_address',
  business_city: 'business_city',
  business_postal_code: 'business_postal_code',
  business_country: 'business_country',
  num_employees: 'num_employees',
  revenue_currency: 'revenue_currency',
  revenue_min: 'revenue_min',
  revenue_max: 'revenue_max',
};

const ListaSocial: Partial<TableListItem> = {
  linkedinURL: 'linkedinURL',
  facebookURL: 'facebookURL',
  websites: 'websites',
};

const ModalForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();

  const [camposCustom, setCamposCustom] = useState({});

  useEffect(() => {
    console.log(camposCustom);
  }, [camposCustom]);

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: 'Editar contato',
            })}
            visible={props.updateModalVisible ? props.updateModalVisible : props.createModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      // @TODO
      onFinish={
        props.updateModalVisible
          ? props.onSubmitUpdate
          : camposCustom
          ? (values) => props.onSubmitCreate({ ...values, camposCustom })
          : (values) => props.onSubmitCreate(values)
      }
    >
      <StepsForm.StepForm
        initialValues={
          props.updateModalVisible
            ? {
                uuid: props.valuesUpdate.uuid,
                first_name: props.valuesUpdate.first_name,
                last_name: props.valuesUpdate.last_name,
                emails: props.valuesUpdate.emails,
                phones: props.valuesUpdate.phones,
                gender: props.valuesUpdate.gender,
                address: props.valuesUpdate.address,
                city: props.valuesUpdate.city,
                postal_code: props.valuesUpdate.postal_code,
                country: props.valuesUpdate.country,
                birthday: props.valuesUpdate.birthday,
                job_function: props.valuesUpdate.job_function,
                job_level: props.valuesUpdate.job_level,
                job_title: props.valuesUpdate.job_title,
              }
            : undefined
        }
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: 'Informações pessoais',
        })}
      >
        {props.updateModalVisible && !props.createModalVisible ? (
          <div style={{ opacity: 0, height: '0px' }}>
            <ProFormText
              disabled={true}
              name="uuid"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleName.nameLabel',
                defaultMessage: 'Usuário',
              })}
              width="lg"
              rules={[
                {
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.ruleName.nameRules"
                      defaultMessage="O campo não deve ficar vazio"
                    />
                  ),
                },
              ]}
            />
          </div>
        ) : null}

        {Object.keys(ListaPessoal).map((campo) => {
          return (
            <ProFormText
              name={campo}
              label={campo.replace(/(_)/g, ' ').toUpperCase()}
              width="lg"
              rules={[
                {
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.ruleName.nameRules"
                      defaultMessage="O campo não deve ficar vazio"
                    />
                  ),
                },
              ]}
            />
          );
        })}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          business_name: props.valuesUpdate.business_name,
          business_categories: props.valuesUpdate.business_categories,
          business_address: props.valuesUpdate.business_address,
          business_city: props.valuesUpdate.business_city,
          business_postal_code: props.valuesUpdate.business_postal_code,
          business_country: props.valuesUpdate.business_country,
          num_employees: props.valuesUpdate.num_employees,
          revenue_currency: props.valuesUpdate.revenue_currency,
          revenue_min: props.valuesUpdate.revenue_min,
          revenue_max: props.valuesUpdate.revenue_max,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: 'Informações empresariais',
        })}
      >
        {Object.keys(ListaProfissional).map((campo) => {
          return (
            <ProFormText
              name={campo}
              label={campo.replace(/(_)/g, ' ').toUpperCase()}
              width="lg"
              rules={[
                {
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.ruleName.nameRules"
                      defaultMessage="O campo não deve ficar vazio"
                    />
                  ),
                },
              ]}
            />
          );
        })}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          linkedinURL: props.valuesUpdate.linkedinURL,
          facebookURL: props.valuesUpdate.facebookURL,
          websites: props.valuesUpdate.websites,
          custom_fields: props.valuesUpdate.custom_fields,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.schedulingPeriod.title',
          defaultMessage: 'Páginas pessoais',
        })}
      >
        <>
          {Object.keys(ListaSocial).map((campo) => {
            return (
              <ProFormText
                name={campo}
                label={campo}
                width="lg"
                rules={[
                  {
                    message: (
                      <FormattedMessage
                        id="pages.searchTable.updateForm.ruleName.nameRules"
                        defaultMessage="O campo não deve ficar vazio"
                      />
                    ),
                  },
                ]}
              />
            );
          })}

          <Form name="dynamic_form_nest_item" autoComplete="off">
            <Form.List name="custom_fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'nome_campo']}
                        fieldKey={[field.fieldKey, 'nome_custom']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input
                          placeholder="Campo personalizado"
                          onChange={(e) =>
                            setCamposCustom({ ...camposCustom, nome_campo: e.target.value })
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'valor_campo']}
                        fieldKey={[field.fieldKey, 'valor_custom']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input
                          placeholder="Valor do campo"
                          onChange={(e) =>
                            setCamposCustom({ ...camposCustom, valor_campo: e.target.value })
                          }
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default ModalForm;

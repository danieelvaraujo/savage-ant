import React from 'react';
import { Modal } from 'antd';
import { ProFormText, StepsForm } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import type { TableListItem } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
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
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          uuid: props.values.uuid,
          first_name: props.values.first_name,
          last_name: props.values.last_name,
          emails: props.values.emails,
          phones: props.values.phones,
          gender: props.values.gender,
          address: props.values.address,
          city: props.values.city,
          postal_code: props.values.postal_code,
          country: props.values.country,
          birthday: props.values.birthday,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: 'Informações básicas',
        })}
      >
        <ProFormText
          name="first_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Primeiro nome',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="last_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Sobrenome',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="emails"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Email',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="gender"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Seu gênero',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="address"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Endereço',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="city"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Cidade',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="postal_code"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Primeiro nome',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="country"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'País',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="birthday"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Data de nascimento',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          job_function: props.values.job_function,
          job_level: props.values.job_level,
          job_title: props.values.job_title,
          business_name: props.values.business_name,
          business_categories: props.values.business_categories,
          business_address: props.values.business_address,
          business_city: props.values.business_city,
          business_postal_code: props.values.business_postal_code,
          business_country: props.values.business_country,
          num_employees: props.values.num_employees,
          revenue_currency: props.values.revenue_currency,
          revenue_min: props.values.revenue_min,
          revenue_max: props.values.revenue_max,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: 'Informações empresariais',
        })}
      >
        <ProFormText
          name="business_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Nome da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="business_categories"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Categoria da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="business_address"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Endereço da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="business_city"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Cidade da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="business_postal_code"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'CEP da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="business_country"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'País da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="num_employees"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Número de empregados',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="revenue_currency"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Moeda principal da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="revenue_min"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Receita mínima da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="revenue_max"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Receita máxima da empresa',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          linkedinURL: props.values.linkedinURL,
          facebookURL: props.values.facebookURL,
          websites: props.values.websites,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.schedulingPeriod.title',
          defaultMessage: 'Páginas pessoais',
        })}
      >
        <ProFormText
          name="linkedinURL"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Linkedin',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="facebookURL"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Facebook',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="websites"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Website',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="custom"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Opção customizada',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

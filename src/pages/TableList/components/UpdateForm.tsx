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
  onSubmitUpdate?: (values: FormValueType) => Promise<void>;
  onSubmitCreate?: (values: FormValueType) => Promise<void>;
  updateModalVisible?: boolean;
  createModalVisible?: boolean;
  valuesUpdate: Partial<TableListItem>;
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
      onFinish={props.updateModalVisible ? props.onSubmitUpdate : props.onSubmitCreate}
    >
      <StepsForm.StepForm
        initialValues={{
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
        }}
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

        <ProFormText
          name="first_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Primeiro nome',
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
        <ProFormText
          name="last_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Sobrenome',
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
        <ProFormText
          name="emails"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Email',
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
        <ProFormText
          name="gender"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Seu gênero',
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
        <ProFormText
          name="address"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Endereço',
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
        <ProFormText
          name="city"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Cidade',
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
        <ProFormText
          name="postal_code"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'CEP',
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
        <ProFormText
          name="country"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'País',
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
        <ProFormText
          name="birthday"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Data de nascimento',
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
        <ProFormText
          name="job_function"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Profissão',
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
        <ProFormText
          name="job_level"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Nível de proficiência',
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
        <ProFormText
          name="job_title"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Posto de trabalho',
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
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          job_function: props.valuesUpdate.job_function,
          job_level: props.valuesUpdate.job_level,
          job_title: props.valuesUpdate.job_title,
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
        <ProFormText
          name="business_name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Nome da empresa',
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
        <ProFormText
          name="business_categories"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Categoria da empresa',
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
        <ProFormText
          name="business_address"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Endereço da empresa',
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
        <ProFormText
          name="business_city"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Cidade da empresa',
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
        <ProFormText
          name="business_postal_code"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'CEP da empresa',
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
        <ProFormText
          name="business_country"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'País da empresa',
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
        <ProFormText
          name="num_employees"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Número de empregados',
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
        <ProFormText
          name="revenue_currency"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Moeda principal da empresa',
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
        <ProFormText
          name="revenue_min"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Receita mínima da empresa',
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
        <ProFormText
          name="revenue_max"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Receita máxima da empresa',
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
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          linkedinURL: props.valuesUpdate.linkedinURL,
          facebookURL: props.valuesUpdate.facebookURL,
          websites: props.valuesUpdate.websites,
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
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="O campo não deve ficar vazio"
                />
              ),
            },
          ]}
        />
        {/* <ProFormText
          name="custom"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Opção customizada',
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
        /> */}
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

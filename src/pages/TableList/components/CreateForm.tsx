import React, { useState } from 'react';
import { Modal, Typography, Row, Button } from 'antd';
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

export type CreateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();

  const [custom, setCustom] = useState(false);

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={800}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: 'Criar contato',
            })}
            visible={props.createModalVisible}
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
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: 'Informações pessoais',
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
            defaultMessage: 'CEP',
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
        <ProFormText
          name="job_function"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Profissão',
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
          name="job_level"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Nível de proficiência',
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
          name="job_title"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Posto de trabalho',
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
        <Row>
          <Typography.Text>Você deseja inserir um campo customizado?</Typography.Text>
        </Row>
        <Row>
          <Button onClick={() => setCustom(true)}>Inserir</Button>
        </Row>
        {custom ? (
          <Row>
            <ProFormText
              name="key"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleName.nameLabel',
                defaultMessage: 'Nome do campo customizado',
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
              name="json"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleName.nameLabel',
                defaultMessage: 'Valor do campo customizado',
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
          </Row>
        ) : null}
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateForm;

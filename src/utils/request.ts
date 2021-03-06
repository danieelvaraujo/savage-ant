/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage: { [status: number]: string } = {
  200: 'O servidor retornou com sucesso os dados solicitados.',
  201: 'Dados novos ou modificados foram bem-sucedidos.',
  202: 'Uma solicitação entrou na fila de segundo plano (tarefa assíncrona).',
  204: 'Os dados foram excluídos com sucesso.',
  400: 'Ocorreu um erro na solicitação enviada e o servidor não criou ou modificou os dados.',
  401: 'O usuário não tem permissão (token, nome de usuário e senha estão errados).',
  403: 'O usuário está autorizado, mas o acesso é proibido.',
  404: 'Solicitação enviada para um registro que não existe.',
  406: 'O formato solicitado não está disponível.',
  410: 'O recurso solicitado foi excluído permanentemente e não está mais disponível.',
  422: 'Ao criar um objeto, ocorreu um erro de validação.',
  500: 'Ocorreu um erro no servidor.',
  502: 'Erro de gateway.',
  503: 'O serviço não está disponível e o servidor está temporariamente sobrecarregado.',
  504: 'O gateway atingiu o tempo limite.',
};

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: 'https://tsah.agencysavage.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default request;

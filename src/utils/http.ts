import router from '@/router';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { propertyToCamelCase, propertyToSnakeCase } from './change_case';

const ErrorDic: {
  [key: number]: string;
} = {
  400: '错误的请求',
  401: '未授权，请登录',
  403: '服务器拒绝访问',
  404: '服务器未找到资源',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
};

class ApiError extends Error {
  constructor(public code = 0, message = '') {
    super(message);
    this.name = this.constructor.name;
  }

  static createBuiltInApiError(statusCode: number) {
    const message = ErrorDic[statusCode];
    if (message) {
      return new ApiError(statusCode, message);
    } else {
      return new ApiError(statusCode, '抱歉出错了');
    }
  }
}

export enum RequestContentType {
  URL_ENCODE = 0,
  JSON = 1,
  FORM_DATA = 2
}

interface BostonRequestConfig {
  withCredentials?: boolean;
  contentType?: RequestContentType;
}

const formDataContentType = 'multipart/form-data';
const defaultRequestConfig: AxiosRequestConfig = {
  timeout: 20000,
  headers: {}
};

function getInstanceConfig(
  instanceConfig: AxiosRequestConfig
): AxiosRequestConfig {
  const { timeout, baseURL, headers } = instanceConfig;
  let mergedHeaders = defaultRequestConfig.headers;
  if (instanceConfig.headers) {
    mergedHeaders = Object.assign(
      {},
      defaultRequestConfig.headers,
      instanceConfig.headers
    );
  }
  return Object.assign({}, defaultRequestConfig, {
    timeout,
    baseURL,
    mergedHeaders
  });
}

type InterceptorFulfill<V> = (value: V) => V | Promise<V>;
type InterceptorReject = (error: any) => any;

export class AjaxRequest {
  private _axiosInstanceConfig: AxiosRequestConfig;
  private _ajax: AxiosInstance;
  private _concurrencyMap: Map<string, Promise<AxiosResponse<any>>>;

  constructor(instanceConfig: AxiosRequestConfig = {}) {
    this._concurrencyMap = new Map();

    this._axiosInstanceConfig = getInstanceConfig(instanceConfig);
    this._ajax = axios.create(this._axiosInstanceConfig);

    this._ajax.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {};
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this._ajax.interceptors.response.use(
      (res) => {
        if (res && res.status === 200) {
          if (res.data) {
            // 转换驼峰
            res.data = propertyToCamelCase(res.data);
            // 判断是否需要授权
            if (!res.data.isSuccess && res.data.errorCode === 1) {
              const currentUrl = location.href;
              router.replace({
                name: 'login'
              });
              throw ApiError.createBuiltInApiError(401);
            }
            return res;
          } else {
            throw new ApiError(200, '接口返回数据为空');
          }
        } else {
          throw new ApiError(0, '抱歉出错了');
        }
      },
      (error) => {
        let errorInstance = null;
        if (error.response) {
          errorInstance = ApiError.createBuiltInApiError(error.response.status);
        } else {
          errorInstance = new ApiError(0, '抱歉出错了');
        }
        // throw error
        return Promise.reject(errorInstance);
      }
    );
  }

  registerRequestInterceptor(
    fulfilled: InterceptorFulfill<AxiosRequestConfig>,
    rejected: InterceptorReject
  ) {
    if (fulfilled) {
      this._ajax.interceptors.request.use(fulfilled, rejected);
    }
  }

  registerResponseInterceptor<V>(
    fulfilled: InterceptorFulfill<AxiosResponse<V>>,
    rejected: InterceptorReject
  ) {
    if (fulfilled) {
      this._ajax.interceptors.response.use(fulfilled, rejected);
    }
  }

  async get<V>(
    url: string,
    params: any,
    { withCredentials = true }: BostonRequestConfig = {}
  ): Promise<AxiosResponse<V>> {
    // 转换下划线
    // params = propertyToSnakeCase(params);

    const resultParams = params || {};
    resultParams.ts = +new Date();
    const key = qs.stringify({
      url,
      params
    });
    if (this._concurrencyMap.has(key)) {
      return (await this._concurrencyMap.get(key)) as AxiosResponse<V>;
    } else {
      const pro = this._ajax.get<V, AxiosResponse<V>>(url, {
        params: resultParams,
        withCredentials
      });
      this._concurrencyMap.set(key, pro);
      const result = await pro;
      this._concurrencyMap.delete(key);
      return result;
    }
  }

  async post<V>(
    url: string,
    params: any,
    {
      withCredentials = true,
      contentType = RequestContentType.URL_ENCODE
    }: BostonRequestConfig = {}
  ): Promise<AxiosResponse<V>> {
    // 转换下划线
    // params = propertyToSnakeCase(params);

    let resultParams = params;
    if (contentType === RequestContentType.URL_ENCODE) {
      resultParams = qs.stringify(resultParams);
    }
    const httpHeader: any = {};
    if (contentType === RequestContentType.FORM_DATA) {
      httpHeader['Content-Type'] = formDataContentType;
    }
    return await this._ajax.post<V, AxiosResponse<V>>(url, resultParams, {
      withCredentials,
      headers: httpHeader
    });
  }
}

export default new AjaxRequest();

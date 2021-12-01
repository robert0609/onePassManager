export enum API_ERROR_CODE {
  UNKNOWN = 0,
  RESTORE_ERROR = 5001,
  NEED_AUTH = 4001
}

const ErrorDic: {
  [key: number]: string;
} = {
  5001: '备份数据恢复失败',
  4001: '需要授权'
};

export class ApiError extends Error {
  constructor(
    public code: API_ERROR_CODE = API_ERROR_CODE.UNKNOWN,
    message = '',
    public params?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  static createApiError(message?: string, params?: any) {
    if (message) {
      return new ApiError(API_ERROR_CODE.UNKNOWN, message, params);
    } else {
      return new ApiError(API_ERROR_CODE.UNKNOWN, '抱歉出错了', params);
    }
  }

  static createBuiltInApiError(errorCode: API_ERROR_CODE, params?: any) {
    const message = ErrorDic[errorCode];
    if (message) {
      return new ApiError(errorCode, message, params);
    } else {
      return new ApiError(errorCode, '抱歉出错了', params);
    }
  }
}

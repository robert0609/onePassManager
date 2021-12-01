export enum UI_ERROR_CODE {
  UNKNOWN = 0
}

const ErrorDic: {
  [key: number]: string;
} = {};

export class UIError extends Error {
  constructor(
    public code: UI_ERROR_CODE = UI_ERROR_CODE.UNKNOWN,
    message = '',
    public params?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  static createUIError(message?: string, params?: any) {
    if (message) {
      return new UIError(UI_ERROR_CODE.UNKNOWN, message, params);
    } else {
      return new UIError(UI_ERROR_CODE.UNKNOWN, '抱歉出错了', params);
    }
  }

  static createBuiltInUIError(errorCode: UI_ERROR_CODE, params?: any) {
    const message = ErrorDic[errorCode];
    if (message) {
      return new UIError(errorCode, message, params);
    } else {
      return new UIError(errorCode, '抱歉出错了', params);
    }
  }
}

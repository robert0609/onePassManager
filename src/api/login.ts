import { ApiError, API_ERROR_CODE } from '@/core/exception';
import ajax from '@/utils/http';
import { BaseResponse } from './base';

//#region login
export interface LoginRequest {
  authority: string;
}

export type LoginResponse = BaseResponse;

export async function login(params: LoginRequest): Promise<LoginResponse> {
  const res = await ajax.post<LoginResponse>('/login', params);
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

//#region checkLogin
export type CheckLoginResponse = BaseResponse;

export async function checkLogin(): Promise<CheckLoginResponse> {
  const res = await ajax.get<CheckLoginResponse>('/login', null);
  if (!res.data.isSuccess) {
    if (res.data.errorCode === 1) {
      throw ApiError.createBuiltInApiError(API_ERROR_CODE.NEED_AUTH);
    } else {
      throw ApiError.createApiError(
        res.data.message ? res.data.message : res.data.errorCode?.toString()
      );
    }
  }
  return res.data;
}
//#endregion

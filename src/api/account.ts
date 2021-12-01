import { ApiError } from '@/core/exception';
import ajax from '@/utils/http';
import { BaseResponse } from './base';

export interface Account {
  id: number;
  siteId: number;
  userName: string;
  password: string;
}

//#region getAccountListBySite
export interface GetAccountListBySiteRequest {
  siteId: number;
}

export type GetAccountListBySiteResponse = BaseResponse<Account[]>;

export async function getAccountListBySite(
  params: GetAccountListBySiteRequest
): Promise<GetAccountListBySiteResponse> {
  const res = await ajax.get<GetAccountListBySiteResponse>(
    '/webapi/account/fetch',
    {
      siteid: params.siteId
    }
  );
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

//#region getAccountInfoById
export interface GetAccountInfoByIdRequest {
  id: number;
}

export type GetAccountInfoByIdResponse = BaseResponse<Account[]>;

export async function getAccountInfoById(
  params: GetAccountInfoByIdRequest
): Promise<GetAccountInfoByIdResponse> {
  const res = await ajax.get<GetAccountInfoByIdResponse>(
    '/webapi/account/fetch',
    params
  );
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

//#region updateAccountInfo
export interface UpdateAccountInfoRequest {
  account: Account;
}

export type UpdateAccountInfoResponse = BaseResponse;

export async function updateAccountInfo(
  params: UpdateAccountInfoRequest
): Promise<UpdateAccountInfoResponse> {
  const acc = params.account;
  const res = await ajax.get<UpdateAccountInfoResponse>(
    '/webapi/account/save',
    {
      account: JSON.stringify({
        Id: acc.id,
        SiteId: acc.siteId,
        UserName: encodeURIComponent(acc.userName),
        Password: acc.password
      })
    }
  );
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

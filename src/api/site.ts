import { ApiError } from '@/core/exception';
import ajax from '@/utils/http';
import { BaseResponse } from './base';

export interface Site {
  id: number;
  name: string;
  url: string;
  level: string;
}

//#region search
export interface SearchRequest {
  keyword: string;
  withaccount: boolean;
}

export type SearchResponse = BaseResponse<Site[]>;

export async function search(params: SearchRequest): Promise<SearchResponse> {
  const res = await ajax.get<SearchResponse>('/webapi/search', params);
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

//#region getSiteListByLevel
export interface GetSiteListByLevelRequest {
  level: string;
}

export type GetSiteListByLevelResponse = BaseResponse<Site[]>;

export async function getSiteListByLevel(
  params: GetSiteListByLevelRequest
): Promise<GetSiteListByLevelResponse> {
  const res = await ajax.get<GetSiteListByLevelResponse>(
    '/webapi/site/fetch',
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

//#region getSiteInfoById
export interface GetSiteInfoByIdRequest {
  id: number;
}

export type GetSiteInfoByIdResponse = BaseResponse<Site[]>;

export async function getSiteInfoById(
  params: GetSiteInfoByIdRequest
): Promise<GetSiteInfoByIdResponse> {
  const res = await ajax.get<GetSiteInfoByIdResponse>(
    '/webapi/site/fetch',
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

//#region updateSiteInfo
export interface UpdateSiteInfoRequest {
  site: Site;
}

export type UpdateSiteInfoResponse = BaseResponse;

export async function updateSiteInfo(
  params: UpdateSiteInfoRequest
): Promise<UpdateSiteInfoResponse> {
  const site = params.site;
  const res = await ajax.post<UpdateSiteInfoResponse>('/webapi/site/save', {
    site: JSON.stringify({
      Id: site.id,
      Name: encodeURIComponent(site.name),
      Url: site.url,
      Level: site.level
    })
  });
  if (!res.data.isSuccess) {
    throw ApiError.createApiError(
      res.data.message ? res.data.message : res.data.errorCode?.toString()
    );
  }
  return res.data;
}
//#endregion

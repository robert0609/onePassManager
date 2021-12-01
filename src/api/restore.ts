import { ApiError, API_ERROR_CODE } from '@/core/exception';
import { upload } from '@/utils/upload';
import { BaseResponse } from './base';

//#region restore
export interface RestoreRequest {
  file: File;
}

export type RestoreResponse = BaseResponse;

export async function restore(
  params: RestoreRequest
): Promise<RestoreResponse> {
  try {
    await upload('/restore', params.file);
    return {
      isSuccess: true,
      data: undefined
    };
  } catch {
    throw ApiError.createBuiltInApiError(API_ERROR_CODE.RESTORE_ERROR);
  }
}
//#endregion

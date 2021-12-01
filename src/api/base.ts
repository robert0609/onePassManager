export interface BaseResponse<T = undefined> {
  isSuccess: boolean;
  errorCode?: number;
  message?: string;
  data: T;
}

// export interface BaseInquireRequest {
//   pageIndex?: number;
//   pageSize?: number;
// }

// export type BaseInquireResponse<T, U = {}> = BaseResponse<{
//   list: T[];
//   currentPageIndex: number;
//   totalPageCount: number;
//   totalCount: number;
// } & U>;

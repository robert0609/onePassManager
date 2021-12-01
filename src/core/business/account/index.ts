import { ref, reactive, toRaw } from 'vue';
import {
  getAccountListBySite,
  getAccountInfoById,
  updateAccountInfo,
  Account
} from '@/api';
import { UIError } from '@/core/exception';
import { isStringEmpty } from 'roy-type-assert';

export function accountListController() {
  const siteId = ref<number>(0);

  const accountList = ref<Account[]>([]);
  const currentPageIndex = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPageCount = ref<number>(1);
  const totalCount = ref<number>(0);

  async function fetchAccountList() {
    try {
      if (siteId.value > 0) {
        const res = await getAccountListBySite({ siteId: siteId.value });
        accountList.value = res.data;
        pageSize.value = res.data.length;
        totalCount.value = res.data.length;
      } else {
        throw UIError.createUIError('没有传入应用编号条件');
      }
    } catch (e) {
      accountList.value = [];
      currentPageIndex.value = 0;
      pageSize.value = 0;
      totalCount.value = 0;
      throw e;
    }
  }

  return {
    siteId,
    accountList,
    currentPageIndex,
    pageSize,
    totalPageCount,
    totalCount,
    fetchAccountList
  };
}

export function accountController() {
  const account = reactive<Account>({
    id: 0,
    siteId: 0,
    userName: '',
    password: ''
  });

  async function fetchAccount() {
    try {
      if (account.id > 0) {
        const res = await getAccountInfoById({
          id: account.id
        });
        if (res.data.length > 0) {
          account.siteId = res.data[0].siteId;
          account.userName = res.data[0].userName;
          account.password = res.data[0].password;
        } else {
          throw UIError.createUIError('未查询到账号');
        }
      } else {
        throw UIError.createUIError('没有传入有效账号id');
      }
    } catch (e) {
      account.userName = '';
      account.password = '';
      throw e;
    }
  }

  async function updateAccount() {
    if (isStringEmpty(account.userName)) {
      throw UIError.createUIError('请输入用户名');
    }
    if (isStringEmpty(account.password)) {
      throw UIError.createUIError('请输入密码');
    }
    try {
      await updateAccountInfo({
        account: toRaw(account)
      });
    } catch (e) {
      throw e;
    }
  }

  return {
    account,
    fetchAccount,
    updateAccount
  };
}

import {
  getSiteInfoById,
  getSiteListByLevel,
  search,
  Site,
  updateSiteInfo
} from '@/api';
import { UIError } from '@/core/exception';
import { isStringEmpty } from 'roy-type-assert';
import { ref, reactive, toRaw } from 'vue';

export function siteListController() {
  const id = ref<number>(0);
  const level = ref<string>('');
  const keyword = ref<string>('');

  const siteList = ref<Site[]>([]);
  const currentPageIndex = ref<number>(0);
  const pageSize = ref<number>(0);
  const totalPageCount = ref<number>(1);
  const totalCount = ref<number>(0);

  async function fetchSiteList() {
    try {
      // 优先按照siteId来查询
      if (id.value > 0) {
        const res = await getSiteInfoById({ id: id.value });
        siteList.value = res.data;
        pageSize.value = res.data.length;
        totalCount.value = res.data.length;
      } else if (!isStringEmpty(level.value)) {
        const res = await getSiteListByLevel({ level: level.value });
        siteList.value = res.data;
        pageSize.value = res.data.length;
        totalCount.value = res.data.length;
      } else if (!isStringEmpty(keyword.value)) {
        const res = await search({
          keyword: keyword.value,
          withaccount: false
        });
        siteList.value = res.data;
        pageSize.value = res.data.length;
        totalCount.value = res.data.length;
      } else {
        throw UIError.createUIError('请设置筛选条件');
      }
    } catch (e) {
      siteList.value = [];
      currentPageIndex.value = 0;
      pageSize.value = 0;
      totalCount.value = 0;
      throw e;
    }
  }

  return {
    id,
    level,
    keyword,
    siteList,
    currentPageIndex,
    pageSize,
    totalPageCount,
    totalCount,
    fetchSiteList
  };
}

export function siteController() {
  const site = reactive<Site>({
    id: 0,
    name: '',
    url: '',
    level: ''
  });

  async function fetchSite() {
    try {
      if (site.id > 0) {
        const res = await getSiteInfoById({
          id: site.id
        });
        if (res.data.length > 0) {
          site.name = res.data[0].name;
          site.url = res.data[0].url;
          site.level = res.data[0].level;
        } else {
          throw UIError.createUIError('未查询到网站');
        }
      } else {
        throw UIError.createUIError('请设置网站id');
      }
    } catch (e) {
      site.name = '';
      site.url = '';
      site.level = '';
      throw e;
    }
  }

  async function updateSite() {
    if (isStringEmpty(site.name)) {
      throw UIError.createUIError('请输入应用名称');
    }
    site.level = site.level.toString();
    if (isStringEmpty(site.level)) {
      throw UIError.createUIError('请输入应用级别');
    }
    try {
      await updateSiteInfo({
        site: toRaw(site)
      });
    } catch (e) {
      throw e;
    }
  }

  return {
    site,
    fetchSite,
    updateSite
  };
}

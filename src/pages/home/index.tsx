import { defineComponent, onMounted, ref } from 'vue';
import LayoutMain from '@/components/layoutMain';
import OneTable from '@/components/table';
import { siteListController } from '@/core/business/site';
import { ElMessage, ElLoading, ILoadingInstance } from 'element-plus';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { Site } from '@/api';
import SiteEdit from '@/pages/site/edit';
import { isStringEmpty } from 'roy-type-assert';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const route = useRoute();
    let loadingInstance: ILoadingInstance | undefined;
    const showEditApp = ref<boolean>(false);

    const {
      keyword,
      siteList,
      pageSize,
      currentPageIndex,
      totalCount,
      fetchSiteList
    } = siteListController();

    const selectedSiteId = ref<number>(0);
    const selectedLevel = ref<string>('');

    onMounted(() => {
      keyword.value = route.query.keyword as string;
      if (isStringEmpty(keyword.value)) {
        return;
      }
      loadSiteList();
    });

    onBeforeRouteUpdate((to, from, next) => {
      keyword.value = to.query.keyword as string;
      if (isStringEmpty(keyword.value)) {
        return;
      }
      loadSiteList();
      next();
    });

    function loadSiteList() {
      loadingInstance = ElLoading.service({
        target: '#site-table'
      });
      fetchSiteList()
        .catch((e) => {
          ElMessage.error(e.message);
        })
        .finally(() => {
          if (loadingInstance) {
            loadingInstance.close();
          }
        });
    }

    function onClickAccountList(row: Site) {
      router.push({
        name: 'accountList',
        query: {
          site_id: row.id
        }
      });
    }

    function onClickEditApp(row: Site) {
      selectedSiteId.value = row.id;
      selectedLevel.value = row.level;
      showEditApp.value = true;
    }

    function onDrawConfirm() {
      showEditApp.value = false;
      loadSiteList();
    }

    return () => (
      <>
        <LayoutMain>
          <OneTable
            data={siteList.value}
            pageSize={pageSize.value}
            currentPageIndex={currentPageIndex.value}
            totalCount={totalCount.value}
            {...{
              id: 'site-table',
              height: '750px'
            }}
          >
            <ElTableColumn prop="id" label="应用编号"></ElTableColumn>
            <ElTableColumn prop="level" label="应用级别"></ElTableColumn>
            <ElTableColumn prop="name" label="应用名称"></ElTableColumn>
            <ElTableColumn prop="url" label="应用地址"></ElTableColumn>
            <ElTableColumn
              label="操作"
              v-slots={{
                default: ({ row }: { row: Site }) => (
                  <>
                    <ElLink
                      type="primary"
                      href="javascript:void(0);"
                      onClick={() => onClickEditApp(row)}
                    >
                      编辑
                    </ElLink>
                    <ElDivider direction="vertical"></ElDivider>
                    <ElLink
                      type="primary"
                      href="javascript:void(0);"
                      onClick={() => onClickAccountList(row)}
                    >
                      账号列表
                    </ElLink>
                  </>
                )
              }}
            ></ElTableColumn>
          </OneTable>
        </LayoutMain>
        <ElDrawer
          title="应用编辑"
          size="30%"
          {...{
            modelValue: showEditApp.value,
            ['onUpdate:modelValue']: (val: boolean) => (showEditApp.value = val)
          }}
        >
          {showEditApp.value ? (
            <SiteEdit
              level={selectedLevel.value}
              id={selectedSiteId.value}
              onConfirm={onDrawConfirm}
              onCancel={() => (showEditApp.value = false)}
            />
          ) : undefined}
        </ElDrawer>
      </>
    );
  }
});

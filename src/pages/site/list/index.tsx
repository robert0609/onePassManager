import { defineComponent, onMounted, ref } from 'vue';
import LayoutMain from '@/components/layoutMain';
import OneTable from '@/components/table';
import { siteListController } from '@/core/business/site';
import { ElMessage, ElLoading, ILoadingInstance } from 'element-plus';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { Site } from '@/api';
import SiteEdit from '@/pages/site/edit';

export default defineComponent({
  name: 'SiteList',
  setup() {
    const router = useRouter();
    const route = useRoute();
    let loadingInstance: ILoadingInstance | undefined;
    const showEditApp = ref<boolean>(false);

    const {
      level,
      siteList,
      pageSize,
      currentPageIndex,
      totalCount,
      fetchSiteList
    } = siteListController();

    const selectedSiteId = ref<number>(0);

    onMounted(() => {
      level.value = route.query.level as string;
      loadSiteList();
    });

    onBeforeRouteUpdate((to, from, next) => {
      level.value = to.query.level as string;
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

    function onClickEditApp(row?: Site) {
      if (row) {
        selectedSiteId.value = row.id;
      } else {
        selectedSiteId.value = 0;
      }
      showEditApp.value = true;
    }

    function onDrawConfirm() {
      showEditApp.value = false;
      loadSiteList();
    }

    return () => (
      <>
        <LayoutMain>
          <div class="flex justify-end">
            <ElButton
              icon="ElIconPlus"
              type="primary"
              onClick={() => onClickEditApp()}
            >
              新增应用
            </ElButton>
          </div>
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
            <ElTableColumn prop="name" label="应用名称"></ElTableColumn>
            <ElTableColumn
              label="应用地址"
              v-slots={{
                default: ({ row }: { row: Site }) => {
                  return row.url === 'none' ? undefined : (
                    <ElLink href={row.url} {...{ target: '_blank' }}>
                      {row.url}
                    </ElLink>
                  );
                }
              }}
            ></ElTableColumn>
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
                      帐号列表
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
              level={level.value}
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

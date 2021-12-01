import { defineComponent, onMounted, ref } from 'vue';
import LayoutMain from '@/components/layoutMain';
import { accountListController } from '@/core/business/account';
import { useRoute } from 'vue-router';
import { ElMessage, ElLoading, ILoadingInstance } from 'element-plus';
import { Account } from '@/api';
import AccountEdit from '@/pages/account/edit';
import AccountCard from '@/components/accountCard';

export default defineComponent({
  name: 'AccountList',
  setup() {
    const route = useRoute();
    let loadingInstance: ILoadingInstance | undefined;
    const { siteId, accountList, fetchAccountList } = accountListController();
    const showEditAccount = ref<boolean>(false);
    const selectedAccountId = ref<number>(0);

    onMounted(() => {
      siteId.value = Number(route.query.site_id);
      loadAccountList();
    });

    function loadAccountList() {
      loadingInstance = ElLoading.service({
        target: '#account-list'
      });
      fetchAccountList()
        .catch((e) => {
          ElMessage.error(e.message);
        })
        .finally(() => {
          if (loadingInstance) {
            loadingInstance.close();
          }
        });
    }

    function onClickEditAccount(account?: Account) {
      if (account) {
        selectedAccountId.value = account.id;
      } else {
        selectedAccountId.value = 0;
      }
      showEditAccount.value = true;
    }

    function onDrawConfirm() {
      showEditAccount.value = false;
      loadAccountList();
    }

    return () => (
      <>
        <LayoutMain>
          <div class="flex justify-end">
            <ElButton
              icon="ElIconPlus"
              type="primary"
              onClick={() => onClickEditAccount()}
            >
              新增账号
            </ElButton>
          </div>
          <div id="account-list" class="flex gap-4 flex-wrap">
            {accountList.value.map((account) => {
              return (
                <AccountCard
                  account={account}
                  onClickEdit={onClickEditAccount}
                />
              );
            })}
          </div>
        </LayoutMain>
        <ElDrawer
          title="账号编辑"
          size="30%"
          {...{
            modelValue: showEditAccount.value,
            ['onUpdate:modelValue']: (val: boolean) =>
              (showEditAccount.value = val)
          }}
        >
          {showEditAccount.value ? (
            <AccountEdit
              id={selectedAccountId.value}
              siteId={siteId.value}
              onConfirm={onDrawConfirm}
              onCancel={() => (showEditAccount.value = false)}
            />
          ) : undefined}
        </ElDrawer>
      </>
    );
  }
});

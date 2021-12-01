import { Account } from '@/api';
import { defineComponent, onMounted, ref, computed } from 'vue';
import ClipboardJS from 'clipboard';
import { ElNotification } from 'element-plus';

export default defineComponent<
  {
    account: any;
  },
  any,
  any,
  any,
  any,
  any,
  any,
  {
    clickEdit: (account: Account) => void;
  }
>({
  name: 'AccountCard',
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  emits: ['clickEdit'],
  setup(props, { emit }) {
    const account = props.account as Account; // 这种写法比较恶心
    const copyUsernameButtonId = computed(() => `copy-username-${account.id}`);
    const copyPasswordButtonId = computed(() => {
      return `copy-password-${account.id}`;
    });

    onMounted(() => {
      const copyUsernameHandler = new ClipboardJS(
        `#${copyUsernameButtonId.value}`,
        {
          text: () => {
            return account.userName;
          }
        }
      );
      copyUsernameHandler.on('success', (e) => {
        ElNotification({
          message: '复制用户名成功',
          type: 'success'
        });

        e.clearSelection();
      });

      const copyPasswordHandler = new ClipboardJS(
        `#${copyPasswordButtonId.value}`,
        {
          text: () => {
            return account.password;
          }
        }
      );
      copyPasswordHandler.on('success', (e) => {
        ElNotification({
          message: '复制密码成功',
          type: 'success'
        });

        e.clearSelection();
      });
    });

    return () => (
      <>
        <ElCard shadow="hover" class=" w-1/5">
          <div class="flex">{account.userName}</div>
          <div class="flex justify-end">
            <ElLink
              type="primary"
              href="javascript:void(0);"
              onClick={() => emit('clickEdit', account)}
            >
              编辑
            </ElLink>
            <ElDivider direction="vertical"></ElDivider>
            <ElLink
              {...{
                id: copyUsernameButtonId.value
              }}
              type="primary"
              href="javascript:void(0);"
            >
              复制用户名
            </ElLink>
            <ElDivider direction="vertical"></ElDivider>
            <ElLink
              {...{
                id: copyPasswordButtonId.value
              }}
              type="primary"
              href="javascript:void(0);"
            >
              复制密码
            </ElLink>
          </div>
        </ElCard>
      </>
    );
  }
});

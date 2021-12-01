import { defineComponent, ref, onMounted } from 'vue';
import { accountController } from '@/core/business/account';
import { ElLoading, ElMessage, ILoadingInstance } from 'element-plus';

const chars =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#'.split('');
function randomPassword(n: number) {
  const result = [];
  const max = chars.length;
  for (let i = 0; i < n; ++i) {
    const idx = Math.floor(Math.random() * max);
    result.push(chars[idx]);
  }
  return result.join('');
}

export default defineComponent({
  name: 'AccountEdit',
  props: {
    id: {
      type: Number,
      required: true
    },
    siteId: {
      type: Number,
      required: true
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const { account, fetchAccount, updateAccount } = accountController();
    const submitLoading = ref<boolean>(false);
    const refForm = ref<typeof ElForm | null>(null);
    let loadingInstance: ILoadingInstance | undefined;

    const formRules = {
      userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    };

    function onClickSave(): void {
      if (refForm.value) {
        submitLoading.value = true;
        refForm.value.validate((isValid: boolean) => {
          if (isValid) {
            updateAccount()
              .then(() => {
                emit('confirm');
              })
              .catch((e) => {
                ElMessage.error(e.message);
              })
              .finally(() => {
                submitLoading.value = false;
              });
          } else {
            submitLoading.value = false;
          }
        });
      }
    }

    function onClickCancel() {
      emit('cancel');
    }

    onMounted(() => {
      account.id = props.id;
      account.siteId = props.siteId;

      if (account.id > 0) {
        loadingInstance = ElLoading.service({
          target: '#edit-form'
        });
        fetchAccount()
          .catch((e) => {
            ElMessage.error(e.message);
          })
          .finally(() => {
            if (loadingInstance) {
              loadingInstance.close();
            }
          });
      }
    });

    function onClickGenerate() {
      account.password = randomPassword(10);
    }

    return () => (
      <ElForm
        model={account}
        ref={refForm}
        rules={formRules}
        labelPosition="right"
        labelWidth="90px"
        {...{
          id: 'edit-form'
        }}
      >
        <ElFormItem label="用户名" prop="userName">
          <ElInput
            {...{
              modelValue: account.userName,
              ['onUpdate:modelValue']: (val: string) => (account.userName = val)
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput
            {...{
              modelValue: account.password,
              ['onUpdate:modelValue']: (val: string) => (account.password = val)
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton onClick={onClickGenerate}>生成密码</ElButton>
          <ElButton
            type="primary"
            onClick={onClickSave}
            loading={submitLoading.value}
          >
            提交
          </ElButton>
          <ElButton onClick={onClickCancel}>取消</ElButton>
        </ElFormItem>
      </ElForm>
    );
  }
});

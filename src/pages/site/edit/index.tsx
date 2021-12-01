import { defineComponent, ref, onMounted } from 'vue';
import { siteController } from '@/core/business/site';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'SiteEdit',
  props: {
    id: {
      type: Number,
      required: true
    },
    level: {
      type: String,
      required: true
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const { site, fetchSite, updateSite } = siteController();
    const submitLoading = ref<boolean>(false);
    const refForm = ref<typeof ElForm | null>(null);

    const formRules = {
      name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }]
    };

    function onClickSave(): void {
      if (refForm.value) {
        submitLoading.value = true;
        refForm.value.validate((isValid: boolean) => {
          if (isValid) {
            updateSite()
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
      site.id = props.id;
      site.level = props.level;

      if (site.id > 0) {
        fetchSite().catch((e) => {
          ElMessage.error(e.message);
        });
      }
    });

    return () => (
      <ElForm
        model={site}
        ref={refForm}
        rules={formRules}
        labelPosition="right"
        labelWidth="90px"
      >
        <ElFormItem label="应用名称" prop="name">
          <ElInput
            {...{
              modelValue: site.name,
              ['onUpdate:modelValue']: (val: string) => (site.name = val)
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="应用地址" prop="url">
          <ElInput
            {...{
              modelValue: site.url,
              ['onUpdate:modelValue']: (val: string) => (site.url = val)
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="应用级别" prop="level">
          <ElInput
            readonly
            {...{
              modelValue: site.level,
              ['onUpdate:modelValue']: (val: string) => (site.level = val)
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem>
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

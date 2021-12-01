import { defineComponent, ref } from 'vue';
import LayoutMain from '@/components/layoutMain';
import { ElMessage, ElNotification, ElUpload } from 'element-plus';
import { restore } from '@/api';

export default defineComponent({
  name: 'Restore',
  setup() {
    const refUpload = ref<typeof ElUpload | null>(null);

    function onClickRestore() {
      if (refUpload.value) {
        refUpload.value.submit();
      }
    }

    function onUploadRequest({ file }: { action: string; file: File }) {
      restore({
        file
      })
        .then(() => {
          ElNotification({
            type: 'success',
            message: '恢复成功'
          });
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    }

    function onClickBackup() {
      location.assign('/backup');
    }

    return () => (
      <LayoutMain>
        <ElButton type="primary" onClick={onClickBackup}>
          备份数据文件
        </ElButton>
        <ElDivider></ElDivider>
        <ElUpload
          ref={refUpload}
          action="/restore"
          drag={true}
          autoUpload={false}
          showFileList={true}
          httpRequest={onUploadRequest}
        >
          <div class="flex flex-col justify-center items-center h-full">
            <ElIcon size="50">
              <ElIconUploadFilled></ElIconUploadFilled>
            </ElIcon>
            <p>请将数据文件拖到此处或者选择数据文件</p>
          </div>
        </ElUpload>
        <ElButton type="primary" onClick={onClickRestore}>
          恢复数据文件
        </ElButton>
      </LayoutMain>
    );
  }
});

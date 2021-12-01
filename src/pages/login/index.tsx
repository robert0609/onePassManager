import { defineComponent } from 'vue';
import logoImage from '@/assets/img/logo.png';
import { loginController } from '@/core/business/login';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { token, handleLogin } = loginController();

    function onClickLogin() {
      handleLogin()
        .then(() => {
          // 登录成功之后
          if (route.query.src_url) {
            router.replace(decodeURIComponent(route.query.src_url as string));
          } else {
            router.replace('/home');
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    }

    function onClickEnter(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        onClickLogin();
      }
    }

    return () => (
      <div
        class="flex justify-center items-center h-screen"
        onKeyup={onClickEnter}
      >
        <div class="p-10 rounded-md shadow-md border-2">
          <p class="flex gap-2 justify-center items-center mb-2">
            <ElImage src={logoImage} class="w-9 h-9"></ElImage>
            <pan class="font-mono text-4xl italic font-bold text-center">
              OnePass
            </pan>
          </p>
          <p class="flex gap-2">
            <ElInput
              placeholder="请输入解锁码"
              modelValue={token.value}
              {...{
                ['onUpdate:modelValue']: (val: string) => (token.value = val)
              }}
              type="password"
            ></ElInput>
            <ElButton
              icon="ElIconUnlock"
              circle
              onClick={onClickLogin}
            ></ElButton>
          </p>
        </div>
      </div>
    );
  }
});

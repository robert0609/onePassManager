import { login } from '@/api';
import { UIError } from '@/core/exception';
import { getCookie, setCookie } from '@/utils/cookie';
import { isStringEmpty } from 'roy-type-assert';
import { ref } from 'vue';

export function loginController() {
  const token = ref<string>('');

  async function handleLogin() {
    if (isStringEmpty(token.value)) {
      throw UIError.createUIError('请输入解锁码');
    }
    await login({
      authority: token.value
    });
    setCookie('authority', token.value);
  }

  return {
    token,
    handleLogin
  };
}

export function isClientLogin(): boolean {
  const token = getCookie('authority');
  return !!token;
}

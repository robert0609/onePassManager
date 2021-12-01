import { createApp } from 'vue';
import App from './app';
import router from '@/router';
import '@/assets/css/tailwind.css';
import {
  ElContainer,
  ElAside,
  ElHeader,
  ElFooter,
  ElButton,
  ElLink,
  ElRow,
  ElCol,
  ElIcon,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElImage,
  ElInput,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessage,
  ElLoading,
  ElDrawer,
  ElDivider,
  ElForm,
  ElFormItem,
  ElCard,
  ElUpload
} from 'element-plus';
import {
  Key,
  Setting,
  Search,
  Unlock,
  Plus,
  UploadFilled
} from '@element-plus/icons';

const app = createApp(App);
app.config.globalProperties.$ELEMENT = {};
app.use(router);
app.use(ElContainer);
app.use(ElAside);
app.use(ElHeader);
app.use(ElFooter);
app.use(ElButton);
app.use(ElLink);
app.use(ElRow);
app.use(ElCol);
app.use(ElIcon);
app.use(ElMenu);
app.use(ElSubMenu);
app.use(ElMenuItem);
app.use(ElMenuItemGroup);
app.use(ElImage);
app.use(ElInput);
app.use(ElTable);
app.use(ElTableColumn);
app.use(ElPagination);
app.use(ElMessage);
app.use(ElLoading);
app.use(ElDrawer);
app.use(ElDivider);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElCard);
app.use(ElUpload);
app.component('ElIconKey', Key);
app.component('ElIconSetting', Setting);
app.component('ElIconSearch', Search);
app.component('ElIconUnlock', Unlock);
app.component('ElIconPlus', Plus);
app.component('ElIconUploadFilled', UploadFilled);
app.mount('#app');

import {
  defineComponent,
  Component,
  KeepAlive,
  resolveDynamicComponent
} from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return (
        <RouterView
          v-slots={{
            default: ({ Component }: { Component: Component }) => {
              const DynComp = resolveDynamicComponent(
                Component
              ) as DynamicComponentType; // 此处由于resolveDynamicComponent返回的类型不一定都有构造函数，因此在下面的jsx语法中会报ts校验错误，因此这里自己声明一个组件类型
              return (
                <KeepAlive include={['SiteList']}>
                  <DynComp />
                </KeepAlive>
              );
            }
          }}
        ></RouterView>
      );
    };
  }
});

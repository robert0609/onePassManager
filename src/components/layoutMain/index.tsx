import { FunctionalComponent, ref } from 'vue';
import logoImage from '@/assets/img/logo.png';
import { useRoute, useRouter } from 'vue-router';

const LayoutMain: FunctionalComponent = function (props, { slots }) {
  const currentRoute = useRoute();
  const router = useRouter();
  function onSelectMenu() {}

  const keyword = ref<string>('');

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      router.replace({
        name: 'home',
        query: {
          keyword: keyword.value
        }
      });
    }
  }

  return (
    <ElContainer class="h-screen">
      <ElHeader height="80px" class="border-b border-solid border-primary">
        <ElRow class="h-full">
          <ElCol span={3} class="flex items-center">
            <ElImage src={logoImage} fit="contain" class="w-10"></ElImage>
            <pan class="font-mono text-4xl italic font-bold text-center ml-2">
              OnePass
            </pan>
          </ElCol>
          <ElCol span={21} class="flex items-center justify-center">
            <section class="w-1/4">
              <ElInput
                {...{
                  modelValue: keyword.value,
                  ['onUpdate:modelValue']: (val: string) =>
                    (keyword.value = val)
                }}
                prefixIcon="ElIconSearch"
                placeholder="输入应用名称或地址的关键词"
                clearable={true}
                onKeydown={onKeydown}
              ></ElInput>
            </section>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElContainer>
        <ElAside width="240px">
          <ElRow>
            <ElCol>
              <ElMenu
                defaultActive={currentRoute.fullPath}
                collapse={false}
                router={true}
                onSelect={onSelectMenu}
              >
                <ElSubMenu
                  index="account-level"
                  v-slots={{
                    title: () => (
                      <>
                        <ElIcon>
                          <ElIconKey />
                        </ElIcon>
                        <span>应用列表</span>
                      </>
                    )
                  }}
                >
                  <ElMenuItem
                    index="/site/list?level=1"
                    v-slots={{
                      title: () => <>一级应用</>
                    }}
                  ></ElMenuItem>
                  <ElMenuItem
                    index="/site/list?level=2"
                    v-slots={{
                      title: () => <>二级应用</>
                    }}
                  ></ElMenuItem>
                  <ElMenuItem
                    index="/site/list?level=3"
                    v-slots={{
                      title: () => <>三级应用</>
                    }}
                  ></ElMenuItem>
                </ElSubMenu>
                <ElMenuItem
                  index="/manage"
                  v-slots={{
                    title: () => (
                      <>
                        <ElIcon>
                          <ElIconSetting />
                        </ElIcon>
                        <span>备份管理</span>
                      </>
                    )
                  }}
                ></ElMenuItem>
              </ElMenu>
            </ElCol>
          </ElRow>
        </ElAside>
        <ElMain class="bg-main">
          <div class="bg-content h-full p-10px">
            {slots.default ? slots.default() : undefined}
          </div>
        </ElMain>
      </ElContainer>
    </ElContainer>
  );
};

LayoutMain.displayName = 'LayoutMain';

export default LayoutMain;

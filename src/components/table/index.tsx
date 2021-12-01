import { UIError } from '@/core/exception';
import { FunctionalComponent } from 'vue';
import indexStyle from './index.module.scss';

const OneTable: FunctionalComponent<
  {
    data: any[];
    pageSize?: number;
    currentPageIndex?: number;
    totalCount?: number;
    showPagination?: boolean;
  },
  ['pageIndexChanged', 'update:currentPageIndex']
> = function (props, { attrs, slots, emit }) {
  if (props.showPagination === undefined) {
    props.showPagination = true;
  }
  if (props.showPagination) {
    if (
      props.pageSize === undefined ||
      props.currentPageIndex === undefined ||
      props.totalCount === undefined
    ) {
      throw UIError.createUIError(
        '表格组件显示分页器的时候，必须要传输pageSize、currentPageIndex、totalCount'
      );
    }
  }
  function handlePageIndexChanged(newPageIndex: number) {
    emit('pageIndexChanged', newPageIndex);
  }

  return (
    <>
      <ElTable
        {...Object.assign(
          {
            class: indexStyle['el-table'],
            stripe: true,
            size: 'small',
            ['empty-text']: '暂无数据',
            ['header-row-class-name']: indexStyle.table__header,
            ['header-cell-class-name']: indexStyle.table__header__cell
          },
          attrs
        )}
      >
        {slots.default ? slots.default() : undefined}
      </ElTable>
      {props.showPagination ? (
        <p>
          <ElPagination
            class="mt-4 flex justify-center"
            layout="prev, pager, next"
            background
            pageSize={props.pageSize}
            total={props.totalCount}
            {...{
              currentPage: props.currentPageIndex,
              ['onUpdate:currentPage']: (val: any) => {
                emit('update:currentPageIndex', val - 1);
              },
              onCurrentChange: handlePageIndexChanged,
              hideOnSinglePage: true
            }}
          ></ElPagination>
        </p>
      ) : undefined}
    </>
  );
};
OneTable.displayName = 'OneTable';
OneTable.emits = ['pageIndexChanged', 'update:currentPageIndex'];
export default OneTable;

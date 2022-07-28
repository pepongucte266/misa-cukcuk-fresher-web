<template>
  <div class="m-page-content">
    <div class="m-page-header row">
      <div class="m-page-header-title">
        Thực đơn
      </div>
      <q-btn class="m-page-header-btn" flat no-caps>
        <img src="../../assets/img/viewEmail.png" alt="" />
        <div class="m-btn-text">Phản hồi</div>
      </q-btn>
    </div>
    <div class="m-page-body">
      <div class="m-page-toolbar row no-wrap items-center">
        <div
          class="m-toolbar-item row items-center"
          @click="
            $store.dispatch('changeDialogDetail', true);
            $store.dispatch('changeDialogDetailAction', 0);
          "
        >
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-add"
          ></div>
          <div class="m-toolbar-item-text">Thêm</div>
        </div>

        <div
          class="m-toolbar-item row items-center"
          @click="
            $store.dispatch('changeDialogDetail', true);
            $store.dispatch('changeDialogDetailAction', 2);
          "
        >
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-duplicate"
          ></div>
          <div class="m-toolbar-item-text">Nhân bản</div>
        </div>

        <div class="m-toolbar-item row items-center" @click="dblClickOnRow">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-edit"
          ></div>
          <div class="m-toolbar-item-text">Sửa</div>
        </div>

        <div class="m-toolbar-item row items-center" @click="btnDeleteOnClick">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-delete"
          ></div>
          <div class="m-toolbar-item-text">Xóa</div>
        </div>

        <q-separator vertical inset />

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-sort"
          ></div>
          <div class="m-toolbar-item-text">Sắp xếp thứ tự</div>
        </div>

        <q-separator vertical inset />

        <div class="m-toolbar-item row items-center" @click="btnRefreshOnClick">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-refresh"
          ></div>
          <div class="m-toolbar-item-text">Nạp</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-help"
          ></div>
          <div class="m-toolbar-item-text">Giúp</div>
        </div>
      </div>
      <div class="m-page-toolbar row no-wrap items-center">
        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-folder"
          ></div>
          <div class="m-toolbar-item-text">Chọn từ thư viện</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-import"
          ></div>
          <div class="m-toolbar-item-text">Nhập khẩu</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-export"
          ></div>
          <div class="m-toolbar-item-text">Xuất khẩu</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-copy"
          ></div>
          <div class="m-toolbar-item-text">Sao chép thực đơn</div>
        </div>

        <q-separator vertical inset />

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-image"
          ></div>
          <div class="m-toolbar-item-text">Cập nhật ảnh</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-price"
          ></div>
          <div class="m-toolbar-item-text">Cập nhật giá</div>
        </div>

        <div class="m-toolbar-item row items-center">
          <div
            class="m-toolbar-item-icon m-icon-toolbar m-icon-toolbar-stpv"
          ></div>
          <div class="m-toolbar-item-text">Chọn món cần ghi nhanh SPTV</div>
        </div>
      </div>
      <q-table
        virtual-scroll
        style="height: calc(100vh - 175px)"
        class="my-sticky-header-table"
        :columns="columns"
        :rows="$store.getters.getFoodList"
        row-key="FoodCode"
        bordered
        separator="cell"
        :loading="$store.getters.getIsTableLoading"
        v-model:pagination="$store.state.pagination"
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="m-table-header-row">
            <q-th class="m-table-header" key="FoodCategoryName">
              <div
                class="m-table-header-item"
                style="padding-bottom: 0px !important"
              >
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[0].label }}
                </div>
                <!-- <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div> -->
                <div class="m-table-header-combobox">
                  <q-select
                    v-model="val"
                    hide-bottom-space
                    :options="$store.getters.getFoodCategoryList"
                    option-value="FoodCategoryId"
                    option-label="FoodCategoryName"
                    emit-value
                    map-options
                    borderless
                    bg-color="white"
                    popup-content-class="m-dialog-combobox-popup"
                    class="m-table-header-input"
                    @update:model-value="(val) => btnTest(val)"
                  >
                  </q-select>
                </div>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodCode">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[1].label }}
                </div>
                <MenuCardFilter :column="props.cols[1].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th class="m-table-header" key="FoodName">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[2].label }}
                </div>
                <MenuCardFilter :column="props.cols[2].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodGroupName">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[3].label }}
                </div>
                <MenuCardFilter :column="props.cols[3].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodUnitName">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[4].label }}
                </div>
                <MenuCardFilter :column="props.cols[4].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodSellPrice">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[5].label }}
                </div>
                <MenuCardFilter :column="props.cols[5].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodTax">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[6].label }}
                </div>
                <MenuCardFilter :column="props.cols[6].name"></MenuCardFilter>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodPriceChange">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[7].label }}
                </div>
                <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodFreeChangePrice">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[8].label }}
                </div>
                <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodQuantity">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[9].label }}
                </div>
                <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div>
              </div>
            </q-th>
            <q-th auto-width class="m-table-header" key="FoodShowInMenu">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[10].label }}
                </div>
                <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div>
              </div>
            </q-th>
            <!-- <q-th auto-width class="m-table-header" key="FoodStopSale">
              <div class="m-table-header-item">
                <div class="m-table-header-label row flex-center">
                  {{ props.cols[11].label }}
                </div>
                <div class="m-table-filter-box">
                  <input class="m-table-header-input" type="text" />
                </div>
              </div>
            </q-th> -->
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr
            :props="props"
            class="m-table-row"
            @dblclick="dblClickOnRow"
            @click.exact="tableRowOnClick(props.row.FoodId)"
            @click.ctrl.exact="onCtrlClick(props.row.FoodId)"
            @click.right.prevent.exact="
              onRowRightClick($event, props.row.FoodId, true)
            "
            @click.ctrl.right.prevent.exact="
              onRowRightClick($event, props.row.FoodId, false)
            "
            :class="{
              'm-row-selected': $store.getters.getRowSelected.includes(
                props.row.FoodId
              ),
            }"
          >
            <q-td key="FoodCategoryName" :props="props" class="text-left">
              {{ props.row.FoodCategoryName }}
            </q-td>

            <q-td key="FoodCode" :props="props" class="text-left">
              {{ props.row.FoodCode }}
            </q-td>

            <q-td key="FoodName" :props="props" class="text-left">
              {{ props.row.FoodName }}
            </q-td>

            <q-td key="FoodGroupName" :props="props" class="text-left">
              {{ props.row.FoodGroupName }}
            </q-td>

            <q-td key="FoodUnitName" :props="props" class="text-left">
              {{ props.row.FoodUnitName }}
            </q-td>

            <q-td key="FoodSellPrice" :props="props" class="text-right">
              {{ props.row.FoodSellPrice }}
            </q-td>

            <!-- <q-td key="FoodTax" :props="props" class="text-right">
              {{ props.row.FoodTax }}
            </q-td> -->

            <q-td key="FoodPriceChange" :props="props" class="text-center">
              <input type="checkbox" name="" id="" />
            </q-td>

            <q-td key="FoodFreeChangePrice" :props="props" class="text-center">
              <input type="checkbox" name="" id="" />
            </q-td>

            <q-td key="FoodQuantity" :props="props" class="text-left">
              Chưa thiết lập
            </q-td>

            <q-td key="FoodShowInMenu" :props="props" class="text-center">
              <input type="checkbox" name="" id="" />
            </q-td>

            <q-td key="FoodStopSale" :props="props" class="text-center">
              <input type="checkbox" name="" id="" />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:bottom="scope">
          <div class="m-table-bottom row items-center justify-between">
            <div class="row items-center">
              <div
                class="m-table-bottom-btn"
                :disable="scope.isFirstPage"
                @click="scope.firstPage"
              >
                <div class="m-icon-pagination m-icon-fistPage"></div>
              </div>
              <div
                class="m-table-bottom-btn"
                :disable="scope.isFirstPage"
                @click="scope.prevPage"
              >
                <div class="m-icon-pagination m-icon-prevPage"></div>
              </div>
              <q-separator vertical spaced />

              <span>Trang</span>
              <div class="m-pagi-input">
                <input
                  type="text"
                  :value="scope.pagination.page"
                  @blur="
                    $store.dispatch('changeCurrentPage', $event.target.value)
                  "
                />
              </div>
              <span style="min-width: 50px"> trên {{ scope.pagesNumber }}</span>

              <q-separator vertical spaced />

              <div
                class="m-table-bottom-btn"
                :disable="scope.isLastPage"
                @click="scope.nextPage"
              >
                <div class="m-icon-pagination m-icon-nextPage"></div>
              </div>
              <div
                class="m-table-bottom-btn"
                :disable="scope.isLastPage"
                @click="scope.lastPage"
              >
                <div class="m-icon-pagination m-icon-lastPage"></div>
              </div>

              <q-separator vertical spaced />
              <div class="m-table-bottom-btn" @click="btnRefreshOnClick">
                <div class="m-icon-pagination m-icon-refresh"></div>
              </div>
              <q-separator vertical spaced />
              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination"></div>
              </div>
              <div style="width: 60px">
                <q-select
                  outlined
                  dense
                  square
                  use-input
                  v-model="$store.state.pagination.rowsPerPage"
                  :options="[25, 50, 100]"
                  popup-content-class="m-combobox-popup"
                  hide-dropdown-icon
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon style="cursor: pointer" name="arrow_drop_down" />
                  </template>
                </q-select>
              </div>
            </div>
            <div>
              Hiển thị
              {{
                showRecordText(
                  scope.pagination.page,
                  scope.pagination.rowsPerPage
                )
              }}-{{
                scope.pagination.page == 1
                  ? scope.pagination.rowsPerPage
                  : scope.isLastPage
                  ? $store.getters.getFoodList.length
                  : scope.pagination.page * scope.pagination.rowsPerPage
              }}
              trên {{ $store.getters.getFoodList.length }} kết quả
            </div>
          </div>
        </template>

        <template v-slot:no-data>
          <div class="m-table-bottom row items-center justify-between">
            <div class="row items-center">
              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination m-icon-fistPage"></div>
              </div>
              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination m-icon-prevPage"></div>
              </div>
              <q-separator vertical spaced />

              <span>Trang</span>
              <div class="m-pagi-input">
                <input type="text" :value="0" />
              </div>
              <span> trên 0</span>

              <q-separator vertical spaced />

              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination m-icon-nextPage"></div>
              </div>
              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination m-icon-lastPage"></div>
              </div>

              <q-separator vertical spaced />
              <div class="m-table-bottom-btn" @click="btnRefreshOnClick">
                <div class="m-icon-pagination m-icon-refresh"></div>
              </div>
              <q-separator vertical spaced />
              <div class="m-table-bottom-btn">
                <div class="m-icon-pagination"></div>
              </div>
              <div style="width: 60px">
                <q-select
                  outlined
                  dense
                  square
                  use-input
                  v-model="$store.state.pagination.rowsPerPage"
                  :options="[25, 50, 100]"
                  popup-content-class="m-combobox-popup"
                  hide-dropdown-icon
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon style="cursor: pointer" name="arrow_drop_down" />
                  </template>
                </q-select>
              </div>
            </div>
            <div>Không có dữ liệu</div>
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing>
            <MSLoading></MSLoading>
          </q-inner-loading>
        </template>
      </q-table>
    </div>
  </div>

  <MenuDetail v-if="$store.getters.getShowDialogDetail"></MenuDetail>
  <MenuCardFunction
    v-if="$store.getters.getShowExpand"
    :screenX="screenX"
    :screenY="screenY"
  ></MenuCardFunction>
</template>

<style>
@import url("../../style/pages/menu.css");
</style>

<script>
import MenuDetail from "./MenuDetail.vue";
import MenuCardFunction from "./MenuCardFunction.vue";
import MenuCardFilter from "./MenuCardFilter.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    MenuDetail,
    MenuCardFunction,
    MenuCardFilter,
  },

  setup() {
    const store = useStore();
    /**
     * Khởi tạo tọa độ cho bảng function khi ấn chuột phải
     * CreatedBy VTSON 22-7-2022
     */
    var screenX = ref(0);
    var screenY = ref(0);
    /**
     * Khởi tạo cột cho bảng món ăn
     * CreatedBy VTSON 13-7-2022
     */
    const columns = [
      {
        name: "FoodCategoryName",
        label: "Loại món",
        align: "center",
        field: "FoodCategoryName",
        style: "width: 130px !important; max-width:130px !important;",
      },
      {
        name: "FoodCode",
        align: "center",
        label: "Mã món",
        field: "FoodCode",
      },

      {
        name: "FoodName",
        label: "Tên món",
        align: "center",
        field: "FoodName",
        style:
          "width:250px;max-width:250px;text-overflow: ellipsis;overflow:hidden;",
      },
      {
        name: "FoodGroupName",
        label: "Nhóm thực đơn",
        align: "center",
        field: "FoodGroupName",
      },
      {
        name: "FoodUnitName",
        label: "Đơn vị tính",
        align: "center",
        field: "FoodUnitName",
      },
      {
        name: "FoodSellPrice",
        label: "Giá bán",
        align: "center",
        field: "FoodSellPrice",
        style: "width: 20px",
      },
      // {
      //   name: "FoodTax",
      //   label: "Thuế suất (%)",
      //   field: "FoodTax",
      //   align: "center",
      //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      // },
      {
        name: "FoodPriceChange",
        label: "Thay đổi theo thời giá",
        field: "FoodPriceChange",
        align: "center",
      },
      {
        name: "FoodFreeChangePrice",
        label: "Điều chỉnh giá tự do",
        field: "FoodFreeChangePrice",
        align: "center",
      },
      {
        name: "FoodQuantity",
        label: "Định lượng",
        field: "FoodQuantity",
        align: "center",
      },
      {
        name: "FoodShowInMenu",
        label: "Hiển thị trên thực đơn",
        field: "FoodShowInMenu",
        align: "center",
      },
      {
        name: "FoodStopSale",
        label: "Ngừng bán",
        field: "FoodStopSale",
        align: "center",
      },
    ];

    /**
     * Hàm lấy danh sách món ăn
     * CreatedBy VTSON 13-7-2022
     */
    async function getFoodList() {
      try {
        await store.dispatch("getFoodList");
        // Sau khi lấy thành công thì chọn dòng đầu tiên
        store.dispatch("changeRowSelected", {
          newVal: store.getters.getFoodList[0].FoodId,
          type: true,
        });
        store.dispatch("getListByTableName", {
          listName: "foodCategoryList",
          tableName: "FoodCategory",
        });
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * hàm xử lý khi double click vào 1 dòng
     * CreatedBy VTSON 14-7-2022
     */
    function dblClickOnRow() {
      store.dispatch("changeDialogDetail", true);
      store.dispatch("changeDialogDetailAction", 1);
    }

    /**
     * hàm xử lý khi click vào 1 dòng
     * CreatedBy VTSON 14-7-2022
     */
    function tableRowOnClick(id) {
      store.dispatch("changeRowSelected", { newVal: id, type: true });
    }

    /**
     * hàm xử lý khi giữ ctrl và click vào dòng
     * CreatedBy VTSON 14-7-2022
     */
    function onCtrlClick(id) {
      store.dispatch("changeRowSelected", { newVal: id, type: false });
    }

    /**
     * hàm xử lý khi right click vào 1 dòng
     * CreatedBy VTSON 14-7-2022
     */
    function onRowRightClick(event, id, mode) {
      store.dispatch("changeRowSelected", { newVal: id, type: mode });
      store.dispatch("changeShowExpand", true);
      screenX.value = Math.min(window.innerWidth - 128, event.pageX) + "px";
      screenY.value = Math.min(window.innerHeight - 226, event.pageY) + "px";
    }

    /**
     * hàm xử lý khi ấn nút refresh
     * CreatedBy VTSON 15-7-2022
     */
    function btnRefreshOnClick() {
      store.dispatch("getFoodList");
      store.dispatch("resetFilterList");
    }

    /**
     * hàm xử lý lấy ra thứ tự bản ghi đang xem
     * CreatedBy VTSON 14-7-2022
     */
    function showRecordText(currentPage, rowsPerPage) {
      if (currentPage == 1) {
        return currentPage;
      } else {
        return rowsPerPage * (currentPage - 1) + 1;
      }
    }

    /**
     * hàm xử lý nút xóa
     * CreatedBy VTSON 14-7-2022
     */
    async function btnDeleteOnClick() {
      try {
        await store.dispatch("delete");
      } catch (error) {
        console.log(error);
      }
    }

    function btnTest(val) {
      store.dispatch("changeFilterList", {
        column: 'f.FoodCategoryId',
        newVal: `= '${val}'`,
      });
      store.dispatch("getFilterFoodList");
    }
    getFoodList();

    return {
      columns,
      screenX,
      screenY,
      btnTest,
      val: ref(''),
      btnRefreshOnClick,
      dblClickOnRow,
      tableRowOnClick,
      btnDeleteOnClick,
      onRowRightClick,
      onCtrlClick,
      showRecordText,
    };
  },
};
</script>

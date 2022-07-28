<template>
  <q-dialog v-model="dialogState" persistent no-shake>
    <q-card class="m-dialog">
      <q-card-section class="m-dialog-header">
        <span>{{ dialogTitle }} </span>
        <div class="m-dialog-close-btn" @click="btnCloseOnClick">&#10006;</div>
      </q-card-section>
      <q-card-section class="m-dialog-toolbar">
        <div class="row items-center justify-between">
          <div class="m-dialog-toolbar-select row items-center">
            <div class="m-dialog-toolbar-text">Loại</div>
            <q-select
              v-model="food.FoodCategoryId"
              hide-bottom-space
              :options="$store.getters.getFoodCategoryList"
              option-value="FoodCategoryId"
              option-label="FoodCategoryName"
              use-input
              emit-value
              map-options
              borderless
              bg-color="white"
              popup-content-class="m-dialog-combobox-popup"
              class="m-dialog-combobox"
              autocomplete="FoodCategoryId"
            >
            </q-select>
          </div>

          <div
            v-if="false"
            class="m-dialog-toolbar-radio row no-wrap j"
            size="16px"
          >
            <q-radio v-model="shape" val="line" label="Món ăn" />
            <q-radio v-model="shape" val="rectangle" label="Món ăn theo nhóm" />
            <q-radio
              v-model="shape"
              val="a"
              label="Món ăn theo nguyên vật liệu"
            />
            <div></div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="m-dialog-form">
        <q-tabs
          no-caps
          v-model="tab"
          switch-indicator
          dense
          content-class="m-dialog-panel-header"
          active-color="primary"
          active-class="m-dialog-panel-header-selected"
          indicator-color="primary"
          align="left"
          :breakpoint="100"
        >
          <q-tab
            :ripple="false"
            content-class="m-panel-tab"
            name="info"
            label="Thông tin chung"
          />
          <q-tab
            :ripple="false"
            content-class="m-panel-tab"
            name="favorite"
            label="Sở thích phục vụ"
          />
          <!-- <q-tab
            :ripple="false"
            content-class="m-panel-tab"
            name="quantity"
            label="Định lượng nguyên vật liệu"
          />
          <q-tab
            :ripple="false"
            content-class="m-panel-tab"
            name="price"
            label="Chính sách giá bán"
          /> -->
        </q-tabs>

        <q-tab-panels v-model="tab">
          <q-tab-panel name="info" class="m-menu-detail">
            <div class="m-menu-detail-form">
              <div class="m-form-row">
                <span class="m-form-row-label"
                  >Tên món <span class="m-required">(*)</span></span
                >
                <div style="width: calc(100% - 125px)">
                  <q-input
                    outlined
                    dense
                    square
                    input-class="m-row-input"
                    autofocus
                    v-model="food.FoodName"
                    @blur="inputFoodNameOnBlur"
                    ref="requiredInput"
                    :rules="[funcValidate]"
                    no-error-icon
                  >
                    <template v-slot:after v-if="valid">
                      <q-icon
                        size="16px"
                        name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png"
                        color="red"
                        class="m-input-error"
                      />
                      <q-tooltip
                        anchor="bottom end"
                        self="center start"
                        class="m-tooltip-error"
                        :offset="[5, 5]"
                      >
                        <div class="row">
                          <q-icon
                            size="16px"
                            name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png"
                            style="margin-right: 6px"
                          />
                          <div class="">
                            Trường này không được phép để trống
                          </div>
                        </div>
                      </q-tooltip>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label"
                  >Mã món <span class="m-required">(*)</span></span
                >
                <div style="width: calc(100% - 125px)">
                  <q-input
                    outlined
                    dense
                    square
                    input-class="m-row-input"
                    v-model="food.FoodCode"
                    :rules="[funcValidate]"
                    no-error-icon
                    ref="foodCodeRef"
                  >
                    <template v-slot:after v-if="valid">
                      <q-icon
                        size="16px"
                        name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png"
                        color="red"
                        class="m-input-error"
                      />
                      <q-tooltip
                        anchor="bottom end"
                        self="center start"
                        class="m-tooltip-error"
                        :offset="[5, 5]"
                      >
                        <div class="row">
                          <q-icon
                            size="16px"
                            name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png"
                            style="margin-right: 6px"
                          />
                          <div class="">
                            Trường này không được phép để trống
                          </div>
                        </div>
                      </q-tooltip>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label">Thứ tự món</span>
                <div style="width: 170px">
                  <q-select
                    outlined
                    dense
                    square
                    use-input
                    v-model="food.FoodSequenceId"
                    :options="$store.getters.getFoodSequenceList"
                    option-value="FoodSequenceId"
                    option-label="FoodSequenceName"
                    emit-value
                    map-options
                    input-class="m-row-input"
                    popup-content-class="m-combobox-popup"
                  >
                  </q-select>
                </div>
                <q-checkbox
                  class="m-checkbox-item"
                  size="xs"
                  v-model="val"
                  label="Là món đặc trưng"
                ></q-checkbox>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label">Nhóm thực đơn</span>
                <div style="width: calc(100% - 125px)">
                  <q-select
                    outlined
                    dense
                    square
                    use-input
                    v-model="food.FoodGroupId"
                    :options="$store.getters.getFoodGroupList"
                    option-value="FoodGroupId"
                    option-label="FoodGroupName"
                    emit-value
                    map-options
                    input-class="m-row-input"
                    popup-content-class="m-combobox-popup"
                  >
                    <template v-slot:after>
                      <q-icon
                        @click="foodGroupDialog = true"
                        style="cursor: pointer"
                        size="15px"
                        name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png"
                      />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label"
                  >Đơn vị tính <span class="m-required">(*)</span></span
                >
                <div style="width: calc(100% - 125px)">
                  <q-select
                    outlined
                    dense
                    square
                    use-input
                    v-model="food.FoodUnitId"
                    :options="$store.getters.getFoodUnitList"
                    option-value="FoodUnitId"
                    option-label="FoodUnitName"
                    emit-value
                    map-options
                    input-class="m-row-input"
                    popup-content-class="m-combobox-popup"
                  >
                    <template v-slot:after>
                      <q-icon
                        style="cursor: pointer"
                        @click="unitDialog = true"
                        size="15px"
                        name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png"
                      >
                      </q-icon>
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label">
                  Giá bán <span class="m-required">(*)</span>
                </span>
                <div style="width: 115px">
                  <q-input
                    outlined
                    dense
                    square
                    v-model="food.FoodSellPrice"
                    input-class="m-row-input text-right"
                    mask="##.###.###.###.###"
                    reverse-fill-mask
                  >
                  </q-input>
                </div>
                <q-checkbox
                  class="m-checkbox-item"
                  size="xs"
                  v-model="val"
                  label="Thay đổi theo thời giá"
                ></q-checkbox>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label"
                  >Thuế suất <span class="m-required">(*)</span></span
                >
                <div style="width: calc(100% - 125px)">
                  <q-input
                    outlined
                    dense
                    square
                    input-class="m-row-input"
                    v-model="food.FoodTax"
                  >
                  </q-input>
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label">Giá vốn</span>
                <div style="width: 115px">
                  <q-input
                    outlined
                    dense
                    square
                    v-model="food.FoodCostPrice"
                    input-class="m-row-input text-right"
                  >
                  </q-input>
                </div>
                <q-checkbox
                  class="m-checkbox-item"
                  size="xs"
                  v-model="val"
                  label="Điều chỉnh giá tự do"
                ></q-checkbox>
              </div>
              <div class="m-form-row textarea">
                <span class="m-form-row-label">Mô tả</span>
                <div style="width: calc(100% - 125px)" class="m-textarea">
                  <q-input
                    borderless
                    autogrow
                    v-model="food.FoodDetail"
                    type="textarea"
                    input-class="m-row-input-area"
                  />
                </div>
              </div>
              <div class="m-form-row">
                <span class="m-form-row-label">Chế biến tại</span>
                <div style="width: calc(100% - 125px)">
                  <q-select
                    outlined
                    dense
                    square
                    use-input
                    v-model="food.FoodPlaceId"
                    :options="$store.getters.getFoodPlaceList"
                    option-value="FoodPlaceId"
                    option-label="FoodPlaceName"
                    emit-value
                    map-options
                    use-chips
                    input-class="m-row-input"
                    popup-content-class="m-combobox-popup"
                  >
                  </q-select>
                </div>
              </div>
              <div class="m-forn-checkbox-group">
                <div class="column">
                  <q-checkbox
                    class="m-checkbox-item"
                    size="xs"
                    v-model="food.FoodShowInMenu"
                    label="Không hiển thị trên thực đơn"
                  />
                  <q-checkbox
                    class="m-checkbox-item"
                    size="xs"
                    v-model="val"
                    label="Là bán thành phẩm"
                  />
                  <q-checkbox
                    class="m-checkbox-item"
                    size="xs"
                    v-model="val"
                    label="Thêm vào thực đơn trang bán hàng Online"
                  />
                  <q-checkbox
                    class="m-checkbox-item"
                    size="xs"
                    v-model="val"
                    label="Sao chép sang nhà hàng khác"
                  />
                </div>
              </div>
            </div>

            <fieldset class="m-menu-detail-avatar">
              <legend>Ảnh đại diện</legend>
              <div class="m-menu-avatar-form">
                <div class="m-avatar">
                  <img
                    src="https://misatest06.cukcuk.vn/Handler/ImageHandler.ashx?FileType=1&IsTemp=True&W=160&H=120&IsFit=true"
                    style="height: 120px; width: 160px"
                  />
                </div>
              </div>
            </fieldset>
          </q-tab-panel>

          <q-tab-panel name="favorite" class="m-menu-detail">
            <div class="m-menu-favorite-form">
              <div class="m-form-row">
                <span class="m-panel-text">Món ăn:</span>
              </div>
              <div class="m-favorite-panel-title row items-center">
                <div class="m-favorite-icon m-icon-info-favorite"></div>
                <span class="m-panel-favorite-label m-panel-text"
                  >Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ
                  chọn nhanh order. <br />
                  VD: không cay/ít hành/thêm phomai...</span
                >
              </div>

              <div class="m-table-favorite">
                <q-table
                  :columns="columns"
                  row-key="name"
                  :rows-per-page-options="[0]"
                  :rows="$store.getters.getFoodFavoriteList"
                  bordered
                  square
                  virtual-scroll
                  separator="none"
                  hide-bottom
                  hide-selected-banner
                  hide-no-data
                  hide-pagination
                  flat
                  table-style="height:214px;"
                >
                  <template v-slot:header="props">
                    <q-tr
                      :props="props"
                      style="height: 28px"
                      class="m-table-header-row"
                    >
                      <q-th class="m-table-favorite-header" key="favorite">
                        <div class="m-table-header-item">
                          <div class="m-table-header-label row flex-center">
                            {{ props.cols[0].label }}
                          </div>
                        </div>
                      </q-th>
                      <q-th
                        style="width: 240px"
                        class="m-table-favorite-header"
                        key="price"
                      >
                        <div class="m-table-header-item">
                          <div class="m-table-header-label row flex-center">
                            {{ props.cols[1].label }}
                          </div>
                        </div>
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr
                      :props="props"
                      class="m-table-row m-table-favorite-row"
                      @click="btnChangeCurrentFavoriteServiceId(props.rowIndex)"
                    >
                      <MSRowFavoriteSelect
                        :index="props.rowIndex"
                      ></MSRowFavoriteSelect>
                    </q-tr>
                  </template>
                </q-table>
              </div>

              <div class="m-form-row">
                <div
                  class="m-dialog-footer-btn row flex-center"
                  @click="btnAddFavoriteOnClick"
                >
                  <div
                    class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-add"
                  ></div>
                  <div class="m-toolbar-item-text">Thêm dòng</div>
                </div>
                <div
                  class="m-dialog-footer-btn row flex-center"
                  @click="btnDeleteOnClick"
                >
                  <div
                    class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-delete"
                  ></div>
                  <div class="m-toolbar-item-text">Xóa dòng</div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="quantity">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-inner-loading :showing="$store.getters.getShowLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <q-card-actions
        class="m-dialog-footer row no-wrap item-center justify-between"
      >
        <div class="m-dialog-footer-btn row flex-center">
          <div
            class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-help"
          ></div>
          <div class="m-toolbar-item-text" @click="resetValid">Giúp</div>
        </div>

        <div class="row">
          <div
            class="m-dialog-footer-btn row flex-center"
            @click="btnSaveOnClick"
          >
            <div
              class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-save"
            ></div>
            <div class="m-toolbar-item-text">Cất</div>
          </div>

          <div
            class="m-dialog-footer-btn row flex-center"
            @click="btnSaveAndAddOnClick"
          >
            <div
              class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-saveadd"
            ></div>
            <div class="m-toolbar-item-text">Cất & thêm</div>
          </div>

          <div
            class="m-dialog-footer-btn row flex-center"
            @click="btnCloseOnClick"
          >
            <div
              class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-cancel"
            ></div>
            <div class="m-toolbar-item-text">Hủy bỏ</div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <MenuAddFoodUnit
    :unitDialog="unitDialog"
    @updateDialog="unitDialog = $event"
  ></MenuAddFoodUnit>
  <MenuAddFoodGroup
    :foodGroupDialog="foodGroupDialog"
    @updateFoodGroupDialog="foodGroupDialog = $event"
  ></MenuAddFoodGroup>
</template>

<style scoped>
@import url("../../style/components/combobox.css");
</style>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import MenuAddFoodUnit from "./MenuAddFoodUnit.vue";
import MenuAddFoodGroup from "./MenuAddFoodGroup.vue";
import MSRowFavoriteSelect from "../../components/base/MSRowFavoriteSelect.vue";
export default {
  components: {
    MenuAddFoodUnit,
    MenuAddFoodGroup,
    MSRowFavoriteSelect,
  },
  setup() {
    const store = useStore();
    var requiredInput = ref(null);
    var foodCodeRef = ref(null);

    var valid = ref(false);
    var currentFavoriteId = ref("");
    /**
     * Khởi tạo cột cho bảng sở thích
     * CreatedBy VTSON 22-7-2022
     */
    const columns = [
      {
        name: "favorite",
        required: true,
        label: "Sở thích phục vụ",
        align: "left",
        field: "favorite",
      },
      {
        name: "price",
        align: "center",
        label: "Thu thêm",
        field: "price",
      },
    ];

    var dialogDetailAction = computed({
      get() {
        return store.getters.getDialogDetailAction;
      },
      set(val) {
        store.dispatch("changeDialogDetailAction", val);
      },
    });
    var dialogState = computed({
      get() {
        return store.getters.getShowDialogDetail;
      },
      set(val) {
        store.dispatch("changeDialogDetail", val);
      },
    });

    /**
     * Khởi tạo tiểu đề cho form detail
     * CreatedBy VTSON 12-7-2022
     */
    const dialogTitle = dialogDetailAction.value == 1 ? "Sửa món" : "Thêm món";
    var food = computed(() => store.getters.getFood);

    /**
     * btn đóng dialog
     * CreatedBy VTSON 22-7-2022
     */
    function btnCloseOnClick() {
      try {
        dialogState.value = false;
        dialogDetailAction.value = 0;
        store.dispatch("resetFood");
        store.dispatch("resetFoodFavoriteList");
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm validate input
     * CreatedBy VTSON 14-7-2022
     */
    function funcValidate(value) {
      
      if(value == null) {
        return true;
      }
      if(value == '') {
        return false;
      }
      return true
    }

    /**
     * Hàm tạo mã món ăn theo tên món
     * CreatedBy VTSON 14-7-2022
     */
    async function inputFoodNameOnBlur(input) {
      try {
        const validd = requiredInput.value.validate();
        // console.log(validd);
        valid.value = !validd;
        if (dialogDetailAction.value == 0) {
          var foodCode = input.target.value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s+/g, "")
            .toUpperCase();
          food.value.FoodCode = foodCode;
        }
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm xử lý btn Cất
     * CreatedBy VTSON 20-7-2022
     */
    async function btnSaveOnClick() {
      try {
        if (store.getters.getDialogDetailAction != 1) {
          if (store.getters.getFoodFavoriteList.length) {
            await store.dispatch("insertFull").then((result) => {
              if (result) {
                store.dispatch("changeDialogDetail", false);
              }
            });
          } else {
            await store
              .dispatch("insert", {
                tableName: "Food",
                entityName: "food",
              })
              .then((result) => {
                if (result) {
                  store.dispatch("changeDialogDetail", false);
                }
              });
          }
        } else if (store.getters.getDialogDetailAction == 1) {
          await store.dispatch("updateFull").then((result) => {
            if (result) {
              store.dispatch("changeDialogDetail", false);
              store.dispatch("resetFoodFavoriteList")
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm xwr lý btn Cất và thêm
     * CreatedBy VTSON 20-7-2022
     */
    async function btnSaveAndAddOnClick() {
      try {
        if (store.getters.getDialogDetailAction != 1) {
          if (store.getters.getFoodFavoriteList.length) {
            await store.dispatch("insertFull").then((result) => {
              if (result) {
                resetValid();
                store.dispatch("resetFood");
              }
            });
          } else {
            await store
              .dispatch("insert", {
                tableName: "Food",
                entityName: "food",
              })
              .then((result) => {
                if (result) {
                  resetValid();
                  store.dispatch("resetFood");
                }
              });
          }
        } else if (store.getters.getDialogDetailAction == 1) {
          await store.dispatch("updateFull").then((result) => {
            if (result) {
              resetValid();
              store.dispatch("resetFood");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm xử lý thay đổi dòng đang chọn
     * CreatedBy VTSON 22-7-2022
     */
    function btnChangeCurrentFavoriteServiceId(id) {
      currentFavoriteId.value = id;
    }

    /**
     * Hàm xử lý nút thêm dòng
     * CreatedBy VTSON 22-7-2022
     */
    function btnAddFavoriteOnClick() {
      try {
        store.state.foodFavoriteList.push({
          FavoriteServiceName: "",
          FavoriteServicePrice: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm xử lý nút xóa dòng
     * CreatedBy VTSON 22-7-2022
     */
    function btnDeleteOnClick() {
      try {
        store.dispatch("changeFoodFavoriteList", currentFavoriteId.value);
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hàm xử lý reset validation
     * CreatedBy VTSON 25-7-2022
     */
    function resetValid() {
      requiredInput.value.focus();
      requiredInput.value.resetValidation();
      foodCodeRef.value.resetValidation();
      valid.value = false;
    }

    /**
     * Hàm khỏi tạo dữ liệu cho form detail
     * CreatedBy VTSON 15-7-2022
     */
    async function loadData() {
      try {
        if (store.getters.getDialogDetailAction != 0) {
          await store.dispatch("getFoodById");
          store.dispatch("getFoodFavoriteByFoodId", food.value.FoodId);
        } else {
          food.value.FoodSellPrice = 0;
        }
        if (store.getters.getDialogDetailAction == 2) {
          food.value.FoodCode += "G";
        }
        
        store.dispatch("getListByTableName", {
          listName: "foodUnitList",
          tableName: "FoodUnit",
        });

        store.dispatch("getListByTableName", {
          listName: "foodSequenceList",
          tableName: "FoodSequence",
        });
        store.dispatch("getListByTableName", {
          listName: "foodPlaceList",
          tableName: "FoodPlace",
        });
        store.dispatch("getListByTableName", {
          listName: "foodGroupList",
          tableName: "FoodGroup",
        });
        store.dispatch("getListByTableName", {
          listName: "favoriteList",
          tableName: "FavoriteService",
        });
      } catch (e) {
        console.log(e);
        console.log("Không load được form detail");
      }
    }
    loadData();

    
    return {
      funcValidate,
      valid,
      resetValid,
      btnChangeCurrentFavoriteServiceId,
      currentFavoriteId,
      requiredInput,
      foodCodeRef,
      btnDeleteOnClick,
      btnAddFavoriteOnClick,
      columns,
      confirm,
      food,
      dialogState,
      dialogDetailAction,
      dialogTitle,
      btnCloseOnClick,
      btnSaveOnClick,
      btnSaveAndAddOnClick,
      inputFoodNameOnBlur,
      tab: ref("info"),
      val: ref(false),
      options: [
        { label: "Món ăn", value: "food" },
        { label: "Đồ uống", value: "drink" },
        { label: "Combo", value: "cb" },
        { label: "Khác", value: "other" },
      ],
      unitDialog: ref(false),
      foodGroupDialog: ref(false),
    };
  },
};
</script>

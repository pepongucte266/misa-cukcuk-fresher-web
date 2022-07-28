<template>
  <q-dialog v-model="groupDialog" persistent no-shake>
    <q-card class="m-dialog-menuadd">
      <q-card-section class="m-dialog-header">
        <span>Thêm Nhóm thực đơn</span>
        <div class="m-dialog-close-btn" v-close-popup>&#10006;</div>
      </q-card-section>

      <q-card-section class="">
        <div class="m-menu-unit-form">
          <div class="m-form-row">
            <span class="m-form-row-label"
              >Mã nhóm <span class="m-required">(*)</span></span
            >
            <div style="width: calc(100% - 125px)">
              <q-input
                outlined
                dense
                square
                input-class="m-row-input"
                autofocus
              >
              </q-input>
            </div>
          </div>
          <div class="m-form-row">
            <span class="m-form-row-label"
              >Tên nhóm <span class="m-required">(*)</span></span
            >
            <div style="width: calc(100% - 125px)">
              <q-input
                outlined
                dense
                square
                input-class="m-row-input"
                autofocus
              >
              </q-input>
            </div>
          </div>
          <div class="m-form-row">
            <span class="m-form-row-label"
              >Thuộc loại <span class="m-required">(*)</span></span
            >
            <div style="width: calc(100% - 125px)">
              <q-input
                outlined
                dense
                square
                input-class="m-row-input"
                v-model="food.FoodCategoryName"
                readonly
              >
              </q-input>
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
                input-class="m-row-input"
                popup-content-class="m-combobox-popup"
              >
                <template v-slot:after>
                  <q-icon
                    style="cursor: pointer"
                    size="15px"
                    name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png"
                  />
                </template>
              </q-select>
            </div>
          </div>
          <div class="m-form-row textarea">
            <span class="m-form-row-label">Diễn giải</span>
            <div style="width: calc(100% - 125px)" class="m-textarea">
              <q-input
                borderless
                autogrow
                v-model="text"
                type="textarea"
                input-class="m-row-input-area"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions
        class="m-dialog-footer row no-wrap item-center justify-between"
      >
        <div class="m-dialog-footer-btn row flex-center">
          <div
            class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-help"
          ></div>
          <div class="m-toolbar-item-text">Giúp</div>
        </div>

        <div class="row">
          <div class="m-dialog-footer-btn row flex-center">
            <div
              class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-save"
            ></div>
            <div class="m-toolbar-item-text">Cất</div>
          </div>

          <div class="m-dialog-footer-btn row flex-center" v-close-popup>
            <div
              class="m-dialog-footer-btn-icon m-icon-toolbar m-icon-toolbar-cancel"
            ></div>
            <div class="m-toolbar-item-text">Hủy bỏ</div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref,computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["foodGroupDialog"],
  setup(props,{emit}) {
    const store = useStore();
    return {
      //khỏi tạo biến loại món 
      groupDialog: computed({
        get() {
          return props.foodGroupDialog;
        },
        set(value) {
          emit("updateFoodGroupDialog", value);
        },
      }),
      food:computed(() => store.getters.getFood),
      text:ref("")
    };
  },
};
</script>

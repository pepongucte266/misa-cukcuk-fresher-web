<template>
  <q-dialog v-model="aunitDialog" persistent no-shake>
    <q-card class="m-dialog-unit">
      <q-card-section class="m-dialog-header">
        <span>Thêm Đơn vị tính</span>
        <div class="m-dialog-close-btn">&#10006;</div>
      </q-card-section>

      <q-card-section class="">
        <div class="m-menu-unit-form">
          <div class="m-form-row">
            <span class="m-form-row-label"
              >Đơn vị tính <span class="m-required">(*)</span></span
            >
            <div style="width: calc(100% - 125px)">
              <q-input
                outlined
                dense
                square
                input-class="m-row-input"
                autofocus
                v-model="foodUnitName"
              >
              </q-input>
            </div>
          </div>
          <div class="m-form-row textarea">
            <span class="m-form-row-label">Diễn giải</span>
            <div style="width: calc(100% - 125px)" class="m-textarea">
              <q-input
                borderless
                autogrow
                type="textarea"
                input-class="m-row-input-area"
                v-model="foodUnitDetail"
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
          <div
            class="m-dialog-footer-btn row flex-center"
            @click="btnSaveOnClick"
          >
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["unitDialog"],
  setup(props, { emit }) {
    const store = useStore();
    var foodUnitName = ref("");
    var foodUnitDetail = ref("");

    /**
     * Hàm xử lý thêm mới đơn vị thức ăn
     * Created By VTSON 22-07-2022
     */
    async function btnSaveOnClick() {
      await store.dispatch("insert", {
        tableName: "FoodUnit",
        entityName: "foodUnit",
        entityObj: {
          FoodUnitName: foodUnitName.value,
          FoodUnitDetail: foodUnitDetail.value,
        },
      });
      emit("updateDialog", false)
      store.dispatch("getListByTableName", {
          listName: "foodUnitList",
          tableName: "FoodUnit",
        });
    }

    return {
      btnSaveOnClick,
      foodUnitName,
      foodUnitDetail,
      aunitDialog: computed({
        get() {
          return props.unitDialog;
        },
        set(value) {
          emit("updateDialog", value);
        },
      }),
    };
  },
};
</script>

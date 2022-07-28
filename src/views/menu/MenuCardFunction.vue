<template>
  <div class="screen" @click="$store.dispatch('changeShowExpand', false)">
    <div
      class="row items-start"
      style="position: fixed; z-index: 100"
      :style="{ top: screenY, left: screenX }"
    >
      <q-card class="my-card" square bordered>
        <q-card-actions vertical>
          <div
            class="m-card-item row items-center"
            @click="
              $store.dispatch('changeDialogDetail', true);
              $store.dispatch('changeDialogDetailAction', 0);
            "
          >
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-add"
            ></div>
            <div class="m-card-item-text">Thêm thực đơn</div>
          </div>

          <div
            class="m-card-item row items-center"
            @click="
              $store.dispatch('changeDialogDetail', true);
              $store.dispatch('changeDialogDetailAction', 2);
            "
          >
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-duplicate"
            ></div>
            <div class="m-card-item-text">Nhân bản</div>
          </div>

          <div
            class="m-card-item row items-center"
            @click="
              $store.dispatch('getFoodById');
              $store.dispatch('changeDialogDetail', true);
              $store.dispatch('changeDialogDetailAction', 1);
            "
          >
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-edit"
            ></div>
            <div class="m-card-item-text">Sửa</div>
          </div>

          <div
            class="m-card-item row items-center"
            @click="$store.dispatch('delete')"
          >
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-delete"
            ></div>
            <div class="m-card-item-text">Xóa</div>
          </div>

          <q-separator />

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-refresh"
            ></div>
            <div class="m-card-item-text">Nạp</div>
          </div>

          <q-separator />

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-folder"
            ></div>
            <div class="m-card-item-text">Chọn từ thư viện</div>
          </div>

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-import"
            ></div>
            <div class="m-card-item-text">Nhập khẩu</div>
          </div>

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-export"
            ></div>
            <div class="m-card-item-text">Xuất khẩu</div>
          </div>

          <q-separator />

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-image"
            ></div>
            <div class="m-card-item-text">Cập nhật ảnh</div>
          </div>

          <q-separator />

          <div class="m-card-item row items-center">
            <div
              class="m-card-item-icon m-icon-toolbar m-icon-toolbar-price"
            ></div>
            <div class="m-card-item-text">Cập nhật giá</div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>

<script>
export default {
  props: ["screenX", "screenY"],
  setup() {},
};
</script>

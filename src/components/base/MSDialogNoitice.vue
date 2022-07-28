<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin m-dialog-noitice">
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <q-card-section class="m-dialog-header">
        CUKCUK - Quản lý nhà hàng
      </q-card-section>

      <q-card-section   >
        <div class="m-dialog-noitice-content row no-wrap items-center">
          <div><div class="m-dialog-noitice-icon m-icon-question "></div></div>
          
          <span>{{ msgList }}</span>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions
        class="m-dialog-footer row no-wrap item-center justify-between"
      >
        <div></div>
        <div class="row">
          <div class="m-dialog-footer-btn row flex-center" @click="onOKClick">
            <div class="m-toolbar-item-text">Có</div>
          </div>

          <div
            class="m-dialog-footer-btn row flex-center"
            @click="onCancelClick"
          >
            <div class="m-toolbar-item-text">Không</div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";

export default {
  props: ["msgList"],

  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,

      onOKClick() {
        onDialogOK();
      },

      onCancelClick: onDialogCancel,
    };
  },
};
</script>

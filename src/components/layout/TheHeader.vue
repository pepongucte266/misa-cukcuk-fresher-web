<template>
  <q-header bordered class="row m-header">
    <q-toolbar class="m-header-left">
      <div class="m-header-icon-menu"></div>
      <q-toolbar-title>
        <div class="m-header-logo"></div>
      </q-toolbar-title>
    </q-toolbar>

    <q-toolbar class="col m-header-right">
      <div style="width:240px;">
        <q-select
          v-model="restaurant"
          borderless
          :options="['Nam food', 'Kho tổng', 'BoBo ChaCha QS']"
          input-class="m-input-combobox"
          class="m-header-combobox"

        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>

          <template v-slot:after>
            <q-btn dense flat icon="filter_alt" text-color="white" />
          </template>
        </q-select>
      </div>
      <q-space> </q-space>

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
      <q-select
        v-model="language"
        use-input
        borderless
        :options="['Tiếng Việt', 'Tiếng Anh', 'Tiếng Lào']"
        input-class="m-input-combobox"
        class="m-header-combobox"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-btn flat icon="public"></q-btn>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
@import url("../../style/layout/header.css");
</style>

<script>
import { ref } from "vue";
export default {
  setup() {
    return { restaurant: ref("Thái Sơn restaurant") ,language:ref("Tiếng Việt")};
  },
};
</script>

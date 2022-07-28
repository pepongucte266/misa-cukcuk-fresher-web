<template>
  <div class="m-table-filter-box">
    <div style="position: relative">
      <div class="m-table-btn-filter" @click="btnFilterOnClick">{{ icon }}</div>
      <div class="row items-start" style="position: fixed; z-index: 100">
        <q-card class="my-card" v-if="isShow" square bordered>
          <q-card-actions vertical>
            <div
              class="m-card-filter-item row items-center"
              @click="btnFilterItemOnClick('∗')"
            >
              <div
                class="m-card-filter-icon"
                :class="{ 'm-icon-filter-selected': icon == '∗' }"
              ></div>
              <div class="m-card-item-text">∗ : Chứa</div>
            </div>

            <div
              class="m-card-filter-item row items-center"
              @click="btnFilterItemOnClick('=')"
            >
              <div
                class="m-card-filter-icon"
                :class="{ 'm-icon-filter-selected': icon == '=' }"
              ></div>
              <div class="m-card-item-text">= : Bằng</div>
            </div>

            <div
              class="m-card-filter-item row items-center"
              @click="btnFilterItemOnClick('+')"
            >
              <div
                class="m-card-filter-icon"
                :class="{ 'm-icon-filter-selected': icon == '+' }"
              ></div>
              <div class="m-card-item-text">+ : Bắt đầu bằng</div>
            </div>

            <div
              class="m-card-filter-item row items-center"
              @click="btnFilterItemOnClick('-')"
            >
              <div
                class="m-card-filter-icon"
                :class="{ 'm-icon-filter-selected': icon == '-' }"
              ></div>
              <div class="m-card-item-text">- : Kết thúc bằng</div>
            </div>

            <div
              class="m-card-filter-item row items-center"
              @click="btnFilterItemOnClick('!')"
            >
              <div
                class="m-card-filter-icon"
                :class="{ 'm-icon-filter-selected': icon == '!' }"
              ></div>
              <div class="m-card-item-text">! : Không chứa</div>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <input class="m-table-header-input" type="text" v-model="inputValue" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["column"],
  setup(props) {
    const store = useStore();
    var isShow = ref(false);
    var icon = ref("∗");
    var inputValue = ref("");
    var newVal = "";
    function btnFilterOnClick() {
      isShow.value = !isShow.value;
    }
    function btnFilterItemOnClick(value) {
      icon.value = value;
      if (inputValue.value != "") {
        if (value == "∗") newVal = `LIKE '%${inputValue.value}%'`;
        if (value == "=") newVal = `LIKE '${inputValue.value}'`;
        if (value == "-") newVal = `LIKE '%${inputValue.value}'`;
        if (value == "+") newVal = `LIKE '${inputValue.value}%'`;
        if (value == "!") newVal = `NOT LIKE '${inputValue.value}'`;
        store.dispatch("changeFilterList", {
          column: props.column,
          newVal,
        });
        store.dispatch("getFilterFoodList");
      }

      isShow.value = false;
    }

    return { btnFilterOnClick, isShow, icon, btnFilterItemOnClick, inputValue };
  },
};
</script>

<template>

  <q-td key="FavoriteServiceName" class="text-left">
    <div class="m-form-row m-favorite-select">
      <q-select
        outlined
        dense
        square
        use-input
        v-model="$store.getters.getFoodFavoriteList[index].FavoriteServiceId"
        :options="$store.getters.getFavoriteList"
        option-value="FavoriteServiceId"
        option-label="FavoriteServiceName"
        emit-value
        map-options
        popup-content-class="m-combobox-popup"
        input-style="width:470px"
        hide-dropdown-icon
      >
        <template v-slot:append>
          <q-icon style="cursor: pointer" name="arrow_drop_down"> </q-icon>
          <div class="m-icon-search"></div>
          <q-icon
            style="cursor: pointer"
            size="15px"
            name="img:https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png"
            @click.prevent=""
          >
          </q-icon>
        </template>
      </q-select>
    </div>
  </q-td>

  <q-td key="FavoriteServicePrice" class="m-form-row m-table-favorite-row"> 
    <q-input
      outlined
      dense
      square
      input-class="m-row-input text-right"
      v-model="$store.getters.getFoodFavoriteList[index].FavoriteServicePrice"
    >
    </q-input>
  </q-td>
</template>

<style scoped>
@import url("../../style/components/combobox.css");
</style>

<script>
import { ref,computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["index"],
  setup() {
    
    const store = useStore();
    // var selectValue = computed({
    //   get() {
    //     return store.getters.getFoodFavoriteList[props.index]
    //   },
    //   set(val) {
    //     console.log(val);
    //   }
    // })
    var food = computed(() => store.getters.getFood);
    return { food,value: ref(""),price: ref("") };
  },
};
</script>

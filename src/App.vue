<template>
  <q-layout view="hHh lpR lFr">
    <TheHeader></TheHeader>
    <TheNavbar></TheNavbar>
    <TheContent></TheContent>
  </q-layout>
</template>

<style>

@import url("./style/main.css");


</style>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheContent from "./components/layout/TheContent.vue";
export default {
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
  },
};
</script>

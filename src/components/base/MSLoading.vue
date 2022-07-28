<template>
  <div class="m-loading">
    <div class="m-loading-content-box">
      <div class="m-loading-content">Đang lấy dữ liệu ...</div>
    </div>
  </div>
</template>

<style scoped>
.m-loading {
  background-color: rgba(10,10,10,.4)!important;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-loading-content-box {
  padding: 8px;
  background-color: #e5e5e5;
  border-radius: 4px;

}
.m-loading-content {
  padding: 21px 0  0;
  background-image: url(https://cdn2.cukcuk.vn/QLNH/resources/images/loadmask/loading.gif);
  background-repeat: no-repeat;
  background-position: center 0;
  font-size: 13px;
}
</style>

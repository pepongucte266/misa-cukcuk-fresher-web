<template>
  <q-drawer :width="230" show-if-above side="left" behavior="desktop" bordered>
    <q-scroll-area class="m-navbar fit">
      <q-list separator>
        <q-item class="m-navbar-item"  active-class="m-navbar-item-active" clickable :to="{ name: 'menu' }">
          <div class="m-icon-menu">
            <div class="m-icon m-icon-overview"></div>
          </div>
          <div>Tổng quan</div>
        </q-item>
        <q-item class="m-navbar-item"  active-class="m-navbar-item-active" clickable :to="{ name: 'about' }">
          <div class="m-icon-menu">
            <div class="m-icon m-icon-report"></div>
          </div>
          <div>Báo cáo</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable :to="{ name: 'card' }">
          <div class="m-icon-menu">
            <div class="m-icon m-icon-purcha"></div>
          </div>
          <div>Mua hàng</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable :to="{ name: 'loading' }" >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-stock"></div>
          </div>
          <div>Kho</div> </q-item
        ><q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable :to="{ name: 'filter' }">
          <div class="m-icon-menu">
            <div class="m-icon m-icon-cast"></div>
          </div>
          <div>Quỹ tiền mặt</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-bank"></div>
          </div>
          <div>Quỹ tiền gửi</div> </q-item
        ><q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable>
          <div class="m-icon-menu">
            <div class="m-icon m-icon-cost"></div>
          </div>
          <div>Chi phí</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-discount"></div>
          </div>
          <div>Khuyến mại</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable :to="{ name: 'menu' }">
          <div class="m-icon-menu">
            <div class="m-icon m-icon-menufood"></div>
          </div>
          <div>Thực đơn</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-dictionary"></div>
          </div>
          <div>Danh mục</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable>
          <div class="m-icon-menu">
            <div class="m-icon m-icon-cancelinvoice"></div>
          </div>
          <div>Hủy hóa đơn</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-setting"></div>
          </div>
          <div>Thiết lập hệ thống</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable>
          <div class="m-icon-menu">
            <div class="m-icon m-icon-application"></div>
          </div>
          <div>Ứng dụng</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-web"></div>
          </div>
          <div>Bán hàng Online</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable>
          <div class="m-icon-menu">
            <div class="m-icon m-icon-misa-lomas"></div>
          </div>
          <div>MISA Lomas</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-knowledge"></div>
          </div>
          <div>Tri thức</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable>
          <div class="m-icon-menu">
            <div class="m-icon m-icon-help"></div>
          </div>
          <div>Trợ giúp</div>
        </q-item>
        <q-item class="m-navbar-item" active-class="m-navbar-item-active" clickable >
          <div class="m-icon-menu">
            <div class="m-icon m-icon-subscriber"></div>
          </div>
          <div>Gói dịch vụ và phần mềm</div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped>
@import url("../../style/layout/navbar.css");
</style>

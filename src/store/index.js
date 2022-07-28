import { createStore } from "vuex";
import { Dialog, Notify } from "quasar";
import {URL} from "../constant"
import axios from "axios";
export default createStore({
  state: {
    /**
     * Hiển thị dialog chi tiết món ăn
     * @return: true - hiển thị, false - không hiển thị
     * CreatedBy VTSON 15/07-2022
     */
    showDialogDetails: false,
    /**
     * Hiển thị dialog thông báo
     * @return: true - hiển thị, false - không hiển thị
     * CreatedBy VTSON 15/07-2022
     */
    showDialogNoitice: false,
    /**
     * Hiển thị dialog chi tiết món ăn đang loading
     * @return: true - hiển thị, false - không hiển thị
     * CreatedBy VTSON 15-07-2022
     */
    showLoading: false,
    /**
     * Hiển thị thẻ chức năng khi ấn chuột phải vào các row
     * @return: true - hiển thị, false - không hiển thị
     * CreatedBy VTSON 15-07-2022
     */
    showExpand: false,
    /**
     * Các dòng đang được chọn
     * @return: Mảng chứa các dòng đang được select
     * CreatedBy VTSON 15-07-2022
     */
    rowSelected: [],
    /**
     * Danh sách các món ăn
     * CreatedBy VTSON 15-07-2022
     */
    foodList: [],
    /**
     * Danh sách các đơn vị món ăn
     * CreatedBy VTSON 15-07-2022
     */
    foodUnitList: [],
    /**
     * Danh sách các loại vị món ăn
     * CreatedBy VTSON 15-07-2022
     */
    foodCategoryList: [],
    /**
     * Danh sách thứ tự món ăn
     * CreatedBy VTSON 15-07-2022
     */
    foodSequenceList: [],
    /**
     * Danh sách các đơnơi chế bién món ăn
     * CreatedBy VTSON 15-07-2022
     */
    foodPlaceList: [],
    /**
     * Danh sách các nhóm thực đơn
     * CreatedBy VTSON 15-07-2022
     */
    foodGroupList: [],
    /**
     * Danh sách các sở thích phục vụ
     * CreatedBy VTSON 20-07-2022
     */
    favoriteList: [],
    /**
     * Danh sách các sở thích phục vụ của món ăn
     * CreatedBy VTSON 20-07-2022
     */
    foodFavoriteList: [],
    /**
     * Danh sách các nhóm sở thích phục vụ
     * CreatedBy VTSON 20-07-2022
     */
    favoriteGroupList: [],
    /**
     * Thông tin món ăn được chọn
     * CreatedBy VTSON 20-07-2022
     */
    food: {},
    /**
     * Danh sách bộ lọc
     * CreatedBy VTSON 20-07-2022
     */
    filterList: {},
    //0: thêm; 1: Sửa; 2: Nhân bản
    dialogDetailAction: 0,
    /**
     * Đối tượng phân trang
     * CreatedBy VTSON 20-07-2022
     */
    pagination: { sortBy: "desc", descending: false, page: 1, rowsPerPage: 50 },
    /**
     * Hiển thị table đang load
     * @return: true - hiển thị, false - không hiển thị
     * CreatedBy VTSON 15/07-2022
     */
    tableLoading: false,
  },
  getters: {
    getShowDialogDetail: (state) => state.showDialogDetails,
    getFoodList: (state) => state.foodList,
    getFood: (state) => state.food,
    getDialogDetailAction: (state) => state.dialogDetailAction,
    getFoodUnitList: (state) => state.foodUnitList,
    getFoodCategoryList: (state) => state.foodCategoryList,
    getFoodSequenceList: (state) => state.foodSequenceList,
    getFavoriteList: (state) => state.favoriteList,
    getFoodPlaceList: (state) => state.foodPlaceList,
    getFoodGroupList: (state) => state.foodGroupList,
    getRowSelected: (state) => state.rowSelected,
    getShowLoading: (state) => state.showLoading,
    getShowExpand: (state) => state.showExpand,
    getIsTableLoading: (state) => state.tableLoading,
    getFoodFavoriteList: (state) => state.foodFavoriteList,
  },
  mutations: {
    /**
     * Thay đổi trạng thái form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeDialogDetail(state, newVal) {
      state.showDialogDetails = newVal;
    },
    /**
     * Thay đổi kiểu form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeDialogDetailAction(state, newVal) {
      state.dialogDetailAction = newVal;
    },
    /**
     * Thay đổi trạng thái load form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeShowLoading(state, newVal) {
      state.showLoading = newVal;
    },
    /**
     * Thay đổi trạng thái form thẻ khi ấn chuojt phải
     * CreatedBy VTSON 15/07-2022
     */
    changeShowExpand(state, newVal) {
      state.showExpand = newVal;
    },
    /**
     * Thay đổi đổi tượng lilter
     * CreatedBy VTSON 15/07-2022
     */
    changeFilterList(state, { column, newVal }) {
      // state.filterList.push(`${column} ${newVal}`);
      state.filterList[column] = newVal;
    },
    /**
     * Thay đổi trang hiện tại
     * CreatedBy VTSON 15/07-2022
     */
    changeCurrentPage(state, newVal) {
      state.pagination.page = Number(newVal);
    },
    /**
     * Thay đổi danh ách sở thích phục vụ của món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeFoodFavoriteList(state, newList) {
      state.foodFavoriteList = newList;
    },
    /**
     * reset food
     * CreatedBy VTSON 15/07-2022
     */
    resetFood(state) {
      state.food = {};
    },
    /**
     * Reset đổi tượng lilter
     * CreatedBy VTSON 15/07-2022
     */
    resetFilterList(state) {
      state.filterList = [];
    },
    /**
     * Reset đổi list sở thích theo món
     * CreatedBy VTSON 25-07-2022
     */
    resetFoodFavoriteList(state) {
      state.foodFavoriteList = [];
    },
    /**
     * Thay đổi số dòng select
     * CreatedBy VTSON 15/07-2022
     */
    changeRowSelected(state, { newVal, type }) {
      if (type) {
        state.rowSelected = [];
        state.rowSelected.push(newVal);
      } else {
        if (typeof state.rowSelected != "object") state.rowSelected = [];
        state.rowSelected.push(newVal);
      }
    },
    /**
     * Thay đổi trạng thái của table
     * CreatedBy VTSON 15/07-2022
     */
    changeTableLoading(state, newVal) {
      state.tableLoading = newVal;
    },
    /**
     * Lấy danh sách món ăn
     * CreatedBy VTSON 15/07-2022
     */
    getFoodList(state, foodList) {
      if (foodList) state.foodList = foodList;
      else state.foodList = [];
    },
    /**
     * Lấy danh sách món ăn theo id
     * CreatedBy VTSON 15/07-2022
     */
    getFoodById(state, food) {
      state.food = food;
    },
    /**
     * Lấy danh sách món ăn theo mã món ăn
     * CreatedBy VTSON 15/07-2022
     */
    getFoodByFoodCode(state, food) {
      state.food = food;
    },
    /**
     * Lấy danh sách sở thích phục vụ theo món ăn
     * CreatedBy VTSON 15/07-2022
     */
    getFoodFavoriteByFoodId(state, list) {
      state.foodFavoriteList = list;
    },
    /**
     * Lấy danh theo tên bảng
     * CreatedBy VTSON 15/07-2022
     */
    getListByTableName(state, { data, listName }) {
      state[listName] = data;
    },
  },
  actions: {
    /**
     * Thay đổi trạng thái form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeDialogDetail({ commit }, newVal) {
      commit("changeDialogDetail", newVal);
    },
    /**
     * Thay đổi kiểu form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeDialogDetailAction({ commit }, newVal) {
      commit("changeDialogDetailAction", newVal);
    },
    /**
     * Thay đổi trạng thái load form chi tiết món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeShowLoading({ commit }, newVal) {
      commit("changeShowLoading", newVal);
    },
    /**
     * Thay đổi trạng thái form thẻ khi ấn chuojt phải
     * CreatedBy VTSON 15/07-2022
     */
    changeShowExpand({ commit }, newVal) {
      commit("changeShowExpand", newVal);
    },
    /**
     * Thay đổi số dòng select
     * CreatedBy VTSON 15/07-2022
     */
    changeRowSelected({ commit }, { newVal, type }) {
      commit("changeRowSelected", { newVal, type });
    },
    /**
     * Thay đổi đổi tượng lilter
     * CreatedBy VTSON 15/07-2022
     */
    changeFilterList({ commit }, { column, newVal }) {
      commit("changeFilterList", { column, newVal });
    },
    /**
     * Thay đổi trang hiện tại
     * CreatedBy VTSON 15/07-2022
     */
    changeCurrentPage({ commit }, newVal) {
      commit("changeCurrentPage", newVal);
    },
    changeTableLoading({ commit }, newVal) {
      commit("changeTableLoading", newVal);
    },
    /**
     * Thay đổi danh ách sở thích phục vụ của món ăn
     * CreatedBy VTSON 15/07-2022
     */
    changeFoodFavoriteList({ commit, state }, index) {
      var newList = state.foodFavoriteList.filter(
        (value) => value != state.foodFavoriteList[index]
      );
      commit("changeFoodFavoriteList", newList);
    },
    /**
     * reset food
     * CreatedBy VTSON 15/07-2022
     */
    resetFood({ commit }) {
      commit("resetFood");
    },
    /**
     * Reset đổi tượng lilter
     * CreatedBy VTSON 15/07-2022
     */
    resetFilterList({ commit }) {
      commit("resetFilterList");
    },
    /**
     * Reset list sở thích theo món
     * CreatedBy VTSON 25-07-2022
     */
    resetFoodFavoriteList({ commit }) {
      commit("resetFoodFavoriteList");
    },
    /**
     * Lấy danh sách món ăn
     * CreatedBy VTSON 15/07-2022
     */
    getFoodList({ commit }) {
      commit("changeTableLoading", true);
      // console.log(`${URL}Food`);
      return axios
        .get(`${URL}Food`)
        .then((response) => response.data)
        .then((data) => {
          commit("getFoodList", data);
          commit("changeShowLoading", false);
        })
        .catch((error) => {
          console.log(error);
          Notify.create({
            message: "Có lỗi xảy ra vui lòng liên hệ MISA",
            position: "top-right",
            classes: "m-toastbox",
            type: "negative",
            timeout: 1000,
          });
        })
        .finally(() => {
          commit("changeTableLoading", false);
        });
    },
    /**
     * Lấy danh sách món ăn theo filer
     * CreatedBy VTSON 15/07-2022
     */
    getFilterFoodList({ state, commit }) {
      commit("changeTableLoading", true);
      try {
        var list = [];
        for (var key in state.filterList) {
          list.push(`${key} ${state.filterList[key]}`);
        }
        axios
          .get(
            `${URL}Food/Filter?where=${list.join(
              " AND "
            )}`
          )
          .then((response) => response.data)
          .then((data) => {
            if (data) {
              commit("getFoodList", data.Data);
            } else {
              commit("getFoodList", []);
            }
          })
          .catch((err) => {
            console.log(err);
            Notify.create({
              message: "Có lỗi xảy ra vui lòng liên hệ MISA",
              position: "top-right",
              classes: "m-toastbox",
              type: "negative",
              timeout: 1000,
            });
          })
          .finally(() => {
            commit("changeTableLoading", false);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy danh sách món ăn theo id
     * CreatedBy VTSON 15/07-2022
     */
    getFoodById({ state, commit }) {
      commit("changeShowLoading", true);
      return axios
        .get(`${URL}Food/` + state.rowSelected[0])
        .then((response) => response.data)
        .then((food) => {
          commit("getFoodById", food);
        })
        .finally(() => {
          commit("changeShowLoading", false);
        });
    },
    /**
     * Lấy danh sách món ăn theo mã món ăn
     * CreatedBy VTSON 23/07-2022
     */
    getFoodByFoodCode({ commit }, foodCode) {
      commit("changeShowLoading", true);
      return axios
        .get(`${URL}Food/search/` + foodCode)
        .then((response) => response.data)
        .then((food) => {
          commit("getFoodByFoodCode", food);
        })
        .finally(() => {
          commit("changeShowLoading", false);
        });
    },
    /**
     * Lấy danh sách sở thích món ăn theo mã món ăn
     * CreatedBy VTSON 24-07-2022
     */
    async getFoodFavoriteByFoodId({ commit }, id) {
      try {
        const response = await axios.get(
          `${URL}FoodFavoriteService/` + id
        );
        const food = response.data;
        commit("getFoodFavoriteByFoodId", food);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Lấy danh sách theo tên bảng
     * CreatedBy VTSON 20-07-2022
     */
    getListByTableName({ commit }, { listName, tableName }) {
      return axios
        .get(`${URL}${tableName}`)
        .then((response) => response.data)
        .then((data) => {
          commit("getListByTableName", { data, listName });
        });
    },
    /**
     * Thêm món ăn vào sở thích món ăn
     * CreatedBy VTSON 24-07-2022
     */
    async insertFull({ state, commit, dispatch }) {
      try {
        commit("changeShowLoading", true);
        return axios
          .post(`${URL}Food/full`, state.food, {
            params: {
              foodFavoriteList: JSON.stringify(state.foodFavoriteList),
            },
          })
          .then(() => {
            dispatch("getFoodList");
            Notify.create({
              message: "Thêm mới thành công",
              position: "top-right",
              classes: "m-toastbox",
              type: "positive",
              timeout: 1000,
            });
            return true;
          })
          .catch((error) => {
            if (!error.response) {
              Notify.create({
                message: "Có lỗi xảy ra",
                position: "top-right",
                type: "negative",
                classes: "m-toastbox",
              });
            } else {
              error.response.data.data.errors.forEach((error) => {
                Notify.create({
                  message: error,
                  position: "top-right",
                  type: "negative",
                  classes: "m-toastbox",
                });
              });
            }
            return false;
          });
      } catch (error) {
        Notify.create({
          message: "Có lỗi xảy ra vui lòng liên hệ hotline",
          position: "top-right",
          type: "negative",
          classes: "m-toastbox",
        });
      } finally {
        commit("changeShowLoading", false);
      }
    },
    /**
     * Cập nhật món ăn và sở thích món ăn
     * CreatedBy VTSON 24-07-2022
     */
    async updateFull({ state, commit, dispatch }) {
      try {
        commit("changeShowLoading", true);
        if (state.food.FoodSellPrice.toString().includes(",")) {
          state.food.FoodSellPrice = state.food.FoodSellPrice.replace(".", "");
        }
        return axios
          .put(`${URL}Food/full`, state.food, {
            params: {
              foodFavoriteList: JSON.stringify(state.foodFavoriteList),
            },
          })
          .then(() => {
            dispatch("getFoodList");
            Notify.create({
              message: "Cập nhật thành công",
              position: "top-right",
              classes: "m-toastbox",
              type: "positive",
              timeout: 1000,
            });
            return true;
          })
          .catch((error) => {
            if (!error.response) {
              Notify.create({
                message: "Có lỗi xảy ra",
                position: "top-right",
                type: "negative",
                classes: "m-toastbox",
              });
            } else {
              error.response.data.data.errors.forEach((error) => {
                Notify.create({
                  message: error,
                  position: "top-right",
                  type: "negative",
                  classes: "m-toastbox",
                });
              });
            }
            return false;
          });
      } catch (error) {
        Notify.create({
          message: "Có lỗi xảy ra vui lòng liên hệ hotline",
          position: "top-right",
          type: "negative",
          classes: "m-toastbox",
        });
      } finally {
        commit("changeShowLoading", false);
      }
    },

    /**
     * Thêm mới đối tượng vào db theo tên bảng
     * CreatedBy VTSON 22-07-2022
     */
    async insert(
      { state, dispatch, commit },
      { tableName, entityName, entityObj = null }
    ) {
      try {
        commit("changeShowLoading", true);
        if (!entityObj) {
          entityObj = state[entityName];
        }
        return axios
          .post(`${URL}${tableName}`, entityObj)
          .then(() => {
            dispatch("getFoodList");
            Notify.create({
              message: "Thêm mới thành công",
              position: "top-right",
              classes: "m-toastbox",
              type: "positive",
              timeout: 1000,
            });
            return true;
          }).catch(error=>{
            if (!error.response) {
              Notify.create({
                message: "Có lỗi xảy ra",
                position: "top-right",
                type: "negative",
                classes: "m-toastbox",
              });
            } else {
              error.response.data.data.errors.forEach((error) => {
                Notify.create({
                  message: error,
                  position: "top-right",
                  type: "negative",
                  classes: "m-toastbox",
                });
              });
            }
            return false;
          })
      } catch (error) {
        Notify.create({
          message: "Có lỗi xảy ra vui lòng liên hệ hotline",
          position: "top-right",
          type: "negative",
          classes: "m-toastbox",
        });
      } finally {
        commit("changeShowLoading", false);
      }
    },

    /**
     * Cập nhật đối tượng vào db theo tên bảng
     * CreatedBy VTSON 22-07-2022
     */
    async update({ state, dispatch, commit }, { tableName, entityName }) {
      try {
        commit("changeShowLoading", true);
        var entity = state[entityName];
        if(entity.FoodSellPrice) {

          entity.FoodSellPrice = entity.FoodSellPrice.replace(".", "");
        }
        await axios.put(
          `${URL}${tableName}/${state.rowSelected[0]}`,
          entity
        );
        dispatch("getFoodList");
        Notify.create({
          message: "Cập nhật thành công",
          position: "top-right",
          classes: "m-toastbox",
          type: "positive",
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);
        if (!error.response.data.data) {
          error.response.data = { data: { errors: ["Có lỗi xảy ra"] } };
        }
        error.response.data.data.errors.forEach((error) => {
          Notify.create({
            message: error,
            position: "top-right",
            type: "negative",
            classes: "m-toastbox",
          });
        });
        commit("changeShowLoading", false);
      }
    },

    /**
     * Xóa món ăn theo list id
     * CreatedBy VTSON 22-07-2022
     */
    async delete({ state, dispatch }, tableName = "") {
      try {
        if (state.rowSelected.length > 0) {
          var msgList =
            "Bạn có chắc chắn muốn xóa những món món đã chọn không?";
          if (state.rowSelected.length == 1) {
            await dispatch("getFoodById");
            msgList = `Bạn có chắc chắn muốn xóa món <<${state.food.FoodCode} - ${state.food.FoodName}>> không?`;
          }
          Dialog.create({
            title: "Error",
            message: "msg",
            component: "MSDialogNoitice",
            componentProps: { msgList },
          }).onOk(() => {
            axios
              .delete(
                `${URL}Food${tableName}/${state.rowSelected}`
              )
              .then((response) => response.data)
              .then(() => {
                dispatch("getFoodList");
                Notify.create({
                  message: "Xóa thành công",
                  position: "top-right",
                  type: "negative",
                  classes: "m-toastbox",
                  timeout: 1000,
                });
              });
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});

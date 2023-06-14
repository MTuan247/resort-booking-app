
import Swal from "sweetalert2";
export default {
  beforeMount() {
    this.loadData();
  },
  data() {
    return {
      // Dữ liệu danh sách
      gridData: {
        default: () => []
      },
      // Form chi tiết
      detailForm: '',
      // Khóa chính entity
      keyEntity: ''
    }
  },
  methods: {
    // Mở form sửa
    editRow(row) {
      this.$popup.show(
        { component: this.detailForm },
        {
          data: row,
          mode: this.$enums.ModelState.Edit,
          afterSave: this.loadData,
        }
      );
    },
    // Load dữ liệu
    async loadData() {
      var res = await this.api.get();
      this.gridData = this.customData(res.data)
    },
    // Custom lại dữ liệu
    customData(listData) {
      return listData;
    },
    /**
     * Mở form thêm
     */
    add() {
      this.$popup.show(
        { component: this.detailForm },
        {
          data: {},
          mode: this.$enums.ModelState.Add,
          afterSave: this.loadData,
        }
      );
    },
    // Xóa dữ liệu
    del(ids) {
      this.api
        .delete({
          Condition: {
            [this.keyEntity]: ids,
          },
        })
        .then(() => {
          this.loadData();
        });
    },
    // Xóa dòng
    deleteRow(row) {
      this.deletes([row[this.keyEntity]])
    },
    // Xóa nhiều
    deletes(deleteIds) {
      Swal.fire({
        title: "Xóa dữ liệu",
        text: "Bạn có muốn xóa dữ liệu đã chọn không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          this.del(deleteIds);
        }
      });
    }
  },
}
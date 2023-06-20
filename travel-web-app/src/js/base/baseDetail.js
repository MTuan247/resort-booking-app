

export default {
  data() {
    return {
      // Ẩn hiện form
      show: {
        default: true
      },
      // Dữ liệu chi tiết
      model: {
        default: () => {}
      },
      // Khóa chính entity
      keyEntity: '',
      mode: {
        default: 0
      },
      params: {
        default: () => {}
      }
    }
  },
  methods: {
    /**
     * Trước khi mở form
     */
    beforeOpen(event) {
      this.model = { ...event.ref.params.value.data };
      this.mode = event.ref.params.value.mode;
      this.params = event.ref.params.value;

      if (this.mode == this.$enums.ModelState.Edit) {
        this.api.getById(this.model[this.keyEntity]).then((res) => {
          this.model = res.data;
        });
      }

      this.afterOpen();
    },

    /**
     * Sau khi mở form
     */
    afterOpen() {

    },

    /**
     * Thực hiện lưu
     */
    async save() {
      let res = {};
      
      let newId = this.$uuid.v1();
      
      switch (this.mode) {
        case this.$enums.ModelState.Add:
          if (!this.model[this.keyEntity]) {
            this.model[this.keyEntity] = newId;
          }
          res = await this.api.post({
            Model: this.model,
          });
          break;
        case this.$enums.ModelState.Edit:
          res = await this.api.put({
            Model: this.model,
            Condition: {
            [this.keyEntity]: this.model[this.keyEntity],
            },
          });
          break;
      }
      if (res.data) {
        if (typeof this.params.afterSave == "function") {
          this.params.afterSave();
        }
        this.$toast.success("Lưu dữ liệu thành công");
        this.show = false;
      }
    }

  },
}
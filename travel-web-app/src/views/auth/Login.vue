<template>
  <div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';

export default {
  name: "LoginView",
  components: {
  },
  methods: {
  },
  setup() {

    const { proxy } = getCurrentInstance();

    onMounted(() => {
      proxy.$popup.show({
        component: "LoginForm"
      }, {

      })
    })

    return {
      proxy
    }
  }
}
</script>

<style lang="scss">
</style>
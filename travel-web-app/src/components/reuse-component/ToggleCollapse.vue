<template>
  <div class="toggle-collapse-container">
    <div @click="toggle" class="toggle-header">
      <slot name="header"></slot>
      <v-icon size="16" class="ml-4" :icon="show ? 'fa:fas fa-chevron-down' : 'fa:fas fa-chevron-right'"></v-icon>
    </div>
    <slot v-if="show" name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'ToggleCollapse',
  props: {
    defaultToggle: {
      default: () => true
    }
  },
  data() {
    return {
      show: this.defaultToggle
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    }
  }
};
</script>

<style>
.toggle-collapse-container .toggle-header {
  display: flex;
  align-items: center;
}
</style>
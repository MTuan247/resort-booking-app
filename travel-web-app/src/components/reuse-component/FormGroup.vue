<template>
  <div class="form-group" :title="title">
    <div class="form-group-title">{{title}}</div>
    <div class="form-group-input">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    title: {
      type: String
    },

  }
};
</script>

<style>
</style>
<template>
  <v-layout row wrap>
    <v-flex xs12>
      <swatches :label="name" :value="value.value" v-on:input="change($event)" colors="text-advanced" popover-to="right"
        shapes="circles" show-fallback class='extra-swatches-trigger-border'></swatches>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      value: Object,
      name: String,
    },
    methods: {
      change: function (event) {
        this.value.value = event;
        this.$emit('input', this.value);
      }
    }
  };
</script>
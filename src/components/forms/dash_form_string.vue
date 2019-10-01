<template>
  <v-text-field outlined :label="value.name" :value="value.value" v-on:input="change($event)" :readonly='readonly2'></v-text-field>
</template>

<script>
  export default {
    props: {
      value: Object,
      name: String,
    },
    computed: {
      readonly2: function () {
        return this.value.hasOwnProperty('readonly');
      }
    },
    methods: {
      change: function (event) {
        this.value.value = event;
        this.$emit('input', this.value);
      }
    }
  };
</script>
<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field outlined label="URL dados JSON" :value="value.value" v-on:input="change($event)" append-icon="visibility" @click:append='window.open(value.value)'></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      value: Object,
      name: String,
    },
    template: ``,
    methods: {
      change: function (event) {
        this.value.value = event;
        this.$emit('input', this.value);
      }
    }
  };
</script>
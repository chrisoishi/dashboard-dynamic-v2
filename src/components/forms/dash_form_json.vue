<template>
  <v-layout row wrap>
    <v-flex xs10>
      <v-text-field label="URL dados JSON" :value="value.value" v-on:input="change($event)"></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-btn fab dark small color="pink" v-on:click='window.open(value.value)'>
        <v-icon>visibility</v-icon>
      </v-btn>
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
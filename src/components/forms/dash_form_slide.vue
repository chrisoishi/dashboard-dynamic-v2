<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-slider small :step='step' :value="value.size" :max='max2' thumb-label="always" thumb-size='25px'
        v-on:input="change($event,'size')"></v-slider>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      value: Object,
      name: String,
    },
    computed: {
      max2: function () {
        if (this.value.hasOwnProperty('size_max')) return this.value.size_max;
        else return 30;
      },
      step: function () {
        if (this.value.hasOwnProperty('step')) return this.value.step;
        else return 1;
      }
    },
    methods: {
      change: function (event, target) {
        this.value[target] = event;
        this.$emit('input', this.value);
      }
    }
  };
</script>
<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field :placeholder="URL" :value='value.value' v-on:input="change($event,'value')"></v-text-field>
    </v-flex>

    <v-flex xs12>
      <swatches :value='value.color' v-on:input="change($event,'color')" colors="text-advanced" popover-to="right"
        shapes="circles" show-fallback class='extra-swatches-trigger-border'></swatches>
    </v-flex>

    <v-flex xs12>
      <v-slider small :value="value.opacity" :max='100' thumb-label="always" label='Opacidade' thumb-size='25px'
        v-on:input="change($event,'opacity')"></v-slider>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    props: {
      value: Object,
      name: String,
    },
    computed: {},
    methods: {
      change: function (event, target) {
        this.value[target] = event;
        this.$emit('input', this.value);
      }
    }
  };
</script>
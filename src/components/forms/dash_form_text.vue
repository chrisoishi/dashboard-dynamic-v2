<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field  outlined :label="name" :value='value.value' v-on:input="change($event,'value')"></v-text-field>
    </v-flex>

    <v-flex xs12>
      <swatches :value='value.color' v-on:input="change($event,'color')" colors="text-advanced" popover-to="right"
        shapes="circles" show-fallback class='extra-swatches-trigger-border mt-5'></swatches>
    </v-flex>

    <v-flex xs12>
      <v-btn-toggle v-model="align" class='mt-5'>
        <v-btn text v-on:click='change("left","align")'>
          <v-icon>format_align_left</v-icon>
        </v-btn>
        <v-btn text v-on:click='change("center","align")'>
          <v-icon>format_align_center</v-icon>
        </v-btn>
        <v-btn text v-on:click='change("right","align")'>
          <v-icon>format_align_right</v-icon>
        </v-btn>
        <v-btn text v-on:click='change("justify","align")'>
          <v-icon>format_align_justify</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-flex>

    <v-flex xs12>
      <v-slider class='mt-10' small step='0.1' :value="value.size" :max='max2' thumb-label="always" label='Tamanho' thumb-size='25px'
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
    data() {
      return {
        layout_bottom: false
      }
    },
    computed: {
      max2: function () {
        if (this.value.hasOwnProperty('size_max')) return this.value.size_max;
        else return 30;
      },
      align: function () {
        if (this.value.align == 'left') return 0;
        if (this.value.align == 'center') return 1;
        if (this.value.align == 'right') return 2;
        if (this.value.align == 'justify') return 3;
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
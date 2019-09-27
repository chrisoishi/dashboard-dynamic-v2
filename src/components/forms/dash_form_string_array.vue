<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-slider small v-model="value.size" :max='max2' thumb-label="always" label='Items' thumb-size='25px'
        v-on:change="change($event,'size')"></v-slider>
    </v-flex>
    <v-flex xs12 v-for='i in value.size' :key='i'>
      <dash-form-string :name='value.name' :value='value.items[i-1]' v-on:input='change($event,value.items[i-1])'>
      </dash-form-string>
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
        id: Math.random()
      }
    },
    computed: {
      max2: function () {
        if (this.value.hasOwnProperty('size_max')) return this.value.size_max;
        else return 200;
      },
    },
    watch: {
      "value.size": function () {
        this.checkSize(false);
      },

    },

    methods: {
      change: function (event, target) {
        if (target.typeof == "string") {
          this.value[target] = event;
        } else {
          target = event;
        }
        this.$emit('input', this.value);
      },
      checkSize: function () {
        if (!this.value.hasOwnProperty('items')) this.value.items = [];
        while (this.value.items.length < this.value.size) {
          this.value.items.push({
            value: ""
          });
        }
        while (this.value.items.length > this.value.size) {
          this.value.items.pop();
        }
      }
    },
    created() {
      this.value.size = parseInt(this.value.size);
      this.checkSize();
    }
  };
</script>
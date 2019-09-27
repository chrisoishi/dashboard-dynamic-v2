<template>
  <div style='font-size:1vw;height:100%;max-height:100%;width:100%;max-width:100%' ref='container'>
    <v-layout align-center fill-height :style="'font-size:'+default_size+'em;margin:0'">
      <v-flex :style="'font-size:'+data.size+'em;color:'+data.color+';white-space: pre-line;'"
        :class="'font-weight-'+data.font+' text-'+data.align" v-on:click="onclick()" @click.stop="stopTheEvent">{{data.value}}</v-flex>
    </v-layout>
  </div>
</template>

<script>
  import $ from "jquery";
  export default {
    props: {
      onclick:{
        type: Function,
      },
      data: {
        type: Object,
        default () {
          return {
            size: "",
            color: "",
            aling: "",
            font: "regular"
          }
        }
      },
    },
    data() {
      return {
        default_size: "0",
        stopTheEvent: (event) => event.stopPropagation() 
      }
    },
    methods: {
      resize: function () {
        var div = $(this.$refs.container);
        var size = div.height() / window.innerHeight;
        var prop = div.width() / div.height()
        var size2 = 0;
        if (prop > 1) size2 = 1 + (prop * 0.2);
        else size2 = 1;
        size = size * size2;
        this.default_size = size;
      },
      edit(){
        alert(Object.getOwnPropertyNames(this.$parent));
      }
    },
  };
</script>
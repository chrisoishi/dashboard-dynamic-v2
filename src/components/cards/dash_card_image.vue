<template>
  <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover" width="100%" >
    <slot name='edit'></slot>
    <div class='extra-background-card'
      :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100" ></div>
    <div style='position:absolute;width:100%;height:100%;' @click='edit("background")'>
      <v-container fill-height style='z-index:2'>
        <v-layout row wrap fill-height>
          <v-flex d-flex xs12 style='height:50%'>
            <dash-text :data='data.title' ref='title' :onclick='function(){edit("title");}' ></dash-text>
          </v-flex>
          <v-flex d-flex xs12 style='height:50%'>
            <dash-text :data='data.text' ref='text' :onclick='function(){edit("text");}'></dash-text>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
  import structs from "../../main/structs";
  import Vue from 'vue'
  export default {
    mixins: [structs.component],
    data: function () {
      return {
        data: {
          background: {
            type: 'dash-form-background',
            name: 'Imagem de fundo',
            color: "black",
            opacity: 0,
            value: "https://picsum.photos/1270/720/?random"
          },
          title: {
            type: 'dash-form-text',
            name: 'Título',
            size: "7",
            color: "black",
            align: 'left',
            value: "Título",
            font: "bold",
          },
          text: {
            type: 'dash-form-textarea',
            name: 'Texto',
            size: "6",
            color: "#FFFFFF",
            align: 'left',
            value: "Texto",
            font: "regular",

          },
        },
        show_text: false,
      }
    },
    computed: {},
    methods: {
      setLayout: function (sizer) {
        Vue.nextTick(() => {
          this.$refs.title.resize();
          this.$refs.text.resize();
        });
      }
    },
    mounted: function () {
      this.data.background.value += Math.floor((Math.random() * 100) + 1);
    }
  };
</script>
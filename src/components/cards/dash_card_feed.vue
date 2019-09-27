<template>
    <v-card style="min-height:200px" :style="'background-image: url('+data.background.value+');'"
      class="extra-background-cover" width="100%" height="100%">
      <slot name='edit'></slot>
      <div class='extra-background-card'
        :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
      <div style='position:absolute;width:100%;height:100%;;max-height:100%'  @click='edit("background")'>
        <v-layout row wrap fill-height style='margin:0'>
          <v-flex d-flex xs12 :style="'height:'+layout.height1">
            <v-container fill-height style='padding:1%'>
              <dash-text :data='data.title' ref='title' :onclick='function(){edit("title");}' ></dash-text>
            </v-container>
          </v-flex>
          <v-flex d-flex :style="'width:'+layout.width1+';height:'+layout.height2">
            <v-container fill-height>
              <dash-text :data='data.text' ref='text' :onclick='function(){edit("text");}' ></dash-text>
            </v-container>
          </v-flex>
          <v-flex d-flex :style="'width:'+layout.width1+';height:'+layout.height3">
            <v-container fill-height style='text-align:center;padding:0'>
              <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+data.json.data.notice_url+'&size=800x800'"
                :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'"
                @click="window.open(data.json.data.notice_url)">
            </v-container>
          </v-flex>
        </v-layout>
      </div>
    </v-card>

</template>

<script>
  import structs from "../../main/structs";
  import Vue from 'vue';
  export default {
    mixins: [structs.component],
    data: function () {
      return {
        data: {
          background: {
            type: 'dash-form-background',
            name: 'Imagem de fundo',
            color: "black",
            opacity: 70,
            value: "https://picsum.photos/1270/720/?random"
          },
          title: {
            type: 'dash-form-text',
            name: 'Titulo',
            size: "6",
            color: "white",
            align: 'center',
            value: "Título",
            font: "bold",
          },
          text: {
            type: 'dash-form-textarea',
            name: 'Texto',
            size: "4",
            color: "white",
            align: 'justify',
            value: "Texto",
            font: "regular",

          },
          qr_size: {
            type: 'dash-form-slide',
            name: 'Tamanho do QR CODE',
            size: "80",
            size_max: '150',

          },
          json: {
            type: 'dash-form-json',
            name: "Dados JSON",
            value: "",
            data: {
              "title": "",
              "pretext": "",
              "image": "",
              "notice_url": "oi"
            }
          }
        },
        layout: {
          width1: "",
          height1: "",
          height2: "",
          height3: "",
        },
      }
    },
    watch: {
      "data.json.value": function () {
        this.getNotice();
      },
      "data.json.data": function () {

        if (this.data.json.data != null) {

          if (this.data.json.data.title != null) this.data.title.value = this.data.json.data.title;
          if (this.data.json.data.pretext != null) this.data.text.value = this.data.json.data.pretext;
          if (this.data.json.data.image != null) this.data.background.value = this.data.json.data.image;
        }
      }
    },
    methods: {
      getNotice: function () {
        if (this.data.json.value != "") {
          $.ajax({
            url: this.data.json.value,
            dataType: "JSON",
            method: 'GET',
          }).done(response => {
            this.data.json.data = response;
            this.setLayout(this.father.getSizerType());
          })
        }
      },
      setLayout: function (sizer) {
        if (sizer == "0") return;
        if (sizer == "2x1") {
          this.layout.width1 = "50%";
          this.layout.height1 = "50%";
          this.layout.height2 = "50%";
          this.layout.height3 = "50%";
        } else {
          this.layout.width1 = "100%";
          this.layout.height1 = "30%";
          this.layout.height2 = "30%";
          this.layout.height3 = "40%";
        }


        Vue.nextTick(() => {
          this.$refs.title.resize();
          this.$refs.text.resize();
        })

      },
      refresh() {
        this.getNotice();
      },
    },
    mounted() {
      this.getNotice();
    }
  };
</script>
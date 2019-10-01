<template>
  <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover"
    height="100%" width="100%">
    <slot name='edit'></slot>
    <div class='extra-background-card'
      :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
    <div style='position:absolute;width:100%;height:100%'>
      <v-row style="height:100%;width:100%">
        <v-col cols='12'>
          <dash-text :data='data.title' ref='title' :onclick='function(){edit("title");}'></dash-text>
        </v-col>
        <v-col cols='12'>
          <dash-container ref='options' :size='data.options_size.size'>
            <v-row justify="center" style='height:100%'>

              <v-col cols=4 v-for='(ans,i) in data.options.items' :key='i'>
                <v-container>
                  <v-row style='height:100%'>
                    <v-col cols=12>
                      <v-progress-linear :height='data.options_size.size*5' :value='answers_percentage[i]'
                        :color='colors[color_choice[i]]'>
                        <template v-slot="{ value }">
                          <span class='white--text' style='font-size:0.6em'>{{answers_percentage[i]}}% </span>
                        </template>
                      </v-progress-linear>
                    </v-col>
                    <v-col cols="12" class='white--text text-center'>{{ans.value}}<div><span class='white--text'
                          style='font-size:0.6em'> </span></div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </dash-container>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
  import Vue from 'vue';
  import structs from "../../main/structs";
  import fs from "../../services/firebase_service";
  import url from "url";
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
            name: 'Pergunta',
            size: "10",
            color: "white",
            align: 'center',
            value: "Pergunta???"
          },
          options: {
            type: 'dash-form-string-array',
            name: "Respostas",
            size: 0,
            size_max: 6,
            items: []
          },
          options_size: {
            type: 'dash-form-slide',
            name: "Tamanho das respostas",
            size: 6,
            step: 0.1,
          },
        },
        survey: {
          question: "",
          answers: [],
        },
        answers: [],
        answers_total: 0,
        snapshot: null,
        colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],
        layout: "",
        layout2: {
          width1: '100%',
          width2: '100%',
          height1: '50%',
          height2: '50%',
          height3: '50%'
        },
      }
    },
    computed: {
      extras: function () {
        return {
          question: this.data.title.value,

          answers: this.data.options.items
        }

      },
      color_choice: function () {
        var choices = [];
        for (var i = 0; i < this.colors.length; i++) {
          choices.push(Math.floor((Math.random() * this.colors.length) + 0));
        }
        return choices;
      },
      url: function () {
        return window.location.href + 'survey/' + this.data.survey_id.value;
      },
      layout_options: function () {
        if (this.data.options.size == '1') return '100%';
        else if (this.data.options.size == '2') return '50%';
        else return '33.33%';
      },
      answers_percentage() {
        var percentages = [];
        var por;
        for (var s in this.answers) {
          por = Math.round((this.answers[s] / this.answers_total) * 100);
          if (Number.isNaN(por)) por = 0;
          percentages.push(por);
        }
        return percentages;
      }
    },
    watch: {
      "data.options.size": function (val, oldval) {
        this.answers = {};
        for (var i = 0; i < val; i++) {
          this.answers[i] = 0;
        }
      },
    },

    methods: {


      setLayout(sizer) {
        Vue.nextTick(() => {
          this.$refs.title.resize();
          this.$refs.options.resize();
        });
      },

      onRemove() {
      },
      onLoad() {
      },
      onSave() {
      },
      open(url) {
        window.open(url);
      }
    },
    mounted() {
      this.data.background.value += Math.floor((Math.random() * 100) + 1);
      this.setLayout(this.father.getSizerType());
    }
  };
</script>
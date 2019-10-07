<template>
  <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover"
    height="100%" width="100%">
    <slot name='edit'></slot>
    <div class='extra-background-card'
      :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100" ></div>
    <div style='position:absolute;width:100%;height:100%' @click='edit("background")'>
      <v-row style="height:100%;width:100%">
        <v-col cols='12'>
          <dash-text :data='data.title' ref='title' :onclick='function(){edit("title");}'></dash-text>
        </v-col>
        <v-col cols='6'>
          <dash-container ref='options' :size='data.options_size.size'>
            <v-row justify="center" style='height:100%'>

              <v-col cols=6 v-for='(ans,i) in data.options.items' :key='i'>
                <v-container>
                  <v-row style='height:100%'>
                    <v-col cols=12>
                      <v-progress-linear :height='data.options_size.size*14' :value='answers_percentage[i]'
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
        <v-col cols=6>
          <v-container fill-height>
            <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+url+'&size=500x500'"
              :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'"
              @click="open(url)">
          </v-container>
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
          qr_size: {
            type: 'dash-form-slide',
            name: 'Tamanho do QR CODE',
            size: "100",
            size_max: '100',

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
          survey_id: {
            type: 'dash-form-string',
            name: "ID para enquete",
            value: ""
          }
        },
        tabs: [{
            name: "Geral",
            attrs: ["background"]
          }, {
            name: "QR CODE",
            attrs: ["qr_size"]
          },
          {
            name: "Pergunta",
            attrs: ["title"]
          },
          {
            name: "Respostas",
            attrs: ["options", "options_size"]
          },
          {
            name: "Avançado",
            attrs: ["survey_id"]
          }
        ],
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
      load_survey: function () {
        if (this.data.survey_id.value == "") return;
        this.snapshot = fs.loadSurveySS(this.data.survey_id.value, (snapshot) => {
          var data = snapshot.data();
          this.answers_total = 0;
          for (var i = 0; i < this.data.options.size; i++) {
            if (data.hasOwnProperty("ans" + i)) {
              this.answers_total += data["ans" + i];
              this.answers[i] = data["ans" + i];
            }
          }
        });
        // $.ajax({
        //   url: $.url + 'survey/data/' + app.connection_id + '/' + this.father.card_id,
        //   dataType: "JSON",
        //   method: 'GET',
        // }).done((response) => {
        //   sum = 0;
        //   if (response != null) {
        //     for (i = 0; i < this.data.options.size; i++) {
        //       if (response.hasOwnProperty(i)) {
        //         sum += response[i];
        //       }
        //     }
        //     for (i = 0; i < this.data.options.size; i++) {
        //       if (response.hasOwnProperty(i)) {
        //         this.survey[i] = response[i] / sum * 100;
        //       }
        //     }
        //     this.father.model_edit = !this.father.model_edit; //FOR BUG NOT REFRESH DATA
        //     this.father.model_edit = !this.father.model_edit;
        //     this.setLayout(this.father.getSizerType());
        //   }
        // })
      },
      setLayout(sizer) {
        Vue.nextTick(() => {
          this.$refs.title.resize();
          this.$refs.options.resize();
        });
      },
      refresh() {
        //this.getSurvey();
      },
      start() {
        //FOR BUG LAYOUT
      },
      create_survey() {
        if (this.data.survey_id.value == "") {
          this.survey.question = this.data.title.value;
          this.survey.answers = this.data.options.items;
          fs.createSurvey(this.survey).then((doc) => {
            this.data.survey_id.value = doc.id;
            this.$parent.save();
            this.load_survey()
          }).catch((e) => {});
        }
      },
      update_survey() {
        if (this.data.survey_id.value != "") {
          this.survey.question = this.data.title.value;
          this.survey.answers = this.data.options.items;
          fs.saveSurvey(this.data.survey_id.value, this.survey);
        }
      },
      onRemove() {
        if (this.snapshot != null) this.snapshot();
      },
      onLoad() {
        this.load_survey()
      },
      onSave() {
        if (this.data.options.size > 0) {
          if (this.data.survey_id.value == "") {
            this.create_survey();
          } else {
            this.update_survey();
          }
        }
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
<template>
  <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover">
    <slot name='edit'></slot>
    <div class='extra-background-card'
      :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
    <div style='position:absolute;width:100%;height:100%'>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex :style="'height:'+layout2.height1+';width:'+layout2.width1">
            <v-layout fill-height row wrap>
              <v-flex xs12 :style="'height:'+layout2.height3">
                <dash-text :data='data.title' ref='title'></dash-text>
              </v-flex>
              <v-flex xs12 style='max-height:50%;height:50%' v-if="layout!='small'">
                <dash-container :size='data.options_size.size' ref='options'>
                  <v-layout fill-height row wrap>
                    <v-flex :style="'width:'+layout_options+';max-width:'+layout_options"
                      v-for='(ans,i) in data.options.items' :key='i'>
                      <v-layout justify-space-between row wrap fill-height>
                        <v-flex class='white--text'>{{ans.value}} </v-flex>
                        <v-flex class='white--text'> <span class='white--text'
                            style='font-size:0.6em'>{{Math.round(survey[i]*100)/100}}% </span></v-flex>
                        <v-flex xs12>
                          <v-progress-linear height='15' :value='survey[i]' :color='colors[color_choice[i]]'>
                          </v-progress-linear>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </dash-container>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex :style="'height:'+layout2.height2+';width:'+layout2.width2">
            <v-container fill-height>
              <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+url+'&size=500x500'"
                :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'"
                @click="window.open(url)">
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
  import structs from "../../main/structs";
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
            size: "0",
            size_max: "6",
            items: []
          },
          options_size: {
            type: 'dash-form-slide',
            name: "Tamanho das respostas",
            size: "6",
            step: "0.1",
          }
        },
        survey: {},
        colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],
        layout: "",
        layout2: {
          width1: '100%',
          width2: '100%',
          height1: '50%',
          height2: '50%',
          height3: '50%'
        }

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
        choices = [];
        for (i = 0; i < this.colors.length; i++) {
          choices.push(Math.floor((Math.random() * this.colors.length) + 0));
        }
        return choices;
      },
      url: function () {
        return $.url + 'survey/' + app.connection_id + '/' + this.father.card_id;
      },
      layout_options: function () {
        if (this.data.options.size == '1') return '100%';
        else if (this.data.options.size == '2') return '50%';
        else return '33.33%';
      }
    },
    watch: {
      "data.options.size": function (val, oldval) {
        if (val != oldval)
          for (i = 0; i < val; i++) {
            this.survey[i] = 0;
          }
      }
    },

    methods: {
      getSurvey: function () {
        _this_survey = this;
        $.ajax({
          url: $.url + 'survey/data/' + app.connection_id + '/' + this.father.card_id,
          dataType: "JSON",
          method: 'GET',
        }).done((response) => {
          sum = 0;
          if (response != null) {
            for (i = 0; i < this.data.options.size; i++) {
              if (response.hasOwnProperty(i)) {
                sum += response[i];
              }
            }
            for (i = 0; i < this.data.options.size; i++) {
              if (response.hasOwnProperty(i)) {
                this.survey[i] = response[i] / sum * 100;
              }
            }
            this.father.model_edit = !this.father.model_edit; //FOR BUG NOT REFRESH DATA
            this.father.model_edit = !this.father.model_edit;
            this.setLayout(this.father.getSizerType());
          }
        })
      },
      setLayout(sizer) {
        this.layout = sizer;
        if (this.layout == '2x1') this.layout2 = {
          width1: '50%',
          width2: '50%',
          height1: '100%',
          height2: '100%',
          height3: '50%'
        };
        else if (this.layout == 'small') this.layout2 = {
          width1: '100%',
          width2: '100%',
          height1: '50%',
          height2: '50%',
          height3: '100%'
        }
        else this.layout2 = {
          width1: '100%',
          width2: '100%',
          height1: '60%',
          height2: '40%',
          height3: '50%'
        };
        Vue.nextTick(() => {
          this.$refs.title.resize();
          this.$refs.options.resize();
        });
      },
      refresh() {
        this.getSurvey();
      },
      start() {
        //FOR BUG LAYOUT
      }

    },
    mounted() {
      this.data.background.value += Math.floor((Math.random() * 100) + 1);
      this.refresh();
    }
  };
</script>
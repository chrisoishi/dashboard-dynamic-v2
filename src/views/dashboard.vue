<template>
  <v-app>
    <!--
    ################################
    TELA DASHBOARD
    ################################
-->


    <div :style='"max-height:100vh;height:100vh;width:"+width_dashboard' v-show='connection.status & dashboard.running'>
      <div style='position:absolute;width:100%;' class=' font-weight-bold text-sm-center'>ID # {{connection.id}}
      </div>
      <v-scroll-y-transition>
        <v-toolbar text color="grey darken-4" dark absolute :width="width_dashboard" v-show='!dashboard.apresentation.active'>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <div class='flex-grow-1'></div>
          <v-toolbar-items>
            <v-btn text color='white ' dark fab
              @click='dashboard.pages.total++;dashboard.pages.current=dashboard.pages.total'>
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn text color='white' dark fab @click='shows.popups.swap_dash=true'>
              <v-icon>swap_horiz</v-icon>
            </v-btn>
            <v-btn text color='white' dark fab @click='dash_delete(dashboard.pages.current)'>
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn text color='white' dark fab @click='shows.popups.settings=true;'>
              <v-icon>settings</v-icon>
            </v-btn>


          </v-toolbar-items>
        </v-toolbar>
      </v-scroll-y-transition>
      <v-container fluid fill-height grid-list-md>
        <template v-for='i in dashboard.pages.total'>
          <dash-layout-full v-show='i == dashboard.pages.current' :index='i' :preview='dashboard.apresentation.active'
            v-on:save='configs_set($event)' ref="dash" :key='i' :style='"padding-top:"+margin_dashboard'>
          </dash-layout-full>
        </template>
      </v-container>
    </div>

    <v-scroll-x-reverse-transition>
      <div style='position:fixed;right:0;height:100vh;width:30vw;z-index:10' v-show='shows.popups.card_edit'>
        <v-card style='position:relative;overflow-y:auto;width:100%;height:100vh'>
          <v-toolbar color="white" dark tabs style='position:fixed;width:30vw;z-index:2'>
            <v-toolbar-title class='black--text'>Editar cartão</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn icon>
                <v-icon color="red" v-on:click="shows.popups.card_edit = false">close</v-icon>
              </v-btn>
            </v-toolbar-items>

          </v-toolbar>
          <v-container grid-list-xs style='margin-top:64px'>
            <v-row row wrap width="100%">
              <v-col cols="12">
                <v-expansion-panels popout v-model='models.current_card_edit.item_opened'>
                  <v-expansion-panel v-for='(data,fieldName) in models.current_card_edit.data' :key='fieldName'>
                    <v-expansion-panel-header v-html='data.name'></v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container grid-list-xs>
                        <component :is='data.type' :name='data.name' :value='data'></component>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-scroll-x-reverse-transition>




    <!--
    ################################
    TELA INICIAL CONEXAO
    ################################
-->
    <div style='height:100%' v-show='!connection.status' class='mt-2'>
      <v-fade-transition>
        <v-container fluid fill-height grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card width="100%" style="background-image: url(https://picsum.photos/1920/1080/?random&blur)"
                class="extra-background-cover">
                <v-layout align-center row fill-height wrap>
                  <v-flex xs12>
                    <p class="text-sm-center display-4 white--text" style='text-shadow: 1px 1px grey'>
                      Dashboard Dynamic
                    </p>
                  </v-flex>
                  <v-flex xs12 md6>
                    <p class="text-sm-center"><img :src="'?id='+connection.id+'&size=200x200'"></p>
                  </v-flex>
                  <v-flex xs12 md6>
                    <p class='text-sm-center display-4 white--text' style='text-shadow: 1px 1px grey'>
                      #{{connection.id}}</p>
                    <p class='text-sm-center display-3 white--text'>
                      <v-btn outlined color="white" dark width='100px'
                        style='width:350px;height:70px;font-size:20pt;text-shadow: 1px 1px grey;shadow: 1px 1px grey'
                        v-on:click='shows.popups.new_connection=true'>INICIAR</v-btn>
                    </p>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-fade-transition>
    </div>


    <!--
    ################################
    TELA DE INICIO EDICAO
    ################################
-->
    <div style='height:100%' v-show='!dashboard.running & connection.status'>
      <v-fade-transition>
        <v-container fill-height grid-list-md>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <v-card>
                <v-container grid-list-xs>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <div style='width:100%' class='text-sm-center display-3 font-weight-bold mb-3'>
                        ESCOLHA UMA AÇÃO
                      </div>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div style='width:100%' class='text-sm-center'>
                        <v-btn outlined block large color="green"
                          @click='configs_save();dashboard.running=true;conn_wait()'>
                          <v-icon class='mr-2'>add_circle_outline</v-icon> Começar nova dashboard
                        </v-btn>
                      </div>

                    </v-flex>
                    <v-flex xs12 md6>
                      <div style='width:100%' class='text-sm-center'>
                        <v-btn outlined block large color="indigo" @click='dashboard.running=true;conn_wait()'>
                          <v-icon class='mr-2'>play_circle_outline</v-icon> Continuar
                        </v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-fade-transition>
    </div>

    <!--
    ################################
    POPUPS
    ################################
-->
    <!--
    ################################
    ADICIONAR CARTAO
    ################################
-->
    <v-dialog v-model="shows.popups.card_add" scrollable :overlay="false" max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-toolbar color="secondary" dark tabs>
          <div class='text-sm-center' style='width:100%'>
            <h1>Adicionar cartões</h1>
          </div>
          <v-tabs slot="extension" v-model='models.tabs_cards.current' color="white" dark slider-color="secondary"
            centered>
            <v-tab v-for='(tab,i) in models.tabs_cards.tabs' :key='i'>{{tab.text}}</v-tab>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs>
        </v-toolbar>
        <v-container grid-list-xs style='height:300px'>
          <v-tabs-items v-model='models.tabs_cards.current'>
            <v-tab-item v-for='(tab,i) in models.tabs_cards.tabs' :key='i'>
              <v-layout row wrap>
                <v-flex xs12 v-for='(item,i) in tab.cards' :key='i'>
                  <v-btn color="success" v-on:click='models.current_card_change.change(item.layout)' style='width:100%'
                    class='ma-1'>
                    {{item.content}}</v-btn>
                </v-flex>
              </v-layout>

            </v-tab-item>
          </v-tabs-items>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text v-on:click="shows.popups.card_add=false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--
    ################################
    EDITAR CARTAO
    ################################
-->
    <v-dialog overflowed :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-toolbar color="secondary" dark tabs>
          <h1>Editar cartao</h1>
        </v-toolbar>
        <v-container grid-list-xs>
          <v-row row wrap>
            <v-col cols="12">

            </v-col>
            <v-col cols='12'>
              <v-expansion-panels popout>
                <v-expansion-panel v-for='(data,fieldName) in models.current_card_edit.data' :key='fieldName'>
                  <v-expansion-panel-header v-html='data.name'></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <component :is='data.type' :name='data.name' :value='data'></component>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text v-on:click="shows.popups.card_edit = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <!--
    ################################
    NOTIFICACAO
    ################################
-->

    <v-snackbar v-model="models.notification.show" top :timeout='1000'>
      {{models.notification.text}}
      <v-btn flat color="red" @click.native="value = false">Close</v-btn>
    </v-snackbar>

    <!--
    ################################
    CONFIGURACOES
    ################################
-->
    <v-dialog v-model='shows.popups.settings' overflowed :overlay="false" max-width="600px"
      transition="dialog-transition">
      <v-card>
        <v-toolbar color="primary" dark tabs>
          <h1>Configurações</h1>
        </v-toolbar>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12>
            </v-flex>
            <v-flex xs12>
              <v-expansion-panels>
                <v-expansion-panel popout>
                  <v-expansion-panel-header>Templates</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-select :items="saved_dashs" v-model="value_template" label="Escolha o template"></v-select>
                        </v-flex>
                        <v-flex xs12 class='text-xs-right'>
                          <v-btn outlined color="blue" dark v-on:click='template_load()'>Carregar</v-btn>
                          <v-btn outlined color="orange" dark v-on:click='template_edit()'>Editar</v-btn>
                        </v-flex>
                        <v-flex xs12>
                          <v-divider></v-divider>
                          <p class='mt-3 mb-5'>Template atual</p>
                          <v-text-field label="Nome do template" v-model='meta.name'>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 class='text-xs-right'>
                          <v-btn outlined color="red" dark
                            @click="deleteTemplate();model_settings = false;notify('Deleted!')" v-if='editing_template'>
                            Deletar</v-btn>
                          <v-btn outlined color="orange" dark
                            @click="template_save(true);model_settings = false;notify('Saved!')"
                            v-if='editing_template'>
                            Atualizar</v-btn>
                          <v-btn outlined color="blue" dark
                            @click="template_save(false);model_settings = false;notify('Saved!')">Salvar
                            como novo</v-btn>
                        </v-flex>

                      </v-layout>

                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel popout>
                  <v-expansion-panel-header>Tempo de troca de tela (segundos)</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-slider small v-model='configs.settings.apresentation_time' max='100' thumb-label="always"
                            thumb-size='25px'></v-slider>
                        </v-flex>
                      </v-layout>

                    </v-container>
                  </v-expansion-panel-content>


                </v-expansion-panel>

                <v-expansion-panel popout>
                  <v-expansion-panel-header>Sincronizar com outra dash</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field label="DASH ID" v-model="configs.settings.sync" prefix="#"></v-text-field>
                        </v-flex>
                      </v-layout>

                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" dark v-on:click="configs_save();shows.popups.settings = false;notify('Saved!')">
            Salvar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


    <!--
    ################################
    NOVA CONEXAO
    ################################
-->
    <v-dialog v-model='shows.popups.new_connection' overflowed :overlay="false" max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field placeholder="DASHBOARD ID " prefix='#' v-model='connection.id' maxlength='5' counter='5'>
              </v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-btn outlined color="blue" dark block @click='view_dash()'>Visualizar</v-btn>
            </v-flex>
            <v-flex xs12 md6>
              <v-btn outlined color="orange" dark block @click='conn_editor()'>Editar</v-btn>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>
    </v-dialog>
    <!--
    ################################
    TROCAR ORDER DE DASHS
    ################################
-->
    <v-dialog v-model='shows.popups.swap_dash' overflowed :overlay="false" max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12 class='text-sm-center display-1'>
              DASHBOARD ATUAL
            </v-flex>
            <v-flex xs12 md6>

              <v-btn block color="blue" dark @click='dash_change_order("LEFT")'>
                <v-icon>arrow_back</v-icon>
                Mover para esquerda
              </v-btn>
            </v-flex>
            <v-flex xs12 md6>

              <v-btn block color="orange" dark @click='dash_change_order("RIGHT")'>
                Mover para direita
                <v-icon>arrow_forward</v-icon>
              </v-btn>

            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>


    <!--
    ################################
    BARRA INFERIOR EDICAO
    ################################
-->
    <v-snackbar v-model="shows.popups.card_edit_bottom" :timeout="0" auto-height
      :bottom='models.current_card_edit.position.bottom' :top='models.current_card_edit.position.top'
      :right='models.current_card_edit.position.right' :left='models.current_card_edit.position.left' color='white'>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <component :is="models.current_card_edit.field.type" :name='models.current_card_edit.field.name'
              v-model='models.current_card_edit.field'></component>
          </v-flex>
          <v-flex xs12 class='text-xs-right'>
            <v-divider></v-divider>
            <v-btn color="red" outlined class='mt-4' v-on:click='shows.popups.card_edit_bottom=false'>
              <v-icon>close</v-icon> Fechar
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>

    </v-snackbar>


    <v-btn large :color='apresentation_icon_color' dark fab bottom left fixed
      @click='dashboard.apresentation.active=!dashboard.apresentation.active;save();'>
      <v-icon>visibility</v-icon>
    </v-btn>

    <v-footer height="50px" fixed :style="'background-color:transparent'">
      <v-layout row wrap>
        <v-flex xs12 text-xs-center>
          <v-scale-transition>
            <v-pagination v-model='dashboard.pages.current' :length="dashboard.pages.total" circle
              v-show='!dashboard.apresentation.active & dashboard.running' next-icon="navigate_next"
              prev-icon="navigate_before"></v-pagination>
          </v-scale-transition>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
  var $ = require("jquery");
  import "../plugins/video-youtube/iframe_api";
  import vars from "../main/vars";
  import mix_connection from "../main/connection";
  import mix_template from "../main/template";
  import mix_dashboard from "../main/dashboard";
  import mix_configs from "../main/configs";
  import fs from "../services/firebase_service";

  const url = require('url');


  export default {
    name: 'App',
    mixins: [mix_connection, mix_template, mix_dashboard, mix_configs],
    data() {
      return {
        title:"DynaDash",
        shows: {
          popups: {
            card_add: false,
            card_edit: false,
            card_edit_bottom: false,
            settings: false,
            new_connection: false,
            swap_dash: false,

          }
        },
        models: {
          float_menu: false,
          tabs_cards: {
            current: 1,
            tabs: vars.models.tabs_cards,
          },
          notification: {
            show: false,
            text: ""
          },
          current_card_edit: {
            item_opened: 0,
            data: null,
            object: null,
            field: {
              type: '',
              name: ''
            },
            position: {
              top: false,
              left: false,
              bottom: false,
              right: false
            }
          },
          current_card_change: null,
          current_card_cache: {
            type: "",
            data: {}
          }

        },
        sets: {
          editor: false,
        },
      }
    },
    computed: {
      apresentation_icon_color() {
        return this.dashboard.apresentation.active ? 'green' : 'grey'
      },
      width_dashboard() {
        return this.shows.popups.card_edit ? "70vw" : "100vw";
      },
      margin_dashboard() {
        return this.dashboard.apresentation.active ? "0px" : "64px";
      }

    },
    watch: {
      "shows.popups.card_edit": function () {
        if (!this.shows.popups.card_edit && this.models.current_card_edit.object != null) {
          this.models
            .current_card_edit
            .object.save(false);
          this.models.current_card_edit.object.is_editing = false;
        }

      },
      "shows.popups.card_add": function () {
        this.shows.popups.card_edit_bottom = false;
      },
      "models.current_card_edit.data": function () {},
    },
    methods: {
      notify: function (message) {
        this.notification.model = true;
        this.notification.message = message;
      },
      addData: function (card_id, attr, value) {
        if (!this.configs.data_card.hasOwnProperty('id_' + card_id)) {
          this.configs.data_card['id_' + card_id] = {}
        }
        this.configs.data_card['id_' + card_id][attr] = value;
      },
      init() {
        this.conn_wait();
        this.template_get();
        this.template_get_meta();
        $(document).keydown((event) => {
          if (event.which == 27) {
            if(this.shows.popups.card_edit)this.shows.popups.card_edit=false;
            else this.dashboard.apresentation.active = !this.dashboard.apresentation.active;
          }
        });
      }
    },
    created() {
      this.$vuetify.theme = vars.theme;
      this.$root.dash = this;
    },
    mounted() {
      this.init();
      
    }
  };
</script>
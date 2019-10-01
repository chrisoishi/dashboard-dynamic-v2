<template>
  <v-app>
    <!--
    ################################
    TELA DASHBOARD
    ################################
-->


    <div :style='"max-height:100vh;height:100vh;width:"+width_dashboard' v-show='connection.status'>
      <v-scroll-y-transition>
        <v-toolbar text color="grey darken-4" dark absolute :width="width_dashboard"
          v-show='!dashboard.apresentation.active'>
          <v-toolbar-title>{{title}} - {{configs.general.title}}</v-toolbar-title>
          <div class='flex-grow-1'></div>
          <v-toolbar-items>
            <v-btn text color='white ' dark fab @click='configs.general.apresentation=!configs.general.apresentation'>
              <v-icon v-if='configs.general.apresentation'>pause</v-icon>
              <v-icon v-else>play_arrow</v-icon>
            </v-btn>
            <v-btn text color='white ' dark fab @click='dash_add()'>
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
            <v-btn text color='white' dark fab @click='connection.status=false'>
              <v-icon>close</v-icon>
            </v-btn>


          </v-toolbar-items>
        </v-toolbar>
      </v-scroll-y-transition>
      <v-container fluid fill-height grid-list-md>
        <template v-for='i in configs.dashboards.length'>
          <dash-layout-full v-show='i == configs.general.current_page' :index='i'
            :preview='dashboard.apresentation.active' v-on:save='configs_set($event)' ref="dash" :key='i'
            :style='"padding-top:"+margin_dashboard'>
          </dash-layout-full>
        </template>
      </v-container>

      <v-footer height="50px" fixed :style="'background-color:transparent'">
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <v-scale-transition>
              <v-pagination v-model='configs.general.current_page' :length="configs.dashboards.length" circle
                v-show='!dashboard.apresentation.active' next-icon="navigate_next" prev-icon="navigate_before">
              </v-pagination>
            </v-scale-transition>
          </v-flex>
        </v-layout>
      </v-footer>

      <v-btn large :color='apresentation_icon_color' dark fab bottom left fixed v-show='connection.is_edit'
        @click='dashboard.apresentation.active=!dashboard.apresentation.active;'>
        <v-icon>visibility</v-icon>
      </v-btn>
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
          <v-row row wrap width="100%" style='margin-top:52px'>
            <v-col cols="12">
              <v-tabs v-model="models.current_card_edit.item_opened" center-active show-arrows next-icon="arrow_right"
                prev-icon="arrow_left">
                <v-tab v-for='(data,fieldName) in models.current_card_edit.data' :key='fieldName'>
                  {{fieldName}}
                </v-tab>
              </v-tabs>
              <v-divider></v-divider>
              <v-tabs-items v-model="models.current_card_edit.item_opened">
                <v-tab-item v-for='(data,fieldName) in models.current_card_edit.data' :key='fieldName'>
                  <v-container grid-list-xs style='margin-top:64px'>
                    <component :is='data.type' :name='data.name' :value='data'></component>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
              <!-- <v-expansion-panels accordion v-model='models.current_card_edit.item_opened'>
                  <v-expansion-panel v-for='(data,fieldName) in models.current_card_edit.data' :key='fieldName'>
                    <v-expansion-panel-header>{{data.name}}<template v-slot:actions>
                        <v-icon color="primary">more</v-icon>
                      </template></v-expansion-panel-header>
                    <v-expansion-panel-content>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels> -->

            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-scroll-x-reverse-transition>




    <!--
    ################################
    TELA INICIAL CONEXAO
    ################################
-->
    <div style='height:100%' v-show='!connection.status' class='mt-2'>
      <v-row align="center" justify="center">
        <v-col cols='5' class='d-flex align-center'>
          <v-container grid-list-xs>
            <v-card>
              <v-toolbar color="grey darken-3" dark>
                <v-toolbar-title style='width:100%' class='text-center'> Dashboards</v-toolbar-title>
              </v-toolbar>
              <v-row>
                <v-col cols='12'>
                  <v-list>
                    <v-list-item v-for="(t,i) in templates" :key="i">
                      <v-list-item-content @click="()=>{}">
                        <v-list-item-title v-text="t.general.title" />
                      </v-list-item-content>
                      <div>
                        <v-btn icon @click='conn_start(t.id,false)'>
                          <v-icon>visibility</v-icon>
                        </v-btn>
                        <v-btn icon @click='conn_start(t.id,true)'>
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <!-- <v-btn icon>
                          <v-icon>delete</v-icon>
                        </v-btn> -->
                      </div>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols='12'>
                  <v-container grid-list-xs>
                    <v-btn outlined color="primary" dark width='100%' @click="create_template()">Iniciar nova dashboard
                    </v-btn>
                  </v-container>
                </v-col>
              </v-row>
            </v-card>
          </v-container>

        </v-col>
      </v-row>
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
                <v-expansion-panel>
                  <v-expansion-panel-header>Título</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field outlined v-model="configs.general.title"></v-text-field>
                        </v-flex>
                      </v-layout>

                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Tempo de troca de tela (segundos)</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-slider small v-model='configs.general.apresentation_time' max='100' thumb-label="always"
                            thumb-size='25px'></v-slider>
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
        title: "DynaDash",
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
        // this.conn_wait();
        // this.template_get();
        // this.template_get_meta();
        this.template_load();
        $(document).keydown((event) => {
          if (event.which == 27) {
            if (this.shows.popups.card_edit) this.shows.popups.card_edit = false;
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
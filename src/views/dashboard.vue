<template>
  <v-app>
    <div :style='"max-height:100vh;height:100vh;width:"+width_dashboard'>
      <v-scroll-y-transition>
        <v-toolbar text color="grey darken-4" dark absolute :width="width_dashboard"
          v-show='!dashboard.apresentation.active'>
          <v-toolbar-title>{{configs.general.title}}</v-toolbar-title>
          <div class='flex-grow-1'></div>
          <v-toolbar-items>
            <icon-tooltip v-if='is_need_save' icon="save" tip="Salvar alterações" @click='configs_save(false)' />

            <icon-tooltip :icon="configs.general.apresentation?'pause':'play_arrow'"
              :tip="configs.general.apresentation?'Desabilitar apresentação':'Habilitar apresentação'"
              @click='configs.general.apresentation=!configs.general.apresentation' />
            <icon-tooltip icon="add" tip="Adicionar nova tela" @click='dash_add()' />
            <icon-tooltip icon="arrow_back" tip="Mover tela para esquerda" @click='dash_change_order("LEFT")' />
            <icon-tooltip icon="arrow_forward" tip="Mover tela para direita" @click='dash_change_order("RIGHT")' />


            <icon-tooltip icon="delete" tip="Excluir tela atual" @click='dash_delete(dashboard.pages.current)' />
            <icon-tooltip icon="settings" tip="Configurações" @click='shows.popups.settings=true' />
            <icon-tooltip icon="close" tip="Sair" @click='conn_stop()' />

          </v-toolbar-items>
        </v-toolbar>
      </v-scroll-y-transition>
      <v-container fluid fill-height grid-list-md>
        <template v-for='(dash,i) in configs.dashboards'>
          <dash-layout-full v-show='i+1 == configs.general.current_page' :index='i'
            :preview='dashboard.apresentation.active' v-on:save='configs_set($event)' ref="dash" :key="i"
            :style='"padding-top:"+margin_dashboard' :config="dash">
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

    <card-edit ref='card_edit' v-model='is_card_editing' :card='current_card_edit' />



    <!--
    ################################
    POPUPS
    ################################
-->



    <!--
    ################################
    CONFIGURACOES
    ################################
-->
    <v-dialog persistent v-model='shows.popups.settings' overflowed :overlay="false" max-width="600px"
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
                        <v-flex xs12 v-for='(dash,i) in configs.dashboards' :key='i'>
                          <v-slider small v-if='dash!=null' v-model='dash.general.apresentation_time' max='100'
                            thumb-label="always" thumb-size='25px'></v-slider>
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
          <v-btn color="green" dark v-on:click="configs_save();shows.popups.settings = false;">
            Salvar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
  var $ = require("jquery");
  import "../plugins/video-youtube/iframe_api";
  import vars from "../main/vars";
  import mix_connection from "../main/connection";
  import mix_dashboard from "../main/dashboard";
  import mix_configs from "../main/configs";
  import fs from "../services/firebase_service";

  const url = require('url');


  export default {
    name: 'App',
    mixins: [mix_connection, mix_dashboard, mix_configs],
    components: {
      "card-edit": () => import("../components/structs/card_edit"),
      "icon-tooltip": () => import("../components/helpers/icon_tooltip")
    },
    props: {
      onConnectionStop: Function,
    },
    data() {
      return {
        title: "DynaDash",
        shows: {
          popups: {
            card_add: false,
            settings: false,
          }
        },
        models: {
          tabs_cards: {
            current: 1,
            tabs: vars.models.tabs_cards,
          },
          current_card_cache: {
            type: null,
            data: {}
          }
        },
      }
    },
    computed: {
      apresentation_icon_color() {
        return this.dashboard.apresentation.active ? 'green' : 'grey'
      },
      margin_dashboard() {
        return this.dashboard.apresentation.active ? "0px" : "64px";
      }

    },
    watch: {
      "shows.popups.card_add": function () {
        this.shows.popups.card_edit_bottom = false;
      },
      "models.current_card_edit.data": function () {},
    },
    methods: {
      init() {
        this.conn_start();
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
      this.configs_sync();
    }
  };
</script>
<template>
  <component :is='card' :father='this' v-show='preview2' :preview='preview' ref='card' :cascate='cascate'
    :style='border'>
    <div slot='edit'>
      <div
        style='position:absolute;background-color:black;opacity:0.5;width:100%;height:64px;border-radius:5px 5px 0px 0px;z-index:2'
        v-show='!preview'>
      </div>
      <v-scale-transition>
        <div style='position:absolute;top:0;width:100%;height:64px;z-index:2'>
          <div style='position:absolute;left:0;height:64px' v-show='!preview'>
            <v-card flat color="transparent" height='100%' tile class='d-flex align-center pa-2' text><span
                class='white--text'>{{card_id}} (#{{cascate}})</span></v-card>
          </div>
          <div style='position:absolute;right:0;height:64px' class='ma-2' v-show='!preview'>
            <v-tooltip bottom v-for="(a,i) in actions" :key="i">
              <template v-slot:activator="{ on }">
                <v-btn icon color='white' dark fab v-on:click="a.action()" small class='ma-1' v-on='on'>
                  <v-icon>{{a.icon}}</v-icon>
                </v-btn>
              </template>
              <span>{{a.tip}}</span>
            </v-tooltip>
          </div>
        </div>
      </v-scale-transition>
    </div>
  </component>
</template>

<script>
  import Vue from 'vue'
  import $ from "jquery";
  export default {
    props: {
      //card: String,
      child: Object,
      //father: Object,
      card_slot: String,
      preview: Boolean,
      rand: Number,
      cascate: String,
      //card_id: Number
    },
    computed: {
      preview2: function () {
        if (this.preview && this.card.indexOf("dash-card-add") > -1) return false;
        else return true;
      },
      border() {
        return this.is_editing ? "border:5px solid red" : ""
      },
      app() {
        return this.$root.dash.$data;
      },
      actions() {
        if (this.app.models.current_card_cache.type) {
          return [{
            icon: "check_box",
            tip: "Colar cartão aqui",
            action: () => {
              this.paste();
            }
          }]
        } else {
          var actions = [];
          if(this.cascate != "" || this.card != "dash-card-add")actions.push({
            icon: "delete",
            tip: "Excluir",
            action: () => {
              this.remove();
            }
          });
          if (this.card != "dash-card-add") {
            actions.push({
              icon: "swap_horiz",
              tip: "Trocar cartão",
              action: () => {
                this.choices();
              }
            });
            actions.push({
              icon: "border_clear",
              tip: "Recortar",
              action: () => {
                this.cut();
              }
            });
            actions.push({
              icon: "brush",
              tip: "Editar",
              action: () => {
                this.edit();
              }
            });
          }
          return actions;
        }
      }
    },
    data() {
      return {
        card_id: "",
        card: "dash-card-add",
        model_edit: false,
        is_editing: false,
      }
    },
    methods: {
      choices: function () {
        this.app.shows.popups.card_add = true;
        this.app.models.current_card_change = this;
      },
      change: function (component) {
        this.change_onload(component, false);
      },
      change_onload: function (component, onload) {
        this.card_id = Math.floor((Math.random() * 99999) + 10000);
        this.app.shows.popups.card_add = false;
        this.card = component;
        this.$parent[this.card_slot] = component;
        if (!onload) {
          Vue.nextTick(() => {
            setTimeout(() => {
              this.$refs.card.setLayout(this.getSizerType());
            }, 500);
            this.save(onload);
          });
        }

      },
      load: function (cfg) {
        if (cfg != null && cfg != 'undefined') {
          if (!cfg.hasOwnProperty('id')) {
            cfg.id = Math.floor((Math.random() * 99999) + 10000);
          }
          if (cfg.type == null) this.change_onload("dash-card-add", true);
          else this.change_onload(cfg.type, true);
          Vue.nextTick(() => {
            if (cfg.data != "null") {
              if (cfg.type.indexOf('layout') > -1) {
                this.$refs.card.load(cfg.data);
              } else {
                this.card_id = cfg.id;
                this.$refs.card.data = cfg.data;
                setTimeout(() => {
                  this.$refs.card.setLayout(this.getSizerType());
                }, 500);
                this.$refs.card.refresh();
              }
            }
            //else this.setConfig(null,true);

          });

        }
      },
      remove: function () {
        this.card_id = "";
        if (this.card.indexOf('dash-card-add') > -1) {
          this.$parent.remove(this.card_slot);
        } else {
          this.change("dash-card-add")
        }
        this.app.shows.popups.card_edit = false;
      },
      edit: function (attr) {
        if (this.app.models.current_card_edit.object != null) this.app.models.current_card_edit.object.is_editing =
          false;
        this.app.models.current_card_edit.data = this.$refs.card.data;
        var attrs = Object.getOwnPropertyNames(this.$refs.card.data);
        for (var i = 0; i < attrs.length; i++) {
          if (attr === attrs[i]) {
            this.app.models.current_card_edit.item_opened = i;
            break;
          }
        }

        this.card_data = this.$refs.card.data;
        this.app.shows.popups.card_edit = true;
        this.app.models.current_card_edit.object = this;
        this.is_editing = true;
      },
      setChild: function (child) {
        this.child = child;
      },
      save: function (onload) {
        if (this.$refs.card.extras != null) {
          $.each(this.$refs.card.extras, (attr, value) => {
            this.app.addData(this.card_id, attr, value);
          });
        }
        this.setConfig(this.$refs.card.data, onload);

      },
      setConfig: function (cfg, onload) {
        if (this.card_id == null) this.card_id = Math.floor((Math.random() * 99999) + 10000);
        if (cfg == null) cfg = "null";
        this.$parent.setConfig({
          type: this.card,
          id: this.card_id,
          data: cfg,
        }, this.card_slot, onload);
      },
      start: function () {
        setTimeout(() => {
          this.$refs.card.setLayout(this.getSizerType());
        }, 500);

        this.$refs.card.start();
      },
      end: function () {
        this.$refs.card.end();
      },
      cut: function () {
        this.app.models.current_card_cache.type = this.card;
        this.app.models.current_card_cache.data = this.$refs.card.data;
        this.app.models.current_card_cache.id = this.card_id;
        this.remove();
      },
      paste: function () {
        this.change_onload(this.app.models.current_card_cache.type, true);
        Vue.nextTick(() => {
          this.$refs.card.data = this.app.models.current_card_cache.data;
          this.card_id = this.app.models.current_card_cache.id;
          setTimeout(() => {
            this.$refs.card.setLayout(this.getSizerType());
          }, 500);
          this.$refs.card.refresh();
          this.save(false);
          this.app.models.current_card_cache.type = "";
        });

      },

      getSizerType: function () {
        var div = $(this.$refs.card.$el);
        var ex = this.cascate.split(":");
        if (div.width() == 0) return "0";
        if (ex.length >= 4) return "small";
        else if (div.width() / div.height() >= 1.5) return "2x1";
        else if (div.height() / div.width() >= 1.5) return "1x2";
        return "1x1";
      },
      getSize: function () {
        var div = $(this.$refs.card.$el);
        return {
          width: div.width(),
          height: div.height()
        }
      }
    },
    mounted() {
      //alert(JSON.stringify(Object.getOwnPropertyNames(this.app)));
    }
  };
</script>
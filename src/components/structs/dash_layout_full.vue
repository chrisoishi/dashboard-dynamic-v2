<template>
  <v-layout row wrap>
    <v-flex d-flex xs12 style='overflow:hidden'>
      <dash-card :card="card1" :card_slot="'card1'"  :preview='preview' ref='card1'
        cascate=''></dash-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      index: null,

      preview: Boolean,
      config: Object,

    },
    data(){
      return {
              card1: 'dash-card-add'
      }
    },
    methods: {
      remove: function (card) {
        this.empty();
      },
      empty: function () {
        if (this.index == this.$parent.dashboard.pages.total && this.index > 1) {
          this.$parent.configs['dash' + this.$parent.dashboard.pages.total];
          this.$parent.configs_save();
          this.$parent.dashboard.pages.total--;
          this.$parent.dashboard.pages.current = this.$parent.dashboard.pages.total;

        }
      },
      setConfig: function (cfg, card, onload) {
        this.$emit('save', {
          dash: this.index-1,
          cfg: cfg,
          onload: onload
        });
      },
      onPageJoin: function () {
        this.$refs.card1.onPageJoin();
      },
      onPageLeave: function () {
        this.$refs.card1.onPageLeave();
      },
      load(cfg) {
        if (cfg != null & cfg != "undefined") {
          this.$refs.card1.load(cfg);
        } else {
          this.card1 = 'dash-card-add';
        }
      },
    }
  };
</script>
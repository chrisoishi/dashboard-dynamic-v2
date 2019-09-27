<template>
  <v-layout row wrap height="100%" d-flex>
    <v-flex d-flex xs12 md6 style='overflow:hidden'>
      <dash-card :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1'
        :cascate='cascate+"1:"' v-if='!card1_deleted'></dash-card>
    </v-flex>
    <v-flex d-flex xs12 md6 style='overflow:hidden'>
      <dash-card :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2'
        :cascate='cascate+"2:"' v-if='!card2_deleted'></dash-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import structs from "../../main/structs";
  export default {
    mixins: [structs.component, structs.layout],
    methods: {}
  };
</script>
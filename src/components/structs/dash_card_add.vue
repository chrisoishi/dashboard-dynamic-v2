<template>

  <v-card style='min-height:200px' width="100%" height="100%" >
  <slot name='edit'></slot>

    <v-menu v-model='choices' offset-y absolute style="max-width: 200px">
      <template v-slot:activator="{ on }">
        <v-container class='font-weight-bold caption' fill-height v-on="on">
          <div class='text-sm-center grey--text' style='width:100%' >
            <v-icon size='50'>add_circle_outline</v-icon>
          </div>
        </v-container>
      </template>
      <v-card color='white'>
        <v-container>
          <v-list>
            <v-list-item>Layouts</v-list-item>
            <v-list-item v-for="(l,i) in models.tabs_cards[0].cards" :key="i" @click="father.change(l.layout)">
              <v-list-item-avatar>
                <v-icon :style="'transform:rotate('+l.rotate+'deg)'">{{l.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-tile-title>{{l.content}}</v-list-tile-title>
            </v-list-item>
            <v-list-item>Cartões</v-list-item>
              <v-list-item v-for="(l,i) in models.tabs_cards[1].cards" :key="i" @click="father.change(l.layout)">
              <v-list-item-avatar>
                <v-icon :style="'transform:rotate('+l.rotate+'deg)'">{{l.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-tile-title>{{l.content}}</v-list-tile-title>
            </v-list-item>

            <!-- <v-list-item @click="father.change('dash-layout-1x2')">
              <v-list-item-avatar>
                <v-icon style="transform:rotate(90deg)">{{layout.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-tile-title>Dividir verticalmente</v-list-tile-title>
            </v-list-item> -->

          </v-list>
        </v-container>
      </v-card>

    </v-menu>
  </v-card>


</template>

<script>
  import structs from "../../main/structs";
  import vars from "../../main/vars"
  export default {
    mixins: [structs.component],
    props: {
      cascate: String
    },
    computed: {
      home: function () {
        if (this.father.cascate == '') return true;
        else return false;
      }
    },
    data() {
      return {
        data: null,
        choices: false,
        models: vars.models
      }
    },
    mounted(){
    }
  };
</script>
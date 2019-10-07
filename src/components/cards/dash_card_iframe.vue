<template>
  <v-card style="min-height:200px" width="100%" height="100%">
    <slot name='edit'></slot>
    <template v-if="url!=''">
      <iframe width="100%" height="100%" :src="data.src.value" frameborder="0"></iframe>
    </template>
    <template v-else>
      <v-container fill-height>
        <div style='width:100%' class='font-weight-bold text-sm-center'>
          <v-btn color='blue' dark @click="edit('src')">Inserir URL da página</v-btn>
        </div>
      </v-container>
    </template>
  </v-card>
</template>

<script>
  import structs from "../../main/structs";
  export default {
    mixins: [structs.component],
    data: function () {
      return {
        data: {
          src: {
            type: 'dash-form-string',
            name: 'URL da página',
            color: "white",
            value: ""
          },
        },
        tabs: [{
            name: "URL",
            attrs: ["src"]
          }
        ],
        url:"",
        timeout:null
      }
    },
    watch: {
    },
    methods: {
      onPageJoin() {},
      onPageLeave(){},
      onSave() {this.url = this.data.src.value;},
      onLoad() {}
    },
    mounted(){
      
    }
  };
</script>
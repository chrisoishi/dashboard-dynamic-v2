<template>
  <v-card width="100%" height="100%" style='position:relative;min-height:200px'>
    <slot name='edit'></slot>
    <v-carousel :interval='data.timer.size*1000' style='height:100%'>
      <v-carousel-item v-for="i in data.carrosel.size" :key="i">
        <div :style="'background-image: url('+data.carrosel.items[i-1].value+');'"
          class="extra-background-cover">
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
  import structs from "../../main/structs";
  export default {
    mixins: [structs.component],
    data: function () {
      return {
        data: {
          carrosel: {
            name: 'Lista de imagens',
            type: 'dash-form-string-array',
            size: 3,
            size_max: 10,
            items: [{
                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
              },
              {
                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
              },
              {
                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
              },
            ]
          },
          timer: {
            type: 'dash-form-slide',
            name: 'Tempo de troca de imagem',
            size: "5",
          },
        }
      }
    },
    watch: {
      'data.carrosel.items': function () {
        this.data.carrosel.size = new Number(this.data.carrosel.size) + 1;
        this.data.carrosel.size = new Number(this.data.carrosel.size) - 1;
      }
    },
    methods:{
      onSave(){},
      onLoad(){}
    },
  };
</script>
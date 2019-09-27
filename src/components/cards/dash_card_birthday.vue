<template>
  <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover">
    <slot name='edit'></slot>
    <div class='extra-background-card'
      :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
    <div style='position:absolute;width:100%;height:100%'>
      <dash-container :size='data.list_size.size' ref='table'>
        <v-toolbar :style='"background-color:"+data.toolbar_color.value' dark>
          <dash-text :data='data.title' ref='title'></dash-text>
        </v-toolbar>

        <v-data-table dark :headers="header" :items="data.json.data" hide-actions class='extra-birthday'
          :pagination.sync='pagination'>
          <template slot="items" slot-scope="props">
            <td class='text-sm-center pa-1' style='background-color:rgba(0, 0, 0, 0)'>
              <v-avatar :size="data.list_size.size*3" color="grey lighten-4">
                <img :src="props.item.src" alt="avatar">
              </v-avatar>
            </td>
            <td style='font-size:0.1em'>{{ props.item.name }}</td>
            <td style='font-size:0.1em'>{{ props.item.date }}</td>
          </template>
        </v-data-table>
      </dash-container>
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
            opacity: 0,
            value: "images/birthday.jpg"
          },
          title: {
            type: 'dash-form-text',
            name: 'Título',
            size: "6",
            color: "white",
            value: "Aniversariantes do mês",
            align: 'center',
            size_max: '30',
            font: 'bold',

          },
          json: {
            type: 'dash-form-json',
            name: 'Aniversariantes',
            value: 'json/birthday_example',
            data: []
          },
          list_size: {
            type: 'dash-form-slide',
            name: 'Tamanho da lista',
            size: "30",
            step: '0.1'
          },
          toolbar_color: {
            type: 'dash-form-color',
            name: 'Cor da barra do topo',
            value: "green",
          }
        },
        header: [{
            text: "*",
            value: 'src',
            align: 'center',
            sortable: false
          }, {
            text: "Nome",
            value: 'name',
            align: 'left',
          },
          {
            text: 'Dia',
            value: 'date',
            align: 'left',

          }
        ],
        pagination: {
          'sortBy': 'date',
          'descending': false,
          'rowsPerPage': 5
        }

      }
    },
    computed: {},
    methods: {
      getBirthday: function () {
        $.ajax({
          url: this.data.json.value,
          dataType: "JSON",
          method: 'GET',
        }).done((response) => {
          this.data.json.data = response;
          this.setLayout();
        });
      },
      setLayout(sizer) {
        Vue.nextTick(() => {
          this.$refs.table.resize();
          this.$refs.title.resize();
        })
      }
    },

    mounted() {
      this.getBirthday();
    }
  };
</script>
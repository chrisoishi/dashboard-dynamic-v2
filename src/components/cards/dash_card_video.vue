<template>
  <v-card style="min-height:200px" width="100%" height="100%">
    <slot name='edit'></slot>
    <template v-if="videoId!=''">
      <div :id="'player-'+father.card_id"></div>
    </template>
    <template v-else>
      <v-container fill-height>
        <div style='width:100%' class='font-weight-bold text-sm-center'>
          <v-btn color='red' dark @click="edit('src')">Inserir URL do Video Youtube</v-btn>
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
            name: 'URL video Youtube',
            color: "white",
            value: ""
          },
        },
        player: null,
      }
    },
    computed: {
      videoId: function () {
        var id = "";
        if (this.data.src.value != null) {
          id = this.data.src.value.replace("https://www.youtube.com/watch?v=", "");
          id = id.replace("https://www.youtube.com/watch?v=", "");
          id = id.replace("https://youtu.be/", "");
        }
        return id;
      }
    },
    watch: {
      videoId: function (val) {
        if (this.player != null) this.player.loadVideoById(val);
        else {
          this.create();
        }
      }
    },
    methods: {
      create: function () {
        if (this.videoId != "") {
          this.player = new YT.Player('player-' + this.father.card_id, {
            height: '100%',
            width: '100%',
            videoId: this.videoId,
            events: {
              'onReady': this.onPlayerReady,
              'onStateChange': this.onPlayerStateChange
            }
          });
        } else setTimeout(() => {
          this.create()
        }, 100);

      },
      onPlayerReady: function (event) {
        // event.target.playVideo();
        event.target.mute();
      },
      onPlayerStateChange: function (event) {
        if (event.data == 0) this.player.seekTo(0);
      },
      onPageJoin(){
        if (this.player != null) {
          
          this.player.seekTo(0);
          this.player.playVideo();

        }
      },
      onPageLeave: function () {
        if (this.player != null) this.player.pauseVideo();
      },
      onSave() {},
      onLoad() {}
    },
    mounted() {
      this.create();
    }
  };
</script>
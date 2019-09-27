<template>
  <div style='font-size:1vw;height:100%;max-height:100%;width:100%;max-width:100%' ref='container'>
    <div :style="'font-size:'+default_size+'em'">
      <div :style="'font-size:'+size+'em'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      size: Number
    },
    data() {
      return {
        default_size: "0",
      }
    },
    methods: {
      resize: function () {
        div = $(this.$refs.container);
        size = div.height() / window.innerHeight;
        prop = div.width() / div.height()
        if (prop > 1) size2 = 1 + (prop * 0.2);
        else size2 = 1;
        size = size * size2;
        this.default_size = size;
      }
    },
  };
</script>
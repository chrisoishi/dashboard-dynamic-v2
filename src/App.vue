<template>
  <v-app>
    <router-view ref='router'></router-view>
    <c-loading ref='loading'></c-loading>
    <c-alert ref='alert'></c-alert>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        loading:null,
        alert:null
      }
    },
    computed:{
      // loading(){return this.$refs.loading;}
    },
    mounted() {
      this.loading = this.$refs.loading;
      this.alert = this.$refs.alert;
    },
  }
</script>

<style>
</style>
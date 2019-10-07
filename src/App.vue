<template>
  <v-app>
    <router-view ref='router'/>
    <c-loading ref='loading'/>
    <c-confirm ref='confirm' />
    <c-alert ref='alert'/>
    
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        loading:null,
        alert:null,
        confirm:null,
      }
    },
    computed:{
      // loading(){return this.$refs.loading;}
    },
    mounted() {
      this.loading = this.$refs.loading;
      this.alert = this.$refs.alert;
      this.confirm = this.$refs.confirm;
    },
  }
</script>

<style>
</style>
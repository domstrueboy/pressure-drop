<template>
  <v-app id="app">
    <router-view></router-view>
    <v-footer class="footer" fixed color="black">
      <v-avatar size="36px" slot="activator">
        <img src="/static/icon.ico">
      </v-avatar>
      ООО "ЭлМетро Групп"
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'pressure-drop'
  }
</script>

<style>
  /*@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');*/
  @import './assets/fonts.css';
  /* Global CSS */
</style>

<style>
  .footer {
    color: white;
  }
</style>
<template>
  <v-app>
    <v-toolbar light dense app>
      <v-toolbar-title class="headline">
        <router-link to="/" id="hl"> 
          <v-icon color="primary">clear_all</v-icon>
          <span> Hacktiv</span>
          <span class="font-weight-light">Overflow</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$store.state.isLogin">
        <v-btn to="/logout" flat color="primary">logout</v-btn>
      </div>
      <div v-else>
        <v-btn to="/login" flat color="primary">login</v-btn>
        <v-btn to="/signup" flat color="primary">signup</v-btn>
      </div>
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>

#hl {
  text-decoration: none;
}
  
</style>

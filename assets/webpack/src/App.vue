<template>
  <router-view/>
</template>

<script>
const store = require("store");
export default {
    name: "app",

    beforeCreate: function() {
      //Load active language form localStorage
      var curlang=store.get("curlang");
      if (curlang !== undefined) 
        this.$i18n.locale=curlang;
      else
        store.set("curlang","en");
      
      io.socket.on('next', (vid) => {
        this.$store.dispatch("setActivePlayer",vid);
      });
      
    }
};
</script>

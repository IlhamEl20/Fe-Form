<template>
  <v-app dark>
    <v-main>
      <nuxt-link v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-if="$i18n.locale !== 'id'" :to="switchLocalePath('id')">
        Indonesia
      </nuxt-link>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "auth",
};
</script>

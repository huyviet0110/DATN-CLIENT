<template>
  <div>
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Documentation</template>

      Vue’s
      <a target="_blank" href="https://v2.vuejs.org/">official documentation</a>
      provides you with all information you need to get started.
    </WelcomeItem>
  </div>
</template>

<script>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

export default {
  components: {
    WelcomeItem,
    DocumentationIcon
  }
}
</script>

<style>

</style>

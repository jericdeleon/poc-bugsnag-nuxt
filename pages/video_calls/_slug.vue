<template>
  <div>
    <h1>
      Trigger error for {{ slug }}:
    </h1>
    <div>
      <button @click="randomError()">
        Random Error
      </button>
      <button @click="differentError()">
        Different Error
      </button>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ params }) {
    const slug = params.slug
    return { slug }
  },
  methods: {
    randomError () {
      this.$bugsnag.notify(new Error('RandomError'))
    },
    differentError () {
      this.$bugsnag.notify(new Error('DifferentError'))
    }
  }
}
</script>

<style>
</style>

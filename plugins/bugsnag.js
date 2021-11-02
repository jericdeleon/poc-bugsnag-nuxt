import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

export default function ({ $config: { bugsnagApiKey } }, inject) {
  if (process.server) {
    return null
  }

  const bugsnagClient = Bugsnag.start({
    apiKey: bugsnagApiKey,
    plugins: [new BugsnagPluginVue()],
    onError (event) {
      const path = new URL(event.request.url).pathname
      const roomKey = path.split('/').pop()

      if (roomKey) {
        event.addMetadata('dialer', {
          roomKey,
          rating: getRandomIntInclusive(1, 5)
        })
      }
    }
  })

  inject('bugsnag', bugsnagClient)
}

import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

export default function ({ $config: { bugsnagApiKey } }, inject) {
  if (process.server) {
    return null
  }

  const bugsnagClient = Bugsnag.start({
    apiKey: bugsnagApiKey,
    plugins: [new BugsnagPluginVue()]
  })

  inject('bugsnag', bugsnagClient)
}

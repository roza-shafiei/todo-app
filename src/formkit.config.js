import { defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

import '@formkit/themes/genesis' // this is the theme CSS!

export default defaultConfig({
  config: {
    classes: generateClasses({
      theme: 'genesis',
    }),
  },
})

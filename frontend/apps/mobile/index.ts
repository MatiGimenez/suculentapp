import { registerRootComponent } from 'expo'
import { configureApi } from '@suculentapp/core'

import App from './App'

// El BFF adapta las respuestas según el cliente (X-Client: mobile)
configureApi({ client: 'mobile' })

registerRootComponent(App)

// Metro tuneado para el monorepo pnpm + Tamagui.
// - watchFolders/nodeModulesPaths: resolver paquetes del workspace (@suculentapp/*).
// - unstable_enablePackageExports + conditionNames: Tamagui usa el campo
//   "exports" con condiciones (react-native/import) para servir su build nativo.
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = ['require', 'import', 'react-native']

module.exports = config

const path = require('path');

const { ESLint } = require('eslint');
const { createFilter } = require('@rollup/pluginutils');

function normalizePath(id) {
  return path
    .relative(process.cwd(), id)
    .split(path.sep)
    .join('/');
}

let pluginHost = 'rollup';
let globalErrors = false;

module.exports = function viteEslint(options = { 'include': ['src/**/*.vue', 'src/**/*.js'] }) {
  const eslint = new ESLint();
  const filter = createFilter(options.include, options.exclude || /node_modules/);
  return {
    'name': 'vite-eslint-rollup',

    async transform(src, id) {
      const file = normalizePath(id);
      const formatter = await eslint.loadFormatter('stylish');
      if (!filter(id) || await eslint.isPathIgnored(file)) {
        return null;
      }

      const report = await eslint.lintFiles(file);
      const hasErrors = report.some((result) => result.errorCount !== 0);

      const result = formatter.format(report);
      if (result) {
        // eslint-disable-next-line no-console
        this.warn(result);
      }

      if (hasErrors) {
        globalErrors = true;

        if (pluginHost === 'vite') {
          this.error(result);
        }
      }

      return null;
    },

    configureServer() {
      console.log('WERE IN VITE LAND NOW!');
      pluginHost = 'vite';
    },

    buildEnd() {
      if (pluginHost === 'rollup' && globalErrors) {
        this.error('ESLint found errors');
      }

      return null;
    },

  };
}

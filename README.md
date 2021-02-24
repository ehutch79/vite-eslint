# vite-eslint
Vite 2 plugin that works with the dev server and rollup build.

Any errors from eslint should appear in the Vite overlay.

## Warning

You probably don't need this plugin. But I'm leaving it as an example, as it does use the up to date api.

You probably want to use something like this in your vite config:
```
import eslint from '@rollup/plugin-eslint';


...SNIPPED
    {
        ...eslint({
        'include': ['./src/**/*.vue', './src/**/*.js'],
        }),
        'enforce': 'pre',
    },
...SNIPPED
```

## Installation

```
npm install --save-dev @ehutch79/vite-eslint
```

### Usage

Add it to vite.config.js

```js
import viteESLint from '@ehutch79/vite-eslint'

export default {
  plugins: [viteESLint()]
}
```

As long as you can run eslint from your command line, this should work for you.


### configuration

You can pass an options object to the plugin, it takes two parameters, ```include``` and ```exclude```.

for example:
```
import viteESLint from '@ehutch79/vite-eslint'

export default {
  plugins: [viteESLint({ 'include': ['src/**/*.vue', 'src/**/*.js'] })]
}
```
will only scan js and vue files in the src/ directory.


### Why?

I had a horrible time trying to get the official rollup eslint plugin working. The issue is that the source was transformed before being passed to the plugin. This works by scanning the files directly.

It also uses the new API, rather than the deprecated one most plugins are still using.
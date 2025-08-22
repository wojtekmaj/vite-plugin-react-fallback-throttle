[![npm](https://img.shields.io/npm/v/vite-plugin-react-fallback-throttle.svg)](https://www.npmjs.com/package/vite-plugin-react-fallback-throttle) ![downloads](https://img.shields.io/npm/dt/vite-plugin-react-fallback-throttle.svg) [![CI](https://github.com/wojtekmaj/vite-plugin-react-fallback-throttle/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/vite-plugin-react-fallback-throttle/actions)

# vite-plugin-react-fallback-throttle

Vite plugin for configuring `FALLBACK_THROTTLE_MS` in React 19 in development and production builds.

## tl;dr

- Install by executing `npm install vite-plugin-react-fallback-throttle` or `yarn add vite-plugin-react-fallback-throttle`.
- Import by adding `import reactFallbackThrottlePlugin from 'vite-plugin-react-fallback-throttle'`.
- Use it by adding `reactFallbackThrottlePlugin(<throttleMs>)` to `plugins` section of your Vite config.

## Usage

Here's an example of basic configuration:

```ts
import { defineConfig } from 'vite';
import reactFallbackThrottlePlugin from 'vite-plugin-react-fallback-throttle';

export default defineConfig({
  plugins: [
    reactFallbackThrottlePlugin(),
  ],
});
```

## But why?

React 19 introduced a notable change in Suspense behavior, setting a minimum delay of 300ms between displaying and hiding a Suspense fallback. This behavior is governed by the `FALLBACK_THROTTLE_MS` constant in React's source code. While this change aims to improve user experience in certain scenarios, preventing rapid Suspense fallback flashes, it can also [negatively impact applications](https://github.com/facebook/react/issues/31819) that rely on Suspense-based state management libraries, such as Jotai. Additionally, some developers have reported [significantly increased test execution times](https://github.com/facebook/react/issues/30408) as a result of this change.

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>

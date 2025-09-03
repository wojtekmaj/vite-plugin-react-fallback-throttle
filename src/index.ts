import type { PluginOption } from 'vite';

export default function viteReactFallbackThrottlePlugin(throttleMs = 0): {
  name: string;
  transform: {
    filter: { id: { include: string[] } };
    handler: (src: string, id: string) => { code: string; map: null };
  };
} {
  return {
    name: 'vite-plugin-react-fallback-throttle',
    transform: {
      filter: {
        id: {
          include: [
            '**/react-dom-client.development.js',
            '**/react-dom-profiling.development.js',
            '**/react-dom-client.production.js',
            '**/react-dom*.js{?*,}',
          ],
        },
      },
      handler(src) {
        const srcWithReplacedFallbackThrottle = src
          // development
          .replace('FALLBACK_THROTTLE_MS = 300,', `FALLBACK_THROTTLE_MS = ${throttleMs},`)
          // production
          .replace(
            '((exitStatus = globalMostRecentFallbackTime + 300 - now())',
            `((exitStatus = globalMostRecentFallbackTime + ${throttleMs} - now())`,
          )
          .replace(
            '300 > now() - globalMostRecentFallbackTime)',
            `${throttleMs} > now() - globalMostRecentFallbackTime)`,
          );

        const result = {
          code: srcWithReplacedFallbackThrottle,
          map: null,
        };

        return result;
      },
    },
  } satisfies PluginOption;
}

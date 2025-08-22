import { describe, expect, it } from 'vitest';

import reactFallbackThrottlePlugin from './index.js';

function runPlugin(
  src: string,
  id: string,
  options?: Parameters<typeof reactFallbackThrottlePlugin>[0],
): string | undefined {
  const plugin = reactFallbackThrottlePlugin(options);

  return plugin.transform.handler(src, id)?.code;
}

describe('reactFallbackThrottlePlugin()', () => {
  describe('development builds', () => {
    it('should replace FALLBACK_THROTTLE_MS value with 0 by default', () => {
      const input = 'FALLBACK_THROTTLE_MS = 300,';
      const expectedOutput = 'FALLBACK_THROTTLE_MS = 0,';

      const result = runPlugin(input, 'react-dom-client.development.js');

      expect(result).toEqual(expectedOutput);
    });

    it('should replace FALLBACK_THROTTLE_MS value with a given value', () => {
      const input = 'FALLBACK_THROTTLE_MS = 300,';
      const expectedOutput = 'FALLBACK_THROTTLE_MS = 500,';

      const result = runPlugin(input, 'react-dom-client.development.js', 500);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe('production builds', () => {
    it('should replace values corresponding with FALLBACK_THROTTLE_MS with 0 by default', () => {
      const input = `((exitStatus = globalMostRecentFallbackTime + 300 - now())
// …
300 > now() - globalMostRecentFallbackTime)
`;
      const expectedOutput = `((exitStatus = globalMostRecentFallbackTime + 0 - now())
// …
0 > now() - globalMostRecentFallbackTime)
`;

      const result = runPlugin(input, 'react-dom-client.production.js');

      expect(result).toEqual(expectedOutput);
    });

    it('should replace values corresponding with FALLBACK_THROTTLE_MS with a given value', () => {
      const input = `((exitStatus = globalMostRecentFallbackTime + 300 - now())

300 > now() - globalMostRecentFallbackTime)
`;
      const expectedOutput = `((exitStatus = globalMostRecentFallbackTime + 500 - now())

500 > now() - globalMostRecentFallbackTime)
`;

      const result = runPlugin(input, 'react-dom-client.production.js', 500);

      expect(result).toEqual(expectedOutput);
    });
  });
});

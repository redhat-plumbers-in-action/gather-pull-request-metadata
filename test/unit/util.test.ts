import { describe, expect, test } from 'vitest';

import { escape } from '../../src/util';

describe('Test utility functions', () => {
  test('escape() can escape string', () => {
    expect(escape('abc|def')).toBe('abc\\|def');
    expect(escape('abcdef')).toBe('abcdef');
  });
});

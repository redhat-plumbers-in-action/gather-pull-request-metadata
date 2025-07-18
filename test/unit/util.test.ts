import { describe, expect, test } from 'vitest';

import { escape, getMetadataFromMessage } from '../../src/util';

describe('Test utility functions', () => {
  test('escape() can escape string', () => {
    expect(escape('abc|def')).toBe('abc\\|def');
    expect(escape('abcdef')).toBe('abcdef');
    expect(escape('abc || def')).toBe('abc \\|\\| def');
    expect(escape('abc||def')).toBe('abc\\|\\|def');
  });

  test('getMetadataFromMessage()', () => {
    const message = '\n<!-- metadata = {"key": "value"} -->\n';
    const result = getMetadataFromMessage(message);
    expect(result).toEqual([{ metadata: { key: 'value' } }]);

    const complexMessage =
      '<!-- metadata = {"comment-id": "1234", "data": {"key": "value"}} -->';
    const resultComplex = getMetadataFromMessage(complexMessage);
    expect(resultComplex).toEqual([
      {
        metadata: {
          'comment-id': '1234',
          data: {
            key: 'value',
          },
        },
      },
    ]);

    const invalidMessage = '<!-- metadata = {"comment-id": "1234"';
    const resultInvalid = getMetadataFromMessage(invalidMessage);
    expect(resultInvalid).toEqual([]);

    const emptyMessage = '';
    const resultEmpty = getMetadataFromMessage(emptyMessage);
    expect(resultEmpty).toEqual([]);
  });
});

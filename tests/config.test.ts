import { describe, expect, it } from 'vitest';
import { parseConfig } from '../src/config.js';

describe('parseConfig', () => {
  it('defaults username in mock mode if not provided', () => {
    const config = parseConfig(['--mock', 'thriving'], {});
    expect(config.username).toBe('thriving-user');
    expect(config.mockMode).toBe('thriving');
  });

  it('throws when username is missing and not in mock mode', () => {
    expect(() => parseConfig([], {})).toThrow('Missing username');
  });
});

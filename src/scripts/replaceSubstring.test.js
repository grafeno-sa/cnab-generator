import { describe, it, expect } from 'vitest'
import { replaceSubstring } from './replaceSubstring.js'

describe('replaceSubstring', () => {
  it('replaces at start', () => {
    expect(replaceSubstring('ABCDE', 1, 2, 'XY')).toBe('XYCDE')
  })

  it('replaces at end', () => {
    expect(replaceSubstring('ABCDE', 4, 5, 'XY')).toBe('ABCXY')
  })

  it('replaces in middle', () => {
    expect(replaceSubstring('ABCDE', 2, 4, 'XYZ')).toBe('AXYZE')
  })

  it('single char replacement', () => {
    expect(replaceSubstring('ABCDE', 3, 3, 'X')).toBe('ABXDE')
  })

  it('preserves string length when replacement matches field size', () => {
    const original = ' '.repeat(444)
    const result = replaceSubstring(original, 1, 3, 'ABC')
    expect(result.length).toBe(444)
  })
})

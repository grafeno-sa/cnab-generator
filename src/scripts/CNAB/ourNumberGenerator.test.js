import { describe, it, expect } from 'vitest'
import generateOurNumber, { vortxCheckDigit, bmpCheckDigit } from './ourNumberGenerator.js'

// Vetores gerados rodando o algoritmo Ruby real (Boletos::Vortx::Helper /
// Boletos::Bmp::Helper, grafeno-pagamentos) contra as mesmas bases.
describe('vortxCheckDigit', () => {
  it.each([
    [1, '9'],
    [3, '5'],
    [4583, '7'],
    [848, '6'],
    [89999999999, '1'],
    [12345, '5'],
  ])('base %i => dv %s', (base, expectedDv) => {
    expect(vortxCheckDigit(base)).toBe(expectedDv)
  })
})

describe('bmpCheckDigit', () => {
  it.each([
    [3, '9'],
    [4583, '0'],
    [848, 'P'],
    [1, '2'],
    [49999999999, '7'],
    [12345, '9'],
  ])('base %i => dv %s (inclui caso especial P)', (base, expectedDv) => {
    expect(bmpCheckDigit(base)).toBe(expectedDv)
  })
})

describe('generateOurNumber', () => {
  it('returns a 12-char string (11 digit base + 1 char dv)', () => {
    const result = generateOurNumber({ bankCode: '274', generatedLines: [] })
    expect(result).toHaveLength(12)
  })

  it('dv matches the base for both banks', () => {
    const vortx = generateOurNumber({ bankCode: '310', generatedLines: [] })
    expect(vortx.slice(-1)).toBe(vortxCheckDigit(vortx.slice(0, 11)))

    const bmp = generateOurNumber({ bankCode: '274', generatedLines: [] })
    expect(bmp.slice(-1)).toBe(bmpCheckDigit(bmp.slice(0, 11)))
  })

  it('avoids repeating a base already used in generatedLines', () => {
    const existing = generateOurNumber({ bankCode: '274', generatedLines: [] })
    const generatedLines = [{ type: 'registro1', ourNumber: existing }]

    const results = Array.from({ length: 20 }, () =>
      generateOurNumber({ bankCode: '274', generatedLines }))

    results.forEach(result => expect(result.slice(0, 11)).not.toBe(existing.slice(0, 11)))
  })

  it('falls back to BMP range for an unknown bank code', () => {
    const result = generateOurNumber({ bankCode: undefined, generatedLines: [] })
    expect(Number(result.slice(0, 11))).toBeLessThan(50_000_000_000)
  })
})

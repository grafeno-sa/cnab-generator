import { describe, it, expect } from 'vitest'
import generateLine from './lineFactory.js'
import getLineFields from './lineFields.js'
import { vortxCheckDigit, bmpCheckDigit } from './ourNumberGenerator.js'

describe('registro1 ourNumber generation (gerarNN/multicedente)', () => {
  it('stays blank when gerarNN is off', () => {
    const line = generateLine({ type: 'registro1', generatedLines: [], settings: { gerarNN: false } })
    expect(line.ourNumber).toBe('')
  })

  it('stays blank when settings is not provided', () => {
    const line = generateLine({ type: 'registro1', generatedLines: [] })
    expect(line.ourNumber).toBe('')
  })

  it('uses the header bank (BMP default) when multicedente is off and there is no header', () => {
    const line = generateLine({ type: 'registro1', generatedLines: [], settings: { gerarNN: true } })
    expect(line.ourNumber.slice(-1)).toBe(bmpCheckDigit(line.ourNumber.slice(0, 11)))
  })

  it('uses the header bank (Vortx) when multicedente is off and header.bankNumber is 310', () => {
    const header = generateLine({ type: 'header', generatedLines: [] })
    header.bankNumber = '310'

    const line = generateLine({
      type: 'registro1',
      generatedLines: [header],
      settings: { gerarNN: true, multicedente: false },
    })

    expect(line.ourNumber.slice(-1)).toBe(vortxCheckDigit(line.ourNumber.slice(0, 11)))
  })

  it('uses the line own numBancoCobrador (Vortx default) when multicedente is on, ignoring a BMP header', () => {
    const header = generateLine({ type: 'header', generatedLines: [] })
    header.bankNumber = '274'

    const line = generateLine({
      type: 'registro1',
      generatedLines: [header],
      settings: { gerarNN: true, multicedente: true },
    })

    expect(line.numBancoCobrador).toBe('310')
    expect(line.ourNumber.slice(-1)).toBe(vortxCheckDigit(line.ourNumber.slice(0, 11)))
  })

  it('follows numBancoCobrador when edited to BMP under multicedente', () => {
    const line = { type: 'registro1', numBancoCobrador: '274' }
    const fields = getLineFields('registro1')
    const ourNumberField = fields.find(f => f.name === 'ourNumber')

    const ourNumber = ourNumberField.defaultValue({
      generatedLines: [],
      newLine: line,
      settings: { gerarNN: true, multicedente: true },
    })

    expect(ourNumber.slice(-1)).toBe(bmpCheckDigit(ourNumber.slice(0, 11)))
  })
})

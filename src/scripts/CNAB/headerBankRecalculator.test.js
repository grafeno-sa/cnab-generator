import { describe, it, expect } from 'vitest'
import recalculateOurNumbers from './headerBankRecalculator'
import { vortxCheckDigit, bmpCheckDigit } from './ourNumberGenerator'

describe('recalculateOurNumbers', () => {
  it('regenerates ourNumber for every registro1 that already has one, using the new bankCode', () => {
    const lines = [
      { type: 'header', bankNumber: '274' },
      { type: 'registro1', ourNumber: '00000000001P' },
      { type: 'registro1', ourNumber: '00000000002P' },
    ]

    const updated = recalculateOurNumbers({ generatedLines: lines, bankCode: '310' })
    const registro1Lines = updated.filter((line) => line.type === 'registro1')

    registro1Lines.forEach((line) => {
      expect(line.ourNumber.slice(-1)).toBe(vortxCheckDigit(line.ourNumber.slice(0, 11)))
    })
  })

  it('regenerates using the BMP algorithm when bankCode is 274', () => {
    const lines = [{ type: 'registro1', ourNumber: '00000000001T' }]

    const updated = recalculateOurNumbers({ generatedLines: lines, bankCode: '274' })

    expect(updated[0].ourNumber.slice(-1)).toBe(bmpCheckDigit(updated[0].ourNumber.slice(0, 11)))
  })

  it('leaves registro1 lines without ourNumber untouched', () => {
    const lines = [{ type: 'registro1', ourNumber: '' }]

    const updated = recalculateOurNumbers({ generatedLines: lines, bankCode: '310' })

    expect(updated[0].ourNumber).toBe('')
  })

  it('leaves non-registro1 lines untouched', () => {
    const lines = [{ type: 'header', bankNumber: '310' }]

    const updated = recalculateOurNumbers({ generatedLines: lines, bankCode: '310' })

    expect(updated).toEqual(lines)
  })

  it('avoids base collisions across the recalculated lines', () => {
    const lines = [
      { type: 'registro1', ourNumber: '00000000001P' },
      { type: 'registro1', ourNumber: '00000000002P' },
      { type: 'registro1', ourNumber: '00000000003P' },
    ]

    const updated = recalculateOurNumbers({ generatedLines: lines, bankCode: '274' })
    const bases = updated.map((line) => line.ourNumber.slice(0, 11))

    expect(new Set(bases).size).toBe(bases.length)
  })
})

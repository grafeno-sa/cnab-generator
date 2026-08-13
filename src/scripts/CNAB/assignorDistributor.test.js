import { describe, it, expect } from 'vitest'
import AssignorDistributor, { MAX_ASSIGNORS } from './assignorDistributor.js'
import generateLine from './lineFactory.js'
import { vortxCheckDigit, bmpCheckDigit } from './ourNumberGenerator.js'

const buildRegistro1Lines = (count) =>
  Array.from({ length: count }, (_, i) => generateLine({ type: 'registro1', generatedLines: Array(i).fill(null) }))

describe('AssignorDistributor', () => {
  describe('validate', () => {
    it('fails when there are no assignors', () => {
      const result = AssignorDistributor().validate({ generatedLines: buildRegistro1Lines(5), assignors: [] })
      expect(result.valid).toBe(false)
    })

    it('fails when an assignor has no conta filled in', () => {
      const assignors = [{ banco: '310', conta: '' }]
      const result = AssignorDistributor().validate({ generatedLines: buildRegistro1Lines(5), assignors })
      expect(result.valid).toBe(false)
    })

    it('fails when there are fewer registro1 lines than assignors', () => {
      const assignors = [{ banco: '310', conta: '1' }, { banco: '274', conta: '2' }, { banco: '310', conta: '3' }]
      const result = AssignorDistributor().validate({ generatedLines: buildRegistro1Lines(2), assignors })
      expect(result.valid).toBe(false)
      expect(result.message).toContain('2 linhas para 3 assignors')
    })

    it('passes when there is at least one line per assignor and all contas are filled', () => {
      const assignors = [{ banco: '310', conta: '1' }, { banco: '274', conta: '2' }]
      const result = AssignorDistributor().validate({ generatedLines: buildRegistro1Lines(2), assignors })
      expect(result.valid).toBe(true)
    })
  })

  describe('blockSizes', () => {
    it('splits evenly when it divides exactly', () => {
      expect(AssignorDistributor().blockSizes(9, 3)).toEqual([3, 3, 3])
    })

    it('puts the remainder in the last block', () => {
      expect(AssignorDistributor().blockSizes(10, 3)).toEqual([3, 3, 4])
    })

    it('handles a single assignor (one block with everything)', () => {
      expect(AssignorDistributor().blockSizes(7, 1)).toEqual([7])
    })
  })

  describe('apply', () => {
    it('returns the validation failure untouched when invalid', () => {
      const result = AssignorDistributor().apply({ generatedLines: buildRegistro1Lines(1), assignors: [] })
      expect(result.valid).toBe(false)
    })

    it('assigns contiguous blocks of registro1 lines to each assignor, remainder in the last', () => {
      const generatedLines = buildRegistro1Lines(10)
      const assignors = [
        { banco: '310', conta: '11111111' },
        { banco: '274', conta: '22222222' },
        { banco: '310', conta: '33333333' },
      ]

      const result = AssignorDistributor().apply({ generatedLines, assignors, settings: { gerarNN: false } })

      expect(result.valid).toBe(true)
      const contas = result.lines.map(l => l.contaBeneficiario)
      const bancos = result.lines.map(l => l.numBancoCobrador)
      expect(contas).toEqual([
        '11111111', '11111111', '11111111',
        '22222222', '22222222', '22222222',
        '33333333', '33333333', '33333333', '33333333',
      ])
      expect(bancos).toEqual(['310', '310', '310', '274', '274', '274', '310', '310', '310', '310'])
    })

    it('leaves non-registro1 lines untouched', () => {
      const header = generateLine({ type: 'header', generatedLines: [] })
      const trailer = generateLine({ type: 'trailer', generatedLines: [] })
      const generatedLines = [header, ...buildRegistro1Lines(2), trailer]
      const assignors = [{ banco: '310', conta: '11111111' }]

      const result = AssignorDistributor().apply({ generatedLines, assignors, settings: {} })

      expect(result.lines[0]).toEqual(header)
      expect(result.lines[result.lines.length - 1]).toEqual(trailer)
    })

    it('does not touch ourNumber when gerarNN is off', () => {
      const generatedLines = buildRegistro1Lines(2)
      const assignors = [{ banco: '274', conta: '11111111' }]

      const result = AssignorDistributor().apply({ generatedLines, assignors, settings: { gerarNN: false } })

      result.lines.forEach((line, i) => expect(line.ourNumber).toBe(generatedLines[i].ourNumber))
    })

    it('recalculates ourNumber using the assigned bank when gerarNN is on', () => {
      const generatedLines = buildRegistro1Lines(4)
      const assignors = [
        { banco: '310', conta: '11111111' },
        { banco: '274', conta: '22222222' },
      ]

      const result = AssignorDistributor().apply({ generatedLines, assignors, settings: { gerarNN: true } })

      const [line1, line2, line3, line4] = result.lines
      expect(line1.ourNumber.slice(-1)).toBe(vortxCheckDigit(line1.ourNumber.slice(0, 11)))
      expect(line2.ourNumber.slice(-1)).toBe(vortxCheckDigit(line2.ourNumber.slice(0, 11)))
      expect(line3.ourNumber.slice(-1)).toBe(bmpCheckDigit(line3.ourNumber.slice(0, 11)))
      expect(line4.ourNumber.slice(-1)).toBe(bmpCheckDigit(line4.ourNumber.slice(0, 11)))
    })
  })

  describe('MAX_ASSIGNORS', () => {
    it('is capped at 10', () => {
      expect(MAX_ASSIGNORS).toBe(10)
    })
  })
})

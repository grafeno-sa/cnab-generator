import { describe, it, expect } from 'vitest'
import ContentFormatter from './contentFormatter.js'
import generateLine from './lineFactory.js'

const formatter = ContentFormatter()

const getFormattedLine = (type, index = 0) => {
  const line = generateLine({ type, generatedLines: [] })
  return formatter.format([line]).split('\n')[index]
}

describe('ContentFormatter', () => {
  describe('registro1', () => {
    it('formatted line has 444 chars', () => {
      expect(getFormattedLine('registro1', 1).length).toBe(444)
    })

    it('starts with 1', () => {
      expect(getFormattedLine('registro1', 1)[0]).toBe('1')
    })

    it('codigoInscricaoSacado (219-220) defaults to 02', () => {
      expect(getFormattedLine('registro1', 1).slice(218, 220)).toBe('02')
    })

    it('numeroControleCliente (38-62) defaults to 25 spaces', () => {
      expect(getFormattedLine('registro1', 1).slice(37, 62)).toBe(' '.repeat(25))
    })
  })

  describe('header', () => {
    it('formatted line has 444 chars', () => {
      const header = generateLine({ type: 'header', generatedLines: [] })
      const formatted = formatter.format([header])
      expect(formatted.split('\n')[0].length).toBe(444)
    })

    it('starts with 0', () => {
      const header = generateLine({ type: 'header', generatedLines: [] })
      expect(formatter.format([header]).split('\n')[0][0]).toBe('0')
    })
  })

  describe('trailer', () => {
    it('starts with 9', () => {
      const trailer = generateLine({ type: 'trailer', generatedLines: [] })
      const lines = formatter.format([trailer]).split('\n')
      expect(lines[lines.length - 1][0]).toBe('9')
    })
  })

  describe('format', () => {
    it('wraps lines with header and trailer when absent', () => {
      const line = generateLine({ type: 'registro1', generatedLines: [] })
      const lines = formatter.format([line]).split('\n')
      expect(lines.length).toBe(3)
      expect(lines[0][0]).toBe('0')
      expect(lines[2][0]).toBe('9')
    })
  })
})

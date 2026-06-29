import { describe, it, expect } from 'vitest'
import getLineFields from './lineFields.js'

const LINE_TYPES = ['header', 'registro1', 'registro2', 'registro3', 'registro7', 'trailer']

// Fields whose defaultValue is non-deterministic (random, date, or requires
// populated generatedLines). Excluded from default-value snapshot tests.
const DYNAMIC_FIELDS = new Set([
  'documentoSacado',          // random CNPJ
  'documentoSacadorAvalista', // random CNPJ
  'dataVencimento',           // current date
  'valorTitulo',              // Math.random
  'ourNumber',                // reads from generatedLines content in registro3
])

describe('lineFields', () => {
  LINE_TYPES.forEach(type => {
    describe(type, () => {
      it('every field has maxLength === endIndex - startIndex + 1', () => {
        const fields = getLineFields(type)
        fields.forEach(field => {
          const expected = field.endIndex - field.startIndex + 1
          expect(field.maxLength, field.name).toBe(expected)
        })
      })

      it('every field has a defaultValue function', () => {
        const fields = getLineFields(type)
        fields.forEach(field => {
          expect(typeof field.defaultValue, field.name).toBe('function')
        })
      })

      it('no two fields overlap in position', () => {
        const fields = getLineFields(type)
        for (let i = 0; i < fields.length; i++) {
          for (let j = i + 1; j < fields.length; j++) {
            const a = fields[i]
            const b = fields[j]
            const overlaps = a.startIndex <= b.endIndex && b.startIndex <= a.endIndex
            expect(overlaps, `${a.name} overlaps ${b.name}`).toBe(false)
          }
        }
      })

      it('static default values match snapshot', () => {
        const fields = getLineFields(type)
        const staticDefaults = {}
        fields
          .filter(field => !DYNAMIC_FIELDS.has(field.name))
          .forEach(field => {
            staticDefaults[field.name] = field.defaultValue({ generatedLines: [] })
          })
        expect(staticDefaults).toMatchSnapshot()
      })
    })
  })
})

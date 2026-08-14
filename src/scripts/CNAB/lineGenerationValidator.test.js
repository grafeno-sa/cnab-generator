import { describe, it, expect } from 'vitest'
import LineGenerationValidator from './lineGenerationValidator'

describe('LineGenerationValidator', () => {
  const validator = LineGenerationValidator()

  it('requires registro1 before registro2/3/7 when the file is empty', () => {
    expect(validator.validate({ generatedLines: [], type: 'registro2' }).valid).toBe(false)
    expect(validator.validate({ generatedLines: [], type: 'registro3' }).valid).toBe(false)
    expect(validator.validate({ generatedLines: [], type: 'registro7' }).valid).toBe(false)
  })

  it('allows registro1 or header as the first line', () => {
    expect(validator.validate({ generatedLines: [], type: 'registro1' }).valid).toBe(true)
    expect(validator.validate({ generatedLines: [], type: 'header' }).valid).toBe(true)
  })

  it('blocks repeating the same type right after itself, except registro1', () => {
    const lines = [{ type: 'registro2' }]

    expect(validator.validate({ generatedLines: lines, type: 'registro2' }).valid).toBe(false)
    expect(validator.validate({ generatedLines: [{ type: 'registro1' }], type: 'registro1' }).valid).toBe(true)
  })

  it('allows any type right after a registro1 line', () => {
    const lines = [{ type: 'registro1' }]

    expect(validator.validate({ generatedLines: lines, type: 'registro2' }).valid).toBe(true)
    expect(validator.validate({ generatedLines: lines, type: 'header' }).valid).toBe(true)
  })

  it('blocks a second header even with registro1 lines in between', () => {
    const lines = [{ type: 'header' }, { type: 'registro1' }]

    const result = validator.validate({ generatedLines: lines, type: 'header' })

    expect(result.valid).toBe(false)
    expect(result.message).toMatch(/header/)
  })

  it('blocks a second trailer even with registro1 lines in between', () => {
    const lines = [{ type: 'registro1' }, { type: 'trailer' }, { type: 'registro1' }]

    const result = validator.validate({ generatedLines: lines, type: 'trailer' })

    expect(result.valid).toBe(false)
    expect(result.message).toMatch(/trailer/)
  })

  it('allows adding the header/trailer again after the existing one is removed', () => {
    const lines = [{ type: 'registro1' }]

    expect(validator.validate({ generatedLines: lines, type: 'header' }).valid).toBe(true)
    expect(validator.validate({ generatedLines: lines, type: 'trailer' }).valid).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import ContentEditor from './contentEditor'

describe('ContentEditor.editSingleOccurrence', () => {
  const editor = ContentEditor()

  it('creates the line (with defaults + edited fields) when it does not exist yet', () => {
    const generatedLines = [{ type: 'registro1', index: 0 }]
    const editedFields = [{ name: 'bankNumber', value: '310' }]

    const result = editor.editSingleOccurrence({ generatedLines, editedFields, type: 'header' })
    const header = result.find((line) => line.type === 'header')

    expect(result).toHaveLength(2)
    expect(header.bankNumber).toBe('310')
  })

  it('edits the existing line in place instead of creating a second one', () => {
    const generatedLines = [{ type: 'header', index: 0, bankNumber: '274' }]
    const editedFields = [{ name: 'bankNumber', value: '310' }]

    const result = editor.editSingleOccurrence({ generatedLines, editedFields, type: 'header' })

    expect(result).toHaveLength(1)
    expect(result[0].bankNumber).toBe('310')
  })

  it('recalculates index/serialNumber after creating the line', () => {
    const generatedLines = [{ type: 'registro1', index: 0 }]

    const result = editor.editSingleOccurrence({ generatedLines, editedFields: [], type: 'trailer' })

    expect(result[1].index).toBe(1)
  })
})

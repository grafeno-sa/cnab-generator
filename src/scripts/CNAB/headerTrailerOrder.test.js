import { describe, it, expect } from 'vitest'
import reorderHeaderAndTrailer from './headerTrailerOrder'

describe('reorderHeaderAndTrailer', () => {
  it('moves an existing header to the first position', () => {
    const lines = [
      { type: 'registro1', id: 'r1' },
      { type: 'header', id: 'h' },
      { type: 'registro1', id: 'r2' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result.map((line) => line.id)).toEqual(['h', 'r1', 'r2'])
  })

  it('moves an existing trailer to the last position', () => {
    const lines = [
      { type: 'trailer', id: 't' },
      { type: 'registro1', id: 'r1' },
      { type: 'registro1', id: 'r2' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result.map((line) => line.id)).toEqual(['r1', 'r2', 't'])
  })

  it('keeps header first and trailer last with everything else in between', () => {
    const lines = [
      { type: 'registro1', id: 'r1' },
      { type: 'trailer', id: 't' },
      { type: 'header', id: 'h' },
      { type: 'registro2', id: 'r2' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result.map((line) => line.id)).toEqual(['h', 'r1', 'r2', 't'])
  })

  it('preserves the relative order of the remaining lines', () => {
    const lines = [
      { type: 'registro1', id: 'r1' },
      { type: 'registro2', id: 'r2' },
      { type: 'registro3', id: 'r3' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result.map((line) => line.id)).toEqual(['r1', 'r2', 'r3'])
  })

  it('is a no-op when already correctly ordered', () => {
    const lines = [
      { type: 'header', id: 'h' },
      { type: 'registro1', id: 'r1' },
      { type: 'trailer', id: 't' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result.map((line) => line.id)).toEqual(['h', 'r1', 't'])
  })

  it('recalculates index and serialNumber after reordering', () => {
    const lines = [
      { type: 'registro1', id: 'r1', serialNumber: '1' },
      { type: 'header', id: 'h', serialNumber: '2' },
    ]

    const result = reorderHeaderAndTrailer(lines)

    expect(result[0]).toMatchObject({ id: 'h', index: 0, serialNumber: '1' })
    expect(result[1]).toMatchObject({ id: 'r1', index: 1, serialNumber: '2' })
  })

  it('works with no header at all', () => {
    const lines = [{ type: 'registro1', id: 'r1' }, { type: 'trailer', id: 't' }]

    expect(reorderHeaderAndTrailer(lines).map((line) => line.id)).toEqual(['r1', 't'])
  })

  it('works with no trailer at all', () => {
    const lines = [{ type: 'header', id: 'h' }, { type: 'registro1', id: 'r1' }]

    expect(reorderHeaderAndTrailer(lines).map((line) => line.id)).toEqual(['h', 'r1'])
  })

  it('works with neither header nor trailer', () => {
    const lines = [{ type: 'registro1', id: 'r1' }, { type: 'registro2', id: 'r2' }]

    expect(reorderHeaderAndTrailer(lines).map((line) => line.id)).toEqual(['r1', 'r2'])
  })
})

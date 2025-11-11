/**
 * LLC Formation business logic tests
 */

import { describe, it, expect } from 'vitest'
import { validateOwnershipPercentages } from '../index'

describe('LLC Formation', () => {
  describe('validateOwnershipPercentages', () => {
    it('should return null for valid ownership totaling 100%', () => {
      const members = [{ ownershipPercentage: 60 }, { ownershipPercentage: 40 }]

      const error = validateOwnershipPercentages(members)
      expect(error).toBeNull()
    })

    it('should return null for valid ownership with decimals totaling 100%', () => {
      const members = [
        { ownershipPercentage: 33.33 },
        { ownershipPercentage: 33.33 },
        { ownershipPercentage: 33.34 },
      ]

      const error = validateOwnershipPercentages(members)
      expect(error).toBeNull()
    })

    it('should return error for ownership less than 100%', () => {
      const members = [{ ownershipPercentage: 60 }, { ownershipPercentage: 30 }]

      const error = validateOwnershipPercentages(members)
      expect(error).toContain('must total 100%')
      expect(error).toContain('90.00%')
    })

    it('should return error for ownership greater than 100%', () => {
      const members = [{ ownershipPercentage: 60 }, { ownershipPercentage: 50 }]

      const error = validateOwnershipPercentages(members)
      expect(error).toContain('must total 100%')
      expect(error).toContain('110.00%')
    })

    it('should handle single member with 100% ownership', () => {
      const members = [{ ownershipPercentage: 100 }]

      const error = validateOwnershipPercentages(members)
      expect(error).toBeNull()
    })

    it('should handle floating point precision (99.99%)', () => {
      const members = [{ ownershipPercentage: 99.99 }, { ownershipPercentage: 0.01 }]

      const error = validateOwnershipPercentages(members)
      expect(error).toBeNull()
    })

    it('should handle many members with equal ownership', () => {
      const members = Array(10).fill({ ownershipPercentage: 10 })

      const error = validateOwnershipPercentages(members)
      expect(error).toBeNull()
    })
  })
})

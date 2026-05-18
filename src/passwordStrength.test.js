import { describe, it, expect } from 'vitest'
import { getPasswordStrength } from './passwordStrength'

describe('getPasswordStrength', () => {

  describe('vacía', () => {
    it('retorna "vacía" cuando la contraseña es un string vacío', () => {
      expect(getPasswordStrength('')).toBe('vacía')
    })
  })

  describe('débil', () => {
    it('retorna "débil" cuando la contraseña tiene menos de 8 caracteres', () => {
      expect(getPasswordStrength('abc')).toBe('débil')
    })

    it('retorna "débil" cuando tiene exactamente 7 caracteres', () => {
      expect(getPasswordStrength('abcdefg')).toBe('débil')
    })

    it('retorna "débil" cuando tiene solo símbolos pero menos de 8 caracteres', () => {
      expect(getPasswordStrength('!@#')).toBe('débil')
    })
  })

  describe('media', () => {
    it('retorna "media" cuando tiene exactamente 8 caracteres sin números ni símbolos', () => {
      expect(getPasswordStrength('abcdefgh')).toBe('media')
    })

    it('retorna "media" cuando tiene más de 8 caracteres sin números ni símbolos', () => {
      expect(getPasswordStrength('abcdefghij')).toBe('media')
    })
  })

  describe('fuerte', () => {
    it('retorna "fuerte" cuando tiene 8+ caracteres y al menos un número', () => {
      expect(getPasswordStrength('abcdefg1')).toBe('fuerte')
    })

    it('retorna "fuerte" cuando tiene exactamente 8 caracteres con un número', () => {
      expect(getPasswordStrength('abcdefg2')).toBe('fuerte')
    })
  })

  describe('muy fuerte', () => {
    it('retorna "muy fuerte" cuando tiene 8+ caracteres, número y símbolo', () => {
      expect(getPasswordStrength('abcdefg1!')).toBe('muy fuerte')
    })

    it('retorna "muy fuerte" cuando tiene 8+ caracteres con número y espacio', () => {
      expect(getPasswordStrength('abcdefg1 ')).toBe('muy fuerte')
    })
  })

})
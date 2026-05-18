import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from './passwordStrengthMeter'

describe('PasswordStrengthMeter', () => {

  describe('renderizado inicial', () => {
    it('renderiza un input de tipo password', () => {
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    it('muestra "vacía" como estado inicial', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByText('vacía')).toBeInTheDocument()
    })
  })

  describe('comportamiento al escribir', () => {
    it('muestra "débil" al escribir una contraseña corta', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abc')
      expect(screen.getByText('débil')).toBeInTheDocument()
    })

    it('muestra "media" al escribir 8+ caracteres sin números ni símbolos', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
      expect(screen.getByText('media')).toBeInTheDocument()
    })

    it('muestra "fuerte" al escribir 8+ caracteres con al menos un número', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
      expect(screen.getByText('fuerte')).toBeInTheDocument()
    })

    it('muestra "muy fuerte" al escribir 8+ caracteres con número y símbolo', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
      expect(screen.getByText('muy fuerte')).toBeInTheDocument()
    })

    it('vuelve a "vacía" al borrar toda la contraseña', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)
      await user.type(input, 'abc')
      await user.clear(input)
      expect(screen.getByText('vacía')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('exactamente 8 caracteres sin números no es "débil"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
      expect(screen.queryByText('débil')).not.toBeInTheDocument()
    })

    it('exactamente 7 caracteres no es "media"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg')
      expect(screen.queryByText('media')).not.toBeInTheDocument()
    })

    it('solo símbolos con menos de 8 caracteres sigue siendo "débil"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      await user.type(screen.getByLabelText(/contraseña/i), '!@#')
      expect(screen.getByText('débil')).toBeInTheDocument()
    })
  })

})
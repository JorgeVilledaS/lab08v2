export function getPasswordStrength(password) {
    if (password === '') return 'vacía'

    if (password.length < 8) return 'débil'

    const tieneNumero = /[0-9]/.test(password)
    const tieneSimbolo = /[^a-zA-Z0-9]/.test(password)

    if (tieneNumero && tieneSimbolo) return 'muy fuerte'
    if (tieneNumero) return 'fuerte'

    return 'media'
}
# Verificador de Contraseñas 

Componente de React que evalúa la fortaleza de una contraseña en tiempo real, construido siguiendo el flujo de Test Driven Development (TDD).

## Instalación

```bash
npm install
```

## Correr los tests

```bash
npm test
```

## Correr en modo desarrollo

```bash
npm run dev
```

## Flujo TDD seguido

1. **Configuración**: se creó el proyecto con Vite y se configuró Vitest y React Testing Library manualmente.

2. **Tests primero (red)**: se escribieron todos los tests antes de existir cualquier implementación. En este punto todos los tests fallaban porque los archivos `passwordStrength.js` y `PasswordStrengthMeter.jsx` no existían aún. Se hizo commit en este estado.

3. **Implementación (green)**: se implementó la función pura `getPasswordStrength` y el componente `PasswordStrengthMeter` con el mínimo código necesario para que todos los tests pasaran.

## Estructura del proyecto

```
src/
├── passwordStrength.js            # Lógica pura de cálculo de fortaleza
├── passwordStrength.test.js       # Tests unitarios de la función
├── PasswordStrengthMeter.jsx      # Componente React
├── PasswordStrengthMeter.test.jsx # Tests del componente
└── setupTests.js                  # Configuración de jest-dom
```              

## Reglas de fortaleza

| Condición | Fortaleza |
|---|---|
| Contraseña vacía | vacía |
| Menos de 8 caracteres | débil |
| 8+ caracteres, sin números ni símbolos | media |
| 8+ caracteres con al menos un número | fuerte |
| 8+ caracteres con número y símbolo | muy fuerte |


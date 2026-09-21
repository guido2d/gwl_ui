# Cambios

## 0.2.0 — 2026-09-21

- Escala tipográfica como clases: `titular`, `titulo-pagina`, `titulo-seccion`,
  `titulo-tarjeta`, `bajada`, `nota`, `cuerpo`, `cuerpo-sm`, `etiqueta` y
  `leyenda`. Antes el paquete traía sólo las familias y cada app rearmaba los
  tamaños con utilidades sueltas.
- `titular` y `titulo-pagina` son fluidos: bajan a 44 y 27 px en pantalla
  angosta sin que la app ponga breakpoints.

## 0.1.1 — 2026-09-19

- `flux.css`: vuelve la regla que alinea etiqueta y control de los campos
  (`[data-flux-field]`), que se perdía por un comentario cortado.
- `base.css`: sin el comentario suelto al final.
- Test que verifica que ningún archivo deje un comentario abierto.

## 0.1.0 — 2026-09-19

Primera versión, extraída de Wellness on Demand (`wod_v2`).

- Tokens del manual de marca: azul, celeste, naranja, verde, neutros crudos,
  radios, sombras, curvas de movimiento y las dos familias tipográficas.
- Utilidades de tipografía, movimiento, layout y prosa.
- Capa opcional para Flux.
- Logos de Grupo Wellness Latina y configuración de fuentes para Vite.

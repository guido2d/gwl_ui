# GWL UI

Design system de **Grupo Wellness Latina** para las apps de la empresa: tokens
del manual de marca, tipografía, movimiento, prosa, una capa para Flux y los
logos. Es CSS para **Tailwind CSS v4**, así que sirve igual en Blade, Livewire,
Inertia + React o Inertia + Vue.

Nació de Wellness on Demand (`wod_v2`), la primera app que implementó el manual;
los nombres de tokens y utilidades son los mismos que usa esa app.

## Instalar

Desde el repositorio (no se publica en npm):

```bash
npm i github:guido2d/gwl_ui#v0.2.0
# o, trabajando en local con el repo al lado:
npm i ../gwl_ui
```

En el CSS de entrada, después de Tailwind:

```css
@import 'tailwindcss';
@import '@gwl/ui/css/index.css';
```

Con Livewire + Flux, la capa de Flux va después del CSS de Flux:

```css
@import 'tailwindcss';
@import '../../vendor/livewire/flux/dist/flux.css';
@import '@gwl/ui/css/index.css';
@import '@gwl/ui/css/flux.css';
```

`index.css` trae `tokens`, `base`, `utilidades`, `movimiento` y `prosa`; cada
uno se puede importar suelto (`@gwl/ui/css/tokens.css`) si una app sólo quiere
la paleta.

### Fuentes

Lato (títulos, botones, antetítulos, cifras) y Montserrat (cuerpo). Con
`laravel-vite-plugin` 3.1+ se sirven desde el propio dominio:

```js
// vite.config.js
import { fuentesGwl } from '@gwl/ui/fonts';

laravel({ input: [...], fonts: fuentesGwl() })
```

y `@fonts` en el `<head>`. Sin el plugin, Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Montserrat:ital,wght@0,400;0,500;0,600;1,400&display=swap">
```

### Logos

En `@gwl/ui/brand/`: `gwl-logo.webp` (header, 600×244), `gwl-logo.png`
(3500×1424, impresión), `gwl-logo-white.png` (sobre azul o foto) y
`gwl-logo-email.png` (480×195, mails). Copialos a `public/` o importalos desde
el bundler. No hay versión SVG del logo corporativo.

## Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `brand` | `#155c8b` | Azul primario. Acción principal, enlaces, foco. 7:1 sobre el crudo. |
| `brand-strong` | `#0b314b` | Texto azul oscuro, texto sobre `brand-soft`/`brand-softer`. |
| `brand-soft` | `#c2e4f8` | Tinte celeste: fila seleccionada, chips de filtro, medallones. |
| `brand-softer` | `#ecf7fe` | Tinte celeste suave: hover de fila, ítem de nav actual. |
| `celeste` | `#36a7e0` | Secundario. **Sólo decorativo** (ilustración, íconos, resplandores). |
| `naranja` | `#f5871f` | CTA que no cambia con el cliente. Siempre con texto blanco bold. |
| `naranja-soft` | `#ffe8d4` | Fondo de aviso o de acción destructiva. |
| `naranja-ink` | `#9d4700` | Texto naranja sobre crudo o `naranja-soft`. |
| `green-50…950` | `#84be5c` en el 500 | Éxito. Íconos y texto de éxito: `green-600` o más oscuro. |
| `zinc-50…950` | crudo cálido | Neutros. `zinc-50` papel de fondo, `zinc-200` línea, `zinc-600` texto secundario, `zinc-900` texto. |
| `white` | `#fffdf8` | Superficie de tarjeta (crudo, no blanco puro). |
| `accent` | = `brand` | El nombre que usa Flux para el color de acción. |
| `radius-card` / `radius-hero` | 22 px / 28 px | Tarjetas / paneles grandes y modales de acceso. |
| `shadow-xs…lg` | tintadas | Sombras cálidas: `sm` tarjetas en reposo, `md` hover, `lg` panel flotante. |
| `ease-salida` / `ease-recorrido` | curvas | Todo lo que entra o responde / lo que se desplaza. Nunca `ease-in`. |
| `font-sans` / `font-display` | Montserrat / Lato | Cuerpo / títulos, botones, antetítulos, cifras. |

Proporción del manual: blanco 60 · azul 24 · celeste 9 · verde 4 · naranja 3.

### Color por cliente

`brand` y `accent` leen `var(--brand, #155c8b)`. Una app multi-empresa pone el
color de la empresa en `--brand` (por ejemplo en el `<html>`) y todo lo que usa
`brand` lo sigue. El naranja y los neutros no cambian: son de la plataforma.

```html
<html style="--brand: #7a1f5c">
```

### Reglas de contraste (las fija `tests/contraste.test.js`)

- Texto: `zinc-900`, `zinc-700`, `zinc-600` (secundario), `brand`, `brand-strong`,
  `naranja-ink`, `green-700`. Todos ≥ 4,5:1 sobre el crudo.
- `celeste`, `naranja` y `green-500` no llegan a 4,5:1: nunca como color de texto.
- Relleno `naranja` → texto `text-white font-bold`. Da 2,5:1 y es una decisión
  de marca (el azul oscuro encima se leía raro); el bold compensa.
- Placeholder de campos: `zinc-600`; valor: `zinc-900`.

## Escala tipográfica

Una clase por rol, con familia, tamaño, interlineado, peso y tracking. El color
va aparte: `<h1 class="titulo-pagina">` y `<p class="bajada text-zinc-600">`.

| Clase | Tamaño | Peso | Para |
| --- | --- | --- | --- |
| `titular` | 68 → 44 px, 1.02 | 900 | Titular de un panel de presentación. Uno por página. |
| `titulo-pagina` | 33 → 27 px, 1.12 | 900 | El h1 de una pantalla. |
| `titulo-seccion` | 24 / 32 px | 700 | Título de una pantalla de panel o de un bloque grande. |
| `titulo-tarjeta` | 16 / 24 px | 700 | Título de una sección, tarjeta o modal. |
| `bajada` | 18 px, 1.6 | 400 | Bajada debajo de un titular, en `zinc-600`. |
| `nota` | 17 px, 1.75 | 400 | Párrafo de lectura larga suelto. |
| `cuerpo` | 16 px, 1.6 | 400 | Texto corrido por defecto. |
| `cuerpo-sm` | 14 / 20 px | 400 | Texto de interfaz: descripciones, celdas, campos. |
| `etiqueta` | 14 px, 1.25 | 500 | Etiqueta de un campo, en `zinc-900`. |
| `leyenda` | 12 / 16 px | 600 | Chips, contadores y migas. |

Estas clases se emiten **antes** que las utilidades de Tailwind, así que
`text-lg`, `font-semibold` o `leading-tight` les ganan y sirven para ajustar un
caso puntual. La contra: un componente que imprime su propio tamaño también
gana. Con `<flux:heading>`, que imprime `text-2xl`, usá un `<h1>` propio con la
clase en vez del componente.

`titular` y `titulo-pagina` son fluidos (`clamp`): bajan solos en pantalla
angosta, sin breakpoints en la app. Los títulos llevan `text-wrap: balance`.

## Utilidades

| Clase | Qué hace |
| --- | --- |
| `antetitulo` | Overline: Lato Bold, mayúsculas, tracking 0.12em. Acompañar con `text-xs`/`text-[11px]`. |
| `cifra` | Estadísticas: Lato Black con números tabulares. |
| `presionable` | Escala a 0.97 al presionar. Todo botón o fila clickeable. |
| `tarjeta-interactiva` | Tarjeta que se levanta 3 px en hover (sólo con mouse) y hace zoom a su imagen. |
| `via-acceso` | Fila sin fondo cuya `.flecha` se corre al hacer hover. |
| `aparece`, `aparece-medallon` | Entrada al montarse. Retraso con `--retraso`. |
| `escalonado` | En el contenedor: cascada de 40 ms entre hijos (corta en el 8.º). |
| `aparece-resultado` | Fundido corto para resultados que se rearman con cada filtro. |
| `crece-barra` | Barra de progreso que se llena desde la izquierda. |
| `entra-globo`, `late-punto` | Globo de chat que entra y los tres puntos de "escribiendo". |
| `entra-barra` | Barra fija del pie que entra desde abajo. |
| `mascara-titulo` + `sube-titulo` | Título que sube detrás de su máscara (portadas). |
| `riel` | Carrusel horizontal con snap y sin barra. |
| `grano` | Textura de ruido para paneles con degradado. |
| `cuerpo-nota` | Tipografía de un artículo (reemplaza a `prose`). |
| `prosa-asistente` | Markdown dentro de una burbuja de chat. |

Todo respeta `prefers-reduced-motion`: las entradas quedan en un fundido y lo
que se desplaza se queda quieto.

## Componentes (recetas)

Son markup Tailwind; cada stack los envuelve en su propio componente. En
Livewire, los equivalentes con Flux viven en `wod_v2/resources/views/components/admin`.

**Botón principal** (azul, sigue al cliente)

```html
<button class="presionable inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 font-display text-sm font-bold text-white hover:brightness-110">Guardar cambios</button>
```

**CTA naranja** (grande, de marca)

```html
<a class="presionable inline-flex h-12 items-center gap-2.5 rounded-full bg-naranja px-5 font-display text-sm font-bold text-white shadow-md hover:brightness-110">Empezar</a>
```

**Botón fantasma**

```html
<button class="presionable inline-flex h-10 items-center rounded-lg px-4 font-display text-sm font-bold text-zinc-700 hover:bg-zinc-100">Cancelar</button>
```

**Campo**

```html
<label class="grid gap-2">
  <span class="text-sm font-medium leading-tight text-zinc-900">Correo</span>
  <input class="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-white" placeholder="nombre@empresa.com">
</label>
```

**Tarjeta**

```html
<section class="rounded-card border border-zinc-200 bg-white p-6 shadow-sm">…</section>
```

**Chip de filtro**

```html
<span class="inline-flex h-7 items-center gap-1.5 rounded-full bg-brand-soft px-3 text-xs font-semibold text-brand-strong">Publicado</span>
```

**Control segmentado / pestañas**

```html
<div class="inline-flex gap-0.5 rounded-lg bg-zinc-100 p-0.75">
  <button class="inline-flex h-8 items-center rounded-md bg-white px-3.25 text-sm font-semibold text-zinc-900 shadow-xs">Todos <span class="ms-1.5 rounded-full bg-zinc-100 px-1.75 text-[11.5px] tabular-nums text-zinc-600">24</span></button>
  <button class="inline-flex h-8 items-center rounded-md px-3.25 text-sm font-medium text-zinc-600 hover:text-zinc-900">Borradores</button>
</div>
```

**Estado vacío**: medallón `size-15 rounded-hero bg-brand-soft text-brand` con
un ícono, título Lato Bold y una línea que explique qué es y cómo empezar.

**Confirmar borrado**: ícono en `rounded-xl bg-naranja-soft text-naranja-ink`,
título, "Es una acción que no se puede deshacer." y botón rojo a la derecha.

**Tabla de listado**: dentro de una tarjeta (`overflow-hidden rounded-card
border bg-white shadow-sm`), encabezado en `bg-zinc-50` con tratamiento de
antetítulo en `zinc-500`, hover de fila `brand-softer`, fila seleccionada
`brand-soft`.

## Voz

- Español neutro con **tuteo** en todo lo que ve el usuario final ("Empieza
  cuando quieras"). Nunca "usted".
- Mayúscula sólo al inicio (títulos, botones, etiquetas). Mayúsculas completas
  sólo en el antetítulo.
- Pocos signos de exclamación. Un botón dice exactamente qué pasa ("Guardar
  cambios", "Sí, eliminar").
- Los errores dicen qué pasó y cómo seguir, sin disculpas.

## Qué no incluye (todavía)

- **Modo oscuro.** Ninguna app lo tiene con la paleta del manual.
- Componentes empaquetados para React o Vue: por ahora son recetas.
- Los colores de pilar de Wellness on Demand (Mente, Nutri…): son de esa app.

## Desarrollo

```bash
npm install
npm test   # compila con Tailwind y verifica tokens, utilidades y contrastes
```

Cambiar un color: editar `css/tokens.css`, correr `npm test`, subir la versión
en `package.json` y anotarla en `CHANGELOG.md`.

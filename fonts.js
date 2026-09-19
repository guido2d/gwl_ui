import { bunny } from 'laravel-vite-plugin/fonts';

/**
 * Las dos familias del manual de marca, servidas desde el propio dominio con
 * el plugin de fuentes de laravel-vite-plugin (v3.1+).
 *
 *   laravel({ input: [...], fonts: fuentesGwl() })
 *
 * y `@fonts` en el <head> de Blade (o `@vite` según la app).
 *
 * Lato lleva títulos, botones, antetítulos y cifras (400, 700 y 900: no tiene
 * medium ni semibold). Montserrat lleva el cuerpo. Montserrat va sin preload:
 * bunny la divide en cinco subsets (cirílico y vietnamita incluidos) y el
 * preload los bajaría todos; con el @font-face inline el navegador pide sólo
 * el que usa.
 *
 * @returns {Array<ReturnType<typeof bunny>>}
 */
export function fuentesGwl() {
    return [
        bunny('Lato', {
            weights: [400, 700, 900],
            preload: [{ weight: 700 }],
        }),
        bunny('Montserrat', {
            weights: [400, 500, 600],
            styles: ['normal', 'italic'],
            preload: false,
        }),
    ];
}

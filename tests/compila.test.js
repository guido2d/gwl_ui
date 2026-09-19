import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compile } from '@tailwindcss/node';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function compilar(css, candidatos) {
    const compilador = await compile(css, { base: raiz, onDependency: () => {} });

    return compilador.build(candidatos);
}

const entrada = `@import 'tailwindcss';\n@import './css/index.css';`;

test('los tokens del manual salen como variables con sus valores', async () => {
    const css = await compilar(entrada, ['bg-brand']);

    assert.match(css, /--color-brand: var\(--brand, #155c8b\)/);
    assert.match(css, /--color-naranja: #f5871f/);
    assert.match(css, /--color-green-500: #84be5c/);
    assert.match(css, /--color-zinc-50: #f7f2e9/);
    assert.match(css, /--color-white: #fffdf8/);
    assert.match(css, /--font-display: 'Lato'/);
    assert.match(css, /--font-sans: 'Montserrat'/);
});

test('cada familia de tokens genera sus utilidades', async () => {
    const candidatos = [
        'bg-brand', 'text-brand-strong', 'bg-brand-soft', 'bg-brand-softer', 'text-celeste',
        'bg-naranja', 'bg-naranja-soft', 'text-naranja-ink', 'bg-green-500', 'bg-zinc-50',
        'rounded-card', 'rounded-hero', 'shadow-md', 'ease-salida', 'ease-recorrido', 'font-display',
    ];
    const css = await compilar(entrada, candidatos);

    for (const candidato of candidatos) {
        assert.ok(css.includes(`.${candidato}`), `falta la utilidad ${candidato}`);
    }
});

test('las utilidades propias del sistema se generan', async () => {
    const candidatos = [
        'antetitulo', 'cifra', 'riel', 'grano', 'aparece', 'aparece-medallon', 'aparece-resultado',
        'escalonado', 'crece-barra', 'entra-globo', 'late-punto', 'tarjeta-interactiva', 'presionable',
        'via-acceso', 'entra-barra', 'mascara-titulo', 'sube-titulo', 'cuerpo-nota', 'prosa-asistente',
    ];
    const css = await compilar(entrada, candidatos);

    for (const candidato of candidatos) {
        assert.ok(css.includes(`.${candidato}`), `falta la utilidad ${candidato}`);
    }
});

test('el movimiento reducido apaga los desplazamientos', async () => {
    const css = await compilar(entrada, ['aparece']);

    assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(css, /animation-name: aparece-sin-movimiento/);
});

test('la capa de Flux compila sola', async () => {
    const css = await compilar(`@import 'tailwindcss';\n@import './css/index.css';\n@import './css/flux.css';`, []);

    assert.match(css, /\[data-flux-heading\]/);
    assert.match(css, /\.tabla-panel \[data-flux-column\]/);
    assert.match(css, /\.formulario-acceso input\[data-flux-control\]/);
    assert.match(css, /\[data-flux-field\]:not\(ui-radio, ui-checkbox\)/);
    assert.match(css, /\[data-flux-navbar-items\]\[data-current\]::after/);
});

test('ningún comentario queda abierto ni cerrado de más', () => {
    for (const archivo of ['tokens', 'base', 'utilidades', 'movimiento', 'prosa', 'flux']) {
        const css = readFileSync(path.join(raiz, 'css', `${archivo}.css`), 'utf8');
        const aperturas = css.split('/*').length - 1;
        const cierres = css.split('*/').length - 1;

        assert.equal(aperturas, cierres, `${archivo}.css tiene ${aperturas} /* y ${cierres} */`);
    }
});

test('el CSS base no trae la capa de Flux', async () => {
    const css = await compilar(entrada, []);

    assert.doesNotMatch(css, /data-flux/);
});

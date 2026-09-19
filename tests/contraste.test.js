import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const tokens = readFileSync(new URL('../css/tokens.css', import.meta.url), 'utf8');

function valor(nombre) {
    const coincidencia = tokens.match(new RegExp(`--color-${nombre}: (?:var\\(--brand, )?(#[0-9a-f]{6})`));
    assert.ok(coincidencia, `no encuentro --color-${nombre}`);

    return coincidencia[1];
}

function luminancia(hex) {
    const canales = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));

    return 0.2126 * canales[0] + 0.7152 * canales[1] + 0.0722 * canales[2];
}

function contraste(a, b) {
    const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);

    return (claro + 0.05) / (oscuro + 0.05);
}

// Pares de texto que el README autoriza. Si un token cambia y deja de llegar,
// hay que corregir la regla de uso antes que el número.
const paresDeTexto = [
    ['brand', 'white', 7],
    ['brand', 'zinc-50', 4.5],
    ['brand-strong', 'brand-softer', 4.5],
    ['brand-strong', 'brand-soft', 4.5],
    ['naranja-ink', 'white', 4.5],
    ['naranja-ink', 'naranja-soft', 4.5],
    ['zinc-900', 'white', 4.5],
    ['zinc-700', 'white', 4.5],
    ['zinc-600', 'white', 4.5],
    ['zinc-600', 'zinc-50', 4.5],
    ['green-700', 'white', 4.5],
    ['white', 'brand', 4.5],
    ['white', 'brand-strong', 4.5],
];

for (const [texto, fondo, minimo] of paresDeTexto) {
    test(`${texto} sobre ${fondo} llega a ${minimo}:1`, () => {
        const ratio = contraste(valor(texto), valor(fondo));

        assert.ok(ratio >= minimo, `${texto} sobre ${fondo} da ${ratio.toFixed(2)}:1`);
    });
}

// Los tres colores de acento no aguantan texto: si alguno pasara 4,5:1 la regla
// "sólo decorativo" dejaría de ser necesaria y habría que revisarla.
for (const acento of ['celeste', 'naranja', 'green-500']) {
    test(`${acento} queda por debajo de 4,5:1 sobre el crudo (sólo decorativo)`, () => {
        assert.ok(contraste(valor(acento), valor('white')) < 4.5);
    });
}

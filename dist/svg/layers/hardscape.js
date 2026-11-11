import { SeededRNG } from '../../engine/prng.js';
export function renderHardscape(width, height, state) {
    const rng = new SeededRNG(`${state.seed}:roots`);
    const roots = Array.from({ length: state.primaryRootsCount }, (_, i) => {
        const fromLeft = i % 2 === 0;
        const x0 = fromLeft ? rng.range(-20, 100) : rng.range(width - 100, width + 20);
        const y0 = rng.range(-24, 12);
        const x1 = width * 0.5 + rng.gaussian(0, width * 0.12);
        const y1 = height * rng.range(0.45, 0.8);
        const bend = fromLeft ? rng.range(30, 140) : -rng.range(30, 140);
        const thickness = (3 + state.hardscapeMaturity * 6 - i * 0.4).toFixed(2);
        return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${(x0 + bend).toFixed(1)} ${(height * 0.18).toFixed(1)} ${(x1 - bend * 0.3).toFixed(1)} ${(height * 0.35).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="#4b3423" stroke-width="${thickness}" fill="none" opacity="0.78" stroke-linecap="round"/>`;
    }).join('');
    return `<g id="hardscape">${roots}</g>`;
}
//# sourceMappingURL=hardscape.js.map
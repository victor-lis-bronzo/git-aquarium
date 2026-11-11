export class SeededRNG {
    state;
    constructor(seedStr) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < seedStr.length; i++) {
            h ^= seedStr.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        this.state = h >>> 0;
    }
    next() {
        let t = (this.state += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    range(min, max) {
        return min + this.next() * (max - min);
    }
    int(min, max) {
        return Math.floor(this.range(min, max + 1));
    }
    gaussian(mean = 0, stdDev = 1) {
        const u = (this.next() + this.next() + this.next() - 1.5) * 1.1547;
        return mean + u * stdDev;
    }
    noise1D(x) {
        const xi = Math.floor(x);
        const xf = x - xi;
        const u = xf * xf * (3 - 2 * xf);
        const h0 = this.hashInt(xi);
        const h1 = this.hashInt(xi + 1);
        return h0 + u * (h1 - h0);
    }
    hashInt(n) {
        let x = (n ^ this.state) >>> 0;
        x = ((x >>> 16) ^ x) * 0x45d9f3b;
        x = ((x >>> 16) ^ x) * 0x45d9f3b;
        x = (x >>> 16) ^ x;
        return (x >>> 0) / 4294967296;
    }
}
//# sourceMappingURL=prng.js.map
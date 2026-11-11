export declare class SeededRNG {
    private state;
    constructor(seedStr: string);
    next(): number;
    range(min: number, max: number): number;
    int(min: number, max: number): number;
    gaussian(mean?: number, stdDev?: number): number;
    noise1D(x: number): number;
    private hashInt;
}

import type { EcosystemState, FishEntity } from '../types.js';
export interface SchoolingInput {
    width: number;
    height: number;
    ecosystem: EcosystemState;
}
export declare function generateFishEntities({ width, height, ecosystem }: SchoolingInput): FishEntity[];

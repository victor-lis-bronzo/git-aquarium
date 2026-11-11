export interface AppConfig {
    username: string;
    token?: string;
    outputPath: string;
    width: number;
    height: number;
    seed: string;
    mockMode?: 'dormant' | 'moderate' | 'thriving';
}
export declare function parseConfig(argv?: string[], env?: NodeJS.ProcessEnv): AppConfig;

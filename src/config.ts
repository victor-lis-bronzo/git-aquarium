export interface AppConfig {
  username: string;
  token?: string;
  outputPath: string;
  width: number;
  height: number;
  seed: string;
  mockMode?: 'dormant' | 'moderate' | 'thriving';
}

interface ArgMap {
  [key: string]: string;
}

const parseArgs = (argv: string[]): ArgMap => {
  const args: ArgMap = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const value = argv[i + 1] && !argv[i + 1]!.startsWith('--') ? argv[++i]! : 'true';
    args[key] = value;
  }
  return args;
};

export function parseConfig(argv = process.argv.slice(2), env = process.env): AppConfig {
  const args = parseArgs(argv);
  const username = args.username || env.AQUARIUM_USERNAME || env.GITHUB_REPOSITORY_OWNER || '';
  const token = args.token || env.GITHUB_TOKEN;
  const outputPath = args.output || env.AQUARIUM_OUTPUT || 'aquarium.svg';
  const width = Number(args.width || env.AQUARIUM_WIDTH || '960');
  const height = Number(args.height || env.AQUARIUM_HEIGHT || '320');
  const seed = args.seed || `${username}:${new Date().toISOString().slice(0, 10)}`;
  const mockArg = args.mock || env.AQUARIUM_MOCK;

  if (!username) {
    throw new Error('Missing username. Provide --username or AQUARIUM_USERNAME.');
  }

  const mockMode = mockArg && ['dormant', 'moderate', 'thriving'].includes(mockArg)
    ? (mockArg as 'dormant' | 'moderate' | 'thriving')
    : undefined;

  return { username, token, outputPath, width, height, seed, mockMode };
}

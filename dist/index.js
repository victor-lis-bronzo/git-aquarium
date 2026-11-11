import { writeFile } from 'node:fs/promises';
import { parseConfig } from './config.js';
import { fetchGitHubMetrics } from './github/client.js';
import { MOCK_DATASETS } from './github/mock-data.js';
import { deriveEcosystemState } from './engine/ecosystem.js';
import { renderAquariumSvg } from './svg/renderer.js';
async function run() {
    const config = parseConfig();
    const metrics = config.mockMode
        ? MOCK_DATASETS[config.mockMode]
        : config.token
            ? await fetchGitHubMetrics(config.token, config.username)
            : (() => {
                throw new Error('Missing GitHub token. Provide GITHUB_TOKEN or use --mock for offline mode.');
            })();
    const ecosystem = deriveEcosystemState(metrics, config.seed);
    const svg = renderAquariumSvg({
        width: config.width,
        height: config.height,
        metrics,
        ecosystem
    });
    await writeFile(config.outputPath, svg, 'utf8');
    process.stdout.write(`Generated ${config.outputPath} for @${metrics.username} (${ecosystem.tier}/${ecosystem.vitality}).\n`);
}
run().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`git-aquarium failed: ${message}\n`);
    process.exitCode = 1;
});
//# sourceMappingURL=index.js.map
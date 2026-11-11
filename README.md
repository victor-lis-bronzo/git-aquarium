# git-aquarium

Dynamic Amazonian Blackwater Aquarium SVG generator & GitHub Action.

## Features

- Production-ready TypeScript (strict mode) with zero runtime dependencies.
- Builds `aquarium.svg` from GitHub GraphQL contribution signals.
- Separates long-term hardscape/flora from short-term fish vitality.
- Deterministic daily layout via seeded PRNG.

## Usage (CLI)

```bash
npm ci
npm run build
GITHUB_TOKEN=*** AQUARIUM_USERNAME=<user> npm run generate -- --output aquarium.svg
```

Offline demo mode:

```bash
npm run generate:mock:thriving
npm run generate:mock:dormant
```

## GitHub Action inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `github_token` | yes | - | GitHub token for GraphQL API |
| `username` | yes | - | Target GitHub username |
| `output` | no | `aquarium.svg` | Output file path |
| `mock` | no | - | Optional preset: `dormant`, `moderate`, `thriving` |

## Example previews

- Thriving: `assets/preview-thriving.svg`
- Dormant: `assets/preview-dormant.svg`


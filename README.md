<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/30bfefc6f64a5e4f84dc58397dffcf4b829176f4/members/orange-plumber.png" width="100" />
  <h1 align="center">Gather Pull Request Metadata</h1>
</p>

[![npm version][npm-status]][npm] [![GitHub Marketplace][market-status]][market] [![Lint Code Base][linter-status]][linter] [![Unit Tests][test-status]][test] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist]

[![codecov][codecov-status]][codecov] [![Mergify Status][mergify-status]][mergify]

<!-- Status links -->
[npm]: https://www.npmjs.com/package/gather-pull-request-metadata
[npm-status]: https://badgen.net/npm/v/gather-pull-request-metadata

[market]: https://github.com/marketplace/actions/gather-pull-request-metadata
[market-status]: https://img.shields.io/badge/Marketplace-Typescript%20Action-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=

[linter]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/lint.yml
[linter-status]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/lint.yml/badge.svg

[test]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/unit-tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/unit-tests.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/codeql-analysis.yml/badge.svg

[check-dist]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/check-dist.yml
[check-dist-status]: https://github.com/redhat-plumbers-in-action/gather-pull-request-metadata/actions/workflows/check-dist.yml/badge.svg

[codecov]: https://codecov.io/gh/redhat-plumbers-in-action/gather-pull-request-metadata
[codecov-status]: https://codecov.io/gh/redhat-plumbers-in-action/gather-pull-request-metadata/branch/main/graph/badge.svg

[mergify]: https://mergify.com
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/redhat-plumbers-in-action/gather-pull-request-metadata&style=flat

<!-- -->

## Usage

```yml
name: Gather Pull Request Metadata
on:
  pull_request:
    types: [ opened, reopened, synchronize ]

permissions:
  contents: read

jobs:
  gather-metadata:
    runs-on: ubuntu-latest

    permissions:
      # only required for workflows in private repositories
      actions: read
      contents: read

    steps:
      - name: Repository checkout
        uses: actions/checkout@v3

      - id: Metadata
        name: Gather Pull Request Metadata
        uses: redhat-plumbers-in-action/gather-pull-request-metadata@v1

      - name: Upload artifact with gathered metadata
        uses: actions/upload-artifact@v3
        with:
          name: Pull Request Metadata
          path: ${{ steps.Metadata.outputs.metadata-file }}
```

## Configuration options

Action currently accepts the following options:

```yml
# ...

- uses: redhat-plumbers-in-action/gather-pull-request-metadata@v1
  with:
    pr-number: <pr number>
    metadata-file-name: <file name>
    token: <PAT or GITHUB_TOKEN>

# ...
```

### pr-number

Number of Pull Request to gather metadata from.

* default value: `${{ github.event.number }}`
* requirements: `required`

### metadata-file-name

Name of file where Pull Request metadata will be saved.

* default value: `pr-metadata.json`
* requirements: `optional`

### token

Token used to access GitHub API. Read permissions are sufficient.

* default value: `${{ github.token }}`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Outputs

GitHub Action exposes following [outputs](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs).

### metadata

```json
{
  "number": 123,
  "url": "https://github.com/org/repo/pull/123",
  "labels": [
    {
      "id": 123456789,
      "name": "my-label",
      "description": "Description of my-label label."
    }
  ],
  "milestone": {
    "title": "next-release"
  },
  "commits": [
    {
      "sha": "dbb9ff194039a1e1567cb48e7261ee1a94d1b9f0",
      "url": "https://github.com/org/repo/commit/dbb9ff194039a1e1567cb48e7261ee1a94d1b9f0",
      "message": {
        "title": "test: add tests for commit functionality",
        "body": "test: add tests for commit functionality\n\n(cherry picked from commit f921f712da87c6a770de94138595a83c13d778b5)",
        "cherryPick": [
          {
            "sha": "f921f712da87c6a770de94138595a83c13d778b5",
          }
        ]
      }
    }
  ]
}
```

### metadata-file

Relative path to JSON file containing Pull Request metadata object.

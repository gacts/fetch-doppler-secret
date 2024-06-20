<p align="center">
  <img src="https://avatars.githubusercontent.com/u/34022344?s=200&v=4" alt="Logo" width="100" />
</p>

# Fetch the [doppler][doppler] secret

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

This GitHub action allows receiving the secrets from the [doppler.com][doppler]. Fetched secrets will be masked in the logs.

## Usage

```yaml
jobs:
  fetch-the-secret:
    runs-on: ubuntu-latest
    steps:
      - uses: gacts/fetch-doppler-secret@v1
        id: secret-value
        with:
          token: ${{ secrets.doppler-service-token }} # docs: <https://docs.doppler.com/docs/enclave-service-tokens>
          project: ${{ secrets.project-name }} # docs: <https://docs.doppler.com/docs/enclave-project-setup>
          config: ${{ secrets.config-name }} # docs: <https://docs.doppler.com/docs/enclave-root-configs>
          secret-name: %secret-name%

      - run: echo "${{ steps.secret-value.outputs.secret }}"

      - uses: gacts/fetch-doppler-secret@v1
        id: secret-file
        with:
          token: ${{ secrets.doppler-service-token }}
          project: ${{ secrets.project-name }}
          config: ${{ secrets.config-name }}
          secret-name: %secret-name%
          save-to-file: file_with_secret

      - run: cat ./file_with_secret
```

### Customizing

#### Inputs

The following inputs can be used as `step.with` keys:

| Name           |  Type  | Default | Required | Description                                                    |
|----------------|:------:|:-------:|:--------:|----------------------------------------------------------------|
| `token`        | string |         |   yes    | [Doppler service token][doppler-service-tokens]                |
| `project`      | string |         |   yes    | [Doppler project name][doppler-project-name]                   |
| `config`       | string |  `prd`  |    no    | [Doppler config][doppler-config] (also known as "environment") |
| `secret-name`  | string |         |   yes    | Secret name                                                    |
| `save-to-file` | string |         |    no    | Path to the file for storing the secret                        |

[doppler-service-tokens]:https://docs.doppler.com/docs/enclave-service-tokens
[doppler-project-name]:https://docs.doppler.com/docs/enclave-project-setup
[doppler-config]:https://docs.doppler.com/docs/enclave-root-configs

#### Outputs

| Name     | Type   | Description  |
|----------|--------|--------------|
| `secret` | String | Secret value |

## Releasing

To release a new version:

- Build the action distribution (`make build` or `npm run build`).
- Commit and push changes (including `dist` directory changes - this is important) to the `master|main` branch.
- Publish the new release using the repo releases page (the git tag should follow the `vX.Y.Z` format).

Major and minor git tags (`v1` and `v1.2` if you publish a `v1.2.Z` release) will be updated automatically.

> [!TIP]
> Use [Dependabot](https://bit.ly/45zwLL1) to keep this action updated in your repository.

## Support

[![Issues][badge_issues]][link_issues]
[![Pull Requests][badge_pulls]][link_pulls]

If you find any errors in the action, please [create an issue][link_create_issue] in this repository.

## License

This is open-source software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/actions/workflow/status/gacts/fetch-doppler-secret/test.yml?branch=master&maxAge=30
[badge_release_version]:https://img.shields.io/github/release/gacts/fetch-doppler-secret.svg?maxAge=30
[badge_license]:https://img.shields.io/github/license/gacts/fetch-doppler-secret.svg?longCache=true
[badge_release_date]:https://img.shields.io/github/release-date/gacts/fetch-doppler-secret.svg?maxAge=180
[badge_commits_since_release]:https://img.shields.io/github/commits-since/gacts/fetch-doppler-secret/latest.svg?maxAge=45
[badge_issues]:https://img.shields.io/github/issues/gacts/fetch-doppler-secret.svg?maxAge=45
[badge_pulls]:https://img.shields.io/github/issues-pr/gacts/fetch-doppler-secret.svg?maxAge=45

[link_build]:https://github.com/gacts/fetch-doppler-secret/actions
[link_license]:https://github.com/gacts/fetch-doppler-secret/blob/master/LICENSE
[link_issues]:https://github.com/gacts/fetch-doppler-secret/issues
[link_create_issue]:https://github.com/gacts/fetch-doppler-secret/issues/new
[link_pulls]:https://github.com/gacts/fetch-doppler-secret/pulls

[doppler]:https://doppler.com/

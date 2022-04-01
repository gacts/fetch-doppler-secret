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
    runs-on: ubuntu-20.04
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

Following inputs can be used as `step.with` keys:

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

New versions releasing scenario:

- Make required changes in the [changelog](CHANGELOG.md) file
- Build the action distribution (`make build` or `yarn build`)
- Commit and push changes (including `dist` directory changes - this is important) into the `master` branch
- Publish new release using repo releases page (git tag should follow `vX.Y.Z` format)

Major and minor git tags (`v1` and `v1.2` if you publish `v1.2.Z` release) will be updated automatically.

## Support

[![Issues][badge_issues]][link_issues]
[![Issues][badge_pulls]][link_pulls]

If you will find any package errors, please, [make an issue][link_create_issue] in the current repository.

## License

This is open-sourced software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/workflow/status/gacts/fetch-doppler-secret/tests?maxAge=30
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

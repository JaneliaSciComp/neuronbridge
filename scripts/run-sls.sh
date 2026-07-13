#!/usr/bin/env bash
#
# Wrapper around the Serverless Framework CLI.
#
# Serverless 3.x bundles the legacy AWS SDK v2, which cannot read profiles that
# use the modern `sso_session` config format (produced by `aws sso login` with
# AWS IAM Identity Center). The AWS CLI understands those profiles, so when an
# AWS_PROFILE is set we ask the CLI to export temporary static credentials into
# the environment (which the old SDK *can* read) and then unset AWS_PROFILE so
# Serverless uses those credentials instead of trying to resolve the profile.
#
# When AWS_PROFILE is not set (e.g. static credentials already in the env or in
# ~/.aws/credentials), this is a no-op and sls runs as before.

set -euo pipefail

if [ -n "${AWS_PROFILE:-}" ]; then
  exportedCredentials="$(aws configure export-credentials --profile "$AWS_PROFILE" --format env 2>/dev/null || true)"
  if [ -z "$exportedCredentials" ]; then
    echo "run-sls: could not export credentials for AWS_PROFILE=$AWS_PROFILE." >&2
    echo "run-sls: your SSO session may have expired. Try: aws sso login --profile $AWS_PROFILE" >&2
    exit 1
  fi
  eval "$exportedCredentials"
  unset AWS_PROFILE
fi

exec npx sls "$@"

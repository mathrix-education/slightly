#!/usr/bin/env bash
__dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

root=$(dirname "$(dirname "$__dirname")")
dist="$root/dist/types"

version=$1

if [[ -z $version ]]; then
  echo "Error: no version set."
  echo "Usage: $ build.sh [VERSION]"
  exit 1
fi

rm -rf "$dist"
tsc -p "$root/src/types/tsconfig.json" --emitDeclarationOnly
jq ".version=\"$version\"" "$root/src/types/package.json" > "$dist/package.json"

# shellcheck disable=SC2086
cat $dist/*.d.ts | sed '/^import/d' > "$dist/index.d.ts.tmp"
echo "export {}" >> index.d.ts.tmp
# shellcheck disable=SC2086
rm $dist/*.d.ts
mv "$dist/index.d.ts.tmp" "$dist/index.d.ts"

cp "$root/LICENSE.md" "$dist/LICENSE.md"
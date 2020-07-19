#!/usr/bin/env bash
__dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
root=$(dirname "$(dirname "$__dirname")")
cd "$root" || exit 1

version=$1

if [[ -z $version ]]; then
  echo "Error: no version set."
  echo "Usage: $ build.sh [VERSION]"
  exit 1
fi

rm -rf dist/types
tsc -p tsconfig.types.json --emitDeclarationOnly
jq ".version = \"$version\"" "$root/package.types.json" > "$root/dist/types/package.json"

cd dist/types || exit 1
cat ./*.d.ts | sed '/^import/d' > index.d.ts.tmp
echo "export {}" >> index.d.ts.tmp
rm ./*.d.ts
mv index.d.ts.tmp index.d.ts
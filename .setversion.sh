#!/bin/bash
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <version>"
  exit 1
fi

version="$1"

sed -i '' "s/^\([[:space:]]*version:\).*/\1 $version/" .oml/oml.yml
sed -i '' "s#https://img.shields.io/badge/Release-v[0-9.]*-blue#https://img.shields.io/badge/Release-v$version-blue#" README.md

#!/usr/bin/env bash
set -e

RDF_FILE="../rdf/output.trig"
ENDPOINT="http://localhost:9999/blazegraph/namespace/kb/sparql"

curl -X POST \
  -H "Content-Type: application/x-trig" \
  --data-binary @"$RDF_FILE" \
  "$ENDPOINT"

echo "Uploaded $RDF_FILE to Blazegraph."
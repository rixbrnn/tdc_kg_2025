#!/usr/bin/env bash
set -e

RDF_FILE="../rdf/chinook.trig"
ENDPOINT="http://localhost:8889/bigdata/sparql"

curl -X POST \
  -H "Content-Type: text/turtle" \
  --data-binary @"$RDF_FILE" \
  "$ENDPOINT"

echo "Uploaded $RDF_FILE to Blazegraph."
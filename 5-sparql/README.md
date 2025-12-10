# Step 5 — SPARQL Queries

Each SQL call has an equivalent call inside the SPARQL folder.
This is meant to be used to learn a bit more about how SPARQL works.

## 📚 Getting Started with SPARQL

**New to SPARQL?** Start with `sparql/00-intro-basics.sparql` which contains simple introductory queries:
- SELECT ALL - Get a sample of all triples in the graph
- Count entities by type
- Query basic properties of specific subjects
- Simple filtering and pattern matching
- Aggregations (COUNT, GROUP BY)
- OPTIONAL patterns for missing data
- Schema discovery queries

This introductory file will help you understand SPARQL fundamentals before exploring the more complex SQL-to-SPARQL comparison queries.

## 🚀 How to Run

### SQL Queries (DBeaver)

1. Open DBeaver with the Chinook database connected
2. Open any `.sql` file from the `sql/` directory
3. Execute the query to see results

### SPARQL Queries (Blazegraph)

1. Open Blazegraph UI: http://localhost:8889/bigdata/#query
2. Open any `.sparql` file from the `sparql/` directory
3. Copy the query into the Blazegraph query editor
4. Click "Execute" to see results

Compare the queries side-by-side to see the differences between SQL and SPARQL approaches!

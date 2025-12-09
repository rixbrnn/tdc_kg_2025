1- Expandir a partir de um pedaco de informacao eh mais facil/intuitivo.

2- Tu nao precisa ter total conhecimento do schema do banco de dados relacional, nem foreign keys para fazer as consultas.

3- **Performance Benefits**: Some queries might perform better depending on the use case.

## High-Level Comparison

- **SQL**: Good for querying structured data in tables (relational model)
- **SPARQL**: Good for querying graph data modeled as triples (subject-predicate-object)

## Performance Comparison

### Where SQL is typically faster:
- Large relational datasets (millions of rows, relational joins)
- Index-optimized filters (WHERE, GROUP BY, ORDER BY)
- Tabular aggregations (reporting queries)

SQL engines have decades of optimization + cost-based optimizers.  
**In general**: SQL is faster for highly structured, predictable data.

### Where SPARQL is typically faster:
- **Deep graph traversal**  
  Example: "find all items connected through 6+ relationship hops"
- **Schema-flexible queries**  
  RDF stores don't need predefined table schemas

Semantic inference: Some SPARQL engines use reasoning: infer new triples from ontology rules.  
**In general**: SPARQL excels in flexibility, data integration, and unpredictable, schema-less graph queries.

## Concrete Examples — Same Query in SQL and SPARQL

### Use Case 1: Find all movies directed by "Christopher Nolan"

**SQL:**
```sql
SELECT m.title
FROM movie m
JOIN director d ON m.director_id = d.id
WHERE d.name = 'Christopher Nolan';
```

**SPARQL:**
```sparql
PREFIX ex: <http://example.com/>

SELECT ?title WHERE {
  ?movie ex:directedBy ex:ChristopherNolan .
  ?movie ex:title ?title .
}
```

**Performance**: 
- SQL faster because it's a straightforward join over indexed fields. 
- SPARQL slower because each triple is a row in a huge "triples table".

### Use Case 2: Find people connected through any number of friendships (recursive)

**SQL (Postgres recursive CTE):**
```sql
WITH RECURSIVE network AS (
  SELECT person_id, friend_id
  FROM friends
  WHERE person_id = 42
  UNION
  SELECT f.person_id, f.friend_id
  FROM friends f
  JOIN network n ON f.person_id = n.friend_id
)
SELECT friend_id FROM network;
```

**SPARQL:**
```sparql
PREFIX ex: <http://example.com/>

SELECT ?friend WHERE {
  ex:Person42 (ex:friendOf)+ ?friend .
}
```

**Performance**: 
- SPARQL clearly faster because graph stores optimize path traversal. 
- SQL recursive CTEs can degrade exponentially depending on depth.
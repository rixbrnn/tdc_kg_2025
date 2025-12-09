# Presentation Queries: SQL vs SPARQL Comparison

This directory contains side-by-side query comparisons demonstrating the differences between SQL (relational) and SPARQL (graph) approaches to querying the Chinook music database.

## 🎯 Purpose

These queries are designed for the presentation **"From SQL to Sparkle: Generating Insights with Old Data"** and showcase when SQL works well vs. when knowledge graphs excel.

## 📁 Directory Structure

```
presentation-queries/
├── sql/                    # SQL queries for MySQL
├── sparql/                 # SPARQL queries for Blazegraph
├── comparison/             # Side-by-side analysis & performance tests
├── visualization/          # Graph visualization queries
└── README.md              # This file
```

## 🔑 Key Comparisons

### Query 1: Simple Join (Artist Revenue)
- **SQL**: 12 lines, 5 explicit JOINs
- **SPARQL**: 15 lines, property paths
- **Winner**: Tie - Both handle this well
- **Files**: `sql/01-simple-join.sql`, `sparql/01-simple-join.sparql`

### Query 2: Hierarchy Revenue ⭐⭐⭐ KILLER EXAMPLE
- **SQL**: 50+ lines, recursive CTE, 3 separate CTEs
- **SPARQL**: 25 lines, ONE LINE for hierarchy (`?rep :reportsTo* ?manager`)
- **Winner**: SPARQL dominates
- **Files**: `sql/02-hierarchy-revenue.sql`, `sparql/02-hierarchy-revenue.sparql`
- **Impact**: This is your STRONGEST comparison!

### Query 3: Genre Co-occurrence
- **SQL**: 35+ lines, self-joins, CTE required
- **SPARQL**: 20 lines, natural pattern matching
- **Winner**: SPARQL - much clearer business logic
- **Files**: `sql/03-genre-cooccurrence.sql`, `sparql/03-genre-cooccurrence.sparql`

### Query 4: Artist Recommendations ⭐⭐⭐ WOW FACTOR
- **SQL**: 60+ lines, 3 CTEs, repeated joins
- **SPARQL**: 25 lines, unified query, natural traversal
- **Winner**: SPARQL - this is how Netflix/Amazon work!
- **Files**: `sql/04-artist-recommendations.sql`, `sparql/04-artist-recommendations.sparql`
- **Impact**: Great for showing real-world recommendation systems

### Query 5: Top Tracks by Artist
- **SQL**: 30 lines, window functions (cleaner)
- **SPARQL**: 40 lines, subqueries (more verbose)
- **Winner**: SQL - window functions are elegant
- **Files**: `sql/05-top-tracks-by-artist.sql`, `sparql/05-top-tracks-by-artist.sparql`
- **Note**: Showing SQL's strengths builds credibility!

### Query 6: Schema Discovery ⭐⭐⭐ SPARQL-ONLY
- **SQL**: IMPOSSIBLE (would need information_schema hacks)
- **SPARQL**: ONE LINE (`?entity ?property ?value`)
- **Winner**: SPARQL - SQL can't do this at all!
- **Files**: `sparql/06-schema-discovery.sparql` (no SQL equivalent)
- **Impact**: The ultimate "drop the mic" moment

## 🎬 Suggested Presentation Flow

### Act 1: The Setup (5 min)
1. Show Query 1 - "SQL works fine for simple things"
2. Set expectations: "Both tools have their place"

### Act 2: The Turning Point (10 min)
3. Show Query 2 (Hierarchy) - "But then things get complex..."
   - Show SQL: 50 lines of recursive CTEs
   - Show SPARQL: One line with `*` operator
   - **Pause for impact**: "That's ONE LINE replacing FIFTY"

### Act 3: The Revelation (10 min)
4. Show Query 3 (Co-occurrence) - "Pattern matching is natural"
5. Show Query 4 (Recommendations) - "This is how real systems work"
   - Mention Netflix, Amazon, Spotify
   - "They use graph databases for this reason"

### Act 4: The Balance (5 min)
6. Show Query 5 (Ranking) - "SQL isn't bad at everything"
   - Show SQL window functions
   - "Use the right tool for the job"

### Act 5: The Closer (5 min)
7. Show Query 6 (Schema Discovery) - "The final magic trick"
   - "Try doing this in SQL!" (audience challenge)
   - Explain self-describing graphs
   - Applications: data integration, API discovery, dynamic UIs

## 📊 Complexity Ratings

| Query | SQL Complexity | SPARQL Complexity | Winner |
|-------|----------------|-------------------|--------|
| 1. Simple Join | ⭐ (1/5) | ⭐ (1/5) | Tie |
| 2. Hierarchy | ⭐⭐⭐⭐⭐ (5/5) | ⭐ (1/5) | **SPARQL** |
| 3. Co-occurrence | ⭐⭐⭐⭐ (4/5) | ⭐⭐ (2/5) | **SPARQL** |
| 4. Recommendations | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐ (2/5) | **SPARQL** |
| 5. Ranking | ⭐⭐⭐ (3/5) | ⭐⭐⭐ (3/5) | **SQL** |
| 6. Schema Discovery | ∞ (Impossible) | ⭐ (1/5) | **SPARQL** |

## 🚀 Running the Queries

### Prerequisites
1. MySQL running with Chinook database (port 3306)
2. Blazegraph running with RDF data loaded (port 9999)

### Running SQL Queries
```bash
# Individual query
mysql -u root -p chinook < presentation-queries/sql/01-simple-join.sql

# All queries
for f in presentation-queries/sql/*.sql; do
  echo "Running $f..."
  mysql -u root -p chinook < "$f"
done
```

### Running SPARQL Queries
```bash
# Via curl
curl -X POST \
  -H "Content-Type: application/sparql-query" \
  --data-binary @presentation-queries/sparql/01-simple-join.sparql \
  http://localhost:9999/blazegraph/namespace/kb/sparql

# Or use Blazegraph UI
open http://localhost:9999/blazegraph/#query
```

## 📈 Performance Expectations

### Simple Join (Query 1)
- **SQL**: ~50ms (optimized for joins)
- **SPARQL**: ~100ms (acceptable trade-off)
- **Verdict**: SQL faster, but both acceptable

### Hierarchy (Query 2)
- **SQL**: ~150ms (recursive CTE overhead)
- **SPARQL**: ~80ms (graph-optimized traversal)
- **Verdict**: SPARQL faster AND simpler!

### Recommendations (Query 4)
- **SQL**: ~300ms (multiple CTEs, repeated joins)
- **SPARQL**: ~120ms (native graph traversal)
- **Verdict**: SPARQL significantly faster

### Ranking (Query 5)
- **SQL**: ~100ms (window functions optimized)
- **SPARQL**: ~150ms (subquery overhead)
- **Verdict**: SQL faster here

## 💡 Key Takeaways for Presentation

### When to Use SQL
✅ Fixed schema, well-defined queries
✅ Transactional integrity critical (banking)
✅ Simple relationships (1-2 joins)
✅ Tabular reporting
✅ Window functions for ranking

### When to Use Knowledge Graphs
✅ Complex, multi-hop relationships (social networks)
✅ Schema evolves frequently
✅ Data integration from multiple sources
✅ Semantic reasoning needed
✅ Recommendation systems
✅ Exploratory queries ("show me connections")
✅ Hierarchical data (org charts, taxonomies)

### The Polyglot Persistence Approach
**Best Practice**: Use BOTH!
- SQL for operational data (transactions, orders)
- Knowledge Graphs for analytical data (recommendations, insights)
- Tools like Ontop enable virtual knowledge graphs over SQL

## 🎯 Audience Challenge Questions

### Question 1 (After Query 2)
"How would you modify the SQL query to find employees 3+ levels deep?"
- **Answer**: Add more UNION clauses (painful!)
- **SPARQL**: Already handles ANY depth with `*`

### Question 2 (After Query 4)
"How would you extend this to 'customers who bought X OR Y'?"
- **SQL Answer**: Another CTE, more joins (complex!)
- **SPARQL Answer**: Add one more pattern (trivial!)

### Question 3 (After Query 6)
"Can you write SQL to discover all properties of a row dynamically?"
- **Answer**: Not really! Would need information_schema hacks
- **SPARQL**: It's the default behavior!

## 📚 Additional Resources

### Real-World Examples
- **Google**: Knowledge Graph for search results
- **LinkedIn**: "People You May Know" recommendations
- **Amazon**: Product recommendation engine
- **NASA**: Mission data integration
- **Pharma**: Drug discovery networks

### Further Learning
- W3C SPARQL Specification: https://www.w3.org/TR/sparql11-query/
- RDF Primer: https://www.w3.org/TR/rdf11-primer/
- Neo4j vs RDF comparison: https://neo4j.com/blog/rdf-triple-store-vs-labeled-property-graph-difference/

## 🎤 Presentation Tips

1. **Start with empathy**: "SQL is great, we all use it"
2. **Build tension**: Show increasingly complex SQL
3. **Deliver payoff**: Show SPARQL elegance
4. **Stay balanced**: Acknowledge SQL's strengths (Query 5)
5. **End with vision**: Polyglot persistence is the future

## 📝 Customization

To adapt these queries for your specific presentation:

1. **Change the target artist** in Query 4:
   - Edit line: `?targetArtist :name "Iron Maiden"`
   - Try: "Metallica", "Led Zeppelin", "AC/DC"

2. **Adjust result limits**:
   - All queries use `LIMIT 10` or `LIMIT 15`
   - Increase for more comprehensive results

3. **Add timing measurements**:
   - See `comparison/performance-test.sh` for automated timing

## 🏆 The Three Star Queries

If you only have time for 3 comparisons, choose these:

1. **Query 2 (Hierarchy)** ⭐⭐⭐ - The killer blow
2. **Query 4 (Recommendations)** ⭐⭐⭐ - Real-world relevance
3. **Query 6 (Schema Discovery)** ⭐⭐⭐ - The impossible made trivial

These three alone will convince your audience!

---

**Happy presenting!** 🎉

For questions or improvements, see the main repository README.md

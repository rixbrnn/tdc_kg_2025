# Knowledge Graphs Workshop - Presentation Script (1 Hour)

**Workshop Title:** From Relational Databases to Knowledge Graphs: A Hands-On Journey

**Duration:** 60 minutes

**Goal:** Transform participants' understanding from traditional SQL databases to semantic Knowledge Graphs using a practical, hands-on approach.

---

## 🎯 Pre-Workshop (Before Session Starts)

**[5 minutes before start]**

### Setup Verification

**SAY:**
> "Welcome everyone! Before we begin, let's make sure you're ready. Please check that you have:"
> 
> 1. Docker running (open Docker Desktop)
> 2. MySQL Workbench or DBeaver installed
> 3. A web browser open
> 4. This repository cloned: `git clone <repo_url>`

**DO:**
- Share screen with prerequisites checklist
- Ask participants to type "✓" in chat when ready
- Have TAs help those with issues

---

## 🚀 Part 1: Introduction & Context (0:00 - 0:05) — 5 minutes

### Opening Hook

**SAY:**
> "Imagine you're working at a music streaming company. Your boss asks: 'Which artists have the most influence on our sales?' 
> 
> In a traditional SQL database, this question requires joining 5+ tables, writing complex nested queries, and probably a lot of coffee.
>
> Today, I'll show you a different way: **Knowledge Graphs**. The same question becomes elegant, intuitive, and actually fun to answer."

### What We'll Build Today

**SHOW SLIDE:** Architecture diagram
```
SQL Database → Ontology → RDF Triples → SPARQL Queries
   (Chinook)   (Protégé)  (Blazegraph)   (Visual results)
```

**SAY:**
> "We'll take a music store database, transform it into a knowledge graph, and query it using SPARQL. You'll see firsthand when SQL shines and when graphs are better."

**KEY LEARNING OUTCOMES:**
- ✅ Understand limitations of relational databases
- ✅ Create a simple ontology
- ✅ Convert relational data to RDF
- ✅ Query with SPARQL
- ✅ Visualize graph connections

---

## 📊 Part 2: The SQL Baseline (0:05 - 0:15) — 10 minutes

### Start the Database

**DO:**
```bash
cd 0-dbsetup
docker-compose up -d
```

**SAY:**
> "Let's start with familiar territory: SQL. We're using the Chinook database - it models a digital music store with customers, invoices, tracks, albums, artists, and employees."

### Demo: Simple SQL Query

**SHOW:** DBeaver/MySQL Workbench

**RUN:** `1-sql/sqlutions/question-1-solution.sql`

**SAY:**
> "Question 1: For each top-level manager, count total customers in their team hierarchy."
> 
> *[Run the query, show results]*
> 
> "This requires recursive CTEs because we have a management hierarchy. It works, but look at this complexity..."
> 
> *[Scroll through query]*

### The Pain Point

**SAY:**
> "Now let's try something harder. Question 2: Which genres share the most customers?"
>
> *[Open question-2-todo.sql]*
>
> "You need to:
> 1. Join Customer → Invoice → InvoiceLine → Track → Genre
> 2. Self-join genres by customer
> 3. Count overlaps
> 4. Filter and rank
>
> This is painful. And brittle - one schema change breaks everything."

**SHOW:** The complex TODO file

**SAY:**
> "I've left this as an exercise, but honestly? This is where SQL starts to hurt. Let me show you a better way..."

---

## 🧠 Part 3: Introduction to Knowledge Graphs (0:15 - 0:20) — 5 minutes

### What is a Knowledge Graph?

**SHOW SLIDE:** Triple structure
```
Subject → Predicate → Object
Track_123 → hasGenre → Genre_Rock
Track_123 → onAlbum → Album_456
Album_456 → byArtist → Artist_789
```

**SAY:**
> "Instead of tables and foreign keys, knowledge graphs use **triples**: subject-predicate-object.
>
> - **Subject**: A resource (like Track_123)
> - **Predicate**: A relationship (like 'hasGenre')
> - **Object**: Another resource or value
>
> The magic? These triples form a **graph**. You can traverse relationships naturally, without complex JOINs."

### Why Use Knowledge Graphs?

**SAY:**
> "Knowledge graphs excel at:
> - **Multi-hop relationships** (friend-of-friend, influence chains)
> - **Flexible schemas** (add new properties without ALTER TABLE)
> - **Semantic reasoning** (infer new facts from existing data)
> - **Integration** (merge data from multiple sources easily)
>
> Think: Google's search results, LinkedIn's 'People You May Know', Amazon's recommendations."

---

## 🏗️ Part 4: Building the Ontology (0:20 - 0:30) — 10 minutes

### What is an Ontology?

**SAY:**
> "An ontology is like a schema for your graph. It defines:
> - **Classes** (Customer, Track, Artist)
> - **Properties** (hasGenre, purchasedBy)
> - **Constraints** (domain, range, cardinality)
>
> Think of it as 'the vocabulary' of your knowledge graph."

### Generate the Ontology

**DO:**
```bash
cd 2-ontology
python generate_ontology.py
```

**SAY:**
> "Instead of manually creating the ontology, we can generate it automatically from our database schema. This script introspects MySQL and creates OWL classes and properties."

**SHOW:** The generated `chinook-generated.ttl` file

**EXPLAIN:**
```turtle
:Track a owl:Class ;
    rdfs:label "Track" .

:hasGenre a owl:ObjectProperty ;
    rdfs:domain :Track ;
    rdfs:range :Genre .

:trackName a owl:DatatypeProperty ;
    rdfs:domain :Track ;
    rdfs:range xsd:string .
```

**SAY:**
> "- `Track` is a **Class** (like a table)
> - `hasGenre` is an **Object Property** (links to another resource)
> - `trackName` is a **Datatype Property** (stores literal values)
>
> Notice: We explicitly define that `hasGenre` connects a `Track` to a `Genre`. This semantic richness is what makes knowledge graphs powerful."

### Quick Exercise (Optional if time)

**SAY:**
> "If you want, open `chinook-todo.ttl` and add the employee hierarchy properties:
> - `:reportsTo` (Employee → Employee)
> - `:manages` (inverse of reportsTo)
>
> This shows how you can extend ontologies manually when needed."

**SHOW:** The TODO comment in the file

---

## 🔄 Part 5: Converting Data to RDF (0:30 - 0:40) — 10 minutes

### Understanding the Conversion Process

**SAY:**
> "Now we convert our MySQL data into RDF triples. We'll use a Node.js script that:
> 1. Connects to MySQL
> 2. Reads each table
> 3. Generates triples following our ontology
> 4. Outputs TriG format (RDF with named graphs)"

### Run the Converter

**DO:**
```bash
cd 3-converter
npm install
npm run export
```

**SAY:**
> "This reads all our tables and creates RDF triples. Let's look at the output..."

**SHOW:** `rdf/chinook.trig` file

**EXPLAIN:**
```turtle
<http://example.org/chinook#Track/1> a :Track ;
    :trackName "For Those About To Rock (We Salute You)" ;
    :hasAlbum <http://example.org/chinook#Album/1> ;
    :hasGenre <http://example.org/chinook#Genre/1> ;
    :milliseconds 343719 ;
    :unitPrice 0.99 .
```

**SAY:**
> "See how each row becomes a resource with a URI? And foreign keys become **direct relationships**. No more JOIN tables - just follow the links!"

### The Magic of URIs

**SAY:**
> "Every entity gets a unique URI:
> - `http://example.org/chinook#Track/1`
> - `http://example.org/chinook#Artist/42`
>
> This means you can **link across datasets**. If Spotify had a knowledge graph, we could link our Track_1 to their track using `owl:sameAs`. Instant integration!"

---

## 📥 Part 6: Loading into Blazegraph (0:40 - 0:45) — 5 minutes

### What is Blazegraph?

**SAY:**
> "Blazegraph is a triplestore - a database optimized for RDF. It provides:
> - Storage for billions of triples
> - A SPARQL query endpoint
> - A web UI for exploration
>
> Think of it as 'PostgreSQL for graphs'."

### Start and Load

**DO:**
```bash
cd 4-blazegraph
docker-compose up -d

# Wait a few seconds, then:
bash load_rdf.sh
```

**SAY:**
> "We're starting Blazegraph in Docker and uploading our RDF data. This should take a few seconds..."

**SHOW:** Terminal output showing successful upload
```
<?xml version="1.0"?><data modified="32701" milliseconds="2162"/>
```

**SAY:**
> "Success! 32,701 triples loaded. Now let's query them!"

### Open the UI

**DO:** Navigate to `http://localhost:8889/bigdata/sparql`

**SAY:**
> "This is Blazegraph's query interface. Let's write our first SPARQL query..."

---

## 🔍 Part 7: Querying with SPARQL (0:45 - 0:55) — 10 minutes

### SPARQL Basics

**SAY:**
> "SPARQL is to RDF what SQL is to tables. But instead of JOIN syntax, you describe **graph patterns**."

**SHOW SLIDE:** SPARQL vs SQL comparison

```sparql
# SPARQL: Pattern matching
SELECT ?trackName ?genreName
WHERE {
  ?track :trackName ?trackName ;
         :hasGenre ?genre .
  ?genre :name ?genreName .
}
```

```sql
-- SQL: Explicit joins
SELECT t.Name, g.Name
FROM Track t
JOIN Genre g ON t.GenreId = g.GenreId
```

**SAY:**
> "SPARQL reads like: 'Find me things where a track has a trackName AND has a genre AND that genre has a name.' Natural language, not procedural joins."

### Live Demo: Question 1

**OPEN:** `5-sparql/sparqlutions/question-1-solution.sparql`

**RUN:** The query in Blazegraph

**SAY:**
> "Remember our manager hierarchy question? Here it is in SPARQL..."

**SHOW:** Results table

**SAY:**
> "Same answer as SQL, but look at the query structure. We're using **property paths** (`reportsTo+`) to traverse the hierarchy. Much cleaner than recursive CTEs!"

### Advanced Query: Genre Overlap (Question 2)

**SAY:**
> "Now the hard one: which genres share the most customers?"

**SHOW:** The SPARQL query structure

```sparql
SELECT ?genre1 ?genre2 (COUNT(DISTINCT ?customer) as ?sharedCustomers)
WHERE {
  ?customer :hasInvoice/:hasLine/:lineTrack/:hasGenre ?genre1 .
  ?customer :hasInvoice/:hasLine/:lineTrack/:hasGenre ?genre2 .
  FILTER(?genre1 != ?genre2)
}
GROUP BY ?genre1 ?genre2
ORDER BY DESC(?sharedCustomers)
```

**SAY:**
> "Look how simple this is compared to SQL:
> - Property paths (`:hasInvoice/:hasLine/:lineTrack/:hasGenre`) replace 4 JOINs
> - Patterns naturally express 'customers who bought both genres'
> - No subqueries, no CTEs, just graph traversal
>
> This is the power of thinking in graphs!"

### Exercise Time

**SAY:**
> "Now it's your turn. Open `5-sparql/question-3-todo.sparql`. The question is:
> 
> **'For each artist, show their top 3 selling tracks.'**
>
> You have 5 minutes. Hints:
> - Start with artist → album → track
> - Sum quantities from invoice lines
> - Use `GROUP BY` and `ORDER BY`
> - `LIMIT` per artist (tricky - you might need subqueries)
>
> Solutions are in the `sparqlutions/` folder if you get stuck!"

**DO:** Give participants 5 minutes to work

---

## 🎨 Part 8: Visualization (0:55 - 0:58) — 3 minutes

### Show the Graph Visually

**SAY:**
> "Numbers are great, but graphs are visual. Let's see our knowledge graph..."

**DO:** 
- Either use Blazegraph's built-in graph view, OR
- Open a simple visualization tool

**SHOW:** 
- Artist → Album → Track → Genre connections
- Customer purchase patterns
- Employee hierarchy tree

**SAY:**
> "See how natural this looks? Each node is an entity, each edge is a relationship. You can **traverse** this graph intuitively.
>
> Imagine showing this to a business user - they get it immediately. No explaining JOINs!"

---

## 🏁 Part 9: Wrap-Up & Key Takeaways (0:58 - 1:00) — 2 minutes

### When to Use What

**SHOW SLIDE:** Decision matrix

**SAY:**
> "So, when should you use each technology?
>
> **Use SQL/Relational when:**
> - ✅ Fixed schema, well-defined queries
> - ✅ Transactional integrity critical (banking)
> - ✅ Simple relationships (1-2 joins max)
> - ✅ Reporting on tabular data
>
> **Use Knowledge Graphs when:**
> - ✅ Complex, multi-hop relationships (social networks)
> - ✅ Schema evolves frequently
> - ✅ Data integration from multiple sources
> - ✅ Semantic reasoning needed (AI, recommendations)
> - ✅ Exploratory queries ('show me connections')
>
> Often the answer is **both**: SQL for transactions, KG for analytics and discovery."

### Real-World Examples

**SAY:**
> "Who uses Knowledge Graphs in production?
> - **Google**: Search results, Knowledge Panel
> - **LinkedIn**: 'People You May Know', job recommendations
> - **Amazon**: Product recommendations, 'Customers also bought'
> - **NASA**: Mission data integration
> - **Pharmaceutical companies**: Drug discovery, adverse effect prediction
>
> They're not just academic toys - they're production-grade technology solving billion-dollar problems."

### Next Steps

**SAY:**
> "Want to go deeper? Here's your roadmap:
>
> 1. **Practice**: Complete all 3 SPARQL exercises
> 2. **Extend**: Add your own data to the Chinook graph
> 3. **Learn**: Explore RDFS/OWL reasoning (Protégé)
> 4. **Experiment**: Try Neo4j (labeled property graphs) vs RDF
> 5. **Build**: Create a small KG for your own domain
>
> Resources:
> - W3C SPARQL spec: https://www.w3.org/TR/sparql11-query/
> - RDF Primer: https://www.w3.org/TR/rdf11-primer/
> - This repo's README: has tutorials, cheatsheets, troubleshooting"

### Final Words

**SAY:**
> "Knowledge Graphs aren't replacing relational databases - they're **complementing** them. The future is polyglot persistence: using the right tool for the right job.
>
> You now have both SQL and SPARQL in your toolkit. Use them wisely!
>
> Questions?"

---

## ❓ Q&A (1:00+) — Open-ended

### Common Questions & Answers

**Q: "Is RDF slow compared to SQL?"**

**A:** 
> "It depends. Triplestores like Blazegraph are optimized for graph traversal. For simple queries, SQL might be faster. For multi-hop queries (6+ degrees), graphs dominate. Benchmark for your use case!"

**Q: "Can I use both SQL and RDF together?"**

**A:**
> "Absolutely! Common pattern: SQL for operational data (orders, payments), KG for analytical data (recommendations, insights). Tools like Ontop let you query SQL databases using SPARQL (virtual knowledge graphs)."

**Q: "What about Neo4j vs RDF?"**

**A:**
> "Neo4j is a **labeled property graph** (Cypher query language). RDF is **semantic web standard** (SPARQL). Neo4j is often faster, RDF is more interoperable. Choose based on your needs: speed vs standards."

**Q: "How do I version/backup a knowledge graph?"**

**A:**
> "Most triplestores support dumps (TriG/Turtle files). Use Git for ontology files, backup triplestore data regularly. Some tools (Datomic, Stardog) have built-in versioning."

**Q: "Can I use this in Python/Java/etc?"**

**A:**
> "Yes! Libraries:
> - Python: rdflib, SPARQLWrapper
> - Java: Apache Jena, RDF4J
> - JavaScript: N3.js, SPARQL.js
> All support querying SPARQL endpoints programmatically."

---

## 📋 Presenter's Checklist

### Before Workshop
- [ ] Test all Docker containers (MySQL, Blazegraph)
- [ ] Verify all scripts run without errors
- [ ] Prepare backup slides in case of technical issues
- [ ] Have solution files ready to show
- [ ] Test screen sharing and font sizes (readable?)

### During Workshop
- [ ] Share repository link in chat
- [ ] Paste commands in chat as you run them
- [ ] Check chat for questions every 5-10 minutes
- [ ] Monitor time - adjust pace if needed
- [ ] Encourage participants to type along

### After Workshop
- [ ] Share slides/recording
- [ ] Post additional resources in chat
- [ ] Offer office hours for follow-up questions
- [ ] Collect feedback (Google Form?)

---

## 🎬 Bonus: Time-Saving Tips

### If Running Behind
- **Skip:** Manual ontology editing (just show generated)
- **Skip:** Exercise 3 (show solution instead)
- **Reduce:** Q&A time (offer async follow-up)

### If Ahead of Schedule
- **Add:** Live coding a custom SPARQL query
- **Add:** Show inference example (RDFS/OWL reasoning)
- **Add:** Compare query performance (SQL vs SPARQL)
- **Add:** Demonstrate federated queries (multiple endpoints)

---

## 🎯 Success Metrics

**Workshop is successful if participants can:**
1. ✅ Explain what a knowledge graph is (in one sentence)
2. ✅ Write a basic SPARQL query (SELECT, WHERE, FILTER)
3. ✅ Convert a simple table to RDF triples (by hand)
4. ✅ Identify a use case where graphs beat SQL

**Bonus:** They go home excited to try KGs on their own data!

---

## 📚 Quick Reference Links (Share in Chat)

```
Repository: <YOUR_REPO_URL>
Blazegraph UI: http://localhost:8889/bigdata/sparql
SPARQL Cheatsheet: https://www.iro.umontreal.ca/~lapalme/ift6281/sparql-1_1-cheat-sheet.pdf
RDF Primer: https://www.w3.org/TR/rdf11-primer/
Protégé Tutorial: https://protegewiki.stanford.edu/wiki/Protege4Pizzas10Minutes
```

---

**Good luck with your presentation! 🚀**

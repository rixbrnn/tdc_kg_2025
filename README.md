# Knowledge Graphs Workshop (1h30) — From SQL to Ontologies to SPARQL

This repository contains all materials for a **90-minute hands-on workshop** that compares relational querying (SQL) with knowledge graphs (RDF + SPARQL), using the same sales-like dataset throughout.

We start in SQL, hit a couple of “this is getting messy” questions, then model an ontology, convert the database to RDF, load it into Blazegraph, and answer the same questions with SPARQL.

---

## What you will learn

By the end of the workshop, you should be able to:

* Understand **when SQL is great** and when it becomes painful.
* Explain what a **knowledge graph** is and what problems it solves.
* Create and extend a simple **ontology** in Protégé.
* Convert relational data into **RDF/TriG**.
* Load RDF into **Blazegraph** and query with **SPARQL**.
* Recognize graph patterns such as **hierarchies** and **co-purchase recommendations**.

---

## Dataset

We use the **Chinook** SQLite sample database, which represents a digital media store with customers, invoices, invoice lines, tracks, albums, artists, genres, and employee hierarchies.

The dataset is small (≈11 tables) but rich enough to demonstrate multi-hop relationships, hierarchies, and recommendation-style queries.

---

## Workshop flow (high level)

1. **Explore dataset in SQL (DBeaver).**
2. Answer 3 business questions:

   * Q1: provided SQL solution
   * Q2 & Q3: participants implement in SQL (intentionally non-trivial)
3. Discuss why Q2/Q3 are awkward in SQL.
4. **Ontology in Protégé:** explain classes/properties + complete missing piece.
5. **RDB → RDF converter (Node.js):** complete missing mapping(s).
6. Generate **TriG**, load into **Blazegraph** (Docker).
7. Learn SPARQL basics.
8. Re-answer Q1–Q3 in SPARQL:

   * Q1: provided SPARQL solution
   * Q2 & Q3: participants implement

---

## Repository structure

```
.
├─ prerequisites.md           # install list + sanity checks
├─ agenda.md                  # minute-by-minute schedule
├─ data/                      # chinook.db + schema image
├─ sql/                       # Q1 solution + Q2/Q3 TODOs
├─ ontology/                  # Protégé .owl (TODO + solution)
├─ converter/                 # Node.js RDB→RDF converter (TODO + solution)
├─ blazegraph/                # Docker compose + load scripts
└─ sparql/                    # Q1 solution + Q2/Q3 TODOs
```

Solutions are available in each folder under `solutions/`.

---

## Quickstart (before workshop)

1. Follow **prerequisites**: see [`prerequisites.md`](./prerequisites.md).
2. Clone this workshop repo:

   ```bash
   git clone <THIS_REPO_URL>
   cd knowledge-graphs-workshop
   ```

---

## During workshop: step-by-step

### Step 1 — SQL warm-up (DBeaver)

1. Open `data/chinook.db` in DBeaver.
2. Review schema (`data/schema.png`).
3. Run:

   * `sql/question-1-solution.sql`
4. Implement:

   * `sql/question-2-todo.sql`
   * `sql/question-3-todo.sql`

> Instructor reference answers are in `sql/solutions/`.

---

### Step 2 — Ontology in Protégé

1. Open `ontology/chinook-todo.owl`.
2. Complete the TODOs (class/property + restriction).
3. Save as `chinook-yourname.owl` (optional).

> Instructor reference is `ontology/chinook-solution.owl`.

---

### Step 3 — Convert RDB to RDF (Node.js)

1. Install converter dependencies:

   ```bash
   cd converter
   npm install
   ```
2. Run the converter:

   ```bash
   npm start
   ```
3. You should get RDF output at:

   ```
   rdf/output.trig
   ```

The converter is intentionally incomplete. Fill the TODOs in:

* `converter/src/mapping.js`
* `converter/src/export_rdf.js`

> Instructor reference is in `converter/solutions/`.

---

### Step 4 — Load RDF into Blazegraph

Blazegraph is an RDF triple store with a SPARQL endpoint and a browser UI.

1. Start Blazegraph:

   ```bash
   cd blazegraph
   docker compose up
   ```
2. In another terminal, load TriG:

   ```bash
   ./load_rdf.sh
   # or on Windows:
   ./load_rdf.ps1
   ```

Blazegraph runs on port **9999** by default.

SPARQL endpoint:

```
http://localhost:9999/blazegraph/namespace/kb/sparql
```

Browser UI:

```
http://localhost:9999/blazegraph/#query
```

---

### Step 5 — SPARQL

1. Run:

   * `sparql/question-1-solution.rq`
2. Implement:

   * `sparql/question-2-todo.rq`
   * `sparql/question-3-todo.rq`

> Instructor reference answers are in `sparql/solutions/`.

---

## Suggested agenda (90 min)

A detailed minute-by-minute schedule is in [`agenda.md`](./agenda.md).
Quick view:

* 0–5 min: intro + goals
* 5–15 min: setup check
* 15–30 min: SQL Q1–Q3
* 30–35 min: transition to KG
* 35–50 min: ontology in Protégé
* 50–65 min: Node converter to RDF
* 65–75 min: load into Blazegraph
* 75–82 min: SPARQL basics
* 82–90 min: SPARQL Q1–Q3 + wrap-up

---

## Troubleshooting

**Blazegraph doesn’t start / port in use**

* Make sure port 9999 is free.
* Stop old containers:

  ```bash
  docker ps
  docker stop <id>
  ```

**RDF upload fails**

* Check Blazegraph is up at `http://localhost:9999/blazegraph/`.
* Ensure `rdf/output.trig` exists and is valid TriG.

**Converter errors**

* Re-run `npm install`.
* Confirm Node is recent:

  ```bash
  node --version
  ```

**Protégé won’t open**

* Verify Java:

  ```bash
  java -version
  ```
* Reinstall Protégé if needed.

---

## Credits

* **Chinook sample database** by Luis Rocha et al.
  [https://github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database)
* **Protégé** ontology editor (Stanford).
  [https://protege.stanford.edu/](https://protege.stanford.edu/)
* **Blazegraph** RDF/SPARQL database.
  [https://github.com/blazegraph/database](https://github.com/blazegraph/database)

---

## License

Workshop code is MIT unless stated otherwise.
The Chinook dataset is included under its original permissive license; see `data/LICENSE-data.txt`.

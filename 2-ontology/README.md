# Step 2 — Ontology (Protégé)

In this step we stop thinking only in tables and start modeling **meaning**:
customers, invoices, tracks, employees, and their relationships as an **ontology**.

We’ll work in Protégé using a partially completed ontology file:

* `chinook-todo.ttl` (this is what you open)
* `chinook-solution.ttl` (instructor reference, not needed during the exercise)

The ontology is written in Turtle (TTL), but Protégé will handle it just fine.

---

## 1. Open the ontology in Protégé

1. Start **Protégé**.
2. Go to **File → Open…**
3. Select: `2-ontology/chinook-todo.ttl`
4. You should see classes like `Customer`, `Invoice`, `Track`, `Employee`, etc.

Take a quick look around:

* **Classes** tab: conceptual types (Customer, Invoice, Track…)
* **Object properties** tab: relationships between things
* **Data properties** tab: literal attributes (names, IDs, prices…)

---

## 2. TODO 1 — Employee hierarchy properties

We want to represent the reporting hierarchy between employees.

### Task

Create two object properties:

1. **`reportsTo`**

   * Domain: `Employee`
   * Range: `Employee`
   * Label: something like “reports to”

2. **`manages`**

   * Domain: `Employee`
   * Range: `Employee`
   * Label: “manages”
   * Mark this as the **inverse** of `reportsTo`.

### Hints in Protégé

* Go to the **Object properties** tab.
* Click the **“+”** icon to create a new property.
* Set **Domain** and **Range** in the right-hand pane.
* To set the inverse:

  * In the `reportsTo` property, find the **Inverse Of** section and choose `manages` (or vice versa).

These properties will be used later when we query hierarchies in SPARQL, e.g.:

```sparql
?rep :reportsTo* ?manager .
```

---

## 3. TODO 2 — Restriction: each invoice line has exactly one track

We know from the relational schema that every invoice line refers to exactly one track. Let’s capture that as an OWL restriction.

### Task

Add a restriction on the class **`InvoiceLine`**:

> Every `InvoiceLine` has **exactly one** `lineTrack` that points to a `Track`.

In OWL terms:

* On class `InvoiceLine`, add a `rdfs:subClassOf` that is an `owl:Restriction` with:

  * `owl:onProperty` = `lineTrack`
  * `owl:qualifiedCardinality` = `1`
  * `owl:onClass` = `Track`

### Hints in Protégé

1. Go to the **Classes** tab.
2. Select `InvoiceLine`.
3. In the right pane, under **“Superclasses”**, add a new restriction:

   * Choose **“Object property cardinality”**.
   * Property: `lineTrack`
   * Cardinality: `1`
   * Filler: `Track`

Protégé will then show this restriction as one of the superclasses of `InvoiceLine`.

---

## 4. TODO 3 — Restriction: each invoice has at least one line

From business semantics, an invoice should have at least one line. We can encode that too.

### Task

Add a restriction on the class **`Invoice`**:

> Every `Invoice` has **at least one** `hasLine` that points to an `InvoiceLine`.

In OWL terms:

* On class `Invoice`, add a `rdfs:subClassOf` that is an `owl:Restriction` with:

  * `owl:onProperty` = `hasLine`
  * `owl:minQualifiedCardinality` = `1`
  * `owl:onClass` = `InvoiceLine`

### Hints in Protégé

1. Go to the **Classes** tab.
2. Select `Invoice`.
3. Under **Superclasses**, add a new restriction:

   * Choose **“Object property min cardinality”**.
   * Property: `hasLine`
   * Min cardinality: `1`
   * Filler: `InvoiceLine`.

---

## 5. Save your ontology

When you’re done with the TODOs:

1. Click **File → Save** in Protégé.
2. You can optionally save a copy with your name, e.g.:

   * `chinook-yourname.ttl`

This ontology will be used in the next steps:

* mapping relational rows to RDF using your ontology terms
* loading the RDF into Blazegraph
* running the SPARQL queries you saw earlier

---

## 6. If you get stuck

It’s totally fine to be partially done — the workshop continues even if not every restriction is perfect.

If you want to compare, the instructor version is:

* `2-ontology/chinook-solution.ttl`

(But try your best on the TODO version before peeking 😉)
    
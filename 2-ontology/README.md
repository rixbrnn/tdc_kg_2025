# Passo 2 — Ontologia

Neste passo paramos de pensar apenas em tabelas e começamos a modelar **significado**:
clientes, faturas, faixas, funcionários e seus relacionamentos como uma **ontologia**.

Trabalharemos em um arquivo de ontologia parcialmente completo:

* `chinook-todo.ttl` (este é o que você abre)
* `chinook-solution.ttl` (referência do instrutor, não necessário durante o exercício)

A ontologia está escrita em Turtle (TTL). Dê uma olhada rápida!

---

## 1. TODO 1 — Propriedades de hierarquia de funcionários

Queremos representar a hierarquia de reporte entre funcionários.

### Tarefa

Crie duas propriedades de objeto:

1. **`reportsTo`**

   * Domínio: `Employee`
   * Alcance: `Employee`
   * Rótulo: algo como "reporta a"

2. **`manages`**

   * Domínio: `Employee`
   * Alcance: `Employee`
   * Rótulo: "gerencia"
   * Marque esta como o **inverso** de `reportsTo`.

---

## 2. TODO 2 — Restrição: cada linha de fatura tem exatamente uma faixa

Sabemos pelo schema relacional que cada linha de fatura se refere a exatamente uma faixa. Vamos capturar isso como uma restrição OWL.

### Tarefa

Adicione uma restrição na classe **`InvoiceLine`**:

> Cada `InvoiceLine` tem **exatamente um** `lineTrack` que aponta para um `Track`.

Em termos OWL:

* Na classe `InvoiceLine`, adicione um `rdfs:subClassOf` que é uma `owl:Restriction` com:

  * `owl:onProperty` = `lineTrack`
  * `owl:qualifiedCardinality` = `1`
  * `owl:onClass` = `Track`

---

## 3. TODO 3 — Restrição: cada fatura tem pelo menos uma linha

Da semântica de negócio, uma fatura deve ter pelo menos uma linha. Podemos codificar isso também.

### Tarefa

Adicione uma restrição na classe **`Invoice`**:

> Cada `Invoice` tem **pelo menos um** `hasLine` que aponta para um `InvoiceLine`.

Em termos OWL:

* Na classe `Invoice`, adicione um `rdfs:subClassOf` que é uma `owl:Restriction` com:

  * `owl:onProperty` = `hasLine`
  * `owl:minQualifiedCardinality` = `1`
  * `owl:onClass` = `InvoiceLine`


---

## 4. Salve sua ontologia

Quando terminar os TODOs, apenas salve seu arquivo. Você pode opcionalmente salvar uma cópia com seu nome, por exemplo:

   * `chinook-seunome.ttl`

Esta ontologia será usada nos próximos passos:

* mapear linhas relacionais para RDF usando os termos de sua ontologia
* carregar o RDF no Blazegraph
* executar as consultas SPARQL que você viu anteriormente

---

## 5. Se você ficar preso

É totalmente normal estar parcialmente completo — o workshop continua mesmo que nem toda restrição esteja perfeita.

Se você quiser comparar, a versão do instrutor está em:

* `2-ontology/chinook-solution.ttl`

(Mas tente seu melhor na versão TODO antes de dar uma espiada 😉)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# English Version
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Step 2 — Ontology 

In this step we stop thinking only in tables and start modeling **meaning**:
customers, invoices, tracks, employees, and their relationships as an **ontology**.

We'll work in a partially completed ontology file:

* `chinook-todo.ttl` (this is what you open)
* `chinook-solution.ttl` (instructor reference, not needed during the exercise)

The ontology is written in Turtle (TTL). Take a quick look around!

---

## 1. TODO 1 — Employee hierarchy properties

We want to represent the reporting hierarchy between employees.

### Task

Create two object properties:

1. **`reportsTo`**

   * Domain: `Employee`
   * Range: `Employee`
   * Label: something like "reports to"

2. **`manages`**

   * Domain: `Employee`
   * Range: `Employee`
   * Label: "manages"
   * Mark this as the **inverse** of `reportsTo`.

---

## 2. TODO 2 — Restriction: each invoice line has exactly one track

We know from the relational schema that every invoice line refers to exactly one track. Let's capture that as an OWL restriction.

### Task

Add a restriction on the class **`InvoiceLine`**:

> Every `InvoiceLine` has **exactly one** `lineTrack` that points to a `Track`.

In OWL terms:

* On class `InvoiceLine`, add a `rdfs:subClassOf` that is an `owl:Restriction` with:

  * `owl:onProperty` = `lineTrack`
  * `owl:qualifiedCardinality` = `1`
  * `owl:onClass` = `Track`

---

## 3. TODO 3 — Restriction: each invoice has at least one line

From business semantics, an invoice should have at least one line. We can encode that too.

### Task

Add a restriction on the class **`Invoice`**:

> Every `Invoice` has **at least one** `hasLine` that points to an `InvoiceLine`.

In OWL terms:

* On class `Invoice`, add a `rdfs:subClassOf` that is an `owl:Restriction` with:

  * `owl:onProperty` = `hasLine`
  * `owl:minQualifiedCardinality` = `1`
  * `owl:onClass` = `InvoiceLine`


---

## 4. Save your ontology

When you're done with the TODOs, just save your file. You can optionally save a copy with your name, e.g.:

   * `chinook-yourname.ttl`

This ontology will be used in the next steps:

* mapping relational rows to RDF using your ontology terms
* loading the RDF into Blazegraph
* running the SPARQL queries you saw earlier

---

## 5. If you get stuck

It's totally fine to be partially done — the workshop continues even if not every restriction is perfect.

If you want to compare, the instructor version is:

* `2-ontology/chinook-solution.ttl`

(But try your best on the TODO version before peeking 😉)

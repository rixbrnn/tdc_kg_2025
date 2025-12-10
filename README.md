# Workshop de Grafos de Conhecimento (1h30) — De SQL a Ontologias e SPARQL

Este repositório contém todos os materiais para um **workshop prático de 90 minutos** que compara consultas relacionais (SQL) com grafos de conhecimento (RDF + SPARQL), usando o mesmo conjunto de dados de vendas ao longo de todo o workshop.

Começamos com SQL, encontramos algumas questões que "estão ficando complicadas", depois modelamos uma ontologia, convertemos o banco de dados para RDF, carregamos no Blazegraph e respondemos as mesmas perguntas com SPARQL.

---

## O que você vai aprender

Ao final do workshop, você será capaz de:

* Entender **quando SQL é ótimo** e quando se torna doloroso.
* Explicar o que é um **grafo de conhecimento** e quais problemas ele resolve.
* Criar e estender uma **ontologia** simples.
* Converter dados relacionais em **RDF/TriG**.
* Carregar RDF no **Blazegraph** e consultar com **SPARQL**.
* Reconhecer padrões de grafos como **hierarquias** e **recomendações de co-compra**.

---

## Conjunto de dados

Usamos o banco de dados de exemplo **Chinook** SQL, que representa uma loja de mídia digital com clientes, faturas, itens de fatura, faixas, álbuns, artistas, gêneros e hierarquias de funcionários.

O conjunto de dados é pequeno (≈11 tabelas), mas rico o suficiente para demonstrar relacionamentos multi-hop, hierarquias e consultas de estilo recomendação.

---

## Fluxo do workshop (visão geral)

1. **Explorar conjunto de dados em SQL (DBeaver).**
2. Responder 3 perguntas de negócio:

   * Q1: solução SQL fornecida
   * Q2 & Q3: participantes implementam em SQL (intencionalmente não trivial)
3. Discutir por que Q2/Q3 são desajeitadas em SQL.
4. **Ontologia:** explicar classes/propriedades + completar parte faltante.
5. **Conversor RDB → RDF (Node.js):** completar mapeamento(s) faltante(s).
6. Gerar **TriG**, carregar no **Blazegraph** (Docker).
7. Aprender fundamentos de SPARQL.
8. Re-responder Q1–Q3 em SPARQL:

   * Q1: solução SPARQL fornecida
   * Q2 & Q3: participantes implementam

---

## Estrutura do repositório

```
.
├─ prerequisites.md           # lista de instalação + verificações
├─ agenda.md                  # cronograma minuto a minuto
├─ data/                      # chinook.db + imagem do schema
├─ sql/                       # solução Q1 + Q2/Q3 TODOs
├─ ontology/                  # .owl (TODO + solução)
├─ converter/                 # Conversor Node.js RDB→RDF (TODO + solução)
├─ blazegraph/                # Docker compose + scripts de carga
└─ sparql/                    # solução Q1 + Q2/Q3 TODOs
```

As soluções estão disponíveis em cada pasta sob `solutions/`.

---

## Início rápido (antes do workshop)

1. Siga os **pré-requisitos**: veja [`prerequisites.md`](./prerequisites.md).
2. Clone este repositório do workshop:

   ```bash
   git clone <THIS_REPO_URL>
   cd knowledge-graphs-workshop
   ```

---

## Durante o workshop: passo a passo

### Passo 1 — Aquecimento com SQL (DBeaver)

1. Abra `data/chinook.db` no DBeaver.
2. Revise o schema (`data/schema.png`).
3. Execute:

   * `sql/question-1-solution.sql`
4. Implemente:

   * `sql/question-2-todo.sql`
   * `sql/question-3-todo.sql`


---

### Passo 2 — Ontologia

1. Abra `ontology/chinook-todo.owl`.
2. Complete os TODOs (classe/propriedade + restrição).
3. Salve como `chinook-seunome.owl` (opcional).


---

### Passo 3 — Converter RDB para RDF (Node.js)

1. Instale as dependências do conversor:

   ```bash
   cd converter
   npm install
   ```
2. Execute o conversor:

   ```bash
   npm start
   ```
3. Você deve obter a saída RDF em:

   ```
   rdf/output.trig
   ```

O conversor está intencionalmente incompleto. Preencha os TODOs em:

* `converter/src/mapping.js`
* `converter/src/export_rdf.js`


---

### Passo 4 — Carregar RDF no Blazegraph

Blazegraph é um armazenamento de triplas RDF com um endpoint SPARQL e uma interface web.

1. Inicie o Blazegraph:

   ```bash
   cd blazegraph
   docker compose up
   ```
2. Em outro terminal, carregue o TriG:

   ```bash
   ./load_rdf.sh
   # ou no Windows:
   ./load_rdf.ps1
   ```

Blazegraph executa na porta **9999** por padrão.

Endpoint SPARQL:

```
http://localhost:9999/blazegraph/namespace/kb/sparql
```

Interface web:

```
http://localhost:9999/blazegraph/#query
```

---

### Passo 5 — SPARQL

1. Execute:

   * `sparql/question-1-solution.rq`
2. Implemente:

   * `sparql/question-2-todo.rq`
   * `sparql/question-3-todo.rq`

> As respostas de referência do instrutor estão em `sparql/solutions/`.

---

## Agenda (90 min)

Um cronograma detalhado minuto a minuto está em [`agenda.md`](./agenda.md).
Visão rápida:

* 0–5 min: intro + objetivos
* 5–15 min: verificação de configuração
* 15–30 min: SQL Q1–Q3
* 30–35 min: transição para KG
* 35–50 min: ontologia
* 50–65 min: conversor Node para RDF
* 65–75 min: carregar no Blazegraph
* 75–82 min: fundamentos de SPARQL
* 82–90 min: SPARQL Q1–Q3 + encerramento

---

## Solução de problemas

**Blazegraph não inicia / porta em uso**

* Certifique-se de que a porta 9999 está livre.
* Pare containers antigos:

  ```bash
  docker ps
  docker stop <id>
  ```

**Falha no upload do RDF**

* Verifique se o Blazegraph está rodando em `http://localhost:9999/blazegraph/`.
* Certifique-se de que `rdf/output.trig` existe e é um TriG válido.

**Erros no conversor**

* Execute novamente `npm install`.
* Confirme que o Node é recente:

  ```bash
  node --version
  ```

---

## Créditos

* **Banco de dados de exemplo Chinook** por Luis Rocha et al.
  [https://github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database)
* **Blazegraph** banco de dados RDF/SPARQL.
  [https://github.com/blazegraph/database](https://github.com/blazegraph/database)

---

## Licença

O uso do conteúdo deste workshop, incluindo mas não limitado ao seu código, fora do workshop sem autorização explícita por escrito dos autores é proibido.
O conjunto de dados Chinook está incluído sob sua licença permissiva original; veja `data/LICENSE-data.txt`.

---
---
---

# Knowledge Graphs Workshop (1h30) — From SQL to Ontologies to SPARQL

This repository contains all materials for a **90-minute hands-on workshop** that compares relational querying (SQL) with knowledge graphs (RDF + SPARQL), using the same sales dataset throughout.

We start in SQL, hit a couple of "this is getting messy" questions, then model an ontology, convert the database to RDF, load it into Blazegraph, and answer the same questions with SPARQL.

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

We use the **Chinook** SQL sample database, which represents a digital media store with customers, invoices, invoice lines, tracks, albums, artists, genres, and employee hierarchies.

The dataset is small (≈11 tables) but rich enough to demonstrate multi-hop relationships, hierarchies, and recommendation-style queries.

---

## Workshop flow (high level)

1. **Explore dataset in SQL (DBeaver).**
2. Answer 3 business questions:

   * Q1: provided SQL solution
   * Q2 & Q3: participants implement in SQL (intentionally non-trivial)
3. Discuss why Q2/Q3 are awkward in SQL.
4. **Ontology:** explains classes/properties + complete missing piece.
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
├─ ontology/                  # .owl (TODO + solution)
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

---

### Step 2 — Ontology

1. Open `ontology/chinook-todo.owl`.
2. Complete the TODOs (class/property + restriction).
3. Save as `chinook-yourname.owl` (optional).


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

## Agenda (90 min)

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

**Blazegraph doesn't start / port in use**

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


---

## Credits

* **Chinook sample database** by Luis Rocha et al.
  [https://github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database)
* **Blazegraph** RDF/SPARQL database.
  [https://github.com/blazegraph/database](https://github.com/blazegraph/database)

---

## License

The use of the content of this workshop, including but not limited to its code, outside of the workshop without explicit written authorization from the authors is forbidden. 
The Chinook dataset is included under its original permissive license; see `data/LICENSE-data.txt`.

# Workshop de Grafos de Conhecimento — De SQL a RDF & SPARQL

Um caminho de aprendizado prático que compara bancos de dados relacionais (SQL) com grafos de conhecimento (RDF + SPARQL) usando o banco de dados Chinook.

## 📚 O que você vai aprender

- Entender quando SQL é excelente e quando se torna complexo
- Modelar dados como uma ontologia com classes e propriedades
- Converter dados relacionais para formato RDF/TriG
- Consultar grafos de conhecimento com SPARQL
- Reconhecer padrões de grafos: hierarquias, recomendações, co-ocorrência

## 🗂️ Estrutura do Repositório

Cada sessão se baseia na anterior:

- **[0-dbsetup](0-dbsetup/)** — Configuração do banco de dados MySQL Chinook com Docker
- **[1-sql](1-sql/)** — Consultas SQL explorando o modelo relacional
- **[2-ontology](2-ontology/)** — Design de ontologia em RDF/TriG
- **[3-converter](3-converter/)** — Ferramenta Node.js para converter RDB → RDF
- **[4-blazegraph](4-blazegraph/)** — Carregar RDF no triplestore Blazegraph
- **[5-sparql](5-sparql/)** — Consultas SPARQL (compare com equivalentes SQL)
- **[6-visualization](6-visualization/)** — Técnicas de visualização de grafos
- **[7-homework_architecture_project](7-homework_architecture_project/)** — Projeto final

Cada sessão tem seu próprio README detalhado com instruções bilíngues (Português/Inglês).

## 🚀 Início Rápido

### Pré-requisitos

- **Docker** & Docker Compose
- **DBeaver** (ou qualquer cliente MySQL)
- **Node.js** v16+ & npm
- **Git**

### Começando

1. Clone este repositório:
   ```bash
   git clone https://github.com/rixbrnn/tdc_kg_2025.git
   cd tdc_kg_2025
   ```

2. Siga as sessões em ordem, começando com **[0-dbsetup](0-dbsetup/README.md)**

3. O README de cada sessão contém configuração detalhada e exercícios

## 💾 Conjunto de Dados

O banco de dados **Chinook** representa uma loja de mídia digital com:
- 59 Clientes
- 412 Faturas
- 3.503 Faixas
- 347 Álbuns
- 275 Artistas
- 25 Gêneros
- 8 Funcionários (com hierarquia)

Perfeito para demonstrar consultas simples e complexas em SQL e SPARQL.

## 🎯 Caminho de Aprendizado

1. **Configuração** — MySQL + Chinook rodando no Docker
2. **Prática SQL** — Escrever consultas, experimentar complexidade
3. **Design de Ontologia** — Modelar o domínio em RDF
4. **Conversão** — Transformar dados relacionais em RDF
5. **Blazegraph** — Carregar e explorar o grafo de conhecimento
6. **SPARQL** — Consultar o grafo, comparar com SQL
7. **Visualização** — Visualizar relacionamentos do grafo
8. **Projeto** — Aplicar conhecimento a um cenário real

## 🔧 Ferramentas Utilizadas

- **MySQL** — Banco de dados relacional
- **DBeaver** — Cliente de banco de dados
- **Node.js** — Conversor RDB→RDF
- **Blazegraph** — Triplestore RDF com endpoint SPARQL
- **Docker** — Plataforma de containers

## 📖 Créditos

- **Banco de Dados Chinook** por Luis Rocha — [github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database)
- **Blazegraph** Banco de Dados RDF — [github.com/blazegraph/database](https://github.com/blazegraph/database)

## 📄 Licença

O conteúdo do workshop é proprietário. O conjunto de dados Chinook está incluído sob sua licença permissiva original.

---

**Pronto para começar?** Vá para **[Sessão 0: Configuração do Banco de Dados](0-dbsetup/README.md)** 🚀

## 📬 Contatos

- Nickolas Werckmeister — 📧 nickolas.werckmeister@sap.com — 🔗 https://www.linkedin.com/in/nwerck/
- Richard Bringmann — 📧 richard.bringmann@sap.com — 🔗 https://www.linkedin.com/in/richard-bringmann-347031170/
- Leonardo Sessegolo — 📧 leonardo.sessegolo@sap.com — 🔗 https://www.linkedin.com/in/leonardosessegolo/

---
---
---

# Knowledge Graphs Workshop — From SQL to RDF & SPARQL

A hands-on learning path that compares relational databases (SQL) with knowledge graphs (RDF + SPARQL) using the Chinook database.

## 📚 What You'll Learn

- Understand when SQL excels and when it becomes complex
- Model data as an ontology with classes and properties
- Convert relational data to RDF/TriG format
- Query knowledge graphs with SPARQL
- Recognize graph patterns: hierarchies, recommendations, co-occurrence

## 🗂️ Repository Structure

Each session builds on the previous one:

- **[0-dbsetup](0-dbsetup/)** — MySQL Chinook database setup with Docker
- **[1-sql](1-sql/)** — SQL queries exploring the relational model
- **[2-ontology](2-ontology/)** — Ontology design in RDF/TriG
- **[3-converter](3-converter/)** — Node.js tool to convert RDB → RDF
- **[4-blazegraph](4-blazegraph/)** — Load RDF into Blazegraph triplestore
- **[5-sparql](5-sparql/)** — SPARQL queries (compare with SQL equivalents)
- **[6-visualization](6-visualization/)** — Graph visualization techniques
- **[7-homework_architecture_project](7-homework_architecture_project/)** — Final project

Each session has its own detailed README with bilingual instructions (Portuguese/English).

## 🚀 Quick Start

### Prerequisites

- **Docker** & Docker Compose
- **DBeaver** (or any MySQL client)
- **Node.js** v16+ & npm
- **Git**

### Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/rixbrnn/tdc_kg_2025.git
   cd tdc_kg_2025
   ```

2. Follow the sessions in order, starting with **[0-dbsetup](0-dbsetup/README.md)**

3. Each session's README contains detailed setup and exercises

## 💾 Dataset

The **Chinook** database represents a digital media store with:
- 59 Customers
- 412 Invoices
- 3,503 Tracks
- 347 Albums
- 275 Artists
- 25 Genres
- 8 Employees (with hierarchy)

Perfect for demonstrating both simple and complex queries in SQL and SPARQL.

## 🎯 Learning Path

1. **Setup** — Get MySQL + Chinook running in Docker
2. **SQL Practice** — Write queries, experience complexity
3. **Ontology Design** — Model the domain in RDF
4. **Conversion** — Transform relational data to RDF
5. **Blazegraph** — Load and explore the knowledge graph
6. **SPARQL** — Query the graph, compare with SQL
7. **Visualization** — Visualize graph relationships
8. **Project** — Apply knowledge to a real-world scenario

## 🔧 Tools Used

- **MySQL** — Relational database
- **DBeaver** — Database client
- **Node.js** — RDB→RDF converter
- **Blazegraph** — RDF triplestore with SPARQL endpoint
- **Docker** — Container platform

## 📖 Credits

- **Chinook Database** by Luis Rocha — [github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database)
- **Blazegraph** RDF Database — [github.com/blazegraph/database](https://github.com/blazegraph/database)

## 📄 License

Workshop content is proprietary. The Chinook dataset is included under its original permissive license.

---

**Ready to start?** Head to **[Session 0: Database Setup](0-dbsetup/README.md)** 🚀

## 📬 Contacts

- Nickolas Werckmeister — 📧 nickolas.werckmeister@sap.com — 🔗 https://www.linkedin.com/in/nwerck/
- Richard Bringmann — 📧 richard.bringmann@sap.com — 🔗 https://www.linkedin.com/in/richard-bringmann-347031170/
- Leonardo Sessegolo — 📧 leonardo.sessegolo@sap.com — 🔗 https://www.linkedin.com/in/leonardosessegolo/
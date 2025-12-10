# 📊 Passo 1 — Análise e Prática com SQL

Esta seção contém exercícios SQL usando o banco de dados **Chinook** para explorar padrões e relacionamentos de dados da indústria musical.

> 📋 **Pré-requisitos:** Complete [Passo 0 — Configuração do Banco de Dados](../0-dbsetup/README.md) primeiro para ter o banco de dados Chinook rodando.

---

## 🎯 Objetivos de Aprendizado

Praticar conceitos avançados de SQL incluindo:
- 🔗 **JOINs complexos** através de múltiplas tabelas
- 📈 **Agregações e agrupamentos** para insights de negócio
- 🧮 **Consultas analíticas** para exploração de dados
- 📊 **Objetivo final** Ver como SQL pode ser complexo às vezes

---

## 📁 Estrutura de Arquivos

```
1-sql/
├── README.md                    # Este arquivo
├── question-1-sample.sql        # Exemplo: Hierarquia de receita de gerentes (completo)
├── question-2-todo.sql          # Exercício: Gêneros favoritos dos clientes (TODO)
└── solutions/
    └── question-2-solution.sql  # Solução: Gêneros favoritos dos clientes (duplicado)
```

---

## 🚀 Exercícios

### 🎵 Questão 1: Hierarquia de Receita de Gerentes (Exemplo)
**Arquivo:** `question-1-sample.sql` ✅ **Exemplo Completo**

**Objetivo:** Para cada gerente, calcular a receita total de toda a sua equipe (incluindo subordinados indiretos).

**Conceitos-Chave Demonstrados:**
- **CTEs recursivas** para hierarquia organizacional
- Estrutura de reporte de funcionários (`Employee.ReportsTo`)
- Atribuições de suporte ao cliente (`Customer.SupportRepId`)
- Agregação hierárquica de receita

**Saída Esperada:**
```
EmployeeId | ManagerName      | Title               | TeamRevenue
-----------|------------------|---------------------|------------
2          | Nancy Edwards    | Sales Manager       | 1841.86
1          | Andrew Adams     | General Manager     | 1299.75
5          | Steve Johnson    | Sales Support Agent | 720.16
```

---

### 🎭 Questão 2: Gêneros Favoritos dos Clientes (Exercício)
**Arquivos:** `question-2-todo.sql` → `question-2-solution.sql`

**Objetivo:** Para cada cliente, encontrar seu gênero favorito (onde gastou mais dinheiro).

**Conceitos-Chave:**
- JOINs multi-tabela (Customer → Invoice → InvoiceLine → Track → Genre)
- Cálculo de receita com `SUM(UnitPrice * Quantity)`
- Funções de janela com `ROW_NUMBER() OVER (PARTITION BY...)`

**Saída Esperada:**
```
CustomerId | CustomerName       | FavoriteGenre | AmountSpentOnFavoriteGenre
-----------|--------------------|---------------|---------------------------
6          | Helena Holý        | Alternative   | 49.62
26         | Richard Cunningham | Rock          | 47.62
57         | Luis Rojas         | Alternative   | 46.62
```

**Tarefas TODO em `question-2-todo.sql`:**
- ✍️ Complete as instruções SELECT
- ✍️ Adicione cláusulas JOIN apropriadas
- ✍️ Implemente colunas GROUP BY
- ✍️ Adicione função de janela ROW_NUMBER() se necessário
- ✍️ Complete as cláusulas finais SELECT e WHERE


---

## 💡 Dicas e Sugestões de SQL

### 🔗 **Padrão de JOINs Complexos**
Os relacionamentos do schema Chinook:
```
Customer → Invoice → InvoiceLine → Track → Genre
                                 ↓
                               Album → Artist
Employee ← Customer (SupportRepId)
Employee → Employee (ReportsTo) [Hierarquia]
```

### 📊 **Funções de Janela**
```sql
-- Classificar itens por grupo
ROW_NUMBER() OVER (PARTITION BY CustomerId ORDER BY Revenue DESC) as rn

-- Filtrar para obter o top 1 por grupo
WHERE rn = 1
```

### 🔄 **Padrão de CTE Recursiva** (do Exemplo)
```sql
WITH RECURSIVE employee_hierarchy AS (
  -- Caso base: pontos de início
  SELECT EmployeeId, ReportsTo, EmployeeId AS RootEmployeeId
  FROM Employee
  
  UNION ALL
  
  -- Caso recursivo: percorrer a árvore
  SELECT e.EmployeeId, e.ReportsTo, h.RootEmployeeId
  FROM Employee e
  JOIN employee_hierarchy h ON e.ReportsTo = h.EmployeeId
)
```

### 💰 **Cálculo de Receita**
```sql
SUM(il.UnitPrice * il.Quantity) AS Revenue
```

---

## 🔍 Referência Rápida do Schema do Banco de Dados

**Tabelas Principais:**
- 👥 **Customer** (59 linhas) - Informações de clientes
- 🧾 **Invoice** (412 linhas) - Registros de compras
- 📋 **InvoiceLine** (2.240 linhas) - Itens de linha individuais
- 🎵 **Track** (3.503 linhas) - Músicas/faixas
- 🎭 **Genre** (25 linhas) - Gêneros musicais
- 💿 **Album** (347 linhas) - Lançamentos de álbuns
- 🎤 **Artist** (275 linhas) - Músicos/bandas
- 👔 **Employee** (8 linhas) - Funcionários com hierarquia
- 🎧 **Playlist** (18 linhas) - Coleções curadas

---

**Próximo Passo:** [Passo 2 — Design de Ontologia](../2-ontology/README.md) 🎯


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# English Version
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 📊 Step 1 — SQL Analysis & Practice

This section contains SQL exercises using the **Chinook** database to explore music industry data patterns and relationships.

> 📋 **Prerequisites:** Complete [Step 0 — Database Setup](../0-dbsetup/README.md) first to have the Chinook database running.

---

## 🎯 Learning Objectives

Practice advanced SQL concepts including:
- 🔗 **Complex JOINs** across multiple tables
- 📈 **Aggregations and grouping** for business insights
- 🧮 **Analytical queries** for data exploration
- 📊 **Final goal** See how SQL can be complex sometimes

---

## 📁 File Structure

```
1-sql/
├── README.md                    # This file
├── question-1-sample.sql        # Sample: Manager revenue hierarchy (complete)
├── question-2-todo.sql          # Exercise: Customer favorite genres (TODO)
└── solutions/
    └── question-2-solution.sql  # Solution: Customer favorite genres (duplicate)
```

---

## 🚀 Exercises

### 🎵 Question 1: Manager Revenue Hierarchy (Sample)
**File:** `question-1-sample.sql` ✅ **Complete Example**

**Goal:** For each manager, calculate total revenue from their entire team (including indirect reports).

**Key Concepts Demonstrated:**
- **Recursive CTEs** for organizational hierarchy
- Employee reporting structure (`Employee.ReportsTo`)
- Customer support assignments (`Customer.SupportRepId`)
- Hierarchical revenue aggregation

**Expected Output:**
```
EmployeeId | ManagerName      | Title               | TeamRevenue
-----------|------------------|---------------------|------------
2          | Nancy Edwards    | Sales Manager       | 1841.86
1          | Andrew Adams     | General Manager     | 1299.75
5          | Steve Johnson    | Sales Support Agent | 720.16
```

---

### 🎭 Question 2: Customer Favorite Genres (Exercise)
**Files:** `question-2-todo.sql` → `question-2-solution.sql`

**Goal:** For each customer, find their favorite genre (where they spent the most money).

**Key Concepts:**
- Multi-table JOINs (Customer → Invoice → InvoiceLine → Track → Genre)
- Revenue calculation with `SUM(UnitPrice * Quantity)`
- Window functions with `ROW_NUMBER() OVER (PARTITION BY...)`

**Expected Output:**
```
CustomerId | CustomerName       | FavoriteGenre | AmountSpentOnFavoriteGenre
-----------|--------------------|---------------|---------------------------
6          | Helena Holý        | Alternative   | 49.62
26         | Richard Cunningham | Rock          | 47.62
57         | Luis Rojas         | Alternative   | 46.62
```

**TODO Tasks in `question-2-todo.sql`:**
- ✍️ Complete the SELECT statements
- ✍️ Add proper JOIN clauses 
- ✍️ Implement GROUP BY columns
- ✍️ Add ROW_NUMBER() window function if necessary
- ✍️ Complete the final SELECT and WHERE clauses


---

## 💡 SQL Tips & Hints

### 🔗 **Complex JOINs Pattern**
The Chinook schema relationships:
```
Customer → Invoice → InvoiceLine → Track → Genre
                                 ↓
                               Album → Artist
Employee ← Customer (SupportRepId)
Employee → Employee (ReportsTo) [Hierarchy]
```

### 📊 **Window Functions**
```sql
-- Rank items per group
ROW_NUMBER() OVER (PARTITION BY CustomerId ORDER BY Revenue DESC) as rn

-- Filter to get top 1 per group
WHERE rn = 1
```

### 🔄 **Recursive CTE Pattern** (from Sample)
```sql
WITH RECURSIVE employee_hierarchy AS (
  -- Base case: start points
  SELECT EmployeeId, ReportsTo, EmployeeId AS RootEmployeeId
  FROM Employee
  
  UNION ALL
  
  -- Recursive case: walk the tree
  SELECT e.EmployeeId, e.ReportsTo, h.RootEmployeeId
  FROM Employee e
  JOIN employee_hierarchy h ON e.ReportsTo = h.EmployeeId
)
```

### 💰 **Revenue Calculation**
```sql
SUM(il.UnitPrice * il.Quantity) AS Revenue
```

---

## 🔍 Database Schema Quick Reference

**Key Tables:**
- 👥 **Customer** (59 rows) - Customer information
- 🧾 **Invoice** (412 rows) - Purchase records  
- 📋 **InvoiceLine** (2,240 rows) - Individual line items
- 🎵 **Track** (3,503 rows) - Songs/tracks
- 🎭 **Genre** (25 rows) - Music genres
- 💿 **Album** (347 rows) - Album releases
- 🎤 **Artist** (275 rows) - Musicians/bands
- 👔 **Employee** (8 rows) - Staff with hierarchy
- 🎧 **Playlist** (18 rows) - Curated collections

---

**Next Step:** [Step 2 — Ontology Design](../2-ontology/README.md) 🎯

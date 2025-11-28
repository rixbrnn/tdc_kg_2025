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

## 🛠️ How to Work on Exercises

### 1️⃣ **Setup Your Environment**
- Ensure MySQL Chinook database is running (Step 0)
- Open DBeaver or your preferred SQL client
- Connect to the database

### 2️⃣ **Study the Sample (Question 1)**
1. Open `question-1-sample.sql`
2. Read through the complete solution
3. Understand the SQL
4. Run it to see the results

### 3️⃣ **Complete the Exercise (Question 2)**
1. Open `question-2-todo.sql`
2. Read the problem statement and hints
3. Fill in the TODO sections step by step
4. Test your solution against the database
5. Compare with `question-2-solution.sql` when ready

### 4️⃣ **Run Your Queries**
Execute your SQL in DBeaver:
```sql
-- Copy your solution and run it
WITH customer_genre_spend AS (
  -- Your implementation here
)
SELECT ...
```

### 5️⃣ **Verify Results**
- Check row counts match expectations
- Verify data makes business sense
- Compare output format with examples

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
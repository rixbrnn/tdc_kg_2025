-- Q1: Para cada gerente, qual é a receita total gerada por sua equipe,
--     incluindo todos os subordinados indiretos?
--
--   Employee.ReportsTo define uma hierarquia.
--   Clientes estão vinculados ao seu representante de suporte (Employee).
--   Queremos a receita de cada gerente sobre TODOS os funcionários em sua subárvore.

WITH RECURSIVE employee_hierarchy AS (
  -- Começa com cada funcionário como sua própria raiz
  SELECT
    EmployeeId,
    ReportsTo,
    EmployeeId AS RootEmployeeId
  FROM Employee

  UNION ALL

  -- Percorre a hierarquia para baixo
  SELECT
    e.EmployeeId,
    e.ReportsTo,
    h.RootEmployeeId
  FROM Employee e
  JOIN employee_hierarchy h
    ON e.ReportsTo = h.EmployeeId
),
root_customers AS (
  -- Para cada gerente raiz, coleta clientes em sua subárvore
  SELECT
    h.RootEmployeeId AS ManagerId,
    c.CustomerId
  FROM employee_hierarchy h
  JOIN Customer c
    ON c.SupportRepId = h.EmployeeId
),
root_revenue AS (
  -- Soma receita para cada gerente sobre todos os clientes da subárvore
  SELECT
    rc.ManagerId,
    SUM(il.UnitPrice * il.Quantity) AS TeamRevenue
  FROM root_customers rc
  JOIN Invoice i
    ON i.CustomerId = rc.CustomerId
  JOIN InvoiceLine il
    ON il.InvoiceId = i.InvoiceId
  GROUP BY rc.ManagerId
)
SELECT
  e.EmployeeId,
  CONCAT(e.FirstName, ' ', e.LastName) AS ManagerName,
  e.Title,
  rr.TeamRevenue
FROM root_revenue rr
JOIN Employee e
  ON e.EmployeeId = rr.ManagerId
ORDER BY rr.TeamRevenue DESC;

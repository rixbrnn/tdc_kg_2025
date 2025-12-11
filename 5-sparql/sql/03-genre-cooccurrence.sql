-- Q: Quais gêneros compartilham mais clientes? (Oportunidades de venda cruzada)

WITH customer_genres AS (
  -- Primeiro, obter todas as compras de gênero por cliente
  SELECT DISTINCT
    c.CustomerId,
    g.GenreId,
    g.Name AS GenreName
  FROM Customer c
  JOIN Invoice i ON i.CustomerId = c.CustomerId
  JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
  JOIN Track t ON t.TrackId = il.TrackId
  JOIN Genre g ON g.GenreId = t.GenreId
)
SELECT 
  cg1.GenreName AS Genre1,
  cg2.GenreName AS Genre2,
  COUNT(DISTINCT cg1.CustomerId) AS SharedCustomers
FROM customer_genres cg1
JOIN customer_genres cg2 
  ON cg1.CustomerId = cg2.CustomerId
  AND cg1.GenreId < cg2.GenreId  -- Evita pares duplicados (Rock-Metal vs Metal-Rock)
GROUP BY cg1.GenreName, cg2.GenreName
HAVING COUNT(DISTINCT cg1.CustomerId) >= 5  -- Mostra apenas sobreposições significativas
ORDER BY SharedCustomers DESC
LIMIT 15;

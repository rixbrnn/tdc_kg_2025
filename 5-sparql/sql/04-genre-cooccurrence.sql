-- Q: Which genres share the most customers? (Cross-selling opportunities)

WITH customer_genres AS (
  -- First, get all genre purchases per customer
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
  COUNT(DISTINCT cg1.CustomerId) AS SharedCustomers,
  ROUND(
    COUNT(DISTINCT cg1.CustomerId) * 100.0 / 
    (SELECT COUNT(DISTINCT CustomerId) FROM Customer), 
    2
  ) AS PercentageOfAllCustomers
FROM customer_genres cg1
JOIN customer_genres cg2 
  ON cg1.CustomerId = cg2.CustomerId
  AND cg1.GenreId < cg2.GenreId  -- Avoid duplicate pairs (Rock-Metal vs Metal-Rock)
GROUP BY cg1.GenreName, cg2.GenreName
HAVING COUNT(DISTINCT cg1.CustomerId) >= 5  -- Only show significant overlaps
ORDER BY SharedCustomers DESC
LIMIT 15;


-- Q: Dado um artista (ex: "Iron Maiden"), recomendar artistas similares
--    baseado em compras compartilhadas de clientes

WITH target_customers AS (
  -- Passo 1: Encontrar todos os clientes que compraram faixas do Iron Maiden
  SELECT DISTINCT c.CustomerId
  FROM Customer c
  JOIN Invoice i ON i.CustomerId = c.CustomerId
  JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
  JOIN Track t ON t.TrackId = il.TrackId
  JOIN Album al ON al.AlbumId = t.AlbumId
  JOIN Artist a ON a.ArtistId = al.ArtistId
  WHERE a.Name = 'Iron Maiden'
),
customer_purchases AS (
  -- Passo 2: Encontrar todos os OUTROS artistas que esses clientes compraram
  SELECT 
    tc.CustomerId,
    a.ArtistId,
    a.Name AS ArtistName,
    SUM(il.UnitPrice * il.Quantity) AS CustomerSpend
  FROM target_customers tc
  JOIN Invoice i ON i.CustomerId = tc.CustomerId
  JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
  JOIN Track t ON t.TrackId = il.TrackId
  JOIN Album al ON al.AlbumId = t.AlbumId
  JOIN Artist a ON a.ArtistId = al.ArtistId
  WHERE a.Name != 'Iron Maiden'  -- Exclui o artista original
  GROUP BY tc.CustomerId, a.ArtistId, a.Name
),
artist_scores AS (
  -- Passo 3: Calcular pontuações de similaridade para cada artista
  SELECT 
    ArtistName,
    COUNT(DISTINCT CustomerId) AS CommonCustomers,
    SUM(CustomerSpend) AS TotalRevenue,
    AVG(CustomerSpend) AS AvgRevenuePerCustomer
  FROM customer_purchases
  GROUP BY ArtistName
)
SELECT 
  ArtistName AS RecommendedArtist,
  CommonCustomers,
  ROUND(TotalRevenue, 2) AS TotalRevenue,
  ROUND(AvgRevenuePerCustomer, 2) AS AvgPerCustomer,
  ROUND(
    CommonCustomers * 100.0 / (SELECT COUNT(*) FROM target_customers),
    2
  ) AS PercentageOverlap
FROM artist_scores
ORDER BY CommonCustomers DESC, TotalRevenue DESC
LIMIT 10;

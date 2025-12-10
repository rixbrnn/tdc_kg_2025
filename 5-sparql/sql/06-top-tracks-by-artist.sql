-- Q: For each artist, show their top 3 best-selling tracks

WITH track_revenue AS (
  -- Calculate revenue per track
  SELECT 
    a.ArtistId,
    a.Name AS ArtistName,
    t.TrackId,
    t.Name AS TrackName,
    SUM(il.UnitPrice * il.Quantity) AS Revenue,
    COUNT(DISTINCT i.InvoiceId) AS TimesPurchased,
    ROW_NUMBER() OVER (
      PARTITION BY a.ArtistId 
      ORDER BY SUM(il.UnitPrice * il.Quantity) DESC
    ) AS RevenueRank
  FROM Artist a
  JOIN Album al ON al.ArtistId = a.ArtistId
  JOIN Track t ON t.AlbumId = al.AlbumId
  JOIN InvoiceLine il ON il.TrackId = t.TrackId
  JOIN Invoice i ON i.InvoiceId = il.InvoiceId
  GROUP BY a.ArtistId, a.Name, t.TrackId, t.Name
)
SELECT 
  ArtistName,
  TrackName,
  ROUND(Revenue, 2) AS Revenue,
  TimesPurchased,
  RevenueRank
FROM track_revenue
WHERE RevenueRank <= 3
ORDER BY ArtistName, RevenueRank;

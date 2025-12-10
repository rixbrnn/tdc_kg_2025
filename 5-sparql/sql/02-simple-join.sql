-- Q: Qual é a receita total gerada por cada artista?

SELECT 
  a.ArtistId,
  a.Name AS ArtistName,
  COUNT(DISTINCT t.TrackId) AS TotalTracks,
  SUM(il.UnitPrice * il.Quantity) AS TotalRevenue
FROM Artist a
JOIN Album al ON al.ArtistId = a.ArtistId
JOIN Track t ON t.AlbumId = al.AlbumId
JOIN InvoiceLine il ON il.TrackId = t.TrackId
JOIN Invoice i ON i.InvoiceId = il.InvoiceId
GROUP BY a.ArtistId, a.Name
ORDER BY TotalRevenue DESC
LIMIT 10;

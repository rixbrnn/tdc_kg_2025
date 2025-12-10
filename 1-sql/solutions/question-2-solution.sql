-- Q2 (SQL solução)
-- Para cada artista, qual é a receita total gerada por suas faixas?

SELECT
  a.ArtistId,
  a.Name AS ArtistName,
  SUM(il.UnitPrice * il.Quantity) AS ArtistRevenue
FROM Artist a
JOIN Album al
  ON al.ArtistId = a.ArtistId
JOIN Track t
  ON t.AlbumId = al.AlbumId
JOIN InvoiceLine il
  ON il.TrackId = t.TrackId
JOIN Invoice i
  ON i.InvoiceId = il.InvoiceId
-- (Opcional) Join Customer se você quiser o caminho completo, mas não é necessário para a soma:
-- JOIN Customer c
--   ON c.CustomerId = i.CustomerId
GROUP BY
  a.ArtistId,
  ArtistName
ORDER BY
  ArtistRevenue DESC,
  ArtistName;

-- Q2 (SQL TODO)
-- Para cada artista, qual é a receita total gerada por suas faixas?
SELECT
  a.ArtistId,
  a.Name AS ArtistName,
  SUM(il.UnitPrice * il.Quantity) AS ArtistRevenue
FROM Artist a
-- TODO: adicionar os JOINs necessários entre Album, Track, InvoiceLine e Invoice
-- Exemplo de estrutura (preencha as tabelas e colunas corretas):
-- JOIN ... ON ...
-- JOIN ... ON ...
-- JOIN ... ON ...
-- JOIN ... ON ...
GROUP BY
  a.ArtistId,
  ArtistName
-- TODO: defina a ordenação desejada (ex.: por receita, etc.)
-- ORDER BY ...
;

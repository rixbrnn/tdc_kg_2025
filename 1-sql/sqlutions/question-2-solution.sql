WITH customer_genres AS (
    SELECT DISTINCT
        i.CustomerId,
        t.GenreId
    FROM Invoice i
    JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
    JOIN Track t        ON t.TrackId    = il.TrackId
),
genre_pairs AS (
    SELECT
        cg1.CustomerId,
        cg1.GenreId AS Genre1Id,
        cg2.GenreId AS Genre2Id
    FROM customer_genres cg1
    JOIN customer_genres cg2
      ON cg1.CustomerId = cg2.CustomerId
     AND cg1.GenreId < cg2.GenreId 
)
SELECT
    g1.GenreId AS Genre1Id,
    g1.Name    AS Genre1Name,
    g2.GenreId AS Genre2Id,
    g2.Name    AS Genre2Name,
    COUNT(DISTINCT gp.CustomerId) AS SharedCustomerCount
FROM genre_pairs gp
JOIN Genre g1 ON g1.GenreId = gp.Genre1Id
JOIN Genre g2 ON g2.GenreId = gp.Genre2Id
GROUP BY
    g1.GenreId, g1.Name,
    g2.GenreId, g2.Name
ORDER BY
    SharedCustomerCount DESC,
    Genre1Name,
    Genre2Name;

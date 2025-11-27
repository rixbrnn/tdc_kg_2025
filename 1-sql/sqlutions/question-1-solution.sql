-- Q1: For each customer, what is their favorite genre
--     (the genre where they spent the most money)?

WITH customer_genre_spend AS (
  SELECT
    c.CustomerId,
    CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName,
    g.Name AS GenreName,
    SUM(il.UnitPrice * il.Quantity) AS GenreRevenue
  FROM Customer c
  JOIN Invoice i
    ON i.CustomerId = c.CustomerId
  JOIN InvoiceLine il
    ON il.InvoiceId = i.InvoiceId
  JOIN Track t
    ON t.TrackId = il.TrackId
  JOIN Genre g
    ON g.GenreId = t.GenreId
  GROUP BY
    c.CustomerId,
    CustomerName,
    g.GenreId,
    GenreName
),
ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY CustomerId
      ORDER BY GenreRevenue DESC
    ) AS rn
  FROM customer_genre_spend
)
SELECT
  CustomerId,
  CustomerName,
  GenreName AS FavoriteGenre,
  GenreRevenue AS AmountSpentOnFavoriteGenre
FROM ranked
WHERE rn = 1
ORDER BY AmountSpentOnFavoriteGenre DESC;

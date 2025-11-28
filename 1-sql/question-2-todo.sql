-- Q1: For each customer, what is their favorite genre
--     (the genre where they spent the most money)?
--
-- Goal:
--   Return one row per customer with:
--     - CustomerId
--     - CustomerName
--     - FavoriteGenre
--     - AmountSpentOnFavoriteGenre
--
-- Hints:
--   1) Join: Customer -> Invoice -> InvoiceLine -> Track -> Genre
--   2) Compute revenue per customer & genre:
--        SUM(InvoiceLine.UnitPrice * InvoiceLine.Quantity)
--   3) From that result, pick the top genre per customer.
--      In MySQL 8+ you can use:
--        ROW_NUMBER() OVER (PARTITION BY CustomerId ORDER BY GenreRevenue DESC)
--      and then filter rn = 1.
--
-- Write your SQL below:

WITH customer_genre_spend AS (
  SELECT
    -- TODO: Select CustomerId
    -- TODO: Concatenate FirstName and LastName as CustomerName
    -- TODO: Select Genre Name as GenreName
    -- TODO: Calculate total revenue (SUM of UnitPrice * Quantity) as GenreRevenue
  FROM Customer c
  -- TODO: JOIN Invoice table
  -- TODO: JOIN InvoiceLine table
  -- TODO: JOIN Track table
  -- TODO: JOIN Genre table
  GROUP BY
    -- TODO: Add appropriate GROUP BY columns
),
ranked AS (
  SELECT
    *,
    -- TODO: Use ROW_NUMBER() window function
    --       PARTITION BY CustomerId
    --       ORDER BY GenreRevenue DESC
  FROM customer_genre_spend
)
SELECT
  -- TODO: Select CustomerId
  -- TODO: Select CustomerName
  -- TODO: Select GenreName as FavoriteGenre
  -- TODO: Select GenreRevenue as AmountSpentOnFavoriteGenre
FROM ranked
-- TODO: Filter to get only the top genre per customer (rn = 1)
-- TODO: ORDER BY AmountSpentOnFavoriteGenre DESC


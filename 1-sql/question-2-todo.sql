-- Question 2 (TODO):
-- For each pair of music genres, find how many DISTINCT customers
-- have bought tracks in BOTH genres. Return the genre pairs with
-- the highest number of shared customers.

WITH customer_genres AS (
    -- TODO: build a result set with DISTINCT (CustomerId, GenreId)
    --       for all purchases.
    --
    -- Hints:
    --  - Start from Invoice and InvoiceLine.
    --  - Join to Track to reach GenreId.
    --  - Use SELECT DISTINCT to avoid duplicates.
    --
    -- Example structure (replace ...):
    -- SELECT DISTINCT
    --     ...
    -- FROM Invoice i
    -- JOIN InvoiceLine il ON ...
    -- JOIN Track t        ON ...
),

genre_pairs AS (
    -- TODO: for each customer, generate ALL ordered pairs of genres
    --       they bought, avoiding (A,B) and (B,A) duplicates.
    --
    -- Hints:
    --  - Self-join customer_genres as cg1 and cg2.
    --  - Join on same CustomerId.
    --  - Use a condition like cg1.GenreId < cg2.GenreId
    --    to keep only one ordering of the pair.
    --
    -- Example structure (replace ...):
    -- SELECT
    --     ...
    -- FROM customer_genres cg1
    -- JOIN customer_genres cg2
    --   ON ...
    --  AND ...
)

-- TODO: aggregate by genre pair and count distinct customers
SELECT
    -- g1.GenreId AS Genre1Id,
    -- g1.Name    AS Genre1Name,
    -- g2.GenreId AS Genre2Id,
    -- g2.Name    AS Genre2Name,
    -- COUNT(DISTINCT gp.CustomerId) AS SharedCustomerCount
FROM genre_pairs gp
JOIN Genre g1 ON ...
JOIN Genre g2 ON ...
GROUP BY
    -- ...
ORDER BY
    -- SharedCustomerCount DESC,
    -- Genre1Name,
    -- Genre2Name;

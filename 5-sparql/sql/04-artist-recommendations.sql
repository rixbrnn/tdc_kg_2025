-- Q: Given an artist (e.g., "Iron Maiden"), recommend similar artists
--    based on shared customer purchases
--
-- Purpose: WOW FACTOR - show recommendation system complexity in SQL
-- Complexity: ⭐⭐⭐⭐⭐ (5/5) - Multiple CTEs, complex logic
-- Expected Result: Artists similar to Iron Maiden, ranked by customer overlap
--
-- Demonstrates: "Customers who bought X also bought Y" is SQL hell
-- Pain Points: 60+ lines, multiple CTEs, hard to debug
--
-- Use Case: Netflix recommendations, Amazon "customers also bought", 
--           Spotify "similar artists", e-commerce product recommendations

WITH target_customers AS (
  -- Step 1: Find all customers who bought Iron Maiden tracks
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
  -- Step 2: Find all OTHER artists these customers bought
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
  WHERE a.Name != 'Iron Maiden'  -- Exclude the original artist
  GROUP BY tc.CustomerId, a.ArtistId, a.Name
),
artist_scores AS (
  -- Step 3: Calculate similarity scores for each artist
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

-- Notes for Presentation:
-- ✗ 60+ lines for a simple business question
-- ✗ Three CTEs required to break down the logic
-- ✗ Repeated 5-table joins in both CTEs
-- ✗ Hard to extend (what if we want "customers who bought X OR Y"?)
-- ✗ Performance degrades with large datasets
--
-- → Compare with SPARQL: 15 lines with natural graph traversal
-- → ?customer bought ironMaiden . ?customer bought ?other .
--
-- This is how Amazon, Netflix, Spotify actually work!
-- Real-world challenge: SQL requires denormalization or complex ETL
-- Graph databases handle this natively

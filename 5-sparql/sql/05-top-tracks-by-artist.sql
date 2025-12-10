-- Q: For each artist, show their top 3 best-selling tracks
--
-- Purpose: Show SQL window functions work but require subqueries
-- Complexity: ⭐⭐⭐ (3/5) - Window functions + ranking
-- Expected Result: Top 3 tracks per artist with revenue
--
-- Demonstrates: SQL can do ranking, but it's verbose
-- Pain Points: Window functions are powerful but syntax is complex

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

-- Alternative approach without window functions (even more verbose):
-- Would require self-join to count how many tracks have higher revenue

-- Notes for Presentation:
-- ✓ Window functions are powerful
-- ✗ PARTITION BY + ROW_NUMBER is not intuitive for non-SQL experts
-- ✗ Requires CTE to make readable
-- ✗ Hard to modify (what if we want "top 3 per genre per artist"?)
--
-- → Compare with SPARQL: Similar complexity, but more flexible
--
-- Real-world use: E-commerce "bestsellers", music "top charts", 
--                 product catalogs "most popular items"

-- Q2: If a customer buys track "The Trooper", what other tracks
--     are most often bought in the same invoices?
--     Show the top 10 "also bought" tracks.

WITH target_track AS (
  SELECT TrackId
  FROM Track
  WHERE Name = 'The Trooper'
),
co_purchases AS (
  SELECT
    il2.TrackId AS OtherTrackId,
    COUNT(*) AS CoPurchaseCount
  FROM InvoiceLine il1
  JOIN target_track t
    ON il1.TrackId = t.TrackId
  JOIN InvoiceLine il2
    ON il1.InvoiceId = il2.InvoiceId
   AND il2.TrackId <> t.TrackId
  GROUP BY il2.TrackId
)
SELECT
  co.OtherTrackId,
  tr.Name AS OtherTrackName,
  co.CoPurchaseCount
FROM co_purchases co
JOIN Track tr
  ON tr.TrackId = co.OtherTrackId
ORDER BY
  co.CoPurchaseCount DESC,
  OtherTrackName
LIMIT 10;

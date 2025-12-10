# Step 0 — MySQL Chinook DB Setup (Docker)

In this workshop we’ll use the **Chinook** sample database running on **MySQL** inside Docker.
This folder contains:

* `Chinook_MySql.sql` — schema + data seed
* `docker-compose.yml` — starts MySQL and auto-loads the seed SQL
* `Chinook_MySql_AutoIncrementPKs.sql` — adjusts PKs to auto-increment

---

## 1) Start the database

From the repo root:

```bash
cd 0-dbsetup
docker compose up -d
```

This will:

1. Pull a MySQL image (if not present)
2. Start a container on port **3306**
3. Run the SQL scripts in `/docker-entrypoint-initdb.d/` on first startup

After docker compose finished, you should see 1 container running called `chinook` and 1 image pulled for `mysql`, with below similar logs:
```
[+] Running 2/2
 ✔ Network chinook_default    Created
 ✔ Container chinook-mysql-1  Started
 ```    

Check logs if you want to confirm initialization:

```bash
docker compose logs -f mysql
```

You should see a message similar to “ready for connections”.

---

## 2) Connection details

The container is configured with:

* **Host:** `localhost`
* **Port:** `3306`
* **Database:** `Chinook`
* **User:** `chinook`
* **Password:** `chinook`
* **Root password:** `chinook` (not needed unless you prefer root)

---

## 3) Connect using DBeaver

1. Open **DBeaver**
2. **Database → New Database Connection**
3. Select **MySQL**
4. Fill in:

   * **Server Host:** `localhost`
   * **Port:** `3306`
   * **Database:** `Chinook`
   * **Username:** `chinook`
   * **Password:** `chinook`
5. Click **Test Connection**, then **Finish**

### ⚠️ If you get an auth / SSL error (common with MySQL 8+)

In the connection settings:

* Go to **Driver properties**
* Set:

  * `allowPublicKeyRetrieval = true`
  * `useSSL = false`

Or add to the JDBC URL (Driver properties / URL field):

```
jdbc:mysql://localhost:3306/Chinook?allowPublicKeyRetrieval=true&useSSL=false
```

> 💡 **Still having issues?** Check the [Common issues and workarounds](#common-issues-and-workarounds) section below for additional troubleshooting steps.

---

## 4) Quick healthcheck

Run this in DBeaver to confirm data is loaded:

```sql
SHOW TABLES;

SELECT COUNT(*) FROM Artist;
SELECT COUNT(*) FROM Album;
SELECT COUNT(*) FROM Track;
SELECT COUNT(*) FROM Customer;
SELECT COUNT(*) FROM Invoice;
SELECT COUNT(*) FROM InvoiceLine;
```

None of these counts should be `0`.

Or simply compare with the following UI:
![alt text](db_properly_set.png)

See the high-level Chinook relational database model that represents a digital media store, including tables for artists, albums, media tracks, invoices and customers: ![RDB Model](rdb_model.png)

---

## 5) Stopping / resetting the DB

Stop the container:

```bash
docker compose down
```

If you want to delete all data and re-seed from scratch:

```bash
docker compose down -v
docker compose up -d
```

---

Once you’re connected and the health check passes, proceed to **Step 1 — SQL**.

## ⚠️ Common issues and workarounds
If you see the following error when checking the logs:
```bash
 Another process with pid 121 is using unix socket file.
 Unable to setup unix socket lock file.
 Aborting
```
Run 
```bash
docker compose down -v
docker compose up -d
```

---
If you see the following error when connecting to it from DBeaver:
`Public Key Retrieval is not allowed`
1. Edit the connection,
2. Go to driver properties,
3. Mark allowPublicKeyRetrieval as `TRUE`
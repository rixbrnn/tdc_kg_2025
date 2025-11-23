# Prerequisites

Please complete these steps **before the workshop** so we can jump straight into the hands-on parts.

---

## 1) Repository & dataset

* **Git** installed.
* Clone the Chinook sample database repo (we’ll use the SQLite version):

  ```bash
  git clone https://github.com/lerocha/chinook-database
  ```

---

## 2) SQL client

* **DBeaver** (or any SQL client that can open SQLite).

  Download:
  [https://dbeaver.io/download/](https://dbeaver.io/download/)

---

## 3) Docker (for Blazegraph)

* **Docker Desktop** installed and running.

  Download:
  [https://www.docker.com/get-started/](https://www.docker.com/get-started/)

* Verify Docker + Compose:

  ```bash
  docker --version
  docker compose version
  ```

---

## 4) Ontology editor (Protégé)

* **Protégé Desktop** (free OWL ontology editor).

  Download:
  [https://protege.stanford.edu/software.php](https://protege.stanford.edu/software.php)

* **Java runtime**:

  * On **Windows**, Protégé installers usually include a JRE.
  * On **macOS/Linux**, install Java if you don’t already have it (**Java 11+** is fine).

Sanity check:

```bash
java -version
```

---

## 5) Node.js runtime (for the RDB → RDF converter)

We’ll code the converter in JavaScript.

* Install **Node.js 24 LTS or newer** (preferred for stability).

  Download:
  [https://nodejs.org/en/download](https://nodejs.org/en/download)

* Verify:

  ```bash
  node --version
  npm --version
  ```

---

## 6) HTTP upload helper

We’ll upload TriG to Blazegraph via HTTP.

* **curl** (macOS/Linux) or **PowerShell** (Windows).

  Check curl:

  ```bash
  curl --version
  ```

---

## 7) Optional but recommended checks

* Make sure **port 9999 is free** (Blazegraph default in this workshop).
* Have at least ~1GB free disk space for Docker images and node modules.

---

## ✅ You’re ready

If everything above is installed, you’re good to go.
During the workshop we’ll provide exact commands for:

* opening the SQLite DB in DBeaver
* running the Node converter
* starting Blazegraph and loading RDF
* executing SPARQL in the Blazegraph UI

// 3-converter/src/export_rdf.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import mysql from 'mysql2/promise';
import { Writer } from 'n3';

import {
  NS,
  iri,
  mapGenre,
  mapMediaType,
  mapArtist,
  mapAlbum,
  mapTrack,
  mapEmployee,
  mapCustomer,
  mapInvoice,
  mapInvoiceLine
} from '../solutions/mapping.js';

// ---------- config ----------

const dbConfig = {
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT || '3306'),
  user:     process.env.DB_USER     || 'chinook',
  password: process.env.DB_PASSWORD || 'chinook',
  database: process.env.DB_NAME     || 'Chinook'
};

const OUTPUT_FILE = '../../rdf/chinook.trig';

// ---------- helper for Writer.end() ----------

function endWriter(writer) {
  return new Promise((resolve, reject) => {
    writer.end((err, result) => (err ? reject(err) : resolve(result)));
  });
}

// ---------- export functions ----------

async function exportGenres(conn, writer) {
  const [rows] = await conn.execute('SELECT GenreId, Name FROM Genre');
  for (const row of rows) {
    mapGenre(row, writer);
  }
}

async function exportMediaTypes(conn, writer) {
  const [rows] = await conn.execute('SELECT MediaTypeId, Name FROM MediaType');
  for (const row of rows) {
    mapMediaType(row, writer);
  }
}

async function exportArtists(conn, writer) {
  const [rows] = await conn.execute('SELECT ArtistId, Name FROM Artist');
  for (const row of rows) {
    mapArtist(row, writer);
  }
}

async function exportAlbums(conn, writer) {
  const [rows] = await conn.execute('SELECT AlbumId, Title, ArtistId FROM Album');
  for (const row of rows) {
    mapAlbum(row, writer);
  }
}

async function exportTracks(conn, writer) {
  const [rows] = await conn.execute(`
    SELECT TrackId, Name, AlbumId, MediaTypeId, GenreId
    FROM Track
  `);
  for (const row of rows) {
    mapTrack(row, writer);
  }
}

async function exportEmployees(conn, writer) {
  const [rows] = await conn.execute(`
    SELECT EmployeeId, FirstName, LastName, Title, ReportsTo
    FROM Employee
  `);
  for (const row of rows) {
    mapEmployee(row, writer);
  }
}

async function exportCustomers(conn, writer) {
  const [rows] = await conn.execute(`
    SELECT CustomerId, FirstName, LastName, SupportRepId
    FROM Customer
  `);
  for (const row of rows) {
    mapCustomer(row, writer);
  }
}

async function exportInvoices(conn, writer) {
  const [rows] = await conn.execute(`
    SELECT InvoiceId, CustomerId, InvoiceDate, Total
    FROM Invoice
  `);
  for (const row of rows) {
    mapInvoice(row, writer);
  }
}

async function exportInvoiceLines(conn, writer) {
  const [rows] = await conn.execute(`
    SELECT InvoiceLineId, InvoiceId, TrackId, UnitPrice, Quantity
    FROM InvoiceLine
  `);
  for (const row of rows) {
    mapInvoiceLine(row, writer);
  }
}

// ---------- main ----------

async function main() {
  console.log('Connecting to MySQL with config:', dbConfig);
  const conn = await mysql.createConnection(dbConfig);

  const writer = new Writer({
    prefixes: {
      '':   NS,
      rdf:  'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      xsd:  'http://www.w3.org/2001/XMLSchema#'
    }
  });

  console.log('Exporting lookup tables (Genre, MediaType, Artist, Album, Track)…');
  await exportGenres(conn, writer);
  await exportMediaTypes(conn, writer);
  await exportArtists(conn, writer);
  await exportAlbums(conn, writer);
  await exportTracks(conn, writer);

  console.log('Exporting employees and customers…');
  await exportEmployees(conn, writer);
  await exportCustomers(conn, writer);

  console.log('Exporting invoices and invoice lines…');
  await exportInvoices(conn, writer);
  await exportInvoiceLines(conn, writer);

  console.log('Finalizing RDF…');
  const trig = await endWriter(writer);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outPath = path.resolve(__dirname, OUTPUT_FILE);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, trig, 'utf8');

  console.log(`RDF written to ${outPath}`);

  await conn.end();
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error during export:', err);
  process.exit(1);
});

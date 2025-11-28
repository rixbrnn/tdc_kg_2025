// 3-converter/src/mapping.js
import { DataFactory } from 'n3';

const { namedNode, literal } = DataFactory;

export const NS  = 'http://example.org/chinook#';
export const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
export const XSD = 'http://www.w3.org/2001/XMLSchema#';

function classIri(localName) {
  return namedNode(NS + localName);
}

// ===== IRI helpers =====

export const iri = {
  customer:  (id) => namedNode(`${NS}Customer/${id}`),
  employee:  (id) => namedNode(`${NS}Employee/${id}`),
  invoice:   (id) => namedNode(`${NS}Invoice/${id}`),
  line:      (id) => namedNode(`${NS}InvoiceLine/${id}`),
  track:     (id) => namedNode(`${NS}Track/${id}`),
  album:     (id) => namedNode(`${NS}Album/${id}`),
  artist:    (id) => namedNode(`${NS}Artist/${id}`),
  genre:     (id) => namedNode(`${NS}Genre/${id}`),
  mediaType: (id) => namedNode(`${NS}MediaType/${id}`),
};

const p = {
  type:         namedNode(RDF + 'type'),
  customerId:   namedNode(NS + 'customerId'),
  employeeId:   namedNode(NS + 'employeeId'),
  invoiceId:    namedNode(NS + 'invoiceId'),
  invoiceDate:  namedNode(NS + 'invoiceDate'),
  total:        namedNode(NS + 'total'),
  unitPrice:    namedNode(NS + 'unitPrice'),
  quantity:     namedNode(NS + 'quantity'),
  fullName:     namedNode(NS + 'fullName'),
  title:        namedNode(NS + 'title'),
  name:         namedNode(NS + 'name'),
  hasInvoice:   namedNode(NS + 'hasInvoice'),
  hasLine:      namedNode(NS + 'hasLine'),
  lineTrack:    namedNode(NS + 'lineTrack'),
  hasAlbum:     namedNode(NS + 'hasAlbum'),
  hasArtist:    namedNode(NS + 'hasArtist'),
  hasGenre:     namedNode(NS + 'hasGenre'),
  hasMediaType: namedNode(NS + 'hasMediaType'),
  supportedBy:  namedNode(NS + 'supportedBy'),
  reportsTo:    namedNode(NS + 'reportsTo')
};

const c = {
  Customer:    classIri('Customer'),
  Employee:    classIri('Employee'),
  Invoice:     classIri('Invoice'),
  InvoiceLine: classIri('InvoiceLine'),
  Track:       classIri('Track'),
  Album:       classIri('Album'),
  Artist:      classIri('Artist'),
  Genre:       classIri('Genre'),
  MediaType:   classIri('MediaType'),
};

// ===== literal helpers =====

const intLit  = (value) => literal(String(value), namedNode(XSD + 'integer'));
const decLit  = (value) => literal(String(value), namedNode(XSD + 'decimal'));
const strLit  = (value) => literal(String(value));
const dateLit = (value) => literal(value.toISOString(), namedNode(XSD + 'dateTime'));

// ===== mapping functions =====

// Genre
export function mapGenre(row, writer) {
  const subj = iri.genre(row.GenreId);
  writer.addQuad(subj, p.type, c.Genre);
  if (row.Name != null) {
    writer.addQuad(subj, p.name, strLit(row.Name));
  }
}

// MediaType
export function mapMediaType(row, writer) {
  const subj = iri.mediaType(row.MediaTypeId);
  writer.addQuad(subj, p.type, c.MediaType);
  if (row.Name != null) {
    writer.addQuad(subj, p.name, strLit(row.Name));
  }
}

// Artist
export function mapArtist(row, writer) {
  const subj = iri.artist(row.ArtistId);
  writer.addQuad(subj, p.type, c.Artist);
  if (row.Name != null) {
    writer.addQuad(subj, p.name, strLit(row.Name));
  }
}

// Album
export function mapAlbum(row, writer) {
  const subj = iri.album(row.AlbumId);
  writer.addQuad(subj, p.type, c.Album);
  if (row.Title != null) {
    writer.addQuad(subj, p.name, strLit(row.Title));
  }
  if (row.ArtistId != null) {
    const artist = iri.artist(row.ArtistId);
    writer.addQuad(subj, p.hasArtist, artist);
  }
}

// Track
export function mapTrack(row, writer) {
  const subj = iri.track(row.TrackId);
  writer.addQuad(subj, p.type, c.Track);
  if (row.Name != null) {
    writer.addQuad(subj, p.name, strLit(row.Name));
  }
  if (row.AlbumId != null) {
    writer.addQuad(subj, p.hasAlbum, iri.album(row.AlbumId));
  }
  if (row.GenreId != null) {
    writer.addQuad(subj, p.hasGenre, iri.genre(row.GenreId));
  }
  if (row.MediaTypeId != null) {
    writer.addQuad(subj, p.hasMediaType, iri.mediaType(row.MediaTypeId));
  }
}

// Employee
export function mapEmployee(row, writer) {
  const subj = iri.employee(row.EmployeeId);
  const fullName = `${row.FirstName ?? ''} ${row.LastName ?? ''}`.trim();

  writer.addQuad(subj, p.type, c.Employee);
  writer.addQuad(subj, p.employeeId, intLit(row.EmployeeId));

  if (fullName) {
    writer.addQuad(subj, p.fullName, strLit(fullName));
  }
  if (row.Title != null) {
    writer.addQuad(subj, p.title, strLit(row.Title));
  }

  // Hierarchy: reportsTo
  if (row.ReportsTo != null) {
    const manager = iri.employee(row.ReportsTo);
    writer.addQuad(subj, p.reportsTo, manager);
  }
}

// Customer
export function mapCustomer(row, writer) {
  const subj = iri.customer(row.CustomerId);
  const fullName = `${row.FirstName ?? ''} ${row.LastName ?? ''}`.trim();

  writer.addQuad(subj, p.type, c.Customer);
  writer.addQuad(subj, p.customerId, intLit(row.CustomerId));

  if (fullName) {
    writer.addQuad(subj, p.fullName, strLit(fullName));
  }

  if (row.SupportRepId != null) {
    const rep = iri.employee(row.SupportRepId);
    writer.addQuad(subj, p.supportedBy, rep);
  }
}

// Invoice
export function mapInvoice(row, writer) {
  const inv = iri.invoice(row.InvoiceId);
  const cust = iri.customer(row.CustomerId);

  writer.addQuad(inv, p.type, c.Invoice);
  writer.addQuad(inv, p.invoiceId, intLit(row.InvoiceId));

  if (row.InvoiceDate != null) {
    // row.InvoiceDate may already be a JS Date; if it's a string, new Date() is fine
    const date = row.InvoiceDate instanceof Date ? row.InvoiceDate : new Date(row.InvoiceDate);
    writer.addQuad(inv, p.invoiceDate, dateLit(date));
  }
  if (row.Total != null) {
    writer.addQuad(inv, p.total, decLit(row.Total));
  }

  // Link customer -> invoice
  writer.addQuad(cust, p.hasInvoice, inv);
}

// InvoiceLine
export function mapInvoiceLine(row, writer) {
  const line = iri.line(row.InvoiceLineId);
  const inv  = iri.invoice(row.InvoiceId);
  const trk  = iri.track(row.TrackId);

  writer.addQuad(line, p.type, c.InvoiceLine);
  writer.addQuad(line, p.unitPrice, decLit(row.UnitPrice));
  writer.addQuad(line, p.quantity, intLit(row.Quantity));

  // invoice hasLine line
  writer.addQuad(inv, p.hasLine, line);

  // lineTrack link
  writer.addQuad(line, p.lineTrack, trk);
}

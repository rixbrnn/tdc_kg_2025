// 3-converter/src/mapping.js
import { DataFactory } from 'n3';

const { namedNode, literal } = DataFactory;

export const NS  = 'http://example.org/chinook#';
export const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
export const XSD = 'http://www.w3.org/2001/XMLSchema#';

function classIri(localName) {
  return namedNode(NS + localName);
}

// ===== auxiliares de IRI =====

export const subjectIri = {
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

const predicate = {
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

const class_ = {
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

// ===== auxiliares de literais =====

const intLit  = (value) => literal(String(value), namedNode(XSD + 'integer'));
const decLit  = (value) => literal(String(value), namedNode(XSD + 'decimal'));
const strLit  = (value) => literal(String(value));
const dateLit = (value) => literal(value.toISOString(), namedNode(XSD + 'dateTime'));

// ===== funções de mapeamento =====

// Genre
export function mapGenre(row, writer) {
  const subj = subjectIri.genre(row.GenreId);
  writer.addQuad(subj, predicate.type, class_.Genre);
  if (row.Name != null) {
    writer.addQuad(subj, predicate.name, strLit(row.Name));
  }
}

// MediaType
export function mapMediaType(row, writer) {
  const subj = subjectIri.mediaType(row.MediaTypeId);
  writer.addQuad(subj, predicate.type, class_.MediaType);
  if (row.Name != null) {
    writer.addQuad(subj, predicate.name, strLit(row.Name));
  }
}

// Artist
export function mapArtist(row, writer) {
  const subj = subjectIri.artist(row.ArtistId);
  writer.addQuad(subj, predicate.type, class_.Artist);
  if (row.Name != null) {
    writer.addQuad(subj, predicate.name, strLit(row.Name));
  }
}

// Album
export function mapAlbum(row, writer) {
  const subj = subjectIri.album(row.AlbumId);
  writer.addQuad(subj, predicate.type, class_.Album);
  if (row.Title != null) {
    writer.addQuad(subj, predicate.name, strLit(row.Title));
  }
  if (row.ArtistId != null) {
    const artist = subjectIri.artist(row.ArtistId);
    writer.addQuad(subj, predicate.hasArtist, artist);
  }
}

// Track
export function mapTrack(row, writer) {
  const subj = subjectIri.track(row.TrackId);
  writer.addQuad(subj, predicate.type, class_.Track);
  if (row.Name != null) {
    writer.addQuad(subj, predicate.name, strLit(row.Name));
  }
  if (row.AlbumId != null) {
    writer.addQuad(subj, predicate.hasAlbum, subjectIri.album(row.AlbumId));
  }
  if (row.GenreId != null) {
    writer.addQuad(subj, predicate.hasGenre, subjectIri.genre(row.GenreId));
  }
  if (row.MediaTypeId != null) {
    writer.addQuad(subj, predicate.hasMediaType, subjectIri.mediaType(row.MediaTypeId));
  }
}

// Employee
export function mapEmployee(row, writer) {
  const subj = subjectIri.employee(row.EmployeeId);
  const fullName = `${row.FirstName ?? ''} ${row.LastName ?? ''}`.trim();

  writer.addQuad(subj, predicate.type, class_.Employee);
  writer.addQuad(subj, predicate.employeeId, intLit(row.EmployeeId));

  if (fullName) {
    writer.addQuad(subj, predicate.fullName, strLit(fullName));
  }
  if (row.Title != null) {
    writer.addQuad(subj, predicate.title, strLit(row.Title));
  }

  // Hierarquia: reportsTo
  if (row.ReportsTo != null) {
    const manager = subjectIri.employee(row.ReportsTo);
    writer.addQuad(subj, predicate.reportsTo, manager);
  }
}

// Customer
export function mapCustomer(row, writer) {
  const subj = subjectIri.customer(row.CustomerId);
  const fullName = `${row.FirstName ?? ''} ${row.LastName ?? ''}`.trim();

  writer.addQuad(subj, predicate.type, class_.Customer);
  writer.addQuad(subj, predicate.customerId, intLit(row.CustomerId));

  if (fullName) {
    writer.addQuad(subj, predicate.fullName, strLit(fullName));
  }

  if (row.SupportRepId != null) {
    const rep = subjectIri.employee(row.SupportRepId);
    writer.addQuad(subj, predicate.supportedBy, rep);
  }
}

// Invoice
export function mapInvoice(row, writer) {
  const inv = subjectIri.invoice(row.InvoiceId);
  const cust = subjectIri.customer(row.CustomerId);

  writer.addQuad(inv, predicate.type, class_.Invoice);
  writer.addQuad(inv, predicate.invoiceId, intLit(row.InvoiceId));

  if (row.InvoiceDate != null) {
    // row.InvoiceDate pode já ser um Date JS; se for uma string, new Date() funciona
    const date = row.InvoiceDate instanceof Date ? row.InvoiceDate : new Date(row.InvoiceDate);
    writer.addQuad(inv, predicate.invoiceDate, dateLit(date));
  }
  if (row.Total != null) {
    writer.addQuad(inv, predicate.total, decLit(row.Total));
  }

  // Vincula customer -> invoice
  writer.addQuad(cust, predicate.hasInvoice, inv);
}

// InvoiceLine
export function mapInvoiceLine(row, writer) {
  const line = subjectIri.line(row.InvoiceLineId);
  const inv  = subjectIri.invoice(row.InvoiceId);
  const trk  = subjectIri.track(row.TrackId);

  writer.addQuad(line, predicate.type, class_.InvoiceLine);
  writer.addQuad(line, predicate.unitPrice, decLit(row.UnitPrice));
  writer.addQuad(line, predicate.quantity, intLit(row.Quantity));

  // invoice hasLine line
  writer.addQuad(inv, predicate.hasLine, line);

  // link lineTrack
  writer.addQuad(line, predicate.lineTrack, trk);
}

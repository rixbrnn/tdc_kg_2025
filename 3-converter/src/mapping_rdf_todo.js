// 3-converter/src/mapping.js
// Lógica de mapeamento de linhas MySQL para triplas RDF.
//
// Neste workshop, você completará alguns TODOs:
//
//  - Criar a função mapEmployee
//  - Criar a função mapCustomer
//
// Todo o resto já está implementado para você.

import { DataFactory } from 'n3';

const { namedNode, literal } = DataFactory;

export const NS  = 'http://example.org/chinook#';
export const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
export const XSD = 'http://www.w3.org/2001/XMLSchema#';

function classIri(localName) {
  return namedNode(NS + localName);
}

// ===== auxiliares de IRI =====

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

// ===== auxiliares de literais =====

const intLit  = (value) => literal(String(value), namedNode(XSD + 'integer'));
const decLit  = (value) => literal(String(value), namedNode(XSD + 'decimal'));
const strLit  = (value) => literal(String(value));
const dateLit = (value) => literal(value.toISOString(), namedNode(XSD + 'dateTime'));

// ===== funções de mapeamento =====

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

// TODO: Mapear employee
// Lembre-se de que há um auto-relacionamento
export function mapEmployee(row, writer) {
  const subj = iri.employee(row.EmployeeId);
  // TODO: Criar nome completo
  const fullName = ``.trim();

  // TODO: Adicionar triplas para type e employeeId (use intLit para employeeId)
  writer.addQuad(subj, null, null);
  writer.addQuad(subj, null, null);

  if (fullName) {
    // TODO: Adicionar tripla para fullName
    writer.addQuad(subj, null, strLit(fullName));
  }
  if (row.Title != null) {
    // TODO: Adicionar tripla para title (use strLit)
    writer.addQuad(subj, null, null);
  }

  // Hierarquia: reportsTo
  if (row.ReportsTo != null) {
    // TODO: Adicionar tripla para reportsTo
    const manager = null;
    writer.addQuad(subj, null, manager);
  }
}

// TODO: Mapear customer
// Lembre-se de que há uma conexão com o representante de suporte (employee)
export function mapCustomer(row, writer) {
  const subj = iri.customer(row.CustomerId);
  // TODO: Criar nome completo
  const fullName = ``.trim();

  // TODO: Adicionar triplas para type e customerId (use intLit para customerId)
  writer.addQuad(subj, null, null);
  writer.addQuad(subj, null, null);

  if (fullName) {
    // TODO: Adicionar tripla para fullName
    writer.addQuad(subj, null, strLit(fullName));
  }

  if (row.SupportRepId != null) {
    // TODO: Adicionar tripla para supportedBy
    const rep = null;
    writer.addQuad(subj, null, rep);
  }
}

// Invoice
export function mapInvoice(row, writer) {
  const inv = iri.invoice(row.InvoiceId);
  const cust = iri.customer(row.CustomerId);

  writer.addQuad(inv, p.type, c.Invoice);
  writer.addQuad(inv, p.invoiceId, intLit(row.InvoiceId));

  if (row.InvoiceDate != null) {
    const date = row.InvoiceDate instanceof Date
      ? row.InvoiceDate
      : new Date(row.InvoiceDate);
    writer.addQuad(inv, p.invoiceDate, dateLit(date));
  }
  if (row.Total != null) {
    writer.addQuad(inv, p.total, decLit(row.Total));
  }

  // Customer -> hasInvoice -> Invoice
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

  // Invoice -> hasLine -> InvoiceLine
  writer.addQuad(inv, p.hasLine, line);

  // InvoiceLine -> lineTrack -> Track
  writer.addQuad(line, p.lineTrack, trk);
}

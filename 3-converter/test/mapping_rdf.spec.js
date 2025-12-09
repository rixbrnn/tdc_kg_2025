import {
  NS,
  RDF,
  XSD,
  iri,
  mapGenre,
  mapMediaType,
  mapArtist,
  mapEmployee,
  mapCustomer,
  mapAlbum,
  mapTrack,
  mapInvoice,
  mapInvoiceLine
} from '../src/mapping_rdf_todo.js';
import { DataFactory } from 'n3';

const { namedNode, literal } = DataFactory;

const p = {
  type:         namedNode(RDF + 'type'),
  name:         namedNode(NS + 'name'),
  hasArtist:    namedNode(NS + 'hasArtist'),
  hasAlbum:     namedNode(NS + 'hasAlbum'),
  hasGenre:     namedNode(NS + 'hasGenre'),
  hasMediaType: namedNode(NS + 'hasMediaType'),
  hasInvoice:   namedNode(NS + 'hasInvoice'),
  invoiceId:    namedNode(NS + 'invoiceId'),
  invoiceDate:  namedNode(NS + 'invoiceDate'),
  total:        namedNode(NS + 'total'),
  unitPrice:    namedNode(NS + 'unitPrice'),
  quantity:     namedNode(NS + 'quantity'),
  hasLine:      namedNode(NS + 'hasLine'),
  lineTrack:    namedNode(NS + 'lineTrack')
};

const c = {
  Genre:       namedNode(NS + 'Genre'),
  MediaType:   namedNode(NS + 'MediaType'),
  Artist:      namedNode(NS + 'Artist'),
  Album:       namedNode(NS + 'Album'),
  Track:       namedNode(NS + 'Track'),
  Invoice:     namedNode(NS + 'Invoice'),
  InvoiceLine: namedNode(NS + 'InvoiceLine')
};

function intLit(v)  { return literal(String(v), namedNode(XSD + 'integer')); }
function decLit(v)  { return literal(String(v), namedNode(XSD + 'decimal')); }
function dateLit(d) { return literal(d.toISOString(), namedNode(XSD + 'dateTime')); }

function createMockWriter() {
  const quads = [];
  return {
    addQuad: (...args) => quads.push(args),
    getQuads: () => quads
  };
}

describe('Mapping functions (implemented)', () => {
  test('mapGenre writes type and name', () => {
    const writer = createMockWriter();
    mapGenre({ GenreId: 1, Name: 'Rock' }, writer);

    const quads = writer.getQuads();
    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.genre(1), p.type, c.Genre],
        [iri.genre(1), p.name, literal('Rock')]
      ])
    );
  });

  test('mapMediaType writes type and name', () => {
    const writer = createMockWriter();
    mapMediaType({ MediaTypeId: 1, Name: 'MPEG' }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.mediaType(1), p.type, c.MediaType],
        [iri.mediaType(1), p.name, literal('MPEG')]
      ])
    );
  });

  test('mapArtist writes type and name', () => {
    const writer = createMockWriter();
    mapArtist({ ArtistId: 9, Name: 'NIN' }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.artist(9), p.type, c.Artist],
        [iri.artist(9), p.name, literal('NIN')]
      ])
    );
  });

  test('mapAlbum writes type, title and hasArtist', () => {
    const writer = createMockWriter();
    mapAlbum({ AlbumId: 2, Title: 'The Wall', ArtistId: 7 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.album(2), p.type, c.Album],
        [iri.album(2), p.name, literal('The Wall')],
        [iri.album(2), p.hasArtist, iri.artist(7)]
      ])
    );
  });

  test('mapTrack writes links to album/genre/mediaType', () => {
    const writer = createMockWriter();
    mapTrack({ TrackId: 3, Name: 'Track 3', AlbumId: 2, GenreId: 1, MediaTypeId: 5 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.track(3), p.type, c.Track],
        [iri.track(3), p.name, literal('Track 3')],
        [iri.track(3), p.hasAlbum, iri.album(2)],
        [iri.track(3), p.hasGenre, iri.genre(1)],
        [iri.track(3), p.hasMediaType, iri.mediaType(5)]
      ])
    );
  });

  test('mapInvoice writes invoice fields and customer->hasInvoice', () => {
    const writer = createMockWriter();
    const date = new Date('2020-01-01T10:00:00Z');

    mapInvoice({ InvoiceId: 10, CustomerId: 99, InvoiceDate: date, Total: 12.34 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.invoice(10), p.type, c.Invoice],
        [iri.invoice(10), p.invoiceId, intLit(10)],
        [iri.invoice(10), p.invoiceDate, dateLit(date)],
        [iri.invoice(10), p.total, decLit(12.34)],
        [iri.customer(99), p.hasInvoice, iri.invoice(10)]
      ])
    );
  });

  test('mapInvoiceLine writes unitPrice/quantity and links', () => {
    const writer = createMockWriter();
    mapInvoiceLine({ InvoiceLineId: 7, InvoiceId: 10, TrackId: 3, UnitPrice: 0.99, Quantity: 2 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [iri.line(7), p.type, c.InvoiceLine],
        [iri.line(7), p.unitPrice, decLit(0.99)],
        [iri.line(7), p.quantity, intLit(2)],
        [iri.invoice(10), p.hasLine, iri.line(7)],
        [iri.line(7), p.lineTrack, iri.track(3)]
      ])
    );
  });
});

describe('Mapping functions (TODOs)', () => {
  test('mapEmployee should exist and map Employee with reportsTo', async () => {
    const writer = createMockWriter();
    // This and below will FAIL until implemented
    expect(typeof mapEmployee).toBe('function'); 

    mapEmployee({ EmployeeId: 1, FirstName: 'Jane', LastName: 'Doe', Title: 'Rep', ReportsTo: 2 }, writer);
    const quads = writer.getQuads();
    expect(quads).toEqual(expect.arrayContaining([
      [iri.employee(1), namedNode(RDF + 'type'), namedNode(NS + 'Employee')],
      [iri.employee(1), namedNode(NS + 'employeeId'), intLit(1)],
      [iri.employee(1), namedNode(NS + 'fullName'), literal('Jane Doe')],
      [iri.employee(1), namedNode(NS + 'title'), literal('Rep')],
      [iri.employee(1), namedNode(NS + 'reportsTo'), iri.employee(2)]
    ]));
  });

  test('mapCustomer should exist and link to support representative', async () => {
    const writer = createMockWriter();
    // This and below will FAIL until implemented
    expect(typeof mapCustomer).toBe('function');

    mapCustomer({ CustomerId: 42, FirstName: 'John', LastName: 'Smith', SupportRepId: 1 }, writer);
    const quads = writer.getQuads();
    expect(quads).toEqual(expect.arrayContaining([
      [iri.customer(42), namedNode(RDF + 'type'), namedNode(NS + 'Customer')],
      [iri.customer(42), namedNode(NS + 'customerId'), intLit(42)],
      [iri.customer(42), namedNode(NS + 'fullName'), literal('John Smith')],
      [iri.customer(42), namedNode(NS + 'supportedBy'), iri.employee(1)]
    ]));
  });
});
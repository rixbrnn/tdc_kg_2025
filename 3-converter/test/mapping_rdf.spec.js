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

describe('Funções de mapeamento (implementadas)', () => {
  test('mapGenre escreve tipo e nome', () => {
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

  test('mapMediaType escreve tipo e nome', () => {
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

  test('mapArtist escreve tipo e nome', () => {
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

  test('mapAlbum escreve tipo, título e hasArtist', () => {
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

  test('mapTrack escreve links para album/genre/mediaType', () => {
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

  test('mapInvoice escreve campos da fatura e customer->hasInvoice', () => {
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

  test('mapInvoiceLine escreve unitPrice/quantity e links', () => {
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

describe('Funções de mapeamento (TODOs)', () => {
  test('mapEmployee deve existir e mapear Employee com reportsTo', async () => {
    const writer = createMockWriter();
    // Este e os abaixo irão FALHAR até serem implementados
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

  test('mapCustomer deve existir e linkar para o suporte (representante)', async () => {
    const writer = createMockWriter();
    // Este e os abaixo irão FALHAR até serem implementados
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

describe('Casos extras (validações adicionais)', () => {
  test('Employee: fullName compõe corretamente e omite quando vazio', () => {
    const w1 = createMockWriter();
    mapEmployee({ EmployeeId: 2, FirstName: 'Ana', LastName: 'Silva' }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([
        [iri.employee(2), namedNode(NS + 'fullName'), literal('Ana Silva')]
      ])
    );

    const w2 = createMockWriter();
    mapEmployee({ EmployeeId: 3, FirstName: '', LastName: '' }, w2);
    // Não deve ter fullName quando vazio
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[iri.employee(3), namedNode(NS + 'fullName'), expect.anything()]])
    );
  });

  test('Employee: reportsTo é emitido apenas quando presente', () => {
    const w1 = createMockWriter();
    mapEmployee({ EmployeeId: 4, ReportsTo: 1 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[iri.employee(4), namedNode(NS + 'reportsTo'), iri.employee(1)]])
    );

    const w2 = createMockWriter();
    mapEmployee({ EmployeeId: 5 }, w2);
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[iri.employee(5), namedNode(NS + 'reportsTo'), expect.anything()]])
    );
  });

  test('Customer: supportedBy aparece apenas com SupportRepId', () => {
    const w1 = createMockWriter();
    mapCustomer({ CustomerId: 10, FirstName: 'João', LastName: 'Pereira', SupportRepId: 2 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[iri.customer(10), namedNode(NS + 'supportedBy'), iri.employee(2)]])
    );

    const w2 = createMockWriter();
    mapCustomer({ CustomerId: 11, FirstName: 'Maria', LastName: 'Oliveira' }, w2);
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[iri.customer(11), namedNode(NS + 'supportedBy'), expect.anything()]])
    );
  });

  test('Invoice: aceita Date e string para invoiceDate', () => {
    const invoiceDate1 = new Date('2020-02-02T12:00:00Z');
    const w1 = createMockWriter();
    mapInvoice({ InvoiceId: 20, CustomerId: 99, InvoiceDate: invoiceDate1, Total: 1.23 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[iri.invoice(20), namedNode(NS + 'invoiceDate'), literal(invoiceDate1.toISOString(), namedNode(XSD + 'dateTime'))]])
    );

    const w2 = createMockWriter();
    const invoiceDate2 = '2020-03-03T08:00:00Z';
    mapInvoice({ InvoiceId: 21, CustomerId: 98, InvoiceDate: invoiceDate2, Total: 4.56 }, w2);
    expect(w2.getQuads()).toEqual(
      expect.arrayContaining([[iri.invoice(21), namedNode(NS + 'invoiceDate'), literal(new Date(invoiceDate2).toISOString(), namedNode(XSD + 'dateTime'))]])
    );
  });

  test('Track: omite links opcionais quando null/undefined', () => {
    const w = createMockWriter();
    mapTrack({ TrackId: 30, Name: 'Sem vínculos' }, w);
    const quads = w.getQuads();
    expect(quads).toEqual(expect.arrayContaining([[iri.track(30), p.type, c.Track]]));
    expect(quads).not.toEqual(expect.arrayContaining([[iri.track(30), p.hasAlbum, expect.anything()]]));
    expect(quads).not.toEqual(expect.arrayContaining([[iri.track(30), p.hasGenre, expect.anything()]]));
    expect(quads).not.toEqual(expect.arrayContaining([[iri.track(30), p.hasMediaType, expect.anything()]]));
  });
});

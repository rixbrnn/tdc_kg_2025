import {
  NS,
  RDF,
  XSD,
  subjectIri,
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

const predicate = {
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

const class_ = {
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
        [subjectIri.genre(1), predicate.type, class_.Genre],
        [subjectIri.genre(1), predicate.name, literal('Rock')]
      ])
    );
  });

  test('mapMediaType escreve tipo e nome', () => {
    const writer = createMockWriter();
    mapMediaType({ MediaTypeId: 1, Name: 'MPEG' }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [subjectIri.mediaType(1), predicate.type, class_.MediaType],
        [subjectIri.mediaType(1), predicate.name, literal('MPEG')]
      ])
    );
  });

  test('mapArtist escreve tipo e nome', () => {
    const writer = createMockWriter();
    mapArtist({ ArtistId: 9, Name: 'NIN' }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [subjectIri.artist(9), predicate.type, class_.Artist],
        [subjectIri.artist(9), predicate.name, literal('NIN')]
      ])
    );
  });

  test('mapAlbum escreve tipo, título e hasArtist', () => {
    const writer = createMockWriter();
    mapAlbum({ AlbumId: 2, Title: 'The Wall', ArtistId: 7 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [subjectIri.album(2), predicate.type, class_.Album],
        [subjectIri.album(2), predicate.name, literal('The Wall')],
        [subjectIri.album(2), predicate.hasArtist, subjectIri.artist(7)]
      ])
    );
  });

  test('mapTrack escreve links para album/genre/mediaType', () => {
    const writer = createMockWriter();
    mapTrack({ TrackId: 3, Name: 'Track 3', AlbumId: 2, GenreId: 1, MediaTypeId: 5 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [subjectIri.track(3), predicate.type, class_.Track],
        [subjectIri.track(3), predicate.name, literal('Track 3')],
        [subjectIri.track(3), predicate.hasAlbum, subjectIri.album(2)],
        [subjectIri.track(3), predicate.hasGenre, subjectIri.genre(1)],
        [subjectIri.track(3), predicate.hasMediaType, subjectIri.mediaType(5)]
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
        [subjectIri.invoice(10), predicate.type, class_.Invoice],
        [subjectIri.invoice(10), predicate.invoiceId, intLit(10)],
        [subjectIri.invoice(10), predicate.invoiceDate, dateLit(date)],
        [subjectIri.invoice(10), predicate.total, decLit(12.34)],
        [subjectIri.customer(99), predicate.hasInvoice, subjectIri.invoice(10)]
      ])
    );
  });

  test('mapInvoiceLine escreve unitPrice/quantity e links', () => {
    const writer = createMockWriter();
    mapInvoiceLine({ InvoiceLineId: 7, InvoiceId: 10, TrackId: 3, UnitPrice: 0.99, Quantity: 2 }, writer);
    const quads = writer.getQuads();

    expect(quads).toEqual(
      expect.arrayContaining([
        [subjectIri.line(7), predicate.type, class_.InvoiceLine],
        [subjectIri.line(7), predicate.unitPrice, decLit(0.99)],
        [subjectIri.line(7), predicate.quantity, intLit(2)],
        [subjectIri.invoice(10), predicate.hasLine, subjectIri.line(7)],
        [subjectIri.line(7), predicate.lineTrack, subjectIri.track(3)]
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
      [subjectIri.employee(1), namedNode(RDF + 'type'), namedNode(NS + 'Employee')],
      [subjectIri.employee(1), namedNode(NS + 'employeeId'), intLit(1)],
      [subjectIri.employee(1), namedNode(NS + 'fullName'), literal('Jane Doe')],
      [subjectIri.employee(1), namedNode(NS + 'title'), literal('Rep')],
      [subjectIri.employee(1), namedNode(NS + 'reportsTo'), subjectIri.employee(2)]
    ]));
  });

  test('mapCustomer deve existir e linkar para o suporte (representante)', async () => {
    const writer = createMockWriter();
    // Este e os abaixo irão FALHAR até serem implementados
    expect(typeof mapCustomer).toBe('function');

    mapCustomer({ CustomerId: 42, FirstName: 'John', LastName: 'Smith', SupportRepId: 1 }, writer);
    const quads = writer.getQuads();
    expect(quads).toEqual(expect.arrayContaining([
      [subjectIri.customer(42), namedNode(RDF + 'type'), namedNode(NS + 'Customer')],
      [subjectIri.customer(42), namedNode(NS + 'customerId'), intLit(42)],
      [subjectIri.customer(42), namedNode(NS + 'fullName'), literal('John Smith')],
      [subjectIri.customer(42), namedNode(NS + 'supportedBy'), subjectIri.employee(1)]
    ]));
  });
});

describe('Casos extras (validações adicionais)', () => {
  test('Employee: fullName compõe corretamente e omite quando vazio', () => {
    const w1 = createMockWriter();
    mapEmployee({ EmployeeId: 2, FirstName: 'Ana', LastName: 'Silva' }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([
        [subjectIri.employee(2), namedNode(NS + 'fullName'), literal('Ana Silva')]
      ])
    );

    const w2 = createMockWriter();
    mapEmployee({ EmployeeId: 3, FirstName: '', LastName: '' }, w2);
    // Não deve ter fullName quando vazio
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[subjectIri.employee(3), namedNode(NS + 'fullName'), expect.anything()]])
    );
  });

  test('Employee: reportsTo é emitido apenas quando presente', () => {
    const w1 = createMockWriter();
    mapEmployee({ EmployeeId: 4, ReportsTo: 1 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[subjectIri.employee(4), namedNode(NS + 'reportsTo'), subjectIri.employee(1)]])
    );

    const w2 = createMockWriter();
    mapEmployee({ EmployeeId: 5 }, w2);
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[subjectIri.employee(5), namedNode(NS + 'reportsTo'), expect.anything()]])
    );
  });

  test('Customer: supportedBy aparece apenas com SupportRepId', () => {
    const w1 = createMockWriter();
    mapCustomer({ CustomerId: 10, FirstName: 'João', LastName: 'Pereira', SupportRepId: 2 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[subjectIri.customer(10), namedNode(NS + 'supportedBy'), subjectIri.employee(2)]])
    );

    const w2 = createMockWriter();
    mapCustomer({ CustomerId: 11, FirstName: 'Maria', LastName: 'Oliveira' }, w2);
    expect(w2.getQuads()).not.toEqual(
      expect.arrayContaining([[subjectIri.customer(11), namedNode(NS + 'supportedBy'), expect.anything()]])
    );
  });

  test('Invoice: aceita Date e string para invoiceDate', () => {
    const invoiceDate1 = new Date('2020-02-02T12:00:00Z');
    const w1 = createMockWriter();
    mapInvoice({ InvoiceId: 20, CustomerId: 99, InvoiceDate: invoiceDate1, Total: 1.23 }, w1);
    expect(w1.getQuads()).toEqual(
      expect.arrayContaining([[subjectIri.invoice(20), namedNode(NS + 'invoiceDate'), literal(invoiceDate1.toISOString(), namedNode(XSD + 'dateTime'))]])
    );

    const w2 = createMockWriter();
    const invoiceDate2 = '2020-03-03T08:00:00Z';
    mapInvoice({ InvoiceId: 21, CustomerId: 98, InvoiceDate: invoiceDate2, Total: 4.56 }, w2);
    expect(w2.getQuads()).toEqual(
      expect.arrayContaining([[subjectIri.invoice(21), namedNode(NS + 'invoiceDate'), literal(new Date(invoiceDate2).toISOString(), namedNode(XSD + 'dateTime'))]])
    );
  });

  test('Track: omite links opcionais quando null/undefined', () => {
    const w = createMockWriter();
    mapTrack({ TrackId: 30, Name: 'Sem vínculos' }, w);
    const quads = w.getQuads();
    expect(quads).toEqual(expect.arrayContaining([[subjectIri.track(30), predicate.type, class_.Track]]));
    expect(quads).not.toEqual(expect.arrayContaining([[subjectIri.track(30), predicate.hasAlbum, expect.anything()]]));
    expect(quads).not.toEqual(expect.arrayContaining([[subjectIri.track(30), predicate.hasGenre, expect.anything()]]));
    expect(quads).not.toEqual(expect.arrayContaining([[subjectIri.track(30), predicate.hasMediaType, expect.anything()]]));
  });
});

var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ('optics');
db.dropDatabase();
const dbName = 'optics';
const client = new MongoClient(url);
client.connect(function(err) {
  assert.equal(null, err);
  console.log("'optics' is connected to the server");
  var db = client.db(dbName);
  clients = db.collection('clients', {
    validator: {
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['clientId', 'name', 'surname', 'phoneNumber', 'email', 'date', 'address', 'invoices'],
      properties: {
        _id: {},
        clientId: {bsonType: 'int'},
        name: {bsonType: 'string'},
        surname: {bsonType: 'string'},
        phoneNumber: {bsonType: 'string'},
        email: {bsonType: 'string'},
        date: {bsonType: 'date'},
        address: {
           bsonType: 'object',
           additionalProperties: false,
           required: ['street', 'postalCode', 'city', 'country'],
           properties: {
             street: {bsonType: 'string'},
             number: {bsonType: 'int'},
             apartament: {bsonType: 'string'},
             postalCode: {bsonType: 'int'},
             city: {bsonType: 'string'},
             country: {bsonType: 'string'}
          }
        },
        recommender: {bsonType: 'string'},
        invoices: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            additionalProperties: false,
            required: ['invoiceId', 'saleDate', 'seller', 'glassesId', 'totalInvoice'],
            properties: {
              invoiceId: {bsonType: 'int'},
              saleDate: {bsonType: 'date'},
              seller: {bsonType: 'string'},
              glassesId: {
                bsonType: ['array'],
                minItems: 1
              },
              totalInvoice: {bsonType: ['double', 'int']}
              }
            }
          }
        }
      }
    }
  });
  suppliers = db.collection('suppliers', {
    validator: {
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['supplierId', 'name', 'nif', 'phoneNumber', 'address', 'brands'],
      properties: {
        _id: {},
        supplierId: { bsonType: 'int'},
        name: {bsonType: 'string'},
        nif: {bsonType: 'string'},
        phoneNumber: {bsonType: 'string'},
        faxNumber: {bsonType: 'string'},
        address: {
          bsonType: 'object',
          additionalProperties: false,
          required: ['street', 'postalCode', 'city', 'country'],
          properties: {
            street: { bsonType: 'string'},
            number: { bsonType: 'int'},
            postalCode: { bsonType: 'int'},
            city: { bsonType: 'string'},
            country: { bsonType: 'string'}
            }
          },
        brands: {
            bsonType: ['array'],
            minItems: 1
          }
        }
      }
    }
  });
  glasses = db.collection('glasses', {
    validator: {
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['glassesId', 'model', 'frameColor', 'lens', 'price'],
      properties: {
        _id: {},
        glassesId:{bsonType: 'int'},
        model: {
          bsonType: 'object',
          additionalProperties: false,
          required: ['modelName', 'brand', 'frameType'],
          properties: {
            modelName: {bsonType: 'string'},
            brand: {
              bsonType: 'object',
              additionalProperties: false,
              required: ['brandName', 'supplierId'],
              properties:{
                brandName: {bsonType: 'string'},
                supplierId: {bsonType: 'int'}
              }
            },
            frameType: {enum: ['flotant', 'metal.lica', 'pasta']}
          }
        },
        frameColor: {enum: ['argent', 'daurada', 'negra', 'blava', 'vermella']},
        lens: {
          bsonType: 'object',
          additionalProperties: false,
          required: ['graduationRight', 'graduationLeft', 'color'],
          properties: {
            graduationRight: {bsonType: ['double', 'int']},
            graduationLeft: {bsonType: ['double', 'int']},
            color: {enum: ['gris', 'marro', 'transparent']}
          }
        },
        price: {bsonType: ['double', 'int']}
      }
    }
  }
  });
  clients.insertMany([
    {
      "clientId": 1,
      "name": "Maria",
      "surname": "Callas",
      "phoneNumber": "+11 11 111 11 11",
      "email": "maria@email.com",
      "date": new Date(2015, 1, 09),
      "address": {
        "street": "C/Casta Diva",
        "number": 1,
        "postalCode": 11111,
        "city": "New York",
        "country": "EEUU"
      },
      "invoices": [{
        "invoiceId": 1,
        "saleDate": new Date(2015, 1, 09),
        "seller": "Joan Lopez",
        "glassesId":[1, 2],
        "totalInvoice": 1750
      }]
    },{
      "clientId": 2,
      "name": "Abraham",
      "surname": "Lincoln",
      "phoneNumber": "+44 22 222 22 22",
      "email": "abraham@email.com",
      "date": new Date(2016, 2, 12),
      "address": {
        "street": "C/del President",
        "number": 12,
        "apartament": "2º2ª",
        "postalCode": 11111,
        "city": "Los Angeles",
        "country": "EEUU"
      },
      "invoices": [{
        "invoiceId": 2,
        "saleDate": new Date(2016, 2, 12),
        "seller": "Joan Lopez",
        "glassesId":[3],
        "totalInvoice": 900
      }]
    },{
      "clientId": 3,
      "name": "Paul",
      "surname": "Cezanne",
      "phoneNumber": "+33 33 333 33 33",
      "email": "paul@email.com",
      "date": new Date(2017, 3, 15),
      "address": {
        "street": "C/de la Pintura",
        "number": 10,
        "postalCode": 33333,
        "city": "Paris",
        "country": "France"
      },
      "recommender": "Abraham Lincoln",
      "invoices": [{
        "invoiceId": 3,
        "saleDate": new Date(2017, 3, 15),
        "seller": "Joan Lopez",
        "glassesId":[4, 5],
        "totalInvoice": 1200
      }]
    },{
      "clientId": 4,
      "name": "Stephen",
      "surname": "King",
      "phoneNumber": "+11 44 444 44 44",
      "email": "stephen@email.com",
      "date": new Date(2022, 4, 24),
      "address": {
        "street": "C/del Resplandor",
        "number": 13,
        "apartament": "1º",
        "postalCode": 11111,
        "city": "New York",
        "country": "EEUU"
      },
      "recommender": "Maria Callas",
      "invoices": [{
        "invoiceId": 4,
        "saleDate": new Date(2022, 4, 24),
        "seller": "Josep Garcia",
        "glassesId":[6, 7],
        "totalInvoice": 2000
      }]
    },{
      "clientId": 5,
      "name": "Claude",
      "surname": "Monnet",
      "phoneNumber": "+33 55 555 55 55",
      "email": "claude@email.com",
      "date": new Date(2021, 7, 30),
      "address": {
        "street": "C/Impresionisme",
        "number": 50,
        "postalCode": 33333,
        "city": "Paris",
        "country": "France"
      },
      "invoices": [{
        "invoiceId": 5,
        "saleDate":new Date(2021, 7, 30),
        "seller": "Antoni Martinez",
        "glassesId":[8],
        "totalInvoice": 600
      }]
    },{
      "clientId": 6,
      "name": "Greta",
      "surname": "Garbo",
      "phoneNumber": "+66 66 666 66 66",
      "email": "greta@email.com",
      "date": new Date(2020, 10, 14),
      "address": {
        "street": "C/Gustafsson",
        "postalCode": 66666,
        "city": "Estocolmo",
        "country": "Sweden"
      },
      "recommender": "Claude Monnet",
      "invoices": [{
        "invoiceId": 6,
        "saleDate": new Date(2020, 10, 14),
        "seller": "Antoni Martinez",
        "glassesId":[9],
        "totalInvoice": 500
      }]
    },{
      "clientId": 7,
      "name": "Francisco",
      "surname": "de Quevedo",
      "phoneNumber": "+77 77 777 77 77",
      "email": "francisco@email.com",
      "date": new Date(2019, 8, 22),
      "address": {
        "street": "C/del Buscón ",
        "number": 14,
        "postalCode": 77777,
        "city": "Madrid",
        "country": "España"
      },
      "invoices": [{
        "invoiceId": 7,
        "saleDate": new Date(2019, 8, 22),
        "seller": "Josep Garcia",
        "glassesId":[10, 11, 12],
        "totalInvoice": 3850
      }]
    },{
      "clientId": 8,
      "name": "Georgia",
      "surname": "OKeefe",
      "phoneNumber": "+11 88 888 88 88",
      "email": "georgia@email.com",
      "date": new Date(2021,11, 28),
      "address": {
        "street": "C/Modernisme",
        "number": 87,
        "apartament": "3º3ª",
        "postalCode": 11111,
        "city": "New York",
        "country": "EEUU"
      },
      "recommender": "Claude Monnet",
      "invoices": [{
        "invoiceId": 8,
        "saleDate": new Date(2021,11, 28),
        "seller": "Antoni Martinez",
        "glassesId":[13],
        "totalInvoice": 900
      }]
    },{
      "clientId": 9,
      "name": "Marilyn",
      "surname": "Monroe",
      "phoneNumber": "+44 99 999 99 99",
      "email": "marilyn@email.com",
      "date": new Date(2020,10, 21),
      "address": {
        "street": "C/Norma Jean",
        "number": 75,
        "apartament": "At. 1ª",
        "postalCode": 44444,
        "city": "Los Angeles",
        "country": "EEUU"
      },
      "recommender": "Greta Garbo",
      "invoices": [{
        "invoiceId": 9,
        "saleDate": new Date(2020,10, 21),
        "seller": "Antoni Martinez",
        "glassesId":[14],
        "totalInvoice": 650
      }]
    },{
      "clientId": 10,
      "name": "Leonardo",
      "surname": "DaVinci",
      "phoneNumber": "+55 34 567 89 01",
      "email": "leonardo@email.com",
      "date": new Date(2020, 5, 18),
      "address": {
        "street": "C/Inventor",
        "number": 10,
        "postalCode": 55555,
        "city": "Roma",
        "country": "Italia"
      },
      "recommender": "Marilyn Monroe",
      "invoices": [{
        "invoiceId": 10,
        "saleDate": new Date(2020, 5, 18),
        "seller": "Antoni Martinez",
        "glassesId":[15],
        "totalInvoice": 500
      }]
    }]);
  suppliers.insertMany([
    {
    "supplierId": 1,
    "name": "Alain Afflelou",
    "nif": "12345678A",
    "phoneNumber": "+33 22 333 44 66",
    "faxNumber": "+33 22 333 44 55",
    "address": {
      "street": "C/Rue",
      "number": 13,
      "postalCode": 33333,
      "city": "Paris",
      "country": "France"
    },
    "brands": ["Ray Band", "Lacoste"]
  },{
    "supplierId": 2,
    "name": "Optica Universitaria",
    "nif": '98765432Z',
    "phoneNumber": "+77 99 888 77 66",
    "address": {
      "street": "C/Barcelona",
      "number": 1,
      "postalCode": 22222,
      "city": "Barcelona",
      "country": "España"
    },
    "brands": ["Polaroid"]
  },
  {
    "supplierId": 3,
    "name": "Optica Argent",
    "nif": '10203040M',
    "phoneNumber": "+77 15 791 11 13",
    "faxNumber": "+77 15 791 11 15",
    "address": {
      "street": "C/Bellavista",
      "number": 50,
      "postalCode": 22222,
      "city": "Barcelona",
      "country": "España"
    },
    "brands": ["Oakley", "TitanFlex"]
}]);
  glasses.insertMany([
    {
    "glassesId": 1,
    "model": {
      "modelName": "TitanFlex Air",
      "brand": {
        "brandName":"TitanFlex",
        "supplierId": 3
      },
      "frameType": "flotant"
    },
    "frameColor": "argent",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 0.5,
      "color": "gris"
    },
    "price": 1000
  },{
    "glassesId": 2,
    "model": {
      "modelName": "Polaroid Metal",
      "brand": {
        "brandName":"Polaroid",
        "supplierId": 2
      },
      "frameType": "metal.lica"
    },
    "frameColor": "negra",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 1,
      "color": "marro"
    },
    "price": 750
  },{
    "glassesId": 3,
    "model": {
      "modelName": "Lacoste Metal",
      "brand": {
        "brandName":"Lacoste",
        "supplierId": 1
      },
      "frameType": "metal.lica"
    },
    "frameColor": "blava",
    "lens": {
      "graduationRight": 2,
      "graduationLeft": 1,
      "color": "transparent"
    },
    "price": 900
  },{
    "glassesId": 4,
    "model": {
      "modelName": "Lacoste Pasta",
      "brand": {
        "brandName":"Lacoste",
        "supplierId": 1
      },
      "frameType": "pasta"
    },
    "frameColor": "negra",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 1,
      "color": "marro"
    },
    "price": 500
  },{
    "glassesId": 5,
    "model": {
      "modelName": "Oakley Pasta",
      "brand": {
        "brandName":"Oakley",
        "supplierId": 3
      },
      "frameType": "pasta"
    },
    "frameColor": "vermella",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 0.5,
      "color": "gris"
    },
    "price": 700
  },{
    "glassesId": 6,
    "model": {
      "modelName": "RayBand Pasta",
      "brand": {
        "brandName":"RayBand",
        "supplierId": 1
      },
      "frameType": "pasta"
    },
    "frameColor": "argent",
    "lens": {
      "graduationRight": 2,
      "graduationLeft": 5,
      "color": "marro"
    },
    "price": 1500
  },{
    "glassesId": 7,
    "model": {
      "modelName": "Lacoste Metal",
      "brand": {
        "brandName":"Lacoste",
        "supplierId": 1
      },
      "frameType": "metal.lica"
    },
    "frameColor": "daurada",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 0.5,
      "color": "gris"
    },
    "price": 500
  },{
    "glassesId": 8,
    "model": {
      "modelName": "Polaroid Pasta",
      "brand": {
        "brandName":"Polaroid",
        "supplierId": 2
      },
      "frameType": "pasta"
    },
    "frameColor": "argent",
    "lens": {
      "graduationRight": 2,
      "graduationLeft": 1,
      "color": "transparent"
    },
    "price": 600
  },{
    "glassesId": 9,
    "model": {
      "modelName": "Oakley Metal",
      "brand": {
        "brandName":"Oakley",
        "supplierId": 3
      },
      "frameType": "metal.lica"
    },
    "frameColor": "blava",
    "lens": {
      "graduationRight": 0.5,
      "graduationLeft": 0.5,
      "color": "marro"
    },
    "price": 500
  },{
    "glassesId": 10,
    "model": {
      "modelName": "Oakley Air",
      "brand": {
        "brandName":"Oakley",
        "supplierId": 3
      },
      "frameType": "flotant"
    },
    "frameColor": "argent",
    "lens": {
      "graduationRight": 1,
      "graduationLeft": 0.5,
      "color": "marro"
    },
    "price": 850
  },{
    "glassesId": 11,
    "model": {
      "modelName": "Lacoste Pasta",
      "brand": {
        "brandName":"Lacoste",
        "supplierId": 1
      },
      "frameType": "pasta"
    },
    "frameColor": "vermella",
    "lens": {
      "graduationRight": 5,
      "graduationLeft": 5,
      "color": "marro"
    },
    "price": 1500
  },{
    "glassesId": 12,
    "model": {
      "modelName": "RayBand Metal",
      "brand": {
        "brandName":"RayBand",
        "supplierId": 1
      },
      "frameType": "metal.lica"
    },
    "frameColor": "negra",
    "lens": {
      "graduationRight": 2,
      "graduationLeft": 5,
      "color": "gris"
    },
    "price": 1500
  },{
    "glassesId": 13,
    "model": {
      "modelName": "Polaroid Air",
      "brand": {
        "brandName":"Polaroid",
        "supplierId": 2
      },
      "frameType": "flotant"
    },
    "frameColor": "argent",
    "lens": {
      "graduationRight": 1,
      "graduationLeft": 1,
      "color": "gris"
    },
    "price": 900
  },{
    "glassesId": 14,
    "model": {
      "modelName": "Polaroid Air",
      "brand": {
        "brandName":"Polaroid",
        "supplierId": 2
      },
      "frameType": "flotant"
    },
    "frameColor": "daurada",
    "lens": {
      "graduationRight": 1,
      "graduationLeft": 2,
      "color": "marro"
    },
    "price": 650
  },{
    "glassesId": 15,
    "model": {
      "modelName": "TitanFlex Air",
      "brand": {
        "brandName":"TitanFlex",
        "supplierId": 3
      },
      "frameType": "flotant"
    },
    "frameColor": "argent",
    "lens": {
      "graduation": [0.5, 0.5],
      "color": "marro"
    },
    "price": 500
    }
  ]);
});

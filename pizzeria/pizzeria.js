var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ('pizzeria');
db.dropDatabase();
const dbName = 'pizzeria';
const client = new MongoClient(url);
client.connect(function(err) {
  assert.equal(null, err);
  console.log("'pizzeria' is connected to the server");
  var db = client.db(dbName);
  clients = db.collection('clients', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['clientId', 'name', 'surname', 'phoneNumber', 'address', 'postalCode', 'city', 'province', 'orders'],
      properties: {
        _id: {},
        clientId: {bsonType: 'int'},
        name: {bsonType: 'string'},
        surname: {bsonType: 'string'},
        phoneNumber: {bsonType: 'string'},
        address: {bsonType: 'string'},
        postalCode: {bsonType: 'int'},
        city: {bsonType: 'string'},
        province: {bsonType: 'string'},
        orderId: {
          bsonType: ['array'],
          minItems: 1,
        }
      }
    }
  }
  });
  pizzashops = db.collection('pizzashops', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['pizzashopId', 'name', 'address', 'postalCode', 'city', 'province', 'phoneNumber'],
      properties: {
        _id: {},
        pizzashopId: {bsonType: 'int'},
        name: {bsonType: 'string'},
        address: {bsonType: 'string'},
        postalCode: {bsonType: 'int'},
        city: {bsonType: 'string'},
        province: {bsonType: 'string'},
        phoneNumber: {bsonType: 'string'}
        }
      }
    }
  });
  employees = db.collection('employees', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['employeeId', 'name', 'surname', 'nif', 'phoneNumber', 'pizzashopId'],
      properties: {
        _id: {},
        employeeId: {bsonType: 'int'},
        name: {bsonType: 'string'},
        surname: {bsonType: 'string'},
        nif: {bsonType: 'string'},
        phoneNumber: {bsonType: 'string'},
        pizzashopId: {bsonType: 'int'}
        }
      }
    }
  });
  products = db.collection('products', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['productId', 'name', 'description', 'image', 'price', 'category'],
      properties: {
        _id: {},
        productId: {bsonType: 'int'},
        name: {bsonType: 'string'},
        description: {bsonType: 'string'},
        image: {bsonType: 'string'},
        price: {bsonType: ['double', 'int']},
        category: {
          bsonType: 'object',
          additionalProperties: false,
          required: ['categoryId', 'name'],
          properties: {
            categoryId: {bsonType: 'int'},
            name: {bsonType: 'string'},
            subcategory: {bsonType: 'string'}
            }
          }
        }
      }
    }
  });
  orders = db.collection('orders', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      required: ['orderId', 'pizzashopId', 'deliveryOrShop', 'orderDateTime', 'employeeId', 'products', 'numberTotalProducts', 'totalOrder'],
      properties: {
        _id: {},
        orderId: {bsonType: 'int'},
        pizzashopId: {bsonType: 'int'},
        deliveryOrShop: {enum: ['domicili', 'restaurant']},
        orderDateTime: {bsonType: 'date'},
        deliveryDateTime: {bsonType: 'date'},
        employeeId: {bsonType: 'int'},
        products: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            additionalProperties: false,
            required: ['productId', 'quantity'],
            properties:{
              productId: {bsonType: 'int'},
              quantity: {bsonType: 'int'}
              }
            }
          },
        numberProductsCat1: {bsonType: 'int'},
        numberProductsCat2: {bsonType: 'int'},
        numberProductsCat3: {bsonType: 'int'},
        numberTotalProducts: {bsonType: 'int'},
        totalOrder: {bsonType: ['double', 'int']},
        }
      }
    }
  });
  clients.insertMany([
    {
      "clientId": 1,
      "name": "Maria",
      "surname": "Callas",
      "phoneNumber": "11 1111111",
      "address": "C/Casta Diva, 1",
      "postalCode": 11111,
      "city": "Mataro",
      "province": "Barcelona",
      "orderId": [4]
    },{
      "clientId": 2,
      "name": "Abraham",
      "surname": "Lincoln",
      "phoneNumber": "22 2222222",
      "address": "C/del President, 12, 2º2ª",
      "postalCode": 11111,
      "city": "Argentona",
      "province": "Barcelona",
      "orderId": [12]
    },{
      "clientId": 3,
      "name": "Paul",
      "surname": "Cezanne",
      "phoneNumber": "11 3333333",
      "address": "C/de la Pintura, 10",
      "postalCode": 33333,
      "city": "Dosrius",
      "province": "Barcelona",
      "orderId": [3, 20, 23]
    },{
      "clientId": 4,
      "name": "Stephen",
      "surname": "King",
      "phoneNumber": "11 4444444",
      "address": "C/del Resplandor 13, 1º",
      "postalCode": 44444,
      "city": "Premia",
      "province": "Barcelona",
      "orderId": [14]
    },{
      "clientId": 5,
      "name": "Claude",
      "surname": "Monet",
      "phoneNumber": "11 5555555",
      "address": "C/Impresionisme 50",
      "postalCode": 55555,
      "city": "Cabrera",
      "province": "Barcelona",
      "orderId": [15]
    },{
      "clientId": 6,
      "name": "Greta",
      "surname": "Garbo",
      "phoneNumber": "22 6666666",
      "address": "C/Gustafsson",
      "postalCode": 66666,
      "city": "Blanes",
      "province": "Girona",
      "orderId": [2]
    },{
      "clientId": 7,
      "name": "Francisco",
      "surname": "de Quevedo",
      "phoneNumber": "11 7777777",
      "address": "C/del Buscon 14",
      "postalCode": 11111,
      "city": "Mataro",
      "province": "Barcelona",
      "orderId": [1, 5, 9, 11]
      },{
      "clientId": 8,
      "name": "Georgia",
      "surname": "OKeeffe",
      "phoneNumber": "11 8888888",
      "address": "C/Modernisme 24, 3º3ª",
      "postalCode": 11111,
      "city": "Mataro",
      "province": "Barcelona",
      "orderId": [6, 10, 24]
    },{
      "clientId": 9,
      "name": "Marilyn",
      "surname": "Monroe",
      "phoneNumber": "22 9999999",
      "address": "C/del President, 12, 2º2ª",
      "postalCode": 66666,
      "city": "Blanes",
      "province": "Girona",
      "orderId":[3, 8]
    },{
      "clientId": 10,
      "name": "Leonardo",
      "surname": "DaVinci",
      "phoneNumber": "11 1234567",
      "address": "C/Inventor 10",
      "postalCode": 33333,
      "city": "Dosrius",
      "province": "Barcelona",
      "orderId": [16]
    },{
      "clientId": 11,
      "name": "Esther",
      "surname": "Pintado",
      "phoneNumber": "11 9876543",
      "address": "C/Maresme 33",
      "postalCode": 11111,
      "city": "Premia",
      "province": "Barcelona",
      "orderId": [7, 25]
    },{
      "clientId": 12,
      "name": "Anna",
      "surname": "Ramon",
      "phoneNumber": "11 1001010",
      "address": "C/del Mig 25",
      "postalCode": 44444,
      "city": "Premia",
      "province": "Barcelona",
      "orderId": [17]
    },{
      "clientId": 13,
      "name": "Susanna",
      "surname": "Gelabert",
      "phoneNumber": "11 3004050",
      "address": "C/de la Muntanya",
      "postalCode": 22222,
      "city": "Argentona",
      "province": "Barcelona",
      "orderId": [18, 19]
    },{
      "clientId": 14,
      "name": "Helena",
      "surname": "Roure",
      "phoneNumber": "11 135724",
      "address": "C/Estació 80",
      "postalCode": 55555,
      "city": "Mataro",
      "province": "Barcelona",
      "orderId": [21]
    },{
      "clientId": 15,
      "name": "Joan",
      "surname": "Mir",
      "phoneNumber": "11 2468008",
      "address": "Gran 8",
      "postalCode": 22222,
      "city": "Argentona",
      "province": "Barcelona",
      "orderId": [22]
    }
  ]);
  pizzashops.insertMany([
    {
      "pizzashopId": 1,
      "name": "Pizzeria Vella",
      "phoneNumber": "11 7689452",
      "address": "C/de la Muralla 16",
      "postalCode": 11111,
      "city": "Mataro",
      "province": "Barcelona"
      },{
      "pizzashopId": 2,
      "name": "Pizzeria Nova",
      "phoneNumber": "11 3927643",
      "address": "C/del Centre 47",
      "postalCode": 22222,
      "city": "Argentona",
      "province": "Barcelona"
      }
    ]);
  employees.insertMany([
      {
      "employeeId": 1,
      "name": "Joan",
      "surname": "Lopez",
      "nif":'35679845H',
      "phoneNumber": "11 6358359",
      "pizzashopId": 1
      },{
      "employeeId": 2,
      "name": "Josep",
      "surname": "Garcia",
      "nif": '87878787X',
      "phoneNumber": "11 4538624",
      "pizzashopId": 1
      },{
      "employeeId": 3,
      "name": "Antoni",
      "surname": "Martinez",
      "nif":'91919191B',
      "phoneNumber": "11 3678294",
      "pizzashopId": 1
      },{
      "employeeId": 4,
      "name": "Montse",
      "surname": "Bosch",
      "nif": '75393620G',
      "phoneNumber": "11 6758473",
      "pizzashopId": 2
      },{
      "employeeId": 5,
      "name": "Imma",
      "surname": "Cantero",
      "nif":'45268451J',
      "phoneNumber": "11 8563927",
      "pizzashopId": 2
      },{
      "employeeId": 6,
      "name": "Marçal",
      "surname": "Benitez",
      "nif": '35263718L',
      "phoneNumber": "11 2755672",
      "pizzashopId": 2
      }
    ]);
  products.insertMany([
    {
      "productId": 1,
      "name": "Cinc Formatges" ,
      "description": "Pizza Cinc Formatges",
      "image": "/images/formatges.jpeg",
      "price": 10.0,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Clasiques"
        }
    },{
      "productId": 2,
      "name": "Pepperoni",
      "description": "Pizza Pepperoni",
      "image": "/images/pepperoni.jpg",
      "price": 10,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Clasiques"
        }
    },
    {
      "productId": 3,
      "name": "Vegetal 1",
      "description": "Pizza Vegetal 1",
      "image": "/images/vegetal1.jpeg",
      "price": 12.5,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Vegetals"
        }
    },
    {
      "productId": 4,
      "name": "Vegetal 2" ,
      "description": "Pizza Vegetal 2",
      "image": "/images/vegetal2.jpeg",
      "price": 12.5,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Vegetals"
        }
    },
    {
      "productId": 5,
      "name": "Vegetal 3" ,
      "description": "Pizza Vegetal 3",
      "image": "/images/vegetal3.jpg",
      "price": 12.5,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Vegetals"
        }
    },
    {
      "productId": 6,
      "name": "Especial 1" ,
      "description": "Pizza Especial 1",
      "image": "/images/especial1.jpeg",
      "price": 15,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Especials"
        }
    },
    {
      "productId": 7,
      "name": "Especial 2",
      "description": "Pizza Especial 2",
      "image": "/images/especial2.jpeg",
      "price": 15,
      "category":{
        "categoryId": 1,
        "name": "Pizzes",
        "subcategory": "Pizzes Especials"
        }
    },
    {
      "productId": 8,
      "name": "Maxi",
      "description": "Hamburguesa Maxi",
      "image": "/images/burguerMaxi.jpeg",
      "price": 12.5,
      "category":{
        "categoryId": 2,
        "name": "Hamburguesas"
        }
    },
    {
      "productId": 9,
      "name": "Vegetal Burguer",
      "description": "Hamburguesa Vegetal",
      "image": "/images/burguerVegetal.jpeg",
      "price": 12.5,
      "category":{
        "categoryId": 2,
        "name": "Hamburguesas"
        }
    },
    {
      "productId": 10,
      "name": "Picant",
      "description": "Hamburguesa Picant",
      "image": "/images/burguerPicant.jpeg",
      "price": 10,
      "category":{
        "categoryId": 2,
        "name": "Hamburguesas"
        }
    },
    {
      "productId": 11,
      "name": "Aigua",
      "description": "Ampolla Aigua",
      "image": "/images/aigua.jpg",
      "price": 2,
      "category":{
        "categoryId": 3,
        "name": "Begudes"
        }
    },
    {
      "productId": 12,
      "name": "Cola",
      "description": "Llauna Cola",
      "image": "/images/cola.jpg",
      "price": 3,
      "category":{
        "categoryId": 3,
        "name": "Begudes"
        }
    },
    {
      "productId": 13,
      "name": "Taronja",
      "description": "Llauna Taronja",
      "image": "/images/taronja.jpg",
      "price": 3,
      "category":{
        "categoryId": 3,
        "name": "Begudes"
        }
    },
    {
      "productId": 14,
      "name": "Llimona",
      "description": "Llauna Llimona",
      "image": "/images/llimona.jpeg",
      "price": 3,
      "category":{
        "categoryId": 3,
        "name": "Begudes"
        }
    },
    {
      "productId": 15,
      "name": "Cervesa",
      "description": "Llauna Cervesa",
      "image": "/images/cervesa.jpg",
      "price": 5,
      "category":{
        "categoryId": 3,
        "name": "Begudes"
        }
    }
  ]);
  orders.insertMany([
    {
      "orderId": 1,
      "pizzashopId": 1,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-03-14T21:45:00.000Z"),
      "employeeId": 3,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 3, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 11, "quantity": 2},
        {"productId": 14, "quantity": 1},
        {"productId": 15, "quantity": 2}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat2": 2,
      "numberProductsCat3": 5,
      "numberTotalProducts": 10,
      "totalOrder": 77
    },{
      "orderId": 2,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-01-15T20:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-01-15T21:00:00.000Z"),
      "employeeId": 1,
      "products":[
        {"productId": 2, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 15, "quantity": 2}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat2": 1,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 30
    },{
      "orderId": 3,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-02-05T20:00:00.000Z"),
      "deliveryDateTime": ISODate("2022-02-05T20:30:00.000Z"),
      "employeeId": 1,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 2, "quantity": 1},
        {"productId": 3, "quantity": 1},
        {"productId": 4, "quantity": 1},
        ],
      "numberProductsCat1": 4,
      "numberTotalProducts": 4,
      "totalOrder": 45
    },{
      "orderId": 4,
      "pizzashopId": 1,
      "deliveryOrShop": 'restaurant',
      "orderDateTime": ISODate("2022-02-18T20:50:00.000Z"),
      "employeeId": 3,
      "products":[
        {"productId": 7, "quantity": 1},
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 11, "quantity": 2},
        {"productId": 12, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 15, "quantity": 3}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat2": 3,
      "numberProductsCat3": 4,
      "numberTotalProducts": 8,
      "totalOrder": 75
    },{
      "orderId": 5,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-02-24T21:20:00.000Z"),
      "deliveryDateTime": ISODate("2022-02-24T21:50:00.000Z"),
      "employeeId": 2,
      "products":[
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 11, "quantity": 4},
        {"productId": 15, "quantity": 4}
        ],
      "numberProductsCat2": 4,
      "numberProductsCat3": 8,
      "numberTotalProducts": 12,
      "totalOrder": 72
    },{
      "orderId": 6,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-03-08T22:00:00.000Z"),
      "employeeId": 3,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 6, "quantity": 1},
        {"productId": 7, "quantity": 1},
        {"productId": 11, "quantity": 3}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat3": 3,
      "numberTotalProducts": 46,
      "totalOrder": 46
    },{
      "orderId": 7,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime":  ISODate("2022-03-14T22:20:00.000Z"),
      "deliveryDateTime": ISODate("2022-03-14T22:50:00.000Z"),
      "employeeId": 2,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 12, "quantity": 1}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 13
    },{
      "orderId": 8,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-04-14T20:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-04-14T21:00:00.000Z"),
      "employeeId": 1,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 3, "quantity": 1},
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 12, "quantity": 1},
        {"productId": 14, "quantity": 2}
        ],
      "numberProductsCat1": 2,
      "numberProductsCat2": 2,
      "numberProductsCat3": 3,
      "numberTotalProducts": 7,
      "totalOrder": 55.5
    },{
      "orderId": 9,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-04-21T20:45:00.000Z"),
      "deliveryDateTime": ISODate("2022-04-21T21:15:00.000Z"),
      "employeeId": 2,
      "products":[
        {"productId": 4, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 11, "quantity": 2}
        ],
      "numberProductsCat1": 2,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 29
    },{
      "orderId": 10,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-03-08T22:00:00.000Z"),
      "employeeId": 3,
      "products":[
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 12, "quantity": 3}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat3": 3,
      "numberTotalProducts": 6,
      "totalOrder": 46
    },{
      "orderId": 11,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-05-01T22:15:00.000Z"),
      "deliveryDateTime": ISODate("2022-05-01T22:30:00.000Z"),
      "employeeId": 1,
      "products":[
        {"productId": 7, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 14, "quantity": 1}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat2": 1,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 33.5
    },{
      "orderId": 12,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-01-12T20:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-01-12T21:00:00.000Z"),
      "employeeId": 6,
      "products":[
        {"productId": 4, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 6, "quantity": 1},
        {"productId": 12, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 14, "quantity": 1}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat3": 3,
      "numberTotalProducts": 6,
      "totalOrder": 49
    },{
      "orderId": 13,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-01-25T21:10:00.000Z"),
      "deliveryDateTime":ISODate("2022-01-25T21:40:00.000Z"),
      "employeeId": 4,
      "products":[
        {"productId": 10, "quantity": 1},
        {"productId": 15, "quantity": 1},
        ],
      "numberProductsCat2": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 15
    },{
      "orderId": 14,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-02-05T22:30:00.000Z"),
      "employeeId": 5,
      "products":[
        {"productId": 3, "quantity": 1},
        {"productId": 4, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 14, "quantity": 1},
        {"productId": 15, "quantity": 1}
        ],
      "numberProductsCat2": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 48.5
    },{
      "orderId": 15,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-02-21T22:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-02-21T23:00:00.000Z"),
      "employeeId": 6,
      "products":[
        {"productId": 5, "quantity": 1},
        {"productId": 8, "quantity": 1},
        {"productId": 12, "quantity": 1},
        {"productId": 15, "quantity": 1}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat2": 1,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 33
    },{
      "orderId": 16,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-03-20T20:00:00.000Z"),
      "deliveryDateTime": ISODate("2022-03-20T20:30:00.000Z"),
      "employeeId": 4,
      "products":[
        {"productId": 10, "quantity": 1},
        {"productId": 15, "quantity": 1}
        ],
      "numberProductsCat2": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 15
    },{
      "orderId": 17,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-03-28T20:30:00.000Z"),
      "employeeId": 5,
      "products":[
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 12, "quantity": 3}
        ],
      "numberProductsCat2": 3,
      "numberProductsCat3": 3,
      "numberTotalProducts": 6,
      "totalOrder": 43
    },{
      "orderId": 18,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-03-30T22:00:00.000Z"),
      "employeeId": 5,
      "products":[
        {"productId": 2, "quantity": 1},
        {"productId": 10, "quantity": 1},
        {"productId": 15, "quantity": 2}
        ],
      "numberProductsCat2": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 30
    },{
      "orderId": 19,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-04-01T21:15:00.000Z"),
      "deliveryDateTime": ISODate("2022-04-01T21:45:00.000Z"),
      "employeeId": 4,
      "products":[
        {"productId": 4, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 6, "quantity": 1},
        {"productId": 12, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 14, "quantity": 1}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat3": 3,
      "numberTotalProducts": 6,
      "totalOrder": 49
    },{
      "orderId": 20,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-04-15T22:30:00.000Z"),
      "deliveryDateTime":ISODate("2022-04-15T23:00:00.000Z"),
      "employeeId": 6,
      "products":[
        {"productId": 7, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 13, "quantity": 1},
        {"productId": 14, "quantity": 1}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat2": 1,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 33.5
    },{
      "orderId": 21,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-05-13T20:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-05-13T21:00:00.000Z"),
      "employeeId": 6,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 2, "quantity": 1},
        {"productId": 3, "quantity": 1},
        {"productId": 4, "quantity": 1}
        ],
      "numberProductsCat1": 4,
      "numberTotalProducts": 4,
      "totalOrder": 45
    },{
      "orderId":22,
      "pizzashopId": 2,
      "deliveryOrShop": "domicili",
      "orderDateTime": ISODate("2022-05-15T21:30:00.000Z"),
      "deliveryDateTime": ISODate("2022-05-15T22:00:00.000Z"),
      "employeeId": 4,
      "products":[
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 10, "quantity": 2},
        {"productId": 11, "quantity": 4},
        {"productId": 15, "quantity": 4}
        ],
      "numberProductsCat2": 4,
      "numberProductsCat3": 8,
      "numberTotalProducts": 12,
      "totalOrder": 72
    },{
      "orderId": 23,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-05-24T22:30:00.000Z"),
      "employeeId": 5,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 12, "quantity": 1}
        ],
      "numberProductsCat1": 1,
      "numberProductsCat3": 1,
      "numberTotalProducts": 2,
      "totalOrder": 13
    },{
      "orderId": 24,
      "pizzashopId": 2,
      "deliveryOrShop": "restaurant",
      "orderDateTime": ISODate("2022-05-25T20:30:00.000Z"),
      "employeeId": 5,
      "products":[
        {"productId": 4, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 11, "quantity": 2}
        ],
      "numberProductsCat1": 2,
      "numberProductsCat3": 2,
      "numberTotalProducts": 4,
      "totalOrder": 29
    },{
      "orderId": 25,
      "pizzashopId": 1,
      "deliveryOrShop": "domicili",
      "orderDateTime":  ISODate("2022-05-27T20:20:00.000Z"),
      "deliveryDateTime": ISODate("2022-05-27T20:30:00.000Z"),
      "employeeId": 2,
      "products":[
        {"productId": 1, "quantity": 1},
        {"productId": 3, "quantity": 1},
        {"productId": 5, "quantity": 1},
        {"productId": 8, "quantity": 1},
        {"productId": 9, "quantity": 1},
        {"productId": 11, "quantity": 2},
        {"productId": 14, "quantity": 1},
        {"productId": 15, "quantity": 2}
        ],
      "numberProductsCat1": 3,
      "numberProductsCat2": 2,
      "numberProductsCat3": 5,
      "numberTotalProducts": 10,
      "totalOrder": 77
    }
]);
});

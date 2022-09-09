var MongoClient = require('/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ("optics");

console.log("\n# Factures d'un client determinat en un periode de temps.\n");
printjson(db.clients.find({clientId: 4, "invoices.saleDate":{"$gte": ISODate("2022-01-01T00:00:00Z"), "$lte":ISODate("2022-07-01T00:00:00Z")}}, {name: 1, surname: 1, invoices: 1}));

console.log("\n# Models d'ulleres venudes per un empleat determinat durant un any.\n");
printjson(db.clients.aggregate([
  { $match: {"invoices.seller": "Antoni Martinez"}},
  { $match: {"invoices.saleDate": {"$gte": ISODate("2020-10-10T00:00:00Z"), "$lte":ISODate("2021-10-10T00:00:00Z")}}},
  { $unwind : "$invoices"},
  { $unwind : "$invoices.glassesId"},
  { $lookup:
      {
        from: 'glasses',
        localField: 'invoices.glassesId',
        foreignField: 'glassesId',
        as: 'invoices.glassesInvoice'
      }
  },
  { $unwind : '$invoices.glassesInvoice'},
  { $addFields:
      {
        venedor: "$invoices.seller",
        model: "$invoices.glassesInvoice.model.modelName",
        data: "$invoices.saleDate"
      }
  },
  { $project :
      {
        venedor: 1,
        model: 1,
        data: 1,
        _id: 0
      }
  }
]));

console.log("\n # Proveïdors que han subministrat ulleres venudes per l'òptica.\n");
printjson(db.clients.aggregate([
{ $unwind : "$invoices"},
{ $unwind : "$invoices.glassesId"},
{ $lookup:
    {
      from: 'glasses',
      localField: 'invoices.glassesId',
      foreignField: 'glassesId',
      as: 'glassesInvoice'
    }
},
{ $unwind : '$glassesInvoice'},
{ $lookup:
    {
      from: 'suppliers',
      localField: 'glassesInvoice.model.brand.supplierId',
      foreignField: 'supplierId',
      as: 'suppliers'
    }
},
{ $unwind : '$suppliers'},
{ $addFields:
    {
      proveidor: "$suppliers.name",
      model: "$glassesInvoice.model.modelName"
    }
},
{ $group :
    {
      _id:{proveidor:"$proveidor", model:"$model"},
      unitats:{$sum:1}}
    },

{ $sort :
    {
      proveidor:1,
      _id: 1,
      model:1,
      unitats:1}
    }
]));

var fs = require("fs");
var JavaScriptObfuscator = require('javascript-obfuscator');
fs.readFile('/optics/queriesOptics.js', "UTF-8", function(err, data) {
    if (err) {
        throw err;
    }
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
    fs.writeFile('/optics/queriesOpticsOfuscated.js', obfuscationResult.getObfuscatedCode() , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("S'ha creat l'arxiu 'queriesOpticsOfuscated.js'");
    });
});

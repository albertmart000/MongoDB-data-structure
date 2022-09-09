var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ("pizzeria");

console.log("\n# Begudes venudes a una determinada localitat (en aquest cas, Argentona).\n");
printjson(db.clients.aggregate([
{ $match: {"city": "Argentona"}},
{ $unwind : "$orderId"},
{ $lookup:
    {
      from: 'orders',
      localField: 'orderId',
      foreignField: 'orderId',
      as: 'orderDetail'
    }
},
{ $unwind : '$orderDetail'},
{ $unwind : "$orderDetail.products"},
{ $lookup:
    {
      from: 'products',
      localField: 'orderDetail.products.productId',
      foreignField: 'productId',
      as: 'orderDetail.products.productDetail'
    }
},
{ $unwind : '$orderDetail.products.productDetail'},
{ $match: {"orderDetail.products.productDetail.category.name": "Begudes"}},
{ $group :
    {
      _id: {beguda:"$orderDetail.products.productDetail.name"},
      unitats:{$sum: "$orderDetail.products.quantity"}}
},
{ $sort :
    {
      unitats:-1,
      _id: 1,
      beguda:1
    }
}
]));

console.log("\n# Comandes efectuades per un empleat/da determinat (en aquest cas, Antoni Martinez).\n");
printjson(db.orders.aggregate([
{ $match: {"employeeId": 3}},
{ $lookup:
    {
      from: 'employees',
      localField: 'employeeId',
      foreignField: 'employeeId',
      as: 'employee'
    }
},
{ $unwind : '$employee'},
{ $addFields:
  {
    empleat: { $concat: ["$employee.name", " ", "$employee.surname"]},
    comanda: "$orderId",
    data: "$orderDateTime"
  }
},
{ $project :
    {
      comanda: 1,
      data: 1,
      _id: 0
    }
}
]));

var fs = require("fs");
var JavaScriptObfuscator = require('javascript-obfuscator');
fs.readFile('/home/albert/Escritorio/MongoDBProjects/pizzeria/queriesPizzeria.js', "UTF-8", function(err, data) {
    if (err) {
        throw err;
    }
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
    fs.writeFile('/home/albert/Escritorio/MongoDBProjects/pizzeria/queriesPizzeriaOfuscated.js', obfuscationResult.getObfuscatedCode() , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("S'ha creat l'arxiu 'queriesPizzeriaOfuscated.js'");
    });
});

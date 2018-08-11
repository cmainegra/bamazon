var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "charlie",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    customerBegin();
});
console.log(process.argv);

function customerBegin() {
    var query = "SELECT * FROM items";
    console.log("welcome user");
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        customerPrompt();
    });
};

function customerPrompt() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What's the ID number of the item you'd like to purchase?"
            }
        ])
        .then(function (answer) {
            var query = "SELECT *, FROM ?";
            connection.query(query, { id: answer.id }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("");
                }
            })
        })
};
//wish me luck



//test this and change functionality

// function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//           "Find songs by artist",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song",
//           "Find artists with a top song and top album in the same year"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//         case "Find songs by artist":
//           artistSearch();
//           break;

//         case "Find all artists who appear more than once":
//           multiSearch();
//           break;

//         case "Find data within a specific range":
//           rangeSearch();
//           break;

//         case "Search for a specific song":
//           songSearch();
//           break;

//         case "Find artists with a top song and top album in the same year":
//           songAndAlbumSearch();
//           break;
//         }
//       });
//   }

//   function artistSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT position, song, year FROM top5000 WHERE ?";
//         connection.query(query, { artist: answer.artist }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//           }
//           runSearch();
//         });
//       });
//   }

//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }

//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }

//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }

//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

//         connection.query(query, [answer.artist, answer.artist], function(err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Album Position: " +
//                 res[i].position +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Song: " +
//                 res[i].song +
//                 " || Album: " +
//                 res[i].album +
//                 " || Year: " +
//                 res[i].year
//             );
//           }

//           runSearch();
//         });
//       });
//   }

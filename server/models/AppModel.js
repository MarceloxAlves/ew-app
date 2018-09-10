const  mysql = require('mysql-model');
module.exports  = {
  construct: function(table) {
   let appmodel =  mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "editworld"
    });
    return  appmodel.extend({
      tableName: table,
    });
  }
}

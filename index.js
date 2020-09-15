const axios = require("axios").default;
const fs = require("fs");
const http = require('http');

let prov;
let client;
//Obtiene los proovedores
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
  )
  .then(function (response) {
    prov = response;
    let tableText = "";
    //Recorre el JSON y escribe el texto que se va a agregar al HTML
    for (var i = 0; i < response.data.length; i++) {
      tableText += "<tr>\n" + "<td scope=\"col\">" + response.data[i].idproveedor + "</td>\n"
        + "<td scope=\"col\">" + response.data[i].nombrecompania + "</td>\n" + "<td scope=\"col\">" + response.data[i].nombrecontacto + "</td>\n" + "</tr>\n";
      ;
    }
    let HTMLIterator = "";
    let HTMLText = "";
    fs.readFile("prov.html", function (error, data) {
      if (error) {
        throw error;
      }
      HTMLIterator = data.toString().split("\n");
      for (var i = 0; i < HTMLIterator.length; i++) {
        HTMLText += HTMLIterator[i] + "\n";
        if (HTMLIterator[i].includes("<tbody>")) {
          break;
        }
      }
      HTMLText += tableText + "</tbody>\n" + "</table>\n" + "</body>\n" + "</html>\n";
      fs.writeFile('prov.html', HTMLText, function (err) {
        if (err) throw err;
      });
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

//Obtiene los proovedores
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
  )
  .then(function (response) {
    client = response;
    let tableText = "";
    //Recorre el JSON y escribe el texto que se va a agregar al HTML
    for (var i = 0; i < response.data.length; i++) {
      tableText += "<tr>\n" + "<td scope=\"col\">" + response.data[i].idCliente + "</td>\n"
        + "<td scope=\"col\">" + response.data[i].NombreCompania + "</td>\n" + "<td scope=\"col\">" + response.data[i].NombreContacto + "</td>\n" + "</tr>\n";
      ;
    }
    let HTMLIterator = "";
    let HTMLText = "";
    fs.readFile("client.html", function (error, data) {
      if (error) {
        throw error;
      }
      HTMLIterator = data.toString().split("\n");
      for (var i = 0; i < HTMLIterator.length; i++) {
        HTMLText += HTMLIterator[i] + "\n";
        if (HTMLIterator[i].includes("<tbody>")) {
          break;
        }
      }
      HTMLText += tableText + "</tbody>\n" + "</table>\n" + "</body>\n" + "</html>\n";
      fs.writeFile("client.html", HTMLText, function (err) {
        if (err) throw err;
      });
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

http.createServer(function (req, res) {
  if (req.url == "/") {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if (req.url == "/api/proveedores") {
    fs.readFile('prov.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if (req.url == "/api/clientes") {
    fs.readFile('client.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
}).listen(8081);



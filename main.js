const express = require("express");
const bodyParser = require("body-parser");
const pg = require('pg');

//DB conexion 
const config = {
  user: 'rodcharo',
  database: 'infopersonasdb',
  password: '0wHPTdvQdU0bfjkwpkKMM5CR4YjyIdCp',
  host: 'dpg-cf2vheha6gdpa6raov2g-a.oregon-postgres.render.com',
  port: 5432,
  ssl: true,
  idleTimeoutMillis: 30000
}

const client = new pg.Pool(config)

// Modelo
class UsuariosModel {

  async getUsuarios() {
    const res = await client.query('SELECT * from usuarios;');
    console.log(res);
    return res.rows;
  }

  async addUsuarios(nuevoNombre, nuevaEdad) {
    const query = 'INSERT INTO usuarios(nombreCompleto, edad) VALUES($1, $2) RETURNING *;';
    const values = [nuevoNombre, nuevaEdad];
    const res = await client.query(query, values);
    return res.rows;
  }
  async getAvgEdad() {
    const res = await client.query('SELECT ROUND(AVG(edad), 2) AS "promedioEdad" FROM usuarios;');
    console.log(res)
    return res.rows; 
  }

  async getStatus() {
    const res = await client.query('SELECT * from status;');
    console.log(res)
    return res.rows; 
  }
}

// Controlador
class UsuariosController {

  constructor(model) {
    this.model = model;
  }

  async getUsuarios() {
    return await this.model.getUsuarios();
  }

  async addUsuarios(nuevoNombre, nuevaEdad) {
    return await this.model.addUsuarios(nuevoNombre, nuevaEdad);
  }

  async getAvgEdad() {
    return await this.model.getAvgEdad();
  }

  async getStatus() {
    return await this.model.getStatus();
  }
}

// Vistas (Rutas)
const app = express();
const usuariosModel = new UsuariosModel();
const usuariosController = new UsuariosController(usuariosModel);

app.use(bodyParser.json());

app.get("/usuarios", async  (req, res) => {
  const response = await usuariosController.getUsuarios();
  res.json(response);
});

app.post("/usuarios", async (req, res) => {
  const nuevoNombre = req.body.nombreCompleto;
  const nuevaEdad = req.body.edad;
  const respuesta = await usuariosController.addUsuarios(nuevoNombre, nuevaEdad);
  console.log(req.body);
  res.json(respuesta);
});

app.get("/usuarios/promedio-edad", async (req, res) => {
  const response = await usuariosController.getAvgEdad();
  res.json(response);
} )

app.get("/status", async (req, res) => {
  const response = await usuariosController.getStatus();
  res.json(response);
} )

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    //origin: '*'
  })
);
app.use(express.json());
app.use(express.static("assets"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running`);
});

app.get("/", (req, res) => {
  knex
    .raw("SELECT CURDATE() as currentDate")
    .then((result) => {
      console.log("Connection to MySQL server successful");
      res.send("<h1>Diariomic</h1>");
    })
    .catch((error) => {
      console.log("Error connecting to MySQL server:", error);
      res.send(error);
    });
});

app.post("/dados_paciente", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("CPF")
    .from("cadastro_paciente")
    .where("Nome", "=", dados.paciente)
    .then((data) => {
      knex
        .select()
        .from("dados_diario")
        .where("CPF", "=", data[0].CPF)
        .then((data) => {
          console.log(data);
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/Pacientes", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("Nome")
    .from("cadastro_paciente")
    .where("CRM_do_Medico", "=", dados.medico)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/LoginMedico", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("id", "CRM", "Senha")
    .from("cadastro_medico")
    .where("CRM", "=", dados.login)
    .then((data) => {
      if (data[0].Senha == dados.senha) {
        res.send({ Id: data[0].id, Status: 200 });
      } else {
        res.send("Invalid credentials");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/LoginPaciente", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("id", "CPF", "Senha", "Nome")
    .from("cadastro_paciente")
    .where("CPF", "=", dados.login)
    .then((data) => {
      if (data[0].Senha === dados.senha) {
        res.send({ Id: data[0].id, Nome: data[0].Nome, cpf: data[0].CPF, Status: 200 });
      } else {
        res.send("Invalid credentials");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/diarioPaciente", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex("dados_diario")
    .insert({
      Data_Diario: dados.Data,
      Hora: dados.Hora,
      QntdXixi: dados.QntdXixi,
      Correu: dados.Correu,
      Molhou: dados.Molhou,
      FezForcaXixi: dados.FezForcaXixi,
      HoraIngestao: dados.HoraIngestao,
      LiquidoIngerido: dados.LiquidoIngerido,
      QntdLiqIngerido: dados.QntdLiqIng,
      CocoSangue: dados.CocoSangue,
      FezMtaForca: dados.FezMtaForca,
      EntopeVaso: dados.EntopeVaso,
      Info_Extra: JSON.stringify(dados.InfoExtra),
      CPF: dados.idt,
    })
    .then(() => {
      console.log("Data inserted");
      res.send("Success");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.send(error);
    });
});

app.post("/cadastroMedico", cors(), (req, res) => {
  const dados = req.body;
  console.log(dados);
  res.send("Medico cadastrado.");
  knex("cadastro_medico")
    .insert({
      Nome: dados.nome,
      CRM: dados.crm,
      Email: dados.email,
      Senha: dados.senha,
    })
    .then(() => {
      console.log("Data inserted");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    });
});

app.post("/cadastroPaciente", (req, res) => {
  const dados = req.body;
  console.log(dados);
  res.send("Paciente cadastrado.");
  knex("cadastro_paciente")
    .insert({
      Nome: dados.nome,
      Sexo: dados.sexo,
      Nascimento: dados.nascimento,
      CPF: dados.cpf,
      Senha: dados.senha,
      NomePai: dados.pai,
      NomeMae: dados.mae,
      Telefone: dados.telefone,
      CRM_do_Medico: dados.crm,
    })
    .then(() => {
      console.log("Data inserted");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    });
});

app.post("/LoginAutoPac", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("id", "CPF", "Nome")
    .from("cadastro_paciente")
    .where("id", "=", dados.id)
    .then((data) => {
      res.send({ Id: data[0].id, Nome: data[0].Nome, cpf: data[0].CPF, Status: 200 });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/LoginAutoMed", (req, res) => {
  const dados = req.body;
  console.log(dados);
  knex
    .select("id", "CRM")
    .from("cadastro_medico")
    .where("id", "=", dados.id)
    .then((data) => {
        res.send({ Id: data[0].id, crm: data[0].CRM, Status: 200 });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;

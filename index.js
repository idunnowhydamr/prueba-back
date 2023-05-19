const express = require("express");
const bodyParse = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT  = process.env.PORT || 3977;

app.use(morgan('dev'));
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.use(cors()); 

app.get("/",(req,res) =>{
    res.status(200).send({msg:"Hola Diego!!!"});
});

app.post("/welcome",(req,res) =>{
    const {username }  = req.body;
    res.status(200).send({msg:`Hola ${username}`}); 
});

app.post("/login", async(req,res) =>{
    try {
      const {username, password} = req.body;
      console.log(username, password)
      let sql = `select * from empleado WHERE cedula = ${username}`;
      let result = await DB.Open(sql, [], false);
      Empleados = [];
      result.rows.map((empleado) => {
        let userSchema = {
          ID_EMPLEADO: empleado[0],
          CEDULA: empleado[1],
          PRIMER_NOMBRE: empleado[2],
          SEGUNDO_NOMBRE: empleado[3],
          PRIMER_APELLIDO: empleado[4],
          SEGUNDO_APELLIDO: empleado[5],
          CORREO: empleado[6],
          CONTRASEÑA: empleado[7],
          TELEFONO: empleado[8],
          FECHA_DE_NACIMIENTO: empleado[9],
          SALARIO: empleado[10],
          EPS: empleado[11],
          GENERO: empleado[12],
          TELEFONO_EMERGENCIA: empleado[13],
          ID_RH: empleado[14],
          ID_TIPO_EMPLEADO: empleado[15]
        };
        Empleados.push(userSchema);
      });
      //Se compara la contraseña enviada del frontend y la existente en la bd
     const match = await bcrypt.compare(password, Empleados[0].CONTRASEÑA);
      if (!match) return res.status(400).json({ msg: "Contraseña Erronea" });
     // if (password != Empleados[0].CONTRASEÑA) return res.status(400).json({ msg: "Contraseña Erronea" });
      res.status(200).json({msg:"Empleado Aceptado"})
    } catch (error) {
      res.status(404).json({ msg: "Empleado no encontrado" });
    }
  })

app.listen(PORT, () =>{
    console.log(`tu server esta listo ${PORT}`);
})
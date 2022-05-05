const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("../user.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition).userproto;
const express = require("express");
const app = express();
app.use(express.json());

const customerService = new grpcObject.CustomerService(
  "localhost:4040",
  grpc.credentials.createInsecure()
);

app.post("/createuser", (req, res, next) => {
  const { name, surname, email, password } = req.body;
  customerService.CreateUser(
    {
      name,
      surname,
      email,
      password,
    },
    async (err, response) => {
      const data = {
        name: response.name,
        surname: response.surname,
        email: response.email,
      };
      res.json({ data: data });
    }
  );
});
app.get("/getuser/:id", (req, res, next) => {
  const { id } = req.params;
  customerService.GetUser(
    {
      Id: id,
    },
    (err, response) => {
      res.json({
        data: response,
      });
    }
  );
});
app.put("/updateuser/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, surname, email, password } = req.body;
  customerService.UpdateUser(
    { id, name, surname, email, password },
    (err, response) => {
      const { name, surname, email } = response;
      const responseDate = {
        name,
        surname,
        email,
      };
      res.json({
        data: responseDate,
      });
    }
  );
});

app.delete("/deleteuser/:id", (req, res, next) => {
  const { id } = req.params;
  customerService.DeleteUser(
    {
      Id: id,
    },
    (err, response) => {
      const { email, id, message } = response;
      const responseData = {
        email,
        id,
        message,
      };
      res.json({
        data: responseData,
      });
    }
  );
});
app.listen(3000, () => {
  console.log(`client is running on 3000`);
});

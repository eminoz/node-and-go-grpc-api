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

app.listen(3000, () => {
  console.log(`client is running on 3000`);
});

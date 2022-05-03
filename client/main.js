const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const packageDefinition = protoLoader.loadSync("../user.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition).userproto;

const main = () => {
    const customerService = new grpcObject.CustomerService('localhost:4040', grpc.credentials.createInsecure());
    customerService.CreateUser({
        name: "emin",
        surname: "öz",
        email: "test@gmail.com",
        password: "123245"
    }, (err, response) => {
        console.log("Recieved from server " + JSON.stringify(response))
    })

    customerService.GetUser({
        Id: "1"
    }, (err, response) => {
        console.log("Recieved from server " + JSON.stringify(response))
    })
}
main()
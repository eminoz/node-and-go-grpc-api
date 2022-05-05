package main

import (
	context "context"
	"fmt"
	"net"

	api "github.com/eminoz/grpc-server/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct {
}

func (s *server) CreateUser(ctx context.Context, customer *api.Customer) (*api.ResCustomer, error) {
	return &api.ResCustomer{
		Name:    customer.GetName(),
		Surname: customer.GetSurname(),
		Email:   customer.GetEmail(),
	}, nil

}

func (s *server) GetUser(ctx context.Context, id *api.CustomerId) (*api.ResCustomer, error) {
	fmt.Println(id.Id)
	return &api.ResCustomer{
		Name:    "customer name",
		Surname: "customer surname",
		Email:   "customer email",
	}, nil

}

func main() {
	listen, err := net.Listen("tcp", ":4040")
	if err != nil {
		panic(err)

	}
	newServer := grpc.NewServer()
	api.RegisterCustomerServiceServer(newServer, &server{})
	reflection.Register(newServer)
	err = newServer.Serve(listen)
	if err != nil {
		panic(err)
	}
}

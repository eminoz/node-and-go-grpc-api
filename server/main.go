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

func (s *server) UpdateUser(ctx context.Context, customer *api.UpdateCustomer) (*api.ResCustomer, error) {
	id, name, surname, email, password := customer.GetId(), customer.GetName(), customer.GetSurname(), customer.GetEmail(), customer.GetPassword()
	fmt.Println("user id" + id)
	fmt.Println("user password", password)
	return &api.ResCustomer{
		Name:    name,
		Surname: surname,
		Email:   email,
	}, nil

	panic("implement me")
}

func (s *server) DeleteUser(ctx context.Context, customerId *api.CustomerId) (*api.ResDeletedUser, error) {
	id := customerId.GetId()
	fmt.Printf(id + " silindi")
	return &api.ResDeletedUser{
		Email:   "emin@test",
		Id:      "e3rwfr34",
		Message: "user deleted",
	}, nil
	panic("implement me")
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
	fmt.Print("server stared on port 4040 ")
}

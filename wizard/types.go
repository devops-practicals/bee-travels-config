package main

type Config struct {
	Deployment       string            `json:"deployment",omitempty`
	Version          string            `json:"version",omitempty`
	UI               *UI               `json:"ui",omitempty`
	Destination      *Destination      `json:"destination",omitempty`
	Hotel            *Hotel            `json:"hotel",omitempty`
	Currencyexchange *Currencyexchange `json:"currencyexchange",omitempty`
	Cart             *Cart             `json:"cart",omitempty`
	Payment          *Payment          `json:"payment",omitempty`
	Checkout         *Checkout         `json:"checkout",omitempty`
	Email            *Email            `json:"email",omitempty`
	Carrental        *Carrental        `json:"carrental",omitempty`
	Flight           *Flight           `json:"flight",omitempty`
	Message          *Message          `json:"message",omitempty`
}
type UI struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Destination struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Hotel struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Currencyexchange struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Cart struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Payment struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Checkout struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Email struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Carrental struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Flight struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Message struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}

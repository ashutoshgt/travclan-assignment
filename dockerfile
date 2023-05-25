FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./
COPY hotels.json ./

RUN GOOS=linux go build -o /build

CMD [ "/build" ]

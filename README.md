# Marvel-API

Marvel API is a project running with Nodejs abstract from https://developer.marvel.com/

The Marvel-API abstract usage of [Marvel development](https://developer.marvel.com/) using Nodejs.

## Pre-Installation

### Docker
This project makes use of Memcached as a Caching solution. Hence it was builded on 2 separate docker images.

Read [here](https://www.docker.com/) for more information about Docker

To process, download either [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Docker Engine](https://docs.docker.com/engine/install/)

### Marvel-API

Update Marvel API private key and public key from [Marvel](https://developer.marvel.com/). You will need to signup for an account if you don't have once.

## Installation

### Setup Dockerfile for API Services

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.
Use Package Manager [Yarn](https://yarnpkg.com/) tro install 

```bash
yarn
```

### Setup Dockerfile for Caching solution

Locate Docker file in `/caching` and build the Image accordingly:
```bash
cd caching
docker build -t jackyln/memcached . 
docker run -d --name caching -p 11211:11211 jackyln/memcached
```

To check Caching Memory limit of a container

```bash
docker inspect caching | grep Memory
```

To create another container with different Memory allocated
```bash
docker run --name caching2 -m 8m -d -p 11212:11211 jackyln/memcached
```
where `-m [Memory (int)][memory unit (b, k, m or g)]`


## Usage

## Contributing

## License
[MIT](https://choosealicense.com/licenses/mit/)
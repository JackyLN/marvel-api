# Marvel-API

Marvel API is a project running with Nodejs abstract from https://developer.marvel.com/

The Marvel-API abstract usage of [Marvel development](https://developer.marvel.com/) using Nodejs.

## Pre-Installation

### NodeJS and Package Manager

API is build based on NodeJS - a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Read more from [here](https://nodejs.org/en/about/)
- Download and install from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Install Yarn as a Package Manager
```bash
npm install -g yarn
```

### Marvel-API

Update Marvel API private key and public key from [Marvel](https://developer.marvel.com/). You will need to signup for an account if you don't have once.

## Installation

1. Create a new file name `.env` and copy the template from `.env.dist`
2. In `.env` file, update the Private API and Public API getting from Marvel website and update to
`{Marvel_API_Private_Key}` and `{Marvel_API_Private_Key}` accordingly.
3. In `.env` file, update {Caching_Server} with a external server which is used as a caching server.
4. From terminal, install all required packages

```bash
yarn
```

5. Start the project
```bash
yarn start
```

6. To run Unit test
```bash
yarn test
```

## Usage

### API Docs:
```http
/ GET / http://localhost:8080/api-docs
```

### Get Array of all characters

```http
/ GET / http://localhost:8080/characters
```

### Get single character

```http
/ GET / http://localhost:8080/characters/{character-id}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

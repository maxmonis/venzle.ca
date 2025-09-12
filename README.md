# Venzle

[TypeScript](https://www.typescriptlang.org/) web application. A daily puzzle
where users determine how to categorize a group of seven words. No server of any
kind, data is only persisted in localStorage.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): runtime environment
- [npm](https://www.npmjs.com/): package manager - comes with the Node.js
  installation

## Installation

Clone the repository onto your local machine and navigate to the project
directory:

```
git clone https://github.com/maxmonis/venzle.ca.git
```

```
cd venzle.ca
```

Install dependencies:

```
npm i
```

## Development

Start the dev server on `http://localhost:5173` (with hot reloading)

```
npm run dev
```

Locally build the app and start a preview on `http://localhost:4173` (no hot
reloading)

```
npm run prod
```

## Deployment

Create a compiled version of `src` in `dist`:

```
npm run build
```

## Project Structure

The basic structure is as follows:

- `src`: application code
- `dist`: gitignored output directory for compiled code

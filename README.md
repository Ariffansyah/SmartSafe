# SmartSafe

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (or [Bun](https://bun.sh/) as an alternative JavaScript runtime)
- **PostgreSQL** (for the database)

### Setting up the Client Side
You can use either `npm` or `bun` for managing dependencies and running the client.

#### Using npm:
```bash
npm install
npm run dev
```

#### Using bun:
```bash
bun install
bun run dev
```

### Setting up the Server Side
If you have `bun`, you can also use it to run the server.

#### Using npm:
```bash
npm install
npm start
```

#### Using bun:
```bash
bun install
bun index.js
```

---

## Configuration

Before starting the server, make sure to:

1. Create a `.env` file in the server directory.
2. Use the provided `.env.example` as a template for required environment variables.
3. Fill in the details such as your database connection credentials.

---

## Database
- This project uses **PostgreSQL** for storing user and login data. Ensure your PostgreSQL instance is set up and accessible with the credentials specified in your `.env` file.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---

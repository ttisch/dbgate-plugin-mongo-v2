[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![NPM version](https://img.shields.io/npm/v/dbgate-plugin-mongo-v2.svg)](https://www.npmjs.com/package/dbgate-plugin-mongo-v2)

# dbgate-plugin-mongo-v2

`dbgate-plugin-mongo-v2` is a plugin for [DbGate](https://dbgate.org/) that provides support for connecting to MongoDB databases. This plugin enables users to browse collections, query data, and perform various MongoDB operations directly within DbGate.

## Features

- Connect to MongoDB databases (local or cloud-based).
- Browse databases, collections, and documents.
- Run queries using MongoDB query syntax.
- Export data to various formats like JSON, CSV, or Excel.
- Import data from JSON, CSV, or Excel.
- Visualize schema and relationships (where applicable).

## Installation

You can install the `dbgate-plugin-mongo-v2` via the DbGate plugin manager or manually using npm:

### Using DbGate Plugin Manager

1. Open DbGate.
2. Go to `Plugins` > `Manage Plugins`.
3. Search for `dbgate-plugin-mongo-v2` and click `Install`.

### Using npm

```bash
npm install dbgate-plugin-mongo-v2
```

## Usage

1. Launch DbGate.
2. Add a new connection:
   - Select `MongoDB` as the database type.
   - Enter your MongoDB connection string (e.g., `mongodb://localhost:27017` or your cloud URI).
   - Test the connection and save.
3. Browse collections and documents directly from the sidebar.
4. Use the query editor to run MongoDB queries.

## Configuration

You can configure connection settings and plugin-specific options in DbGate.

Example connection string:

```text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Supported Authentication Methods

- Username/Password
- MongoDB Atlas URI
- SSL/TLS Connections

## Requirements

- Node.js v14 or later
- MongoDB v4.0 or later

## Development

To contribute to the development of this plugin, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dbgate-plugin-mongo-v2.git
   cd dbgate-plugin-mongo-v2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the plugin:

   ```bash
   npm run build
   ```

4. Link the plugin with your local DbGate installation:

   ```bash
   npm link
   ```

## Contributing

Contributions are welcome! Feel free to open issues, suggest features, or submit pull requests.

### Reporting Issues

If you encounter a bug or have a feature request, please open an issue in the [GitHub repository](https://github.com/yourusername/dbgate-plugin-mongo-v2/issues).

## License

This project is licensed under the [MIT License](LICENSE).

---

**Enjoy using `dbgate-plugin-mongo-v2`? Please consider giving it a star on [GitHub](https://github.com/yourusername/dbgate-plugin-mongo-v2)!**

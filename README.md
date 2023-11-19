# Dyte Logs

This project is a Log storage and query platform developed using Node.js, Express for the server and MongoDB as the database. It provides a simple yet powerful solution for storing and querying logs efficiently.

Certainly! Here's the Database Design section in Markdown, providing an explanation of the schema and indexes without including the code:

## Database Design

### Schema Explanation:

- **`level`**: Indicates the log level (e.g., info, error, debug).

- **`message`**: Contains the log message. A text index is applied for efficient text-based queries.

- **`resourceId`**: Identifies the resource associated with the log.

- **`timestamp`**: Represents the timestamp when the log entry was created.

- **`traceId`, `spanId`, `commit`**: Unique identifiers for tracing and version control.

- **`metadata`**: Additional metadata, including `parentResourceId`.

### Indexing:

- **Compound Indexes**: Compound indexes are applied to improve query performance on fields like `message`, `timestamp`, `resourceId`, `traceId`, `spanId`, and `commit`. This enhances the efficiency of queries that involve filtering or sorting based on these fields.

- **Text Index on `message`**: A text index is specifically applied to the `message` field. Text indexes are valuable for performing text-based searches efficiently, allowing for substring searches, case-insensitive queries, and other text-related operations.

### How Indexing Enhances Query Performance:

- **Text Indexes**: The text index on the `message` field enables the platform to execute text-based searches more efficiently. This is especially useful when users want to search for logs containing specific words or phrases within the log messages.

- **Regular Indexes**: Compound indexes on fields like `timestamp`, `resourceId`, `traceId`, `spanId`, and `commit` enhance the performance of queries involving sorting, filtering, or searching based on these attributes. Regular indexes significantly reduce the time complexity of these operations.

By strategically applying both text indexes and regular compound indexes, the Log Storage and Query Platform ensures that querying log data is optimized for various use cases, providing a robust and efficient solution for log management.

Certainly! Here's the Server Design section in Markdown, explaining the server design based on the provided code:

## Server Design

The server-side of the Log Storage and Query Platform is implemented using Express.js, a fast, unopinionated web framework for Node.js.

### Key Components:

- **Express Application**: The main server application is created using the `express` library. It handles HTTP requests, routes, and middleware.

- **Database Connection**: The `db` module is responsible for connecting to the MongoDB database using Mongoose. This connection is established in the `app.js` file, ensuring seamless communication with the database.

- **Mustache Templating**: The `mustache` library is utilized for rendering HTML templates. The template file (`results.mustache`) is read and used to format query results before sending them to clients.

- **Body Parsing Middleware**: The `body-parser` middleware is employed to parse incoming JSON and URL-encoded request bodies, making it convenient to handle data sent in requests.

### Endpoints:

- **Home Endpoint (`/`)**: The root endpoint serves the main HTML page (`index.html`) when clients access the platform. The HTML page likely contains a form for submitting log data.

- **Log Ingestion Endpoint (`POST /`)**: Handles incoming log data submissions. The server ingests log data into the database using the `db.ingest` method. Successful submissions receive a status code of 200, while errors are handled with a status code of 500.

- **Query Endpoint (`GET /query`)**: Allows clients to query the database for log data. The server invokes the `db.search` method with query parameters from the request. Query results are then rendered using the Mustache template, and the formatted HTML is sent to the client.

### Server Startup:

- The server is set to listen on a specified port (defaulting to 3000) using the `app.listen` method. Upon successful startup, a log message is displayed in the console.

This server design ensures a structured and responsive backend for the Log Storage and Query Platform, facilitating log ingestion, querying, and seamless communication with the connected MongoDB database.

## Log Ingestion

Log ingestion into the Log Storage and Query Platform is facilitated through the `POST /` endpoint. This endpoint allows users to submit log data for storage in the database. It's important to note that the system is designed to handle ingestion of a single log record in one request. Bulk ingestions, where multiple log entries are submitted in a single request, are not supported.

### Endpoint Details:

- **Endpoint**: `POST /`

- **Request Body**: The log data is expected to be provided in the request body as a JSON object. The structure of the JSON object should align with the defined log schema, including fields such as `level`, `message`, `resourceId`, `timestamp`, `traceId`, `spanId`, `commit`, and `metadata`.

- **Note**: To maintain simplicity and mimic real world usage, the system only supports the ingestion of a single log record in one request. For scenarios involving multiple log entries, users should make individual requests for each log record.

### Example Usage:

To ingest a log entry indicating the successful start of an application, a user can submit a POST request with the following payload:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "level": "info",
  "message": "Application started successfully.",
  "resourceId": "app-123",
  "timestamp": "2023-01-15T12:30:00Z",
  "traceId": "trace-xyz",
  "spanId": "span-abc",
  "commit": "git-123",
  "metadata": {
    "parentResourceId": "parent-app-456"
  }
}' http://localhost:3000
```

This design choice ensures simplicity in data handling and enhances the clarity of the ingestion process by focusing on individual log entries.

## Query Interface

The Log Storage and Query Platform support flexible and powerful queries, allowing users to filter log data based on various criteria. Users can specify values for any field to perform a query, and queries on multiple fields are supported. The querying system differentiates between the "message" field, treated as text, and other fields treated as keywords for exact matches. Additionally, queries within a specified time range are also supported.

### Text Searching:

- The "message" field supports text searching, allowing users to fetch logs containing a specific phrase. This is useful for identifying logs with specific error messages or keywords.

### Keyword Matching:

- Fields such as `level`, `resourceId`, `traceId`, `spanId`, and `commit` are treated as keywords, enabling users to retrieve logs with exact matches on these attributes.

### Time Range Queries:

- The `timestamp` field supports queries within a specified time range. Users can filter logs based on when they occurred, making it convenient for analyzing logs within specific time intervals.

## Test on the Cloud

The database and server are deployed on the cloud. Find it [here]().

 - MongoDB database hosted on [Atlas](https://www.mongodb.com/atlas/database)
 - Express server deployed on [Render](https://render.com/)

## Run Locally

Follow these steps to run the Log Storage and Query Platform locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/log-storage-platform.git
   ```
2. **Install Dependencies**
    ```
    cd log-storage-platform
    npm install
    ```
3. **Configure Environment Variables**
    
    Create a .env file in the root directory and set the necessary environment variables such as MongoDB connection details.

    Example .env file:
    ```
    MONGODB_URI=mongodb://localhost:27017/
    PORT=3000
    ```
4. **Run MongoDB Locally**

    Run MongoDB on your machine
    ```
    mongod
    ```
5. **Run the application**
    ```
    npm start
    ```
6. **Access the platform**
    
    Open your web browser and navigate to http://localhost:3000 to access the platform.
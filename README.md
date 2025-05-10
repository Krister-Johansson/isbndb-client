# ISBNdb Client

[![npm version](https://img.shields.io/npm/v/isbndb-client)](https://www.npmjs.com/package/isbndb-client)
[![release-please](https://img.shields.io/badge/release--please-enabled-brightgreen)](https://github.com/googleapis/release-please)


> ⚠️ **Disclaimer**: This is an unofficial TypeScript client for the ISBNdb API. It is not affiliated with, endorsed by, or connected to isbndb.com. This library is maintained independently and is not officially supported by ISBNdb.

A TypeScript client for the [ISBNdb API](https://isbndb.com/), providing type-safe access to book metadata, author information, publisher details, and subject classifications.

## Features

- Full TypeScript support with comprehensive type definitions
- Support for all ISBNdb API endpoints
- Automatic error handling and response formatting
- Support for all subscription plans (Basic, Premium, Pro)
- Built-in rate limiting based on your subscription plan
- Comprehensive test suite

## Installation

```bash
npm install isbndb-client
# or
yarn add isbndb-client
```

## Quick Start

```typescript
import { createIsbndbClient, IsbndbService } from 'isbndb-client';

// Create a client with your API key
const client = createIsbndbClient('YOUR_API_KEY', 'PRO'); // 'BASIC', 'PREMIUM', or 'PRO'
const isbndb = new IsbndbService(client);

// Search for books
const searchResults = await isbndb.searchBooks('javascript');
console.log(searchResults.data.books);

// Get book details by ISBN
const bookDetails = await isbndb.getBook('9780131103627');
console.log(bookDetails.data.book);

// Search for authors
const authorResults = await isbndb.searchAuthors('Martin Fowler');
console.log(authorResults.data.authors);
```

## API Reference

### Book Operations

- `getBook(isbn: string, withPrices?: boolean)`: Get book details by ISBN
- `searchBooks(query: string, options?: BookSearchOptions)`: Search for books by keyword

### Author Operations

- `getAuthor(name: string, options?: AuthorDetailOptions)`: Get author details and their books
- `searchAuthors(query: string, options?: AuthorSearchOptions)`: Search for authors by name

### Publisher Operations

- `getPublisher(name: string, options?: PublisherDetailOptions)`: Get publisher details and their books
- `searchPublishers(query: string, options?: PublisherSearchOptions)`: Search for publishers

### Subject Operations

- `getSubject(name: string)`: Get subject details
- `searchSubjects(query: string, options?: SubjectSearchOptions)`: Search for subjects

### General Operations

- `searchIndex(index: "subjects" | "publishers" | "authors" | "books", options?: IndexSearchOptions)`: General search across indexes
- `getStats()`: Get database statistics

## Subscription Plans

The client supports all ISBNdb subscription plans:

- **Basic**: 1 request per second
- **Premium**: 3 requests per second
- **Pro**: 5 requests per second

The appropriate API endpoint is automatically selected based on your plan.

## Error Handling

The client provides standardized error handling with detailed error messages:

```typescript
try {
  await isbndb.getBook('invalid-isbn');
} catch (error) {
  console.error(error);
  // {
  //   status: 404,
  //   statusText: 'Not Found',
  //   message: 'Book not found',
  //   url: '/book/invalid-isbn'
  // }
}
```

## Testing

The project includes a comprehensive test suite. To run the tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

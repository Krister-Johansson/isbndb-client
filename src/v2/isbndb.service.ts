import { AxiosInstance, AxiosResponse } from "axios";
import {
  BookResponse,
  BookSearchResponse,
  AuthorResponse,
  AuthorQueryResults,
  Publisher,
  PublisherSearchResponse,
  Subject,
  SubjectSearchResponse,
  SearchIndexResponse,
  StatsResponse,
  BookSearchOptions,
  AuthorSearchOptions,
  AuthorDetailOptions,
  PublisherSearchOptions,
  PublisherDetailOptions,
  SubjectSearchOptions,
  IndexSearchOptions,
} from "./types";

/**
 * A typed wrapper for the ISBNdb v2 API.
 *
 * Instantiate using:
 * ```ts
 * const client = createIsbndbClient('API_KEY', 'PRO');
 * const isbndb = new IsbndbService(client);
 * ```
 */
export class IsbndbService {
  /**
   * @param client Axios instance configured for the ISBNdb API.
   */
  constructor(private client: AxiosInstance) {}

  /**
   * Fetch book details by ISBN-10 or ISBN-13.
   */
  getBook(isbn: string, withPrices?: boolean): Promise<AxiosResponse<BookResponse>> {
    return this.client.get<BookResponse>(`/book/${isbn}`, {
      params: withPrices ? { with_prices: "1" } : undefined,
    });
  }

  /**
   * Search for books by keyword and optional filters.
   */
  searchBooks(query: string, options?: BookSearchOptions): Promise<AxiosResponse<BookSearchResponse>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<BookSearchResponse>(`/books/${encodeURIComponent(query)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Fetch author details and book list by author name.
   */
  getAuthor(name: string, options?: AuthorDetailOptions): Promise<AxiosResponse<AuthorResponse>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<AuthorResponse>(`/author/${encodeURIComponent(name)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Search authors by name.
   */
  searchAuthors(query: string, options?: AuthorSearchOptions): Promise<AxiosResponse<AuthorQueryResults>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<AuthorQueryResults>(`/authors/${encodeURIComponent(query)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Fetch publisher details and book list by publisher name.
   */
  getPublisher(name: string, options?: PublisherDetailOptions): Promise<AxiosResponse<Publisher>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<Publisher>(`/publisher/${encodeURIComponent(name)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Search publishers by query.
   */
  searchPublishers(query: string, options?: PublisherSearchOptions): Promise<AxiosResponse<PublisherSearchResponse>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<PublisherSearchResponse>(`/publishers/${encodeURIComponent(query)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Fetch a subject and its parent.
   */
  getSubject(name: string): Promise<AxiosResponse<Subject>> {
    return this.client.get<Subject>(`/subject/${encodeURIComponent(name)}`);
  }

  /**
   * Search subjects by query.
   */
  searchSubjects(query: string, options?: SubjectSearchOptions): Promise<AxiosResponse<SubjectSearchResponse>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<SubjectSearchResponse>(`/subjects/${encodeURIComponent(query)}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Perform a general search across one of the supported indexes.
   */
  searchIndex(
    index: "subjects" | "publishers" | "authors" | "books",
    options?: IndexSearchOptions
  ): Promise<AxiosResponse<SearchIndexResponse>> {
    const hasParams = options && Object.keys(options).length > 0;
    return this.client.get<SearchIndexResponse>(`/search/${index}`, {
      ...(hasParams ? { params: options } : {}),
    });
  }

  /**
   * Retrieve general stats about the ISBNdb database.
   */
  getStats(): Promise<AxiosResponse<StatsResponse>> {
    return this.client.get<StatsResponse>(`/stats`);
  }
}

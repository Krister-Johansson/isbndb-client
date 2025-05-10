//
// ===== API RESPONSES (type) =====
//

export type Dimensions = {
  unit: string;
  value: number;
};

export type StructuredDimensions = {
  length?: Dimensions;
  width?: Dimensions;
  height?: Dimensions;
  weight?: Dimensions;
};

export type Merchant = {
  condition: string;
  merchant: string;
  merchant_logo: string;
  merchant_logo_offset?: {
    x: string;
    y: string;
  };
  shipping: string;
  price: string;
  total: string;
  link: string;
};

export type BookDetails = {
  title: string;
  title_long?: string;
  isbn: string;
  isbn13: string;
  dewey_decimal?: string;
  binding?: string;
  publisher?: string;
  language?: string;
  date_published?: string;
  edition?: string;
  pages?: number;
  dimensions?: string;
  dimensions_structured?: StructuredDimensions;
  overview?: string;
  image?: string;
  image_original?: string;
  msrp?: number;
  excerpt?: string;
  synopsis?: string;
  authors?: string[];
  subjects?: string[];
  reviews?: string[];
  prices?: Merchant[]; // only if `with_prices` is requested
  related?: {
    type: string;
  };
  other_isbns?: {
    isbn: string;
    binding: string;
  }[];
};

export type BookResponse = {
  book: BookDetails;
};

export type AuthorResponse = {
  author: string;
  books: BookDetails[];
};

export type AuthorQueryResults = {
  total: number;
  authors: string[];
};

export type Publisher = {
  publisher: string;
  books: BookDetails[];
};

export type Subject = {
  subject: string;
  parent: string;
};

export type BookSearchResponse = {
  total: number;
  page: number;
  books: BookDetails[];
};

export type PublisherSearchResponse = {
  total: number;
  publishers: string[];
};

export type SubjectSearchResponse = {
  total: number;
  subjects: string[];
};

export type SearchIndexResponse = {
  total: number;
  page: number;
  data: unknown[];
};

export type StatsResponse = {
  books: number;
  authors: number;
  publishers: number;
  subjects: number;
};

//
// ===== API REQUEST INPUTS (interface) =====
//

export interface BookSearchOptions {
  page?: number;
  pageSize?: number;
  column?: "" | "title" | "author" | "date_published" | "subjects";
  year?: number;
  edition?: number;
  language?: string;
  shouldMatchAll?: 0 | 1;
}

export interface AuthorSearchOptions {
  page?: number;
  pageSize?: number;
}

export interface AuthorDetailOptions {
  page?: number;
  pageSize?: number;
  language?: string;
}

export interface PublisherSearchOptions {
  page?: number;
  pageSize?: number;
}

export interface PublisherDetailOptions {
  page?: number;
  pageSize?: number;
  language?: string;
}

export interface SubjectSearchOptions {
  page?: number;
  pageSize?: number;
}

export interface IndexSearchOptions {
  page?: number;
  pageSize?: number;
  isbn?: string;
  isbn13?: string;
  author?: string;
  text?: string;
  subject?: string;
  publisher?: string;
}

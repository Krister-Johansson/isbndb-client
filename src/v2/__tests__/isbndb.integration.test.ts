// src/v2/__tests__/isbndb.integration.test.ts
import { createIsbndbClient, IsbndbService } from "../index";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.ISBNDB_API_KEY;
const describeIfApiKey = apiKey ? describe : describe.skip;

/**
 * Only run the integration suite when an `ISBNDB_API_KEY` is provided.
 * This avoids failures in development environments without credentials.
 */
describeIfApiKey("Integration: IsbndbService", () => {
  const client = createIsbndbClient(apiKey!);
  const service = new IsbndbService(client);

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
  beforeAll(() => {
    jest.setTimeout(30000); // increase test timeout if needed
  });

  // Move wait to beforeEach to avoid timeout issues
  beforeEach(async () => {
    await wait(1000); // Reduced wait time to avoid timeouts
  });

  describe("Book Operations", () => {
    it("should return a book by ISBN", async () => {
      const response = await service.getBook("9780131103627");
      expect(response.data.book).toBeDefined();
      expect(response.data.book.title).toMatch(/C Programming/);
    });

    it("should return a book with prices when requested", async () => {
      const response = await service.getBook("9780131103627", true);
      expect(response.data.book).toBeDefined();
      expect(response.data.book.prices).toBeDefined();
    });

    it("should search books by keyword", async () => {
      const response = await service.searchBooks("javascript");
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.books)).toBe(true);
      expect(response.data.books.length).toBeGreaterThan(0);
      expect(response.data.books[0]).toBeDefined();
    });

    it("should search books with options", async () => {
      const response = await service.searchBooks("javascript", {
        page: 1,
        pageSize: 10,
        column: "title",
        language: "en"
      });
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.books)).toBe(true);
      expect(response.data.books.length).toBeLessThanOrEqual(10);
      expect(response.data.books[0].title).toBeDefined();
    });
  });

  describe("Author Operations", () => {
    it("should fetch an author", async () => {
      const response = await service.getAuthor("Brian Kernighan");
      expect(response.data).toBeDefined();
      expect(response.data.author).toBeDefined();
      expect(response.data.author).toContain("Kernighan");
    });

    it("should fetch an author with options", async () => {
      const response = await service.getAuthor("Brian Kernighan", { page: 1, pageSize: 5 });
      expect(response.data).toBeDefined();
      expect(response.data.books).toBeDefined();
      expect(Array.isArray(response.data.books)).toBe(true);
    });

    it("should search authors by name", async () => {
      const response = await service.searchAuthors("Kernighan");
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.authors)).toBe(true);
      expect(response.data.authors.length).toBeGreaterThan(0);
    });

    it("should search authors with options", async () => {
      const response = await service.searchAuthors("Kernighan", { page: 1, pageSize: 5 });
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.authors)).toBe(true);
      expect(response.data.authors.length).toBeLessThanOrEqual(5);
    });
  });

  describe("Publisher Operations", () => {
    it("should fetch a publisher", async () => {
      const response = await service.getPublisher("Addison-Wesley");
      expect(response.data).toBeDefined();
      expect(response.data.publisher).toBeDefined();
      expect(Array.isArray(response.data.books)).toBe(true);
    });

    it("should fetch a publisher with options", async () => {
      const response = await service.getPublisher("Addison-Wesley", { page: 1, pageSize: 5 });
      expect(response.data).toBeDefined();
      expect(response.data.books).toBeDefined();
      expect(Array.isArray(response.data.books)).toBe(true);
    });

    it("should search publishers", async () => {
      const response = await service.searchPublishers("Addison");
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.publishers)).toBe(true);
      expect(response.data.publishers.length).toBeGreaterThan(0);
      expect(response.data.publishers[0]).toBeDefined();
    });

    it("should search publishers with options", async () => {
      const response = await service.searchPublishers("Addison", { page: 1, pageSize: 5 });
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.publishers)).toBe(true);
      expect(response.data.publishers.length).toBeLessThanOrEqual(5);
    });
  });

  describe("Subject Operations", () => {
    it("should fetch a subject", async () => {
      const response = await service.getSubject("Computer Programming");
      expect(response.data).toBeDefined();
      expect(response.data.subject).toBeDefined();
    });

    it("should search subjects", async () => {
      const response = await service.searchSubjects("Programming");
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.subjects)).toBe(true);
    });

    it("should search subjects with options", async () => {
      const response = await service.searchSubjects("Programming", { page: 1, pageSize: 5 });
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.subjects)).toBe(true);
    });
  });

  describe("General Operations", () => {
    it("should search index", async () => {
      const response = await service.searchIndex("books", { text: "javascript" });
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBeGreaterThan(0);
    });

    it("should get stats", async () => {
      const response = await service.getStats();
      expect(response.data).toBeDefined();
      expect(typeof response.data.books).toBe("number");
      expect(typeof response.data.authors).toBe("number");
      expect(typeof response.data.publishers).toBe("number");
      expect(typeof response.data.subjects).toBe("number");
    });
  });
});

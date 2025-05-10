import axios from 'axios';
import { createIsbndbClient, formatIsbndbError, IsbndbPlan } from '../client';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('IsbndbClient', () => {
  const apiKey = 'test-api-key';
  const mockAxiosInstance = {
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
  });

  describe('createIsbndbClient', () => {
    it('should create a client with basic plan by default', () => {
      const client = createIsbndbClient(apiKey);
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api2.isbndb.com',
        headers: {
          Authorization: apiKey,
        },
      });
    });

    it('should create a client with specified plan', () => {
      const plans: IsbndbPlan[] = ['BASIC', 'PREMIUM', 'PRO'];
      const expectedUrls = {
        BASIC: 'https://api2.isbndb.com',
        PREMIUM: 'https://api.premium.isbndb.com',
        PRO: 'https://api.pro.isbndb.com',
      };

      plans.forEach(plan => {
        const client = createIsbndbClient(apiKey, plan);
        expect(mockedAxios.create).toHaveBeenCalledWith({
          baseURL: expectedUrls[plan],
          headers: {
            Authorization: apiKey,
          },
        });
      });
    });

    it('should set up response interceptor', () => {
      createIsbndbClient(apiKey);
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('formatIsbndbError', () => {
    it('should format axios error with response', () => {
      const mockError = {
        response: {
          status: 404,
          statusText: 'Not Found',
        },
        message: 'Book not found',
        config: {
          url: '/book/invalid-isbn',
        },
      } as any;

      const formattedError = formatIsbndbError(mockError);

      expect(formattedError).toEqual({
        status: 404,
        statusText: 'Not Found',
        message: 'Book not found',
        url: '/book/invalid-isbn',
      });
    });

    it('should format axios error without response', () => {
      const mockError = {
        message: 'Network Error',
        config: {
          url: '/book/invalid-isbn',
        },
      } as any;

      const formattedError = formatIsbndbError(mockError);

      expect(formattedError).toEqual({
        status: 0,
        message: 'Network Error',
        url: '/book/invalid-isbn',
      });
    });

    it('should handle error without config', () => {
      const mockError = {
        message: 'Unknown Error',
      } as any;

      const formattedError = formatIsbndbError(mockError);

      expect(formattedError).toEqual({
        status: 0,
        message: 'Unknown Error',
      });
    });
  });
}); 
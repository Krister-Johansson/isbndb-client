import axios, { AxiosInstance, AxiosError } from "axios";

/**
 * Available subscription plans on ISBNdb.
 * - BASIC: 1 req/sec
 * - PREMIUM: 3 req/sec — uses https://api.premium.isbndb.com
 * - PRO: 5 req/sec — uses https://api.pro.isbndb.com
 */
export type IsbndbPlan = "BASIC" | "PREMIUM" | "PRO";

/**
 * Maps a plan type to the correct ISBNdb API base URL.
 */
const planToBaseUrl: Record<IsbndbPlan, string> = {
  BASIC: "https://api2.isbndb.com",
  PRO: "https://api.pro.isbndb.com",
  PREMIUM: "https://api.premium.isbndb.com",
};

/**
 * Creates an Axios instance preconfigured for the ISBNdb API.
 *
 * @param apiKey Your personal API key from isbndb.com
 * @param plan The plan level to determine the correct base URL. Defaults to 'BASIC'
 * @returns AxiosInstance preconfigured with baseURL and headers
 */
export function createIsbndbClient(apiKey: string, plan: IsbndbPlan = "BASIC"): AxiosInstance {
  const baseURL = planToBaseUrl[plan] ?? planToBaseUrl["BASIC"];

  const client = axios.create({
    baseURL,
    headers: {
      Authorization: apiKey,
    },
  });

  // Attach an error formatter for consistent error messages
  client.interceptors.response.use(
    response => response,
    (error: AxiosError) => Promise.reject(formatIsbndbError(error))
  );

  return client;
}

/**
 * A standardized error structure for all failed API calls.
 */
export interface IsbndbError {
  status: number;
  statusText?: string;
  message: string;
  url?: string;
}

/**
 * Formats an AxiosError into a more readable IsbndbError.
 *
 * @param error AxiosError from the request
 * @returns IsbndbError object
 */
export function formatIsbndbError(error: AxiosError): IsbndbError {
  return {
    status: error.response?.status ?? 0,
    statusText: error.response?.statusText,
    message: error.message,
    url: error.config?.url,
  };
}
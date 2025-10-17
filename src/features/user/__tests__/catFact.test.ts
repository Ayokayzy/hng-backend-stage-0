import { jest } from "@jest/globals";

const mockGet: jest.MockedFunction<
  (url: string) => Promise<{ data: { fact?: string } }>
> = jest.fn();

await jest.unstable_mockModule("axios", () => ({
  default: { get: mockGet },
}));

// 👇 Import after the mock
const { getCatFact } = await import("../services/catFact");
import { ApiError } from "../../../utils/ApiError";

describe("getCatFact service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a cat fact when API call succeeds", async () => {
    mockGet.mockResolvedValueOnce({
      data: { fact: "Cats purr when content." },
    });

    const fact = await getCatFact();
    expect(fact).toBe("Cats purr when content.");
  });

  it("should throw ApiError when API returns no fact", async () => {
    mockGet.mockResolvedValueOnce({ data: {} });

    await expect(getCatFact()).rejects.toThrow(ApiError);
  });

  it("should throw ApiError when API call fails", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network error"));

    await expect(getCatFact()).rejects.toThrow(ApiError);
    await expect(getCatFact()).rejects.toThrow("Failed to fetch cat fact");
  });
});

import axios from "axios";
import { getCatFact } from "../services/catFact";
import { ApiError } from "../../../utils/ApiError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getCatFact service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a cat fact when API call succeeds", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { fact: "Cats purr when content." },
    });

    const fact = await getCatFact();
    expect(fact).toBe("Cats purr when content.");
  });

  it("should throw ApiError when API returns no fact", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });
    await expect(getCatFact()).rejects.toThrow(ApiError);
  });

  it("should throw ApiError when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    await expect(getCatFact()).rejects.toThrow(ApiError);
    await expect(getCatFact()).rejects.toThrow("Failed to fetch cat fact");
  });
});

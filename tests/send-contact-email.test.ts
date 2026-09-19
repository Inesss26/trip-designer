import { afterEach, describe, expect, it, vi } from "vitest";

import { DataError } from "@/lib/data/utils";
import { sendContactEmail } from "@/lib/send-contact-email";

const lead = {
  name: "Camille Dupont",
  email: "camille@email.com",
  phone: null,
  destination: "Italie",
  travelPeriod: null,
  partySize: null,
  budgetRange: null,
  message: "Nous partons en mai.",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("sendContactEmail", () => {
  it("envoie les champs Nom, Email, Projet et Message vers Web3Forms", async () => {
    vi.stubEnv("WEB3FORMS_ACCESS_KEY", "test-key");
    vi.stubEnv("NODE_ENV", "production");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(lead);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body)) as Record<string, string>;

    expect(body.access_key).toBe("test-key");
    expect(body.name).toBe("Camille Dupont");
    expect(body.email).toBe("camille@email.com");
    expect(body.projet).toBe("Italie");
    expect(body.message).toBe("Nous partons en mai.");
  });

  it("remonte une erreur discrète si Web3Forms refuse l'envoi", async () => {
    vi.stubEnv("WEB3FORMS_ACCESS_KEY", "test-key");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: false, message: "Invalid" }),
      }),
    );

    await expect(sendContactEmail(lead)).rejects.toBeInstanceOf(DataError);
  });

  it("n'appelle pas Web3Forms en développement sans clé", async () => {
    vi.stubEnv("WEB3FORMS_ACCESS_KEY", "");
    vi.stubEnv("NODE_ENV", "development");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(lead);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

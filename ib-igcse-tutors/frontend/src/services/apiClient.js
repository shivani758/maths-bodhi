const API_URL = import.meta.env.VITE_API_URL || "";

function buildUrl(path) {
  return `${API_URL}${path}`;
}

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

function parseJson(text) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function hasDataEnvelope(payload) {
  return payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "data");
}

export async function apiRequest(url, options = {}) {
  const {
    body,
    credentials = "include",
    headers,
    method = "GET",
    ...fetchOptions
  } = options;
  const isFormBody = typeof FormData !== "undefined" && body instanceof FormData;
  const requestHeaders = {
    Accept: "application/json",
    ...(isFormBody ? {} : { "Content-Type": "application/json" }),
    ...(headers ?? {}),
  };

  const response = await fetch(buildUrl(url), {
    ...fetchOptions,
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : isFormBody ? body : JSON.stringify(body),
    credentials,
  });
  const payload = parseJson(await response.text());

  if (!response.ok || payload?.success === false) {
    const apiError = payload?.error ?? {};
    throw new ApiClientError(apiError.message || response.statusText || "API request failed.", {
      status: response.status,
      code: apiError.code,
      details: apiError.details,
    });
  }

  return hasDataEnvelope(payload) ? payload.data : payload;
}

export function isApiUnavailableError(error) {
  return (
    error instanceof TypeError ||
    error?.message === "Failed to fetch" ||
    error?.code === "ERR_NETWORK"
  );
}

export function getSafeRedirect(
  redirect: string | null | undefined,
  fallback = "/account",
) {
  if (!redirect) {
    return fallback;
  }

  const value = redirect.trim();

  if (!value) {
    return fallback;
  }

  /*
   * Only allow paths beginning with a single "/".
   *
   * Allowed:
   * /account
   * /request-quote
   * /services/web-development
   *
   * Rejected:
   * https://evil.com
   * http://evil.com
   * //evil.com
   * javascript:alert(...)
   */
  if (!value.startsWith("/")) {
    return fallback;
  }

  if (value.startsWith("//")) {
    return fallback;
  }

  if (value.includes("\\")) {
    return fallback;
  }

  return value;
}
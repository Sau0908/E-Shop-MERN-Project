export const toSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const MERCHANT_KEY = "HRzBje";
export const MERCHANT_SALT = "6MSg1DVB03VZEPgTqI3F5AaKeLBFJakP";
export const clientId =
  "04c901cb039ead9e20da24d5c0eac86af848d63896430d0538309f914f8e51fa";
export const client_secret =
  "58cd043a59ba6823fffbaf732252fd180dfde1b27316e88d663c8bcf7954db4b";
export const PAYU_BASE_URL = "https://test.payu.in/_payment";
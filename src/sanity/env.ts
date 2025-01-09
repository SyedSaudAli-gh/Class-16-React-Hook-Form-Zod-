export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-08";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const token = assertValue(
  (process.env.NEXT_PUBLIC_SANITY_TOKEN =
    "sk9rMZ9DTjtlLz6EI9940R2JADs3S2ZvCoixogPc0ZiyB7vscNC9mSrx8WVZnd0Xo0K7MbPQQgN7wZCK7rQMxMWmCmnCUeqA6N0hr9JlaTcDmyKUERSvBrd7Frmp0Cj10IXESm5gJuDxVeV2wUJdUWb7Qmjtv0YCWAT1IWMSQpkGfgBmnJtA"),
  "Missing environment variable: NEXT_PUBLIC_SANITY_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

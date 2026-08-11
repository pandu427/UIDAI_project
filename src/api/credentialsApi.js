export const fetchCredentials = async () => {
  const response = await fetch("/api/credentials");

  if (!response.ok) {
    throw new Error("Failed to fetch credentials");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : [];
};
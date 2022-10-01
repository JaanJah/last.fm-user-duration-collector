export default (
  baseURL: string,
  params: Record<string, unknown>,
): string => {
  let url = baseURL;

  Object.entries(params).forEach(([key, value], index) => {
    const separator = index === 0 ? "?" : "&";
    url += `${separator}${key}=${value}`;
  });

  return url;
};

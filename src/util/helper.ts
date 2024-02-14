
export function removeEmptyStringObject(obj:Record<string,string>) { 
  return Object.keys(obj)
  .filter((k) => obj[k] != '')
  .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
}
import config from "../config";

/**
 *
 * @returns
 */
async function list() {
  const response = await fetch(config.apiUrl, {});
  return await response.json();
}

/**
 *
 * @param {object} data
 * @see data => { name: string, email: string, gender: string, status: string }
 * @returns
 */
async function add(data) {
  const response = await fetch(
    `${config.apiUrl}?access-token=${config.basicKey}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
}

/**
 *
 * @param {string} id
 * @returns
 */
async function remove(id) {
  const response = await fetch(
    `${config.apiUrl}${id}/?access-token=${config.basicKey}`,
    {
      method: "DELETE",
    }
  );
  return response;
}

export { list, add, remove };

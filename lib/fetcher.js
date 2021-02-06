const request = async (url, options = {}) => {
  const params = {
    method: options.method || "GET",
    body: options.body || null,
    headers: Object.assign(
      {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      options.headers || {}
    ),
  };

  const res = await fetch(`https://api.thecatapi.com/v1${url}`, params);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.status === 204 ? {} : res.json();
};

export const postFormData = async (url, data) => {
  let formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return await request(url, {
    method: "POST",
    body: formData,
  });
};

export const postJson = async (url, data) => {
  return await request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const remove = async (url) => {
  return await request(url, {
    method: "DELETE",
  });
};

const fetcher = async (url) => {
  return await request(url);
};

export default fetcher;

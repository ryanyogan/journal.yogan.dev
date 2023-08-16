const createURL = (path: string) => {
  return window.location.origin + path;
};

export async function createNewEntry() {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}

export async function updateEntry(content: string, id: string) {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({
        content,
      }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}

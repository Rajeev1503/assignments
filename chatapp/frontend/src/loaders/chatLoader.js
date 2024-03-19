export const chatLoader = async () => {
  const response = await fetch("http://localhost:8000/messages/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

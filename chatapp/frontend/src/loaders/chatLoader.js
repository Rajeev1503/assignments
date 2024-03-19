export const chatLoader = async () => {
  const response = await fetch("https://assignments-ten-theta.vercel.app/messages/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

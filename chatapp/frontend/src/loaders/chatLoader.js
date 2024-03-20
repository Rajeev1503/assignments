export const chatLoader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_SERVER_URL}/messages/getall`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    return {data:[]};
  }
};

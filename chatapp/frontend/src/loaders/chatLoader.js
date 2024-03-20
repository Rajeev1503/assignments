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
    return await response.json();
  } catch (error) {
    console.log(error);
    return {data:[]};
  }
};

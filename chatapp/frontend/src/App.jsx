import { useLoaderData } from "react-router-dom";
import "./App.css";
import ChatBox from "./components/chatBox/chatBox";
const WS_URL = "ws://localhost:8000";

function App() {
  const data = useLoaderData();
  return (
    <div className="main__container">
      <ChatBox data={data} />
    </div>
  );
}

export default App;

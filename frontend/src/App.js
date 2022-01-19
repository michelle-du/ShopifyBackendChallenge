import "./App.css";
import InventoryGet from "./components/InventoryGet";
import InventoryPost from "./components/InventoryPost";
import InventoryPut from "./components/InventoryPut";
import InventoryDelete from "./components/InventoryDelete";

function App() {
  return (
    <div className="App">
      <h1>Shopify Backend Challenge</h1>
      <InventoryGet />
      <InventoryPost />
      <InventoryPut />
      <InventoryDelete />
    </div>
  );
}

export default App;

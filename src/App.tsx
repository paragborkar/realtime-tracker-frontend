import Map from "./components/Map";
import { ConnectionManager } from "./components/ConnectionManager";

import "./styles.css";

export default function App() {
  return (
    <div>
      <Map />
      <ConnectionManager />
    </div>
  );
}

import { RouterProvider } from "react-router-dom";
import router from "./Routes.tsx";

function App() {
  return (
    <div className="font-roboto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

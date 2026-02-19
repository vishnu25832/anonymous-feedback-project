import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CreateLink from "./pages/CreateLink";
import SendFeedback from "./pages/SendFeedback";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateLink />} />
          <Route path="/feedback/:id" element={<SendFeedback />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;





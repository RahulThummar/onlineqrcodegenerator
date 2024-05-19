import { createContext, useState } from "react";
import InputForm from "./components/InputForm";
import QrCode from "./components/QrCode";

// Create context
export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState({
    url: "",
    color: "",
  });
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getQrCode = async () => {
    try {
      setLoading(true);
      setResponse({ text: inputValue.url, color: inputValue.color });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error,
  };

  return (
    <div>
      <h2 className="mt-5">QR code generator</h2>
      <div className="container">
        <div className="main-content">
          <div className="md:grid md:grid-cols-3">
            <InputContext.Provider value={value}>
              <InputForm />
              <QrCode />
            </InputContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

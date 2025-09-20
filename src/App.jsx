import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an XML file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://xmltojson-backend.onrender.com/api/xmlToJson", {
        // const res = await fetch("http://localhost:3000/api/xmlToJson", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setJsonOutput(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-7/9">
      <div className="flex flex-col items-end justify-center">
    <div className="flex flex-col items-start w-full justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">XML → JSON Converter</h1>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        </div>

        <button
          onClick={handleSubmit}
          className="w-1/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Convert to JSON
        </button>
      </div>

        {jsonOutput && (
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;

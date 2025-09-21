import { useState } from "react";
import ShinyText from "./components/ShinyText";
import AppBar from "./components/AppBar";
import FabButton from "./components/FabButton";
import { FilePicker } from "capacitor-file-picker";
import { Capacitor } from "@capacitor/core";

function App() {
  const [file, setFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);

  // ✅ File Picker for Capacitor
  const handleFilePick = async () => {
    if (Capacitor.isNativePlatform()) {
      const result = await FilePicker.pickFiles({
        types: ["application/xml"],
      });
      if (result.files.length > 0) {
        const picked = result.files[0];
        const base64 = picked.data;

        // Convert base64 -> binary -> Blob
        const binary = atob(base64);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([array], { type: "application/xml" });

        // Store as File so handleSubmit works
        setFile(new File([blob], picked.name, { type: "application/xml" }));
      }
    }
  };

  // ✅ File input for Web
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Download test.xml
  const handleDownloadTestXml = async () => {
    try {
      const testXml = await fetch("/test.xml");
      const testXmlBlob = await testXml.blob();

      const { Capacitor } = await import("@capacitor/core");

      if (Capacitor.isNativePlatform()) {
        const { Filesystem, Directory } = await import("@capacitor/filesystem");

        const reader = new FileReader();
        reader.onload = async () => {
          await Filesystem.writeFile({
            path: "test.xml",
            data: reader.result.split(",")[1], // remove base64 header
            directory: Directory.Documents,
          });
          alert("File saved to Documents folder!");
        };
        reader.readAsDataURL(testXmlBlob);
      } else {
        // Web fallback
        const testXmlUrl = URL.createObjectURL(testXmlBlob);
        const link = document.createElement("a");
        link.href = testXmlUrl;
        link.download = "test.xml";
        link.click();
        URL.revokeObjectURL(testXmlUrl);
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // ✅ Convert to JSON
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an XML file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://xmltojson-backend.onrender.com/api/xmlToJson",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const jsonContent = data.output || data;
      setJsonOutput(jsonContent);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ✅ Download JSON
  const handleDownload = async () => {
    if (!jsonOutput) return;

    const jsonString = JSON.stringify(jsonOutput, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    const { Capacitor } = await import("@capacitor/core");

    if (Capacitor.isNativePlatform()) {
      const { Filesystem, Directory } = await import("@capacitor/filesystem");

      const reader = new FileReader();
      reader.onload = async () => {
        await Filesystem.writeFile({
          path: file
            ? `${file.name.replace(".xml", "")}.json`
            : "converted.json",
          data: reader.result.split(",")[1],
          directory: Directory.Documents,
        });
        alert("JSON saved to Documents!");
      };
      reader.readAsDataURL(blob);
    } else {
      // Web fallback
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file
        ? `${file.name.replace(".xml", "")}.json`
        : "converted.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-tr from-[#2D1E2F] via-[#2D1E2F] to-[#4E2a4F] p-6">
      <AppBar />
      <div className="bg-gradient-to-bl from-[#2D1E2F] via-[#2D1E2F] to-[#4E2a4F] shadow-lg border border-white rounded-lg p-6 w-9/10 sm:w-7/9">
        <div className="flex flex-col items-end justify-center">
          <div className="flex flex-col items-start w-full justify-center">
            <h1 className="text-3xl font-bold mb-4 text-center">
              <ShinyText speed={5} text="XML → JSON Converter" />
            </h1>

            {/* Conditional input based on platform */}
            {Capacitor.isNativePlatform() ? (
              <button
                onClick={handleFilePick}
                className="mb-4 bg-[#934DFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Pick XML File
              </button>
            ) : (
              <input
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm text-[#934DFF]
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
              />
            )}
          </div>

          <div className="flex flex-row w-full gap-4 items-center justify-between">
            <button
              onClick={handleDownloadTestXml}
              className="sm:w-1/5 w-full bg-[#934DFF] text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Download Test XML
            </button>

            <button
              onClick={handleSubmit}
              className="sm:w-1/5 w-full bg-[#934DFF] text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Convert to JSON
            </button>
          </div>
        </div>

        {jsonOutput && (
          <div className="mt-4">
            <pre className="p-4 bg-gray-100 rounded text-sm overflow-auto max-h-60">
              {JSON.stringify(jsonOutput, null, 2)}
            </pre>
            <div className="flex justify-end mb-2">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white mt-4 py-2 px-4 rounded-lg hover:bg-green-700 text-sm"
              >
                Download JSON
              </button>
            </div>
          </div>
        )}
      </div>
      <FabButton />
    </div>
  );
}

export default App;

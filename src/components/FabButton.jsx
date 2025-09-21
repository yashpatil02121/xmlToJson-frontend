// components/FabButton.jsx
import { Download } from "lucide-react";

function FabButton() {
  const handleDownload = async () => {
    try {
      // Example: downloading a test.xml file from public folder
      const file = await fetch("/test.xml");
      const blob = await file.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "test.xml"; // change to .json if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-6 right-6 flex items-center justify-center 
                 gap-2 px-5 h-14 rounded-full shadow-lg
                 bg-[#934DFF] text-white 
                 hover:bg-purple-600 active:scale-95
                 transition-all duration-300"
    >
      <Download size={20} />
    </button>
  );
}

export default FabButton;

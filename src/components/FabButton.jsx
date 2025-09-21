// components/FabButton.jsx
import { Download } from "lucide-react";

function FabButton() {
  const handleDownload = async () => {
    try {
      // Google Drive sharing link for the APK (opens in new tab)
      const driveFileId = "1yOGjfZ-JMeBPPB7inePR18Qon6fRRuHH";
      const downloadUrl = `https://drive.google.com/file/d/${driveFileId}/view?usp=sharing`;

      // Open in new tab for download
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to open download link. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      title="Install APK"
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

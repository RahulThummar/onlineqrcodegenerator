import { useContext, useRef } from "react";
import { InputContext } from "../App";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

const QrCode = () => {
  const { response, loading, error } = useContext(InputContext);
  const qrRef = useRef(null);

  const downloadImage = async () => {
    if (qrRef.current) {
      try {
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Failed to generate image", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center justify-center px-10 gap-3">
        <div className="h-32 w-full bg-gray-300 rounded-md"></div>
        <div className="h-8 w-full bg-gray-300 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-gray-500 flex items-center">
        Sorry, something went wrong 😥
      </div>
    );
  }

  return (
    <div className="qr-div rounded-md shadow-lg p-6 flex flex-col items-center justify-center space-y-4">
      {response ? (
        <div className="flex flex-col items-center">
          <div ref={qrRef} className="bg-white p-4 rounded-lg border border-gray-300">
            <QRCode value={response.text} fgColor={response.color} />
          </div>
          <button
            onClick={downloadImage}
            className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Download
          </button>
        </div>
      ) : (
        <div className="text-gray-500">Your QR code will show here...</div>
      )}
    </div>
  );
};

export default QrCode;

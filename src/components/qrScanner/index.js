import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function QrScanner({ onScanSuccess }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (result) => {
        onScanSuccess(result); // return the scanned UPI URL
        scanner.clear(); // stop scanner after first scan
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );
  }, [onScanSuccess]);

  return <div id="reader" style={{ width: "100%" }} />;
}

export default QrScanner;

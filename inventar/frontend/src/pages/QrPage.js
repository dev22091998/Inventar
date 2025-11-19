import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function QrPage() {
  const { id } = useParams();
  const url = `${window.location.origin}/product/${id}`;

  return (
    <div
      style={{
        width: "58mm",
        height: "40mm",
        padding: "2mm",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #000",
      }}
    >
      <QRCodeCanvas value={url} size={120} />
      <p style={{ marginTop: "5px", fontSize: "10px", textAlign: "center" }}>
        Product ID: {id}
      </p>
      <script>
        {`
          window.onload = function () {
            setTimeout(() => window.print(), 300);
          };
        `}
      </script>
    </div>
  );
}

export default QrPage;

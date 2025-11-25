import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

function SinglePage() {
  const { id } = useParams(); // route param: /singlePage/:id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const goBack = () => navigate("/");

  // 2) QR PDF yaratish (ichida singlePage manzili kodlanadi)
        const openQRPdf = async (product) => {
          try {
            const targetUrl = `${window.location.origin}/singlePage/${product._id}`; // **muqim**
            const dataUrl = await QRCode.toDataURL(targetUrl, { width: 600, margin: 1, });
      
            const widthPt = 58 * 2.83465; // mm -> pt
            const heightPt = 40 * 2.83465;
            const doc = new jsPDF({ unit: "pt", format: [widthPt, heightPt] });
      
            const qrW = 90; 
            const xPos = widthPt / 2 - qrW / 2 - 25; // chapga surish
            const yPos = 60; // pastga surish
            doc.setFontSize(9);
            doc.setFontSize(12);
      // Eng yuqori matn: AUTORUBBER
      doc.text("AUTORUBBER", xPos + qrW / 2, yPos - 40, { align: "center" });
      
      // O‘rtadagi matn: Category
      doc.setFontSize(10);
      doc.text(product.category, xPos + qrW / 2, yPos - 25, { align: "center" });
            const textX = xPos + qrW / 2; // QR kod markazi
            const textY = yPos - 5; // 5 pt yuqoriga surildi, QR kodning ustiga chiqadi
            doc.text("INV:" + product.inventory || "", textX, textY, { align: "center" });
            doc.addImage(dataUrl, "PNG", xPos, yPos, qrW, qrW);
      
            // yangi oynada ochadi (brauzer PDF viewer)
            doc.output("dataurlnewwindow");
          } catch (err) {
            console.error(err);
            alert("QR PDF yaratishda xatolik yuz berdi");
          }
        };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">product topilmadi</div>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: 720 }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>product Detail</strong>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openQRPdf(product)}>
              📄 QR PDF
            </button>
            <button className="btn btn-sm btn-secondary" onClick={goBack}>
              Back
            </button>
          </div>
        </div>
        <div className="card-body">
          <h2>{product.name}</h2>
          <p><strong>Kategoriyasi:</strong> {product.category}</p>
          <p><strong>Inventar nomeri:</strong> {product.inventory}</p>
          <p><strong>Korxona:</strong> {product.organization}</p>
          <p><strong>Foydalanuvchi:</strong> {product.employee}</p>
          <p><strong>Eski Inventar nomeri:</strong> {product.old_inventory}</p>
          <p><strong>Bo'limi:</strong> {product.section}</p>
          <p><strong>Lan Mac addressi: </strong> {product.mac_lan}</p>
          <p><strong>Wifi Mac addressi: </strong> {product.mac_wifi}</p>
          <p><strong>Xarakteristikasi: </strong> {product.description}</p>
          {/* <p><strong>Status:</strong> {product.status || "Pending"}</p> */}
          {product.createdAt && <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleString()}</p>}
          {product.updatedAt && <p><strong>Updated:</strong> {new Date(product.updatedAt).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;

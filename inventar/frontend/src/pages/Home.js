import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Search from "../components/Search";
import QRCode from "qrcode"; // npm i qrcode
import { jsPDF } from "jspdf";

function Home() {   
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  
    useEffect(() => {
        API.get("/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
            
    setCurrentPage(1);
    }, [])
    console.log(products)

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.inventory.toLowerCase().includes(search.toLowerCase()) ||
      product.employee.toLowerCase().includes(search.toLowerCase()) ||
      product.old_inventory.toLowerCase().includes(search.toLowerCase()) ||
      product.section.toLowerCase().includes(search.toLowerCase()) ||
      product.mac_lan.toLowerCase().includes(search.toLowerCase()) ||
      product.mac_wifi.toLowerCase().includes(search.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = filtered.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 1) ko'z tugmasi -> singlePage route ga o'tish
  const viewSingle = (id) => {
    navigate(`/single-product/${id}`);
  };

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

  return (
        <div className="container mt-4">
      <h3 className="mb-3 text-center">AUTORUBBER korxonasi Axborot texnologiyalari bo'linmasi xisobidagi moddiy boyliklar ro'yhati</h3>

      <Search search={search} setSearch={setSearch} placeholder="Search products..." />

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th style={{ width: 60 }}>#</th>
            <th>Nomi</th>
            <th>Categoriyasi</th>
            <th>Inventar raqami</th>
            <th>Foydalanuvchi</th>
            <th>Bo'limi</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No products found</td>
              </tr>
            ) : (
              currentItems.map((product, i) => (
                <tr key={product._id}>
                  <td className="text-center">{indexFirst + i + 1}</td>
                  <td style={{
                    maxWidth: "150px", // kerakli kenglik
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.inventory}</td>
                  <td>{product.employee}</td>
                  <td>{product.section}</td>
                  <td className="text-center">
                    {/* ko'z - view single page */}
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      title="View single"
                      onClick={() => viewSingle(product._id)}
                    >
                      👁️
                    </button>

                   {/* //QR PDF: QR skan qilinganda /singlePage/:id ga o'tadi */}
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="Create QR PDF (opens new window)"
                      onClick={() => openQRPdf(product)}
                    >
                      📄 QR PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    )
}

export default Home;



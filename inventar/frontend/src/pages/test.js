import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Search from "../components/Search";
import QRCode from "qrcode"; // npm i qrcode
import { jsPDF } from "jspdf";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    API.get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = todos.filter(
    (t) =>
      console.log(t)
      // t.title.toLowerCase().includes(search.toLowerCase()) ||
      // (t.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = filtered.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 1) ko'z tugmasi -> singlePage route ga o'tish
  const viewSingle = (id) => {
    navigate(`/singlePage/${id}`);
  };

  // 2) QR PDF yaratish (ichida singlePage manzili kodlanadi)
  const openQRPdf = async (todo) => {
    try {
      const targetUrl = `${window.location.origin}/singlePage/${todo._id}`; // **muqim**
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
doc.text("Category", xPos + qrW / 2, yPos - 25, { align: "center" });
      // doc.text(todo.title || "", widthPt / 2, qrW + 15, { align: "center" });
      // Text QR kodning markaziga chiqarish
      const textX = xPos + qrW / 2; // QR kod markazi
      const textY = yPos - 5; // 5 pt yuqoriga surildi, QR kodning ustiga chiqadi
      doc.text(todo.title || "", textX, textY, { align: "center" });
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
      <h3 className="mb-3 text-center">Autorubber korhonasiga tegishli bo'lgan barcha axborot texnologiyalari vositalarining inventarizatsiya ro'yhatlari.</h3>

      <Search search={search} setSearch={setSearch} placeholder="Search todos..." />

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Nomi</th>
              <th>Categoriyasi</th>
              <th style={{ width: 180 }}>Batafsil</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No todos found</td>
              </tr>
            ) : (
              currentItems.map((todo, i) => (
                <tr key={todo._id}>
                  <td className="text-center">{indexFirst + i + 1}</td>
                  {console.log(todo)}
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                            {/* <td>{ shortenText(name, 20)}</td> */}
                            <td className="text-center">
                    {/* ko'z - view single page */}
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      title="View single"
                      onClick={() => viewSingle(todo._id)}
                    >
                      👁️
                    </button>

                    {/* QR PDF: QR skan qilinganda /singlePage/:id ga o'tadi */}
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="Create QR PDF (opens new window)"
                      onClick={() => openQRPdf(todo)}
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
  );
}

export default Home;


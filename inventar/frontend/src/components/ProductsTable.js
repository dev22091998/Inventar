import { useState, useEffect } from "react";
import axios from "axios";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API dan ma'lumot olish
  useEffect(() => {
    axios
      .get("http://172.16.252.5:5000/api/products") // sizning API
      .then((res) => {
        setProducts(res.data); // res.data ichida ma'lumotlar bo'lishi kerak
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Nomi</th>
            <th>Categoriyasi</th>
            <th>Inventar raqami</th>
            <th>Tashkilot</th>
            <th>Foydalanuvchi</th>
            <th>Eski inventar</th>
            <th>Bo'limi</th>
            <th>MAC LAN</th>
            <th>MAC WiFi</th>
            <th>Izoh</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p._id || index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.inventory}</td>
              <td>{p.organization}</td>
              <td>{p.employee}</td>
              <td>{p.old_inventory}</td>
              <td>{p.section}</td>
              <td>{p.mac_lan}</td>
              <td>{p.mac_wifi}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;

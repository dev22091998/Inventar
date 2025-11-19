import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    inventory: "",
    organization: "",
    employee: "-",
    old_inventory: "-",
    section: "",
    mac_lan: "-",
    mac_wifi: "-",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://172.16.252.5:5000/api/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Mahsulot muvaffaqiyatli qo‘shildi!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Xatolik: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "400px" }}>
      <h3>Yangi mahsulot qo‘shish</h3>

      {Object.keys(form).map((field) => (
        <div key={field} style={{ marginBottom: "10px" }}>
          <label>{field}</label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      ))}

      <button className="btn btn-primary" type="submit">
        Saqlash
      </button>
    </form>
  );
}

export default AddProduct;

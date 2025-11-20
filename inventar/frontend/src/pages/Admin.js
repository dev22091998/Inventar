import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Search from "../components/Search";


function Admin() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [organization, setOrganization] = useState("");
  const [employee, setEmployee] = useState("");
  const [old_inventory, setOld_inventory] = useState("");
  const [section, setSection] = useState("");
  const [mac_lan, setMac_lan] = useState("");
  const [mac_wifi, setMac_wifi] = useState("");
  const [description, setDescription] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    loadproducts();
  }, []);

  const loadproducts = () => {
    API.get("/products", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  // Filter Search
  const filteredproducts = products.filter(
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredproducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredproducts.length / itemsPerPage);

  // Add product
  const addproduct = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/products",
        { name, category, inventory, organization, employee, old_inventory, section, mac_lan, mac_wifi, description,},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setName("");
      setCategory("");
      setInventory("");
      setOrganization("");
      setEmployee("");
      setOld_inventory("");
      setSection("");
      setMac_lan("");
      setMac_wifi("");
      setDescription("");
      loadproducts();
      setCurrentPage(1);
      setActivePage("dashboard");
    } catch (err) {
      alert("Error adding product");
    }
  };

  // const deleteproduct = async (id) => {
  //   if (!confirmDelete("Delete?")) return;
  //   try {
  //     await API.delete(`/products/${id}`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     loadproducts();
  //     setCurrentPage(1);
  //   } catch (err) {
  //     alert("Error deleting");
  //   }
  //   console.log("deleting....")
  // };
  const deleteproduct = (id) => {
  // Modalni ochib, qaysi product o'chirilishini saqlaymiz
  setDeleteProductId(id);
  setShowDeleteModal(true);
};

  const openEditModal = (product) => {
    setEditProduct(product);
    setShowEdit(true);
  };

  const updateproduct = async () => {
  console.log("SEND TO BACKEND:", editProduct);
    try {
      await API.patch(`/products/${editProduct._id}`, editProduct, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setShowEdit(false);
      setEditProduct(null);
      loadproducts();
      setCurrentPage(1);
    } catch (err) {
      alert("Error updating product");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
<div
  className="bg-primary text-white p-3 d-flex flex-column align-items-stretch"
  style={{ width: "220px", whiteSpace: "nowrap", minHeight: "100vh" }}
>
  <h4 className="text-center">Admin Panel</h4>
  <ul className="nav flex-column mt-4 w-100">
    <li className="nav-item mb-2 w-100">
      <button
        className={`btn sidebar-btn w-100 ${
          activePage === "dashboard" ? "btn-light" : "btn-secondary text-white"
        }`}
        onClick={() => {
          setActivePage("dashboard");
          setCurrentPage(1);
        }}
      >
        Admin
      </button>
    </li>

    <li className="nav-item mb-2 w-100">
      <button
        className={`btn sidebar-btn w-100 ${
          activePage === "addproduct" ? "btn-light" : "btn-secondary text-white"
        }`}
        onClick={() => setActivePage("addproduct")}
      >
        Maxsulot qo'shish
      </button>
    </li>

    <li className="nav-item mb-2 w-100">
      <button
        className={`btn sidebar-btn w-100 ${
          activePage === "users" ? "btn-light" : "btn-secondary text-white"
        }`}
        onClick={() => setActivePage("users")}
      >
        Foydalanuvchi
      </button>
    </li>
  </ul>
</div>


      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {/* Dashboard */}
        {activePage === "dashboard" && (
          <>
            <h3>AUTORUBBER korxonasi Axborot texnologiyalari bo'linmasi xisobidagi moddiy boyliklar ro'yhatiF</h3>

            <Search search={search} setSearch={setSearch} placeholder="Search..." />

            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-primary text-center">
                  <tr>
                    <th>#</th>
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
                      <td colSpan="4" className="text-center">
                        Xech narsa topilmadi!
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((product, index) => (
                      <tr key={product._id}>
                        <td className="text-center">{indexOfFirstItem + index + 1}</td>
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
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => openEditModal(product)}
                          >
                            Edit
                          </button>
                          {/* <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteproduct(product._id)}
                          >
                            Delete
                          </button> */}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setDeleteProductId(product._id);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </button>

                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {showDeleteModal && (
  <div
    className="modal show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Tasdiqlash</h5>
          <button
            className="btn-close"
            onClick={() => setShowDeleteModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <p>Rostdan ham ushbu mahsulotni o'chirmoqchimisiz?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Bekor qilish
          </button>
          <button
            className="btn btn-danger"
            onClick={async () => {
              try {
                await API.delete(`/products/${deleteProductId}`, {
                  headers: { Authorization: `Bearer ${user.token}` },
                });
                loadproducts();
                setCurrentPage(1);
                setShowDeleteModal(false);
              } catch (err) {
                alert("Delete qilishda xatolik yuz berdi");
              }
            }}
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </div>
)}

            </div>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}

        {/* Add product */}
        {activePage === "addproduct" && (
          <>
            <h3>Yangi maxsulot qo'shish</h3>

            <form className="mb-4" onSubmit={addproduct}>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6 col-lg-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Nomi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="productName"
                    autoComplete="on"
                    required
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Categoriyasi"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="productCategory"
                    autoComplete="on"
                    required
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Inventar nomeri"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                    name="productInventory"
                    autoComplete="on"
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                  
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Foydalanuvchi"
                      value={employee}
                      onChange={(e) => setEmployee(e.target.value)}
                      name="productEmployee"
                      autoComplete="on"
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Bo'lim"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      name="productSection"
                      autoComplete="on"
                      required
                    />
                  </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Tashkilot"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    name="productOrganization"
                    autoComplete="on"
                    required
                  />
                </div>                
              </div>

              <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Eski inventar nomeri"
                      value={old_inventory}
                      onChange={(e) => setOld_inventory(e.target.value)} 
                      name="name"
                      autoComplete="on"                     
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Lan mac addresi"
                      value={mac_lan}
                      onChange={(e) => setMac_lan(e.target.value)}
                      name="productLanMac"
                      autoComplete="on"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Wifi mac addresi"
                      value={mac_wifi}
                      onChange={(e) => setMac_wifi(e.target.value)}
                      name="productWifiMac"
                      autoComplete="on"
                    />
                  </div>
              </div>

                <div className="row g-3 mb-3">

                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Izoh"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="productDesc"
                      autoComplete="on"                      
                    />
                  </div>

                </div>
                <div >
                  <button className="btn btn-success px-4" type="submit">
                    Qo'shish
                  </button>
                </div>
            </form>
          </>
        )}

        {/* Users future */}
        {activePage === "users" && <h3>Users Management (coming soon)</h3>}

        {/* Edit Modal */}
        {showEdit && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Edit product</h5>
                  <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, category: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.inventory}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, inventory: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.organization}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, organization: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.employee}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, employee: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.old_inventory}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, old_inventory: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.section}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, section: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.mac_lan}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, mac_lan: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.mac_wifi}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, mac_wifi: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    className="form-control mb-3"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, description: e.target.value })
                    }
                  />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={updateproduct}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { uploadToCloudinary } from "../components/uploadToCloudinary";



const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editSpecifications, setEditSpecifications] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImageFile2, setEditImageFile2] = useState(null);
  const [editImageFile3, setEditImageFile3] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authenticated) fetchProducts();
  }, [authenticated]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = [];
    querySnapshot.forEach((doc) =>
      productsData.push({ ...doc.data(), id: doc.id })
    );
    setProducts(productsData);
  };

  const handleAdd = async () => {
    if (!imageFile) {
      alert("Please upload at least the first image (Image 1 is required).");
      return;
    }

    try {
      const imageUrls = [];
      const img1 = await uploadToCloudinary(imageFile);
      if (img1) imageUrls.push(img1);
      if (imageFile2) {
        const img2 = await uploadToCloudinary(imageFile2);
        if (img2) imageUrls.push(img2);
      }
      if (imageFile3) {
        const img3 = await uploadToCloudinary(imageFile3);
        if (img3) imageUrls.push(img3);
      }

      await addDoc(collection(db, "products"), {
        name,
        description,
        images: imageUrls,
        price: Number(price),
        specifications,
        category,
      });

      setName("");
      setDescription("");
      setPrice("");
      setSpecifications("");
      setCategory("");
      setImageFile(null);
      setImageFile2(null);
      setImageFile3(null);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
  
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditSpecifications(product.specifications);
    setEditCategory(product.category);
  };

  const handleUpdate = async () => {
    try {
      const productRef = doc(db, "products", editId);

      let updatedImages = products.find((p) => p.id === editId)?.images || [];

      if (editImageFile) {
        const img = await uploadToCloudinary(editImageFile);
        if (img) updatedImages[0] = img;
      }
      if (editImageFile2) {
        const img2 = await uploadToCloudinary(editImageFile2);
        if (img2) updatedImages[1] = img2;
      }
      if (editImageFile3) {
        const img3 = await uploadToCloudinary(editImageFile3);
        if (img3) updatedImages[2] = img3;
      }

      await updateDoc(productRef, {
        name: editName,
        description: editDescription,
        price: Number(editPrice),
        specifications: editSpecifications,
        category: editCategory,
        images: updatedImages,
      });

      // reset edit state
      setEditId(null);
      setEditName("");
      setEditDescription("");
      setEditPrice("");
      setEditSpecifications("");
      setEditCategory("");
      setEditImageFile(null);
      setEditImageFile2(null);
      setEditImageFile3(null);

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-amber-50 px-4">
        <h2 className="text-2xl font-head font-bold mb-4">Admin Login</h2>
        <form
          className="w-full max-w-sm space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              alert("Incorrect password!");
            }
          }}
        >
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter Password"
            className="border w-full p-2 rounded focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 font-small w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-amber-50 px-4 py-8">
      <h1 className="text-3xl font-head font-bold text-center text-blue-700 mb-8">
        Admin Panel
      </h1>

      {/* Add Product */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mb-10 space-y-4">
        <h2 className="text-xl font-head font-semibold">Add New Product</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="border p-2 rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="border p-2 rounded resize-y" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 rounded" />
          <textarea value={specifications} onChange={(e) => setSpecifications(e.target.value)} placeholder="Specifications" rows={3} className="border p-2 rounded resize-y" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="border p-2 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Image 1 (Required)</label>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="text-sm font-medium">Image 2 (Optional)</label>
            <input type="file" onChange={(e) => setImageFile2(e.target.files[0])} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="text-sm font-medium">Image 3 (Optional)</label>
            <input type="file" onChange={(e) => setImageFile3(e.target.files[0])} className="border p-2 rounded w-full" />
          </div>
        </div>
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2">
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto rounded-lg bg-white mb-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 font-small sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border"
          >
            {product.images && product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              {editId === product.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                    className="border w-full p-2 rounded mb-2"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    rows={3}
                    className="border w-full p-2 rounded mb-2 resize-y"
                  />
                  
                  <input
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    placeholder="Price"
                    type="number"
                    className="border w-full p-2 rounded mb-2"
                  />
                  <textarea
                    value={editSpecifications}
                    onChange={(e) => setEditSpecifications(e.target.value)}
                    placeholder="Specifications"
                    rows={3}
                    className="border w-full p-2 rounded mb-2 resize-y"
                  />
                  <input
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                    className="border w-full p-2 rounded mb-2"
                  />

                  <div className="space-y-2">
                    <input
                      type="file"
                      onChange={(e) => setEditImageFile(e.target.files[0])}
                      className="w-full p-1 border rounded"
                    />
                    <input
                      type="file"
                      onChange={(e) => setEditImageFile2(e.target.files[0])}
                      className="w-full p-1 border rounded"
                    />
                    <input
                      type="file"
                      onChange={(e) => setEditImageFile3(e.target.files[0])}
                      className="w-full p-1 border rounded"
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-blue-600">{product.name}</h2>
                  <p className="text-gray-700 mt-1">{product.description}</p>
                  <p className="text-lg font-bold text-green-700 mt-2">₹{product.price}</p>
                  <p className="text-sm text-gray-600 mt-1">Specs: {product.specifications}</p>
                  <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
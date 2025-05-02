import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      if (!user) return;
      const wishlistRef = collection(db, "users", user.uid, "wishlist");
      const snapshot = await getDocs(wishlistRef);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlist(items);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const itemRef = doc(db, "users", user.uid, "wishlist", itemId);
      await deleteDoc(itemRef);
      setWishlist((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-lg">Please <Link to="/login" className="text-blue-500 underline">log in</Link> to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

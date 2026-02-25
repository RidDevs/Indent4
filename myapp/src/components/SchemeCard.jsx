export default function SchemeCard({ scheme }) {

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(scheme);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist");
  };

  return (
    <div className="scheme-card">
      <h3>{scheme.name}</h3>
      <p>{scheme.description}</p>
      <p><b>Category:</b> {scheme.category}</p>
      <button onClick={addToWishlist}>Save</button>
    </div>
  );
}
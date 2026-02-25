import SchemeCard from "../components/SchemeCard";

export default function Wishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.map((s, i) => (
        <SchemeCard key={i} scheme={s} />
      ))}
    </div>
  );
}
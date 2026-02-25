import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SchemeCard from "../components/SchemeCard";
import { schemes } from "../data/schemes";

export default function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === "" || scheme.category === category)
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h2>Search Schemes</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by scheme name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Education">Education</option>
            <option value="Social Welfare">Social Welfare</option>
          </select>
        </div>

        <div className="schemes-list">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))
          ) : (
            <p>No schemes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SchemeCard from "../components/SchemeCard";
import Filters from "../components/Filters";
import { schemes } from "../data/schemes";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [tab, setTab] = useState("foryou");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!user) return null;


  const userAge = Number(user.age);

  const forYouSchemes = schemes.filter((scheme) =>
    (scheme.state === "All" || scheme.state === user.state) &&
    scheme.minAge <= userAge &&
    (scheme.occupation === "Any" || scheme.occupation === user.occupation)
  );

  const filteredSchemes = schemes.filter((scheme) =>
    (!filters.state || scheme.state === filters.state) &&
    (!filters.occupation || scheme.occupation === filters.occupation)
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <div className="tabs">
          <button onClick={() => setTab("foryou")}>Schemes For You</button>
          <button onClick={() => setTab("forall")}>All Schemes</button>
        </div>

        {tab === "forall" && (
          <Filters filters={filters} setFilters={setFilters} />
        )}

        <div className="schemes-list">
          {tab === "foryou"
            ? forYouSchemes.map((s) => (
                <SchemeCard key={s.id} scheme={s} />
              ))
            : filteredSchemes.map((s) => (
                <SchemeCard key={s.id} scheme={s} />
              ))}
        </div>
      </div>
    </div>
  );
}
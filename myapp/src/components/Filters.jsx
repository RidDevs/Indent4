import { states } from "../data/states";

export default function Filters({ filters, setFilters }) {

  const occupations = [
    "Farmer",
    "Student",
    "Self Employed",
    "Unemployed",
    "Government Employee",
    "Private Employee",
    "Senior Citizen"
  ];

  return (
    <div className="filters">

      
      <select
        value={filters.state || ""}
        onChange={(e) =>
          setFilters({ ...filters, state: e.target.value })
        }
      >
        <option value="">All States</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      
      <select
        value={filters.occupation || ""}
        onChange={(e) =>
          setFilters({ ...filters, occupation: e.target.value })
        }
      >
        <option value="">All Occupations</option>
        {occupations.map((occ) => (
          <option key={occ} value={occ}>
            {occ}
          </option>
        ))}
      </select>

    </div>
  );
}
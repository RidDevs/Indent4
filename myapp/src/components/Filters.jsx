export default function Filters({ filters, setFilters }) {
  return (
    <div className="filters">
      <select onChange={(e) => setFilters({...filters, state: e.target.value})}>
        <option value="">State</option>
        <option value="Assam">Assam</option>
      </select>

      <select onChange={(e) => setFilters({...filters, occupation: e.target.value})}>
        <option value="">Occupation</option>
        <option value="Farmer">Farmer</option>
        <option value="Student">Student</option>
      </select>
    </div>
  );
}
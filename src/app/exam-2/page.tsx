"use client";
import { useState, useEffect } from "react";
import { fetchData, filterData, paginateData, sortData } from "./action";

type DataItem = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  gender: "male" | "female";
  age: number;
};

export default function HomePage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortedData, setSortedData] = useState<DataItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<keyof DataItem>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const jsonData: DataItem[] = await fetchData();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        console.error(err); // Log the error
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let filteredData = filterData(data, search, genderFilter);
      filteredData = sortData(filteredData, sortField, sortOrder);
      setSortedData(filteredData);
      setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    }
  }, [data, search, genderFilter, sortField, sortOrder]);

  const handleSortChange = (field: keyof DataItem) => {
    setSortOrder((prevOrder) => {
      const newOrder = sortField === field ? (prevOrder === "asc" ? "desc" : "asc") : "asc";
      return newOrder;
    });
    setSortField(field);
  };

  const displayedData = paginateData(sortedData, page, ITEMS_PER_PAGE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-24 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-4">
        <div className="relative group">
          <input
            type="text"
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute left-0 bottom-12 bg-gray-700 text-white text-xs p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Search by name, email, or phone
          </div>
        </div>

        <select
          className="p-2 border rounded-xl focus:outline-none"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <table className="min-w-full table-auto border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-2 cursor-pointer hover:bg-gray-300" onClick={() => handleSortChange("id")}>
              ID
            </th>
            <th className="border p-2 hover:bg-gray-300">Full Name</th>
            <th className="border p-2 hover:bg-gray-300">Email</th>
            <th className="border p-2 hover:bg-gray-300">Phone</th>
            <th className="border p-2 cursor-pointer hover:bg-gray-300" onClick={() => handleSortChange("age")}>
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.fullName}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="p-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="p-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

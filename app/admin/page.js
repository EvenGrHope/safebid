"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminPage() {
  const [stats, setStats] = useState({});
  const [advisors, setAdvisors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  if (isAuthenticated) {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats || data)); // 👈 fikser strukturen
    fetch("/api/advisors")
      .then((res) => res.json())
      .then(setAdvisors);
  }
}, [isAuthenticated]);


  const handleLogin = async () => {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Feil passord. Prøv igjen.");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🔒 Adminpålogging</h2>
          <input
            type="password"
            placeholder="Skriv inn adminpassord"
            className="border w-full rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 w-full"
          >
            Logg inn
          </button>
        </div>
      </main>
    );
  }

  // ✅ Når innlogget — vis adminpanelet
  const chartData = stats && typeof stats === "object"
    ? Object.entries(stats).map(([company, count]) => ({
        company,
        count,
      }))
    : [];


  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Safebid Adminpanel</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Antall anbud per selskap</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 Rådgivere</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Navn</th>
                <th className="p-3 border-b">Selskap</th>
                <th className="p-3 border-b">E-post</th>
                <th className="p-3 border-b">Telefon</th>
                <th className="p-3 border-b text-right">Antall anbud</th>
              </tr>
            </thead>
            <tbody>
              {advisors.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{a.id}</td>
                  <td className="p-3 border-b">{a.navn}</td>
                  <td className="p-3 border-b">{a.selskap}</td>
                  <td className="p-3 border-b">{a.epost}</td>
                  <td className="p-3 border-b">{a.telefon}</td>
                  <td className="p-3 border-b text-right font-semibold">{a.anbud}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

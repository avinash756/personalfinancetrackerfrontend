import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

import QrScanner from "../qrScanner";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { IoMdArrowBack } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import moment from "moment-timezone";
import "./index.css";

function AddExpense() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [showScanner, setShowScanner] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
    note: "",
  });

  // Dynamic greeting
  const getGreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const greeting = getGreetings();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle QR scan result
  const handleScanSuccess = (data) => {
    if (!formData.amount) {
      toast.error("Please enter the amount before scanning.");
      return;
    }

    if (data.startsWith("upi://pay")) {
      const url = new URL(data);
      const params = new URLSearchParams(url.search);

      const pa = params.get("pa");
      const pn = params.get("pn") || "Payee";
      const note = formData.note || "UPI Payment";

      // Build a complete UPI link
      const completeLink = `upi://pay?pa=${pa}&pn=${pn}&am=${formData.amount}&cu=INR&tn=${encodeURIComponent(note)}`;
      setUpiLink(completeLink);
      setShowScanner(false);

      // Optional: Autofill category if note mentions groceries
      const categoryGuess = note.toLowerCase().includes("grocer") ? "Groceries" : "";

      setFormData((prev) => ({
        ...prev,
        type: "expense",
        category: categoryGuess,
        description: note,
        date: moment().tz("Asia/Kolkata").toISOString(),
      }));
    } else {
      toast.error("Not a valid UPI QR code.");
    }
  };

  // Open UPI app
  const handleUpiRedirect = () => {
    if (!upiLink) return;
    window.open(upiLink, "_blank");
  };

  // Submit form to backend
  const submitExpense = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();
      const payload = {
        ...formData,
        date: moment().tz("Asia/Kolkata").toISOString(),
      };

      const api = `${process.env.REACT_APP_API_URL}/api/transactions`;
      await axios.post(api, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${formData.type === "income" ? "Income" : "Expense"} Added!`);

      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        note: "",
      });

    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add expense!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-expense-bg">
      <Link to="/" className="home-button">Home <IoMdArrowBack /></Link>
      <h2 className="greeting-user">{greeting} {user?.fullName || "User"} 👋</h2>

      <button
        className={showScanner ? "Close-scanner-button" : "Show-scanner-button"}
        onClick={() => {
          if (!formData.amount) {
            toast.warning("Please enter the amount before scanning.");
            return;
          }
          setShowScanner(!showScanner);
        }}
      >
        {showScanner ? "Close Scanner" : "Scan UPI QR"}
      </button>

      {showScanner && <QrScanner onScanSuccess={handleScanSuccess} />}

      {upiLink && (
        <div className="upi-link-box">
          <p><strong>Scanned UPI Link:</strong> <code>{upiLink}</code></p>
          <button onClick={handleUpiRedirect}>Open in UPI App</button>
        </div>
      )}

      {loading ? (
        <div className="spinner">
          <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
      ) : (
        <form onSubmit={submitExpense}>
          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            required
          />

          <p><strong>Choose Type:</strong></p>
          <div className="type-toggle">
            <label className={`radio-option ${formData.type === "expense" ? "selected-expense" : ""}`}>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={handleChange}
              />
              <FaArrowDown className="icon" /> Expense
            </label>

            <label className={`radio-option ${formData.type === "income" ? "selected-income" : ""}`}>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={handleChange}
              />
              <FaArrowUp className="icon" /> Income
            </label>
          </div>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            type="text"
            placeholder="Enter the category"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter the description"
          />
          <input
            name="note"
            value={formData.note}
            onChange={handleChange}
            type="text"
            placeholder="Enter a note for the payment"
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddExpense;

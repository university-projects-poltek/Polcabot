import React, { useState } from "react";
import Logo from "../../assets/logo-v1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username, password, confirmPassword } = form;

    let errorMessages = [];

    if (!name) errorMessages.push("Fullname tidak boleh kosong");
    if (!email) errorMessages.push("Email tidak boleh kosong");
    if (!username) errorMessages.push("Username tidak boleh kosong");
    if (!password) errorMessages.push("Password tidak boleh kosong");
    if (!confirmPassword)
      errorMessages.push("Konfirmasi password tidak boleh kosong");

    // Fullname hanya huruf dan spasi
    if (name && !/^[A-Za-z\s]+$/.test(name)) {
      errorMessages.push("Fullname hanya boleh mengandung huruf");
    }

    // Validasi username: hanya huruf dan angka
    if (username && !/^[a-zA-Z0-9]+$/.test(username)) {
      errorMessages.push("Username hanya boleh mengandung huruf dan angka");
    }

    // Password minimal 6 karakter
    if (password && password.length < 6) {
      errorMessages.push("Password minimal 6 karakter");
    }

    // Password dan konfirmasi cocok
    if (password !== confirmPassword) {
      errorMessages.push("Password dan konfirmasi tidak cocok");
    }

    if (errorMessages.length > 0) {
      return alert(errorMessages.join("\n"));
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        form
      );
      enqueueSnackbar(response.data.message || "Registrasi berhasil!", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;
        let fullMessage = message || "Registrasi gagal";
        if (errors && typeof errors === "object") {
          fullMessage = Object.values(errors).join("\n");
        }
        enqueueSnackbar(fullMessage, { variant: "error" });
      } else {
        enqueueSnackbar("Terjadi kesalahan jaringan atau server", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="max-w-xl w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="h-20 mb-4" />
          <h1
            className="text-3xl font-extrabold"
            style={{ fontFamily: "Poppins", color: "var(--color-text)" }}
          >
            Daftar ke{" "}
            <span style={{ color: "var(--color-muted)", fontWeight: "normal" }}>
              PolCaBot
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "register-fullname", 
              name: "name", 
              placeholder: "Masukkan nama lengkap" 
            },
            { id: "register-email", 
              name: "email", 
              type: "email", 
              placeholder: "Masukkan email" 
            },
            { id: "register-username", 
              name: "username", 
              placeholder: "Masukkan nama pengguna" 
            },
            {
              id: "register-password",
              name: "password",
              type: "password",
              placeholder: "Masukkan kata sandi",
            },
            {
              id: "register-confirm-password",
              name: "confirmPassword",
              type: "password",
              placeholder: "Masukkan konfirmasi sandi",
            },
          ].map(({id, name, type = "text", placeholder }) => (
            <input
              key={name}
              id={id}
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-4 py-2 rounded-2xl border focus:outline-none focus:ring-2"
              style={{
                fontFamily: "Anonymous Pro",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
                borderColor: "#4b5563",
                caretColor: "var(--color-primary)",
              }}
            />
          ))}

          <button
            id="submit-register"
            type="submit"
            className="w-full py-2 rounded-2xl font-extrabold border transition-colors"
            style={{
              fontFamily: "Poppins",
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
              background: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
          >
            Daftar
          </button>

          <div style={{ color: "var(--color-muted)" }} className="py-1">
            Atau
          </div>

          <Link to="/login">
            <button
              type="button"
              className="w-full py-2 rounded-2xl font-extrabold text-white transition-colors"
              style={{
                fontFamily: "Poppins",
                background: "var(--color-primary)",
              }}
            >
              Masuk
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";

const UserHome = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div>
      <h1>
        <strong>Selamat Datang, {name}!</strong>
      </h1>
      <p>Anda berhasil login sebagai user.</p>
    </div>
  );
};

export default UserHome;

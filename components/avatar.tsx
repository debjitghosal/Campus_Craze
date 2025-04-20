import React, { useState } from "react";

interface Avatar {
  name: string;
  img: string;
}

const AvatarCustomization: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("/avatars/astronaut.png");

  const avatars: Avatar[] = [
    { name: "Astronaut", img: "/avatars/astronaut.png" },
    { name: "Alien", img: "/avatars/alien.png" },
    { name: "Robot", img: "/avatars/robot.png" },
  ];

  return (
    <div style={{ textAlign: "center", color: "white", background: "black", padding: "20px" }}>
      <h1>🚀 Customize Your Avatar 🚀</h1>

      {/* Avatar Selection */}
      <div>
        <h2>Select Your Avatar:</h2>
        {avatars.map((av) => (
          <button
            key={av.name}
            onClick={() => setAvatar(av.img)}
            style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
          >
            {av.name}
          </button>
        ))}
      </div>

      {/* Display Selected Avatar */}
      <div>
        <h2>Current Avatar:</h2>
        <img src={avatar} alt="Selected Avatar" style={{ width: "150px", borderRadius: "10px" }} />
      </div>
    </div>
  );
};

export default AvatarCustomization;

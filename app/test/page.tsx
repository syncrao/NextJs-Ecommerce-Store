"use client";

import { useState } from "react";

export default function UploadTest() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.secure_url) {
      setImageUrl(data.secure_url);
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Cloudinary Upload Test</h1>

      <input type="file" onChange={uploadImage} />

      {loading && <p>Uploading...</p>}

      {imageUrl && (
        <div className="space-y-4">
          <p>Uploaded Image URL:</p>
          <a href={imageUrl} target="_blank" className="text-blue-500 underline">
            {imageUrl}
          </a>

          <img src={imageUrl} alt="uploaded" className="w-64 rounded-xl" />
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useSession, signIn, signOut } from "next-auth/react";

// export default function Home() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {session ? (
//         <>
//           <p>Welcome {session.user?.email}</p>
//           <button onClick={() => signOut()}>Logout</button>
//         </>
//       ) : (
//         <button onClick={() => signIn("google")}>
//           Login with Google
//         </button>
//       )}
//     </div>
//   );
// }

'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // プロフィール情報を取得
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrorMessage("認証トークンがありません。ログインしてください。");
        router.push("/login"); // ログイン画面へリダイレクト
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.user_name,
            email: data.email,
            location: "三軒茶屋 ロケーション", // 初期値として設定
          });
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.detail || "プロフィールの取得に失敗しました");
        }
      } catch (error) {
        setErrorMessage("サーバーに接続できませんでした");
      }
    };

    fetchProfile();
  }, []);

  const handleHomeClick = () => {
    router.push("/main"); // ホーム画面へ遷移
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-center">{errorMessage}</div>
      </div>
    );
  }

  if (!formData.name || !formData.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
        </div>
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-yellow-400"></span>
          <span className="material-icons text-gray-500">アカウント管理</span>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-gray-100 p-4">
        <div className="flex space-x-12 text-gray-700">
          <a onClick={handleHomeClick} className="font-bold cursor-pointer">
            ホーム
          </a>
          <a href="#" className="font-bold">
            会議室の予約
          </a>
          <a href="#" className="font-bold">
            イベント
          </a>
          <a href="#" className="font-bold">
            スキルを探す
          </a>
          <a href="#" className="font-bold">
            案件を探す
          </a>
          <a href="#" className="font-bold">
            プロジェクト管理
          </a>
          <a href="#" className="font-bold">
            サポート
          </a>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="flex justify-center items-center py-10">
        <div className="bg-white px-24 py-10 rounded-lg shadow-lg w-full max-w-6xl text-gray-800">
          <h1 className="text-3xl font-bold mb-8">私のプロフィール</h1>
          <div className="flex justify-start mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-red-400 to-yellow-400 flex items-center justify-center">
              <span className="text-white text-lg">写真を追加</span>
            </div>
          </div>
          {/* Form Fields */}
          <form className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium">* 基本情報</label>
              <label className="block text-sm font-medium mt-4">名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">メール</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md"
                readOnly
              />
              <p className="text-sm text-gray-500 mt-2">
                お名前とメールアドレスを変更するには、コミュニティチームまでお問い合わせください。
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">ロケーション</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="三軒茶屋 ロケーション">三軒茶屋 ロケーション</option>
                <option value="Other Location">中目黒 ロケーション</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ケントさん元コード
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Account() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "街中　太郎",
//     email: "machinaka@tribiz.jp",
//     location: "三軒茶屋 ロケーション",
//   });

//   const handleHomeClick = () => {
//     router.push("/main"); // ホーム画面へ遷移
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white p-4 shadow flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Image src="/logo.png" alt="Logo" width={150} height={50} />
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center space-x-4">
//           <span className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-yellow-400"></span>
//           <span className="material-icons text-gray-500">アカウント管理</span>
//         </div>
//       </header>

//       {/* Navigation Menu */}
//       <nav className="bg-gray-100 p-4">
//         <div className="flex space-x-12 text-gray-700">
//           <a onClick={handleHomeClick} className="font-bold cursor-pointer">ホーム</a>
//           <a href="#" className="font-bold">会議室の予約</a>
//           <a href="#" className="font-bold">イベント</a>
//           <a href="#" className="font-bold">スキルを探す</a>
//           <a href="#" className="font-bold">案件を探す</a>
//           <a href="#" className="font-bold">プロジェクト管理</a>
//           <a href="#" className="font-bold">サポート</a>
//         </div>
//       </nav>

//       {/* Profile Section */}
//       <div className="flex justify-center items-center py-10">
//         <div className="bg-white px-24 py-10 rounded-lg shadow-lg w-full max-w-6xl text-gray-800">
//           <h1 className="text-3xl font-bold mb-8">私のプロフィール</h1>

//           <div className="flex justify-start mb-8">
//             <div className="w-40 h-40 rounded-full bg-gradient-to-r from-red-400 to-yellow-400 flex items-center justify-center">
//               <span className="text-white text-lg">写真を追加</span>
//             </div>
//           </div>

//           {/* Form Fields */}
//           <form className="space-y-6 text-left">
//             <div>
//               <label className="block text-sm font-medium">* 基本情報</label>
//               <label className="block text-sm font-medium mt-4">名前</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md"
//                 readOnly
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">メール</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md"
//                 readOnly
//               />
//               <p className="text-sm text-gray-500 mt-2">
//                 お名前とメールアドレスを変更するには、コミュニティチームまでお問い合わせください。
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">ロケーション</label>
//               <select
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-md"
//               >
//                 <option value="三軒茶屋 ロケーション">三軒茶屋 ロケーション</option>
//                 <option value="Other Location">中目黒 ロケーション</option>
//               </select>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
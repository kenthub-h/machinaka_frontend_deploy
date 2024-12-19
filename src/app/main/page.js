"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [matchResult, setMatchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountClick = () => {
    router.push("/account");
  };

  const handleFindMatches = async () => {
    setIsLoading(true);
    setMatchResult(null);
    setErrorMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/match`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMatchResult(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "マッチングに失敗しました");
      }
    } catch (error) {
      setErrorMessage("サーバーに接続できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailClick = () => {
    router.push(`/userdashboard`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
        </div>
        <div className="flex items-center space-x-4">
          <span
            className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-yellow-400 cursor-pointer"
            onClick={handleAccountClick}
          ></span>
          <span className="material-icons text-gray-500">アカウント管理</span>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-gray-100 p-4">
        <div className="flex space-x-12 text-gray-700">
          <a href="#" className="font-bold">ホーム</a>
          <a href="#" className="font-bold">会議室の予約</a>
          <a href="#" className="font-bold">イベント</a>
          <a href="#" className="font-bold">スキルを探す</a>
          <a href="#" className="font-bold">案件を探す</a>
          <a href="#" className="font-bold">プロジェクト管理</a>
          <a href="#" className="font-bold">サポート</a>
        </div>
      </nav>

      {/* Top Image */}
      <div className="relative w-full h-[500px]">
        <Image
          src="/officemain.jpg"
          alt="Office Main Image"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-xl font-bold">Welcom 街中 太郎様</h2>
          <p className="text-lg font-semibold"> 三軒茶屋 Office </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center my-8 px-8 space-y-8">
        <button
          onClick={handleFindMatches}
          className="w-5/6 max-w-2xl py-5 text-lg font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          disabled={isLoading}
        >
          案件にマッチした利用者を探す
        </button>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-orange-500">AIによるマッチング中...</p>
          </div>
        )}

        {/* Match Result */}
        {matchResult && (
          <div
            className="bg-white rounded-lg shadow-md w-5/6 max-w-2xl flex p-4 hover:bg-gray-50 cursor-pointer transition"
            onClick={handleDetailClick}
          >
            {/* Left: User Image and Details */}
            <div className="flex flex-col items-center w-1/3">
              <Image
                src="/hotelwoman_maru.png"
                alt="User"
                width={120}
                height={120}
                className="rounded-full"
              />
              <h3 className="text-lg font-semibold mt-4 text-gray-900">火照 営子</h3>
              <p className="text-gray-600">人材開発企業</p>
              <p className="text-gray-600">横浜オフィス</p>
            </div>

            {/* Right: Skills and Experience */}
            <div className="w-2/3 flex flex-col justify-center pl-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">スキル・経験</h4>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>各種の外国人観光客対応</li>
                <li>多文化コミュニケーション（対顧客、対従業員）</li>
                <li>チームビルディング・リーダーシップ</li>
              </ul>
              <span
                onClick={handleDetailClick}
                className="text-orange-500 font-bold cursor-pointer hover:underline self-start"
              >
                詳細を確認 →
              </span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

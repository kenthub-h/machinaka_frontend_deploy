"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlus, FaEnvelope, FaMedal, FaTrophy } from "react-icons/fa";
import { MdLocationOn, MdOutlineTravelExplore } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import RadarChart from "@/components/RadarChart";
import FeedbackSection from "@/components/FeedbackSection";

const Dashboard = () => {
  const [profile] = useState({
    name: "火照 営子",
    position: "人材開発企業",
    office: "横浜オフィス",
    hobbies: ["旅行", "英会話カフェ", "ワインテイスティング", "ヨガ"],
    skills: ["接客指導", "英語", "デザイン"],
    image: "/hotelwoman_maru.png",
  });

  const [feedback] = useState([
    "・接客指導をお願いしましたが、一流のホテルで接客の仕事をしているからと鼻につくようなことも一つもなく、業務に合わせた顧客満足の高め方を教えていただいた。",
    "・カスタマージャーニーマップ作成をお願いした際、顧客体験の細分化が丁寧で、大変参考になった。",
  ]);

  const skillsChartData = [
    { skill: "コミュニケーション", Will: 5, Can: 4 },
    { skill: "マネジメント", Will: 3, Can: 3 },
    { skill: "論理的思考", Will: 3, Can: 2 },
    { skill: "戦略・マーケティング", Will: 4, Can: 3 },
    { skill: "デザイン", Will: 5, Can: 4 },
    { skill: "IT・AI・Tech", Will: 3, Can: 2 },
    { skill: "業務専門性", Will: 3, Can: 4 },
    { skill: "業界専門知識", Will: 4, Can: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* ヘッダー */}
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <Image src="/logo.png" alt="TriBiz Logo" width={150} height={50} />
        <span className="text-gray-800 font-medium">アカウント管理</span>
      </header>

      {/* メインコンテンツ */}
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          {/* 左側: プロフィール */}
          <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-center relative">
            <div className="flex flex-col items-center">
              <Image
                src={profile.image}
                alt={profile.name}
                width={240}
                height={240}
                className="rounded-full border-4 border-gray-300"
              />
              <h2 className="text-4xl font-bold mt-4 text-gray-800">{profile.name}</h2>
              <p className="flex items-center justify-center text-gray-800">
                <BsBriefcase className="mr-2" />
                {profile.position}
              </p>
              <p className="flex items-center justify-center text-gray-800 mt-1">
                <MdLocationOn className="mr-2" />
                {profile.office}
              </p>
              <div className="flex space-x-4 mt-6">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
                  <FaPlus className="mr-2" /> Follow
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-300 rounded-lg shadow-md">
                  <FaEnvelope className="mr-2" /> Message
                </button>
              </div>
            </div>

            {/* 趣味 */}
            <div className="mt-6 text-left">
              <h3 className="text-lg font-bold flex items-center text-gray-800">
                <IoIosHeart className="mr-2 text-red-500" /> 趣味
              </h3>
              <ul className="list-disc list-inside text-gray-800 mt-2">
                {profile.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>

              {/* スキル */}
              <h3 className="text-lg font-bold mt-4 flex items-center text-gray-800">
                <MdOutlineTravelExplore className="mr-2 text-green-500" />
                スキル
              </h3>
              <ul className="list-disc list-inside text-gray-800 mt-2">
                {profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右側: コンテンツ */}
          <div className="md:w-2/3 md:ml-8 mt-8 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-gray-800">スキルチャート</h3>
              <RadarChart data={skillsChartData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
              <h3 className="text-lg font-bold text-gray-800">スキル・経験</h3>
              <ul className="list-disc list-inside text-gray-800 mt-2">
                <li>各種の外国人観光客対応</li>
                <li>多文化コミュニケーション（対顧客、対従業員）</li>
                <li>チームビルディング・リーダーシップ</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
              <h3 className="text-lg font-bold text-gray-800">依頼者からのフィードバック</h3>
              <FeedbackSection feedback={feedback} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// const MapSection = dynamic(() => import('./MapComponent'), { ssr: false });

function PropertyCards() {
  const properties = [
    {
      id: 1,
      title: 'ビズトライ 三軒茶屋',
      description: 'テキスト',
      location: '世田谷区',
      access: 'テキスト',
      capacity: 'テキスト',
      image: '/office1.webp',
    },
    {
      id: 2,
      title: 'ビズトライ 中目黒',
      description: 'テキスト',
      location: '目黒区',
      access: 'テキスト',
      capacity: 'テキスト',
      image: '/office2.webp',
    },
    {
      id: 3,
      title: 'ビズトライ 横浜',
      description: 'テキスト',
      location: '横浜市',
      access: 'テキスト',
      capacity: 'テキスト',
      image: '/office3.webp',
    },
  ];

  return (
    <div className="px-8 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">物件情報</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm px-4 py-2">
                詳細はお問合せください
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{property.description}</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">所在地:</span>
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">アクセス:</span>
                  <span>{property.access}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">登録可能人数:</span>
                  <span>{property.capacity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <img src="/bn.png" alt="バナー" className="w-full max-w-4xl" />
      </div>
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="H¹O Logo" className="h-8" />
        </div>
        <nav className="flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-orange-500">TOP</a>
          <a href="#" className="hover:text-orange-500">ビズトライとは</a>
          <a href="#" className="hover:text-orange-500">物件一覧</a>
          <a href="#" className="hover:text-orange-500">サービス・施設</a>
          <a href="#" className="hover:text-orange-500">契約条件・利用料</a>
          <a href="#" className="hover:text-orange-500">入居者の声</a>
          <a href="#" className="hover:text-orange-500">コラム</a>
          <a href="#" className="hover:text-orange-500">よくあるご質問</a>
        </nav>
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md shadow hover:bg-orange-600"
        >
          ログイン
        </button>
      </header>

      <div>
        <div className="flex justify-center space-x-4 my-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2 text-sm font-semibold rounded ${
              activeTab === 'list'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            一覧から探す
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-6 py-2 text-sm font-semibold rounded ${
              activeTab === 'map'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            地図から探す
          </button>
        </div>
        <div className="px-8 py-6 bg-gray-100">
          {activeTab === 'list' ? (
            <div>
              <h2 className="text-lg font-bold mb-4">エリアから絞り込む</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">首都圏 (17)</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1 bg-gray-200 rounded">中央区 (5)</button>
                    <button className="px-4 py-1 bg-gray-200 rounded">新宿区 (1)</button>
                    <button className="px-4 py-1 bg-gray-200 rounded">渋谷区 (3)</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">関西 (3)</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1 bg-gray-200 rounded">大阪市北区 (1)</button>
                    <button className="px-4 py-1 bg-gray-200 rounded">大阪市中央区 (1)</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">九州 (1)</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1 bg-gray-200 rounded">福岡市博多区 (1)</button>
                  </div>
                </div>
              </div>
              <PropertyCards />
            </div>
          ) : (
            <MapSection />
          )}
        </div>
      </div>
    </div>
  );
}

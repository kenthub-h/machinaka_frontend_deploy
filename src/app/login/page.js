'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // トークンを保存 (localStorageに保存)
        localStorage.setItem('access_token', data.access_token);
        alert('ログイン成功');
        router.push('/main'); // ログイン後、プロフィール画面に遷移
      // トークン前のコード
      // if (response.ok) {
      //   alert('ログイン成功');
      //   router.push('/main');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || 'ログインに失敗しました');
      }
    } catch (error) {
      setErrorMessage('サーバーに接続できませんでした');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* ログインフォーム */}
      <form
        onSubmit={handleLogin}
        className="w-[400px] bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ログイン
        </h1>
        {/* エラーメッセージ */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errorMessage}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="example@domain.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
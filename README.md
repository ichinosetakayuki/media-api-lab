# iTunes Search App (media-api-lab)

iTunes Search APIを利用して音楽を検索し、結果を表示するシンプルなWebアプリケーションです。

## 🚀 特徴 (Features)
- アーティスト名とキーワードによる楽曲検索
- iTunes APIを利用したリアルタイムな楽曲データの取得
- React + Tailwind CSS / Material-UI によるモダンでレスポンシブなUI

## 🛠 技術スタック (Tech Stack)

### フロントエンド (Frontend)
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4, Material-UI (MUI framework)
- **Node Version Management**: Volta (Node v24.12.0)

### バックエンド (Backend)
- **Language**: Python 3
- **Framework**: Flask
- **Packages**: requests (外部API通信用)

## 📁 プロジェクト構成 (Project Structure)
```text
media-api-lab/
├── backend/            # Flask(Python) バックエンドAPIサーバー
│   ├── app.py          # APIルーティングとロジック（メインファイル）
│   └── requirements.txt# Python依存パッケージ管理ファイル
└── frontend/           # React(Vite) フロントエンドアプリケーション
    ├── src/            # コンポーネント等のソースコード
    ├── package.json    # Node.js依存関係やスクリプト設定
    └── vite.config.js  # Viteおよび開発用Proxy設定
```

## ⚙️ 環境構築と起動方法 (Getting Started)

プロジェクトをローカルで動かすための手順です。
ターミナルを2つ開き、以下それぞれのサーバーを起動してください。

### 1. バックエンドのセットアップと起動
```bash
# バックエンドディレクトリに移動
cd backend

# Python仮想環境の作成と有効化 (Mac/Linux環境)
python3 -m venv venv
source venv/bin/activate

# 依存パッケージのインストール
pip install -r requirements.txt

# Flaskサーバーの起動（デフォルト: http://127.0.0.1:5000）
python app.py
```

### 2. フロントエンドのセットアップと起動
```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係のインストール (npmを利用)
npm install

# 開発サーバーの起動
npm run dev
```

アプリケーションは通常、ブラウザで `http://localhost:5173/` にアクセスすることで利用できます。

## 🔄 CORS対策とProxy設定について
ローカル開発時において、フロントエンド（5173ポート）からバックエンド（5000ポート）へ直接APIリクエストを行うとCORSエラーが発生します。
これを回避するため、本プロジェクトではViteのProxy機能を使用しています。

フロントエンド内で `/api/...` にリクエストを送ることで、自動的にバックエンド `http://127.0.0.1:5000/api/...` へ転送される仕組みとなっています。
*(※この設定は開発環境専用であり、本番環境にデプロイする際は別途サーバー側の設定が必要です)*

## 📡 主要なAPIエンドポイント
- `GET /api/health` : APIサーバーの死活監視・ヘルスチェック
- `POST /api/itunes/search` : iTunes APIを利用した楽曲検索（JSON形式で `artist` と `keyword` をPOST）
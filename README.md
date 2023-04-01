BPSの協力会社として横浜を拠点に活動しております、株式会社ECNの杉本です。
​
supabaseとNext.jsの情報を仕入れて発信するシリーズで今回はsupabaseの認証をappディレクトリのroute handlerで行う方法について公式のYoutubeチャンネルでちょうどさっきアップロード数秒前になってたので1番ノリでやりたいと思って試してみます。
​
https://www.youtube.com/watch?v=KmJN-bEayeY
​
## 今回作るもの
簡単なTODOアプリを作ります。

## 目次
1. プロジェクト立ち上げ+セットアップ
2. supabaseのセットアップ
   - todosテーブル作成
   - auth provderの設定
   - supabaseクライアントのインストール 
3. 
​
##  プロジェクト立ち上げ+セットアップ

### Nextの準備
```npx create-next-app demo-app --typescript```

​まずはNEXTのインストール
もちろんtypescriptでやります

### appディレクトリ有効化
```
experimental: {
    appDir: true
  },
```
`next.config.json`に上の内容を追記します。
appこれでaooディレクトリが有効化されます。


### tailwindcss
https://tailwindcss.com/docs/guides/nextjs
tailwindのセットアップを行います。
```
$ npm install -D tailwindcss postcss autoprefixer

$ npx tailwindcss init -p
```

tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

./syles/global.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## supabaseのセットアップ

​### プロジェクト作成
supabaseのセットアップですが各自でプロジェクトを作成していただくか、既存プロジェクトをお使いください🙏

https://app.supabase.com/

### auth provderの設定
auth providerの設定はEmailを有効にします。
今回はdemoなのでメール認証は切っておきます。

TODOスクショ


### todosテーブル作成

```
id: uuid型でuid_generate_v4()
created_at: is Nullableを外す
title: text型 Nullableを外す
conpleted: bool defaultにfalse Nullableを外す
user_id: uuid Nullableを外す authスキーマのusersのidとリレーションを貼る
​```

### Row Level Security

todosテーブルのrow level securityを設定します。

## まとめ（あってもなくてもいい）
​
テキストが入ります
​
​
​
​
### --------- 以下固定footer  ------
株式会社ECNは主にお客様のご要望に合わせたwebサービス、システム開発を承っております。
クリックしてファ
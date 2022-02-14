# DB Shema

## テーブル一覧

| テーブル名 | 概要 | 備考 |
| :--- | :--- | :--- |
| `user_log_type` | `user_log`のイベントタイプ | 中間テーブル |
| `user_log` | `user`の作成・変更やフォローに関するログ | トランザクションテーブル |
| `content_log_type` | `content_log`のイベントタイプ | 中間テーブル |
| `content_log` | `content`に対しての返信やいいねに関するログ | トランザクションテーブル |

---

## 特記カラム属性

- PK : PrimaryKey
- FK : ForeignKey 
- UQ : Uniqe
- NN : Not Null
- AI : Auto Increment
- UN : Unsigned

※ ForeignKey制約には基本的にCASCADEを付与する

---

## `password_reset_token`

パスワード再設定トークン

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `signup_token`

ユーザー本登録トークン

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `user`

ユーザー

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(255) | √ | - | √ | √ | - | - | - | UUID |
| `first_name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `last_name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `email` | VARCHAR(255) | - | - | √ | √ | - | - | - | |
| `password_hash` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `status` | Enum( `tmp`, `active` ) | - | - | - | √ | - | - | `tmp` | `tmp`: 仮登録, `active`: 本登録 |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `follow`

`user`に対してのフォロー : 中間テーブル

- `user_id` : フォローしているユーザー
- `follow_id` : フォローされているユーザー

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `follow_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content_category`

コンテンツのカテゴリー : マスターテーブル

- `name`
  - `life_style` : 生活
  - `engineering` : エンジニアリング
  - `media` : メディア
  - `other` : その他

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content`

コンテンツ

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(255) | √ | - | √ | √ | - | - | - | UUID |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `content_category_id` | INT | - | √ | - | √ | - | - | - | `content_category` |
| `detail` | VARCHAR(65535) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `reply`

コンテンツに対しての返信 : 中間テーブル

- `parent_contennt_id` : 返信先
- `reply_content_id` : 返信

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `parent_contennt_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `reply_content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `good`

コンテンツに対しての高評価 : 中間テーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `user_log_type`

ユーザーのアクションに関するログのタイプ : マスターテーブル

- `name`
  - `register` : 新規登録
  - `update` : プロフィール更新

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `user_log`

ユーザーのアクションに関するログ : トランザクションテーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `type` | INT | - | √ | - | √ | - | - | - | `user_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content_log_type`

コンテンツのアクションに関するログのタイプ : マスターテーブル

- `name`
  - `post` : 新規作成
  - `update` : 内容の編集

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content_log`

コンテンツのアクションに関するログ : トランザクションテーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `sub_content_id` | VARCHAR(255) | - | √ | - | - | - | - | - | `content` |
| `type` | INT | - | √ | - | √ | - | - | - | `content_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

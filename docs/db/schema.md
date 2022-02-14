# DB Shema

## 特記カラム属性

- PK : PrimaryKey
- FK : ForeignKey 
- UQ : Uniqe
- NN : Not Null
- AI : Auto Increment
- UN : Unsigned

※ ForeignKeyの`ON_DELETE`制約には基本的に`CASCADE`を付与する

---

## `password_reset_tokens`

パスワード再設定トークン

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `signup_tokens`

ユーザー本登録トークン

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `users`

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

## `follows`

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

## `contents`

コンテンツ

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(255) | √ | - | √ | √ | - | - | - | UUID |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `detail` | VARCHAR(65535) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `replies`

コンテンツに対しての返信 : 中間テーブル

- `parent_content_id` : 返信先
- `reply_content_id` : 返信

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `parent_content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `reply_content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `goods`

コンテンツに対しての高評価 : 中間テーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `user_log_types`

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

## `user_logs`

ユーザーのアクションに関するログ : トランザクションテーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `type` | INT | - | √ | - | √ | - | - | - | `user_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content_log_types`

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

## `content_logs`

コンテンツのアクションに関するログ : トランザクションテーブル

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `content_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `type` | INT | - | √ | - | √ | - | - | - | `content_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

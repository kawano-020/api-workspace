# DB Shema

## テーブル一覧

| テーブル名 | 概要 | 備考 |
| :--- | :--- | :--- |
| `password_reset_token` | パスワード再設定トークン | |
| `signup_token` | ユーザー本登録トークン | |
| `user` | ユーザー | |
| `follow` | `user`に対してのフォロー | 中間テーブル |
| `content` | ユーザーの呟き | |
| `category` | `content`のカテゴリー | マスターテーブル |
| `reply` | `content`に対しての返信 | 中間テーブル |
| `good` | `content`に対してのいいね | 中間テーブル |
| `user_log_type` | `user_log`のイベントタイプ | 中間テーブル |
| `user_log` | `user`の作成・変更やフォローに関するログ | トランテーブル |
| `content_log_type` | `content_log`のイベントタイプ | 中間テーブル |
| `content_log` | `content`に対しての返信やいいねに関するログ | トランテーブル |

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

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |

---

## `signup_token`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `token` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `user_id` | VARCHAR(255) | - | √ | √ | √ | - | - | - | `user` |

---

## `user`

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

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `from` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `to` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `category`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `content`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(255) | √ | - | √ | √ | - | - | - | UUID |
| `user_id` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `category_id` | INT | - | √ | - | √ | - | - | - | `category` |
| `detail` | VARCHAR(65535) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `reply`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `target` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `content` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `good`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `target` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `user_log_type`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `user_log`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `user` | VARCHAR(255) | - | √ | - | √ | - | - | - | `user` |
| `sub_user` | VARCHAR(255) | - | √ | - | - | - | - | - | `user` |
| `type` | INT | - | √ | - | √ | - | - | - | `user_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

---

## `content_log_type`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `name` | VARCHAR(255) | - | - | - | √ | - | - | - | |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |
| `updated_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp on update current_timestamp` | |

---

## `content_log`

| カラム名 | データ型 | PK | FK | UQ | NN | AI | UN | Default | 備考 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | √ | - | √ | √ | √ | √ | - | |
| `content` | VARCHAR(255) | - | √ | - | √ | - | - | - | `content` |
| `sub_content` | VARCHAR(255) | - | √ | - | - | - | - | - | `content` |
| `type` | INT | - | √ | - | √ | - | - | - | `content_log_type` |
| `created_at` | DATETIME | - | - | - | √ | - | - | `current_timestamp` | |

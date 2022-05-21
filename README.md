
# Software Engineer (Mobile App React Native) Test JALA 



![Logo](https://is5-ssl.mzstatic.com/image/thumb/PurpleSource125/v4/93/43/ca/9343cafd-2948-3d82-3d53-93a1d533de31/7dde36ff-0948-44f4-bf7d-25b09b3d232b_02-5_U002c5.png/750x750bb.jpeg)


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Features

- Harga Udang
- Kabr Udang
- Penyakit Udang


## API Reference

#### List Harga Udang

```http
  GET https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Filter Harga Udang

```http
  GET https://app.jala.tech/api/regions?has=shrimp_prices&search=
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Detail Harga Udang

```http
  GET https://app.jala.tech/api/shrimp_prices/(id)?with=region,creator&region_id=
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### List Kabar Udang

```http
  GET https://app.jala.tech/api/posts?per_page=15&page=1&with=creator
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### List Penyakit

```http
  GET https://app.jala.tech/api/diseases?per_page=15&page=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


## Installation

Install fe-jala-shrimpapp with npm

```bash
  npm install fe-jala-shrimpapp
  cd fe-jala-shrimpapp
  npm start
```
    
## Demo

Insert gif or link to demo


## Tech Stack

**Client:** React Native Expo
**Server:** Node, Express


## License

[MIT](https://choosealicense.com/licenses/mit/)


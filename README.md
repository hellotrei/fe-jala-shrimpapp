
# Software Engineer (Mobile App React Native) Test JALA 

A brief description of what this project does and who it's for


![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


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

**Client:** React Native Expo, Redux

**Server:** Node, Express


## License

[MIT](https://choosealicense.com/licenses/mit/)


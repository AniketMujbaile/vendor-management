# vendor-management
 Developed a Vendor Management System using Node.js and the NestJS framework. This system will manage vendor profiles, track purchase orders, and calculate vendor performance metrics.

## 🔗 Hosted link

Postman API Testing Documentation: [API Documentation](https://documenter.getpostman.com/view/24632237/2sAXjDdEtq)


## Technologies Used

- Node.js
- Express.js
- MongoDB
 
## Configuration File
1. Create a Mongoose database and update the connection details in `.env`.

```ENV

PORT=3000

DATABASE_URL=YOUR_URL
 
```
## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
npm start
```

## Endpoints

- Create a Vendor: `POST http://localhost:3000/vendors`:
```bash
Body:
{
  "name": "Vendor A",
  "contactDetails": "vendor-a@example.com",
  "address": "xyz",
  "vendorCode": "ABC"
}
```

- List all Vendors: `GET http://localhost:3000/vendors`

- Get a Vendor by ID: `GET http://localhost:3000/vendors/{vendorId}`

- Update a Vendor: `PUT http://localhost:3000/vendors/{vendorId}`
```bash
Body:
{
  "name": "Vendor A (Updated)",
  "contactDetails": "vendor-a-updated@example.com"
}
```

- Delete a Vendor: `DELETE http://localhost:3000/vendors/{vendorId}`


- Create a Purchase Order: `POST http://localhost:3000/purchase-orders`

```bash
Body:
{
  "vendor": "123456789012345678901234",
  "poNumber": "PO001",
  "orderDate": "2023-08-01",
  "deliveryDate": "2023-08-15",
  "items": {
    "name": "Product A",
    "quantity": 10
  },
  "quantity": 10,
  "status": "pending"
}
```

- List Purchase Orders (optionally filter by Vendor): `GET http://localhost:3000/purchase-orders?vendorId={vendorId}`

- Get a Purchase Order by ID: `GET http://localhost:3000/purchase-orders/{poId}`

- Update a Purchase Order: `PUT http://localhost:3000/purchase-orders/{poId}`
```bash
Body:
{
  "status": "completed",
  "qualityRating": 4
}
```

- Delete a Purchase Order: `DELETE http://localhost:3000/purchase-orders/{poId}`

- Get a Vendor's Performance Metrics: `GET http://localhost:3000/performance/{vendorId}`

- Acknowledge a Purchase Order: `POST http://localhost:3000/purchase-orders/{poId}/acknowledge`

 

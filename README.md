## Shopify Backend Challenge
This backend challenge was created using the MERN stack, standing for MongoDB, Express, React, and Node. MongoDB stores inventory data and Express was used to create a RESTful API with the basic CRUD functionality. A simple frontend was created using React and Axios was used to make the API requests. 

The additional feature added was a button to export product data to a CSV.

## Project Installation and Setup Instructions
Clone down the repository. You will need `node` and `npm` installed globally on your machine.
The following two commands must be perfomed in both the `frontend` directory and the `backend` directory
Installation:
`npm install`  
To Start Server:
`npm start`  
To Visit App:
`localhost:3000/`  

## API Endpoints
### POST
`/inventory`
Created an inventory item, inventory name is required. An inventory ID will be automatically generated.
Request body example:
```
{
    name: "item1",
    quantity: 1
}
```

### PUT
`/inventory/:id`
Updates an inventory item with specified id. Request body is similar to above.

### DELETE
`/inventory/:id`
Deletes an inventory item with specified id.

### GET
`/inventory`
Returns a list of inventory items.
`/inventory/csv`
Returns a csv file of inventory items.


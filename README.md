This is the backend server for my final project and needs the Final_Frontend to function.
### Routers
 The server contains 5 routers:
 - Products
 - Users
 - Orders
 - Product Images
 - User Images

Most requests can be viewed in the requests.rest file

Images are stored in either public/images/products or public/images/users accordingly.

The rest of the data gets stored in MongoDB using mongoose.

The database will be populated with data upon initialization.

# Mamazon MVC

Simple Node.js, Express, and MongoDB project with MVC structure.

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas.
2. Create a `.env` file in the project root.
3. Add your connection string:

   `PORT=5000`
   `MONGO_URI=mongodb://127.0.0.1:27017/mamazon`

4. Start MongoDB before running the app.

### MongoDB Atlas Setup

1. Go to Atlas and open your cluster.
2. In `Database Access`, create a database user.
3. In `Network Access`, allow your current IP address.
4. For quick testing, you can temporarily allow `0.0.0.0/0`.
5. Put your Atlas URI in `.env`:

   `MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/mamazon?retryWrites=true&w=majority&appName=Cluster0`

6. Restart the app and check terminal log for `mongo connected`.

## Run

```bash
npm install
npm run start
```

## Seed Products

Open this in the browser or use Postman after the server starts:

```bash
POST /api/products/seed
```

This inserts the sample products from `data/products.json` into MongoDB when the collection is empty.

## Contact Messages

The Contact Us form saves messages to MongoDB through:

```bash
POST /api/contact
```
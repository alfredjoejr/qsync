

# Run and deploy your app

This contains everything you need to run your app locally.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`

2. Run the app:
   `npm run dev`

3. All database information must be fed in .env.example

4. Please run the scheme in schema.sql before testing the backend.

## Adding Hashed Password (Testing)

``` In terminal enter: node -e "console.log(require('bcryptjs').hashSync('543210', 10));" ```


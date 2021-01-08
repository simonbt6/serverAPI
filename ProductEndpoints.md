

# Products API Endpoints

**Show a single product**
----
  Returns json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, name : "Asus GeForce RTX 2080 TI", "shop": 1, "url": "https://amazon.com/...", "price": 10.90, "size_id": 1 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/products/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
----
***Show all products***
----
Returns json data about all products.

* **URL**

  /products/

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : 1, name : "Asus GeForce RTX 2080 TI", "shop": 1, "url": "https://amazon.com/...", "price": 10.90, "size_id": 1 },...]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/products/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  ----
  ***Update Product***
  ----
  Returns json data about a single product.

* **URL**

  /products/update/

* **Method:**

  `POST`
  
*  **URL Params**

 
   None

* **Data Params**

  **Required:**
  `
  id, name, shop, price 
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, name : "Asus GeForce RTX 2080 TI", "shop": 1, "url": "https://amazon.com/...", "price": 10.90, "size_id": 1 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`
  
    OR
  * **Code:** 400 INVALID REQUEST <br />
    **Content:** `{ error : "Invalid product attributes." }`
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  ----
  ***Delete Product***
  ----
  Deletes a product.
* **URL**

  /products/delete/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   id=[integer]

* **Data Params**

  None
 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: "Product deleted.", id: 1 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
      ----
  ***Update Product***
  ----
  Returns json data about a single product.

* **URL**

  /products/update/

* **Method:**

  `POST`
  
*  **URL Params**

 
   None

* **Data Params**

  **Required:**
  `
  id, name, shop, price 
  `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, name : "Asus GeForce RTX 2080 TI", "shop": 1, "url": "https://amazon.com/...", "price": 10.90, "size_id": 1 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`
  
    OR
  * **Code:** 400 INVALID REQUEST <br />
    **Content:** `{ error : "Invalid product attributes." }`
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  ----
  ***Create Product***
  ----
  Create a new product.
* **URL**

  /products/delete/:id

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
  `
  name, url 
  `
 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id: 1, name: "Asus GeForce RTX 2080 TI", shop: 1, url: "https://amazon.com/...", price: 2889, size_id: 1 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
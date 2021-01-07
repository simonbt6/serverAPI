# ServerAPI
API for store front.

## Database Tables
* [X] product
    * [X] id
    * [X] name
    * [X] brand
    * [X] size
    * [X] shop_id
    * [X] price
    * [X] updated_at
    * [X] created_at
* [X] shop
    * [X] id
    * [X] name
    * [X] url
    * [X] country
    * [X] updated_at
    * [X] created_at
* [X] user
    * [X] UUID
    * [X] firstname
    * [X] lastname
    * [X] email
    * [X] Password
    * [X] ip_address
    * [X] update_at
    * [X] created_at
* [X] tags
    * [X] id
    * [X] name
* [X] product_tags
    * [X] id
    * [X] tag_id
    * [X] product_id
* [ ] size
    * [ ] id
    * [ ] height
    * [ ] width
    * [ ] length
    * [ ] weight
    * [ ] metric

## API Endpoints
* [ ] Product
    * [X] List
    * [X] Create
    * [X] Get one
    * [ ] Update
    * [ ] Delete
* [] Shop
    * [ ] List
    * [ ] Create
    * [ ] Get one
    * [ ] Update
    * [ ] Delete
* [ ] User
    * [X] List
    * [X] Create
    * [X] Get one
    * [X] Update
    * [ ] Delete
    
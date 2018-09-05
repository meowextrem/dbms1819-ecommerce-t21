var Product = {
  list: function (client, filter, callback) {
    const productListQuery = `
      SELECT * FROM products
      `;
    client.query(productListQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },

  getById: function (client, productId, callback) {
    const productQuery = `
    SELECT *
    FROM products 
    LEFT JOIN brands 
    ON products.brand_id=brands.brand_id 
    RIGHT JOIN products_category 
    ON products.category_id=products_category.category_id 
    WHERE product_id=${productId}
    `;
    client.query(productQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },

  create: function (client, productData, callback) {
    var error = 0;
    const productCheckQuery = `
SELECT name
FROM products
WHERE name = '${productData.product_name}'
`;
    const productCreateQuery = `
INSERT INTO products
(name,description,tagline,price,warranty,category_id,brand_id,picture)
VALUES 
('${productData.product_name}',
'${productData.product_description}',
'${productData.product_tagline}',
'${productData.product_price}',
'${productData.product_warranty}',
'${productData.product_category}',
'${productData.product_brand}',
'${productData.product_picture}')
`;
    client.query(productCheckQuery, (req, data) => {
      if (data.rowCount >= 1) {
        error = 1;
        console.log(error);
        callback(error);
      } else if (data.rowCount === 0) {
        client.query(productCreateQuery);
        console.log(error);
        callback(error);
      }
    });
  },

  update: function (client, productData, callback) {
    var success = 0;
    const updateQuery = `
    UPDATE products 
    SET 
    name = '${productData.product_name}',
    description = '${productData.product_description}',
    tagline= '${productData.tagline}',
    price= '${productData.price}',
    warranty= '${productData.warranty}',
    category_id= '${productData.category}',
    brand_id= '${productData.brand}',
    picture= '${productData.picture}' 
    WHERE product_id=${productData.product_id}
    `;
    client.query(updateQuery)
      .then((result) => {
        console.log('Updated');
        callback(success);
      })
      .catch((err) => {
        console.log('error', err);
        success = 1;
        callback(success);
      });
  },

  deleteProd: function (client, productId, callback) {
    const productDeleteQuery = `
    DELETE FROM products 
    WHERE product_id='${productId}'
    `;
    client.query(productDeleteQuery, (req, data) => {
      callback(data);
    });
  }
};
module.exports = Product;

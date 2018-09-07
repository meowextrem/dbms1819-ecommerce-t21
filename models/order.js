var Order = {

  list: function (client, filter, callback) {
    var pagenum = `${filter.page}`;
    var pagesize = 10;
    const orderQuery = `
      SELECT *
      FROM orders
      INNER JOIN customer
      ON orders.customer_id=customer.customer_id
      INNER JOIN products ON orders.product_id=products.product_id
      ORDER BY orders_id ASC
      OFFSET ((`+pagenum+`-1)*10) ROWS
      FETCH NEXT 10 ROWS ONLY
	  `;
    client.query(orderQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  getByCustomerId: function (client, customerId, callback) {
    const orderQuery = `
      SELECT * 
      FROM orders
      INNER JOIN products
      ON orders.product_id=products.product_id
      WHERE customer_id='${customerId}'
    `;
    client.query(orderQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  create: function (client, orderData, callback) {
    var success = 1;
    const orderCreateQuery = `
      INSERT INTO orders (customer_id,product_id,quantity,order_date)
      VALUES
      ('${orderData.customer_id}','${orderData.product_id}','${orderData.quantity}',CURRENT_TIMESTAMP)
      `;
    console.log(orderCreateQuery);
    client.query(orderCreateQuery, (req, data) => {
      console.log(data);
      callback(success);
    });
  }
};

module.exports = Order;
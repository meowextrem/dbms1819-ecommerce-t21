var Dashboard = {
  custNoOfOrders: function (client, filter, callback) {
    const DashboardQuery = `
      SELECT concat(first_name,' ',last_name)as customer_name,
      ROW_NUMBER() OVER (ORDER BY sum(orders.quantity) DESC) as row ,
      sum(orders.quantity) as orderNo
      FROM orders
      INNER JOIN customer cust
      ON orders.customer_id=cust.customer_id
  GROUP BY customer_name
  ORDER BY sum(orders.quantity) DESC
  LIMIT 10
      `;
    client.query(DashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  custHighPay: function (client, filter, callback) {
    const DashboardQuery = `
      SELECT concat(first_name,' ',last_name)as customer_name,
      ROW_NUMBER() OVER (ORDER BY sum(orders.quantity*products.price) DESC) as row ,
      sum(orders.quantity*products.price) as totalPay
      FROM orders
      INNER JOIN customer cust
  ON orders.customer_id=cust.customer_id
  INNER JOIN products ON orders.product_id=products.product_id
  GROUP BY customer_name
  ORDER BY sum(orders.quantity*products.price) DESC
  LIMIT 10
      `;
    client.query(DashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  prodMost: function (client, filter, callback) {
    const dashboardQuery = `
      SELECT products.name AS product_name,
      ROW_NUMBER() OVER (ORDER BY sum(orders.quantity) DESC) as row ,
      sum(orders.quantity) as total
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
  GROUP BY product_name
  ORDER BY sum(orders.quantity) DESC
  LIMIT 10
      `;
    client.query(dashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  prodLeast: function (client, filter, callback) {
    const dashboardQuery = `
      SELECT products.name AS product_name,
      ROW_NUMBER() OVER (ORDER BY COUNT(orders.quantity) ASC) as row ,
      COUNT(orders.quantity) as total
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
  GROUP BY product_name
  ORDER BY COUNT(orders.quantity) ASC
  LIMIT 10
      `;
    client.query(dashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  mostBrand: function (client, filter, callback) {
    const dashboardQuery = `
      SELECT brands.brand_name AS brand_name,
      ROW_NUMBER() OVER (ORDER BY sum(orders.quantity) DESC) as row ,
      sum(orders.quantity) as total
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
      INNER JOIN brands
  ON products.brand_id=brands.brand_id
  GROUP BY brand_name
  ORDER BY sum(orders.quantity) DESC
  LIMIT 3
      `;
    client.query(dashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  mostCategory: function (client, filter, callback) {
    const dashboardQuery = `
      SELECT category.category_name AS category_name,
      ROW_NUMBER() OVER (ORDER BY sum(orders.quantity) DESC) as row ,
      sum(orders.quantity) as total
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
      INNER JOIN products_category category
  ON products.category_id=category.category_id
  GROUP BY category_name
  ORDER BY sum(orders.quantity) DESC
  LIMIT 3
      `;
    client.query(dashboardQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  totalSalesSeven: function (client, filter, callback) {
    const productListQuery = `
      SELECT distinct sum(orders.quantity*products.price) as totalSale
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
  where order_date > (CURRENT_DATE - INTERVAL '7 days')
  ORDER BY sum(orders.quantity*products.price) DESC
      `;
    client.query(productListQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  totalSalesThirty: function (client, filter, callback) {
    const productListQuery = `
      SELECT distinct sum(orders.quantity*products.price) as totalSale
      FROM orders
  INNER JOIN products ON orders.product_id=products.product_id
  where order_date > (CURRENT_DATE - INTERVAL '30 days')
  ORDER BY sum(orders.quantity*products.price) DESC
      `;
    client.query(productListQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  },
  dailyOrderCount: function (client, filter, callback) {
    const productListQuery = `
      SELECT count(*),date(order_date)
      FROM orders  
      where order_date > (CURRENT_DATE - INTERVAL '7 days')
      GROUP BY date(order_date)
      ORDER BY date(order_date) DESC
      `;
    client.query(productListQuery, (req, data) => {
      // console.log(data.rows);
      callback(data.rows);
    });
  }
};
module.exports = Dashboard;

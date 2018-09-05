var Customer = {
  list: function (client, callback) {
    const listQuery = `
    SELECT *
      FROM customer
    `;
    client.query(listQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  getById: function (client, id, callback) {
    const customerQuery = `
      SELECT * 
      FROM customer
      WHERE customer_id = '${id}'
    `;
    client.query(customerQuery, (req, data) => {
      console.log(data);
      callback(data.rows);
    });
  },

  getByEmail: function (client, email, callback) {
    var exist = 0;
    const customerQuery = `
      SELECT * 
      FROM customer
      WHERE email = '${email}'
    `;
    client.query(customerQuery, (req, data) => {
      console.log(data);
      if (data.rowCount === 0) {
        callback(exist);
      } else {
        callback(data.rows);
      }
    });
  },

  create: function (client, customerData, callback) {
    var success = 1;
    const customerCreateQuery = `
  INSERT INTO customer 
  (email,first_name,last_name,street,municipality,province,zipcode)
  VALUES 
  ('${customerData.email}','${customerData.fname}','${customerData.lname}','${customerData.street}','${customerData.municipality}','${customerData.province}','${customerData.zipcode}')
  `;
    console.log(customerCreateQuery);
    client.query(customerCreateQuery, (req, data) => {
      if (data.rowCount === 1) {
        callback(success);
      } else if (data.rowCount === 0) {
        success = 0;
        callback(success);
      }
    });
  }

};
module.exports = Customer;

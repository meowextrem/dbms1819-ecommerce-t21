var Brand = {

  list: function (client, filter, callback) {
    var pagenum = `${filter.page}`;
    var pagesize = 10;
    const brandQuery = `
      SELECT * 
      FROM brands
      ORDER BY brand_id ASC
      OFFSET ((`+pagenum+`-1)*10) ROWS
      FETCH NEXT 10 ROWS ONLY
    `;
    client.query(brandQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  getById: function (client, brandId, callback) {
    const brandQuery = `
      SELECT * 
      FROM brands
      WHERE brand_id = '${brandId}'
    `;
    client.query(brandQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  update: function (client, brandData, callback) {
    const brandQuery = `
      UPDATE brands
      SET
      brand_name = '${brandData.brand_name}',
      brand_description = '${brandData.brand_desc}'
      WHERE brand_id = '${brandData.brand_id}'
    `;
    client.query(brandQuery, (req, data) => {
      if (data.rowCount >= 1) {
        callback(data.rowCount);
      } else {
        callback(data.rowCount);
      }
    });
    // callback(success);
  },

  create: function (client, brandData, callback) {
    var error = 0;
    const checkBrandQuery = `
        SELECT brand_name
        FROM brands
        WHERE brand_name = '${brandData.name}'
        `;
    const brandCreateQuery = `
        INSERT INTO
        brands
       (brand_name,brand_description)
       VALUES 
       ('${brandData.name}','${brandData.description}')
       `;
    client.query(checkBrandQuery, (req, data) => {
      console.log(data);
      if (data.rowCount >= 1) {
        error = 1;
        console.log(error);
        callback(error);
      } else if (data.rowCount === 0) {
        client.query(brandCreateQuery);
        console.log(error);
        callback(error);
      }
    });
  }
};

module.exports = Brand;

const express = require("express")
const router = express.Router()
const faker = require('faker');
const Product = require("../models/product.model")


// home page
router.get('/', (req, res, next)=>{
  let perPage = 16;
  let page = req.params.page || 1;

  Product
    .find() // finding all documents
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) 
    .exec((err, products) => {
      Product.countDocuments((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('product/index_product', {
          products,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
})

// pagination
router.get('/news/:page', (req, res, next) => {
  let perPage = 16; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1; 
  
    Product
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          res.render('product/index_product', {
            products, 
            current: page, 
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });

  // Fake data products
router.get('/generate-fake-data', async(req, res, next) =>{
    for(let i = 0; i < 96; i++) {
    const newprd = new Product();
    newprd.name = faker.commerce.productName()
    newprd.price = faker.commerce.price()
    newprd.cover = faker.image.image()
    
    newprd.save((err)=>{
        if (err) { return next(err); }
      });
    }
    res.redirect('/');
    
}) 


module.exports = router
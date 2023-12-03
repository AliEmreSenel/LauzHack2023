const express = require('express')
const app = express()
const cors = require('cors')
const Papa = require('papaparse')

const fs = require('fs')
const file = "./data.csv";

var content = fs.readFileSync(file, "utf8");

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

var rows = [];
Papa.parse(content, {
    header: true,
    delimiter: ",",
    complete: function(results) {
        //console.log("Finished:", results.data);
    rows = results.data;
    }
});

var products = groupBy(rows, 'ID');

//console.log(products[0]);

products = Object.keys(products).map(productID => {
  const reviews = products[productID];
  categories = groupBy(reviews, 'category');
  return {
    productID,
    productName: reviews[0]["Product Name"],
    productBrand: reviews[0]["Brand Name"],
    productPrice: reviews[0]["Price"],
    categories: categories
  }
})

//console.log(products[0]);

products = products.map(product => {
    const cats = product.categories;
  //categories = groupBy(reviews, 'category');
    return {
    productID: product.productID,
      productName: product.productName,
      productBrand: product.productBrand,
      productPrice: product.productPrice,
      categories: Object.keys(cats).map(categoryID => {
      const reviews = cats[categoryID];
        const clusters = groupBy(reviews, 'cluster')
        const categorySentiment = reviews.reduce((acc, review) => acc + parseFloat(review.sentiment), 0) / reviews.length;
        return {
          categoryID,
          categorySentiment,
          clusters: Object.keys(clusters).map(clusterID => {
            const reviews = clusters[clusterID];
            const clusterSentiment = reviews.reduce((acc, review) => acc + parseFloat(review.sentiment), 0) / reviews.length;
            return {
              clusterID,
              clusterSentiment,
              reviews
            }
          })
        }
      })
    }
  }
)

//console.log(products.filter(product => product.categories.length > 1)[0].categories[0].clusters[0])

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  res.send(products.map(product => product.productID))
});

app.get('/api/product/:id', (req, res) => {
  res.send(products.find(product => product.productID == req.params.id))
});

app.listen(5000)


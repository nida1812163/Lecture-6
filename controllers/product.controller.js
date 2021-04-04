const Product=require('../models/product.model'); 
// in the above code the model has been included to the controller
//now the controller can request data from the model


exports.test=(req, res)=>{
    res.send('Greetings from test controller')
}

exports.product_create=(req, res)=>{
    let product=new Product({
        name : req.body.name,
        price: req.body.price
    });

    product.save((err)=>{
       if (err){
           return next(err);
       } //do not crash the application here, just move on
       res.send('Product created successfully.')
    });
    
}

exports.product_details=(req, res)=>{
    Product.findById(req.params.id, (err, product)=>{
        if (err){
            return next(err);
        }
        res.send(product)
    })
}

exports.product_update=(req, res)=>{
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, product)=>{
        if(err){
            return next(err);
        }
        res.send('Product updated')
    })
}

exports.product_delete=(req, res)=>{
    Product.findByIdAndDelete(req.body.id, (err)=>{
        if (err){
            return next(err);
        }
        res.send('Deleted Successfully')
    })
}

exports.list=(req, res)=>{
    Product.find((err, products)=>{
        if(!err){
            res.render('product',{page:'Product List', menuId:'list', products: products})
        }
        else{
            console.log('Error in retrieving products:'+JSON.stringify(err,undefined,2))
        }
    })
}


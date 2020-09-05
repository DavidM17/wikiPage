
const { Router } = require('express');
const router = Router();

//Model
const Pages = require('../models/pages');

var fs = require('fs')
var ghDiffHTML = require('gh-diff-html')

//Sequelize
const { Op } = require('sequelize');

//Home
router.get('/', (req, res) => {
    res.redirect('/pages');
});
//List of Pages
router.get('/pages', (req, res) => {


    Pages.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then(pages => {

            console.log(pages);
            res.render('home', { pages });
        })
        .catch(err => console.log(err));

});

//Create Document
router.get('/create', (req, res) => {
    res.render('create');
});

//Save Document
router.post('/create', (req, res) => {
    var data = {
        title: req.body.title,
        description: req.body.description,
        aftercontent: req.body.aftercontent,
        beforecontent: '',
    };
    Pages.create(data)
        .then(result => {
            res.redirect('/pages');
        })
        .catch(err => console.log(err));

});

//Edit document
router.get('/edit/:title', (req, res) => {

    Pages.findOne(
        {
            where: req.params,
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then(result => {
            console.log(result);
            res.render('edit', { result });
        })
        .catch(err => console.log(err));

});

//Save new document with new changes
router.post('/edit', (req, res) => {


    var data;

    Pages.findOne(
        {
            where: req.params.title,
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then(result => {


            data = {
                title: req.body.title,
                description: req.body.description,
                aftercontent: req.body.aftercontent,
                beforecontent: result.dataValues.aftercontent
            };

            Pages.create(data)
                .then(result => {

                    res.redirect('pages/' + req.body.title);
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));



});

//One Page
router.get('/pages/:title', (req, res) => {

    Pages.findOne(
        {
            where: req.params,
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then(result => {
           
            
            res.render('page', { result });
            
            
            
            
        })
        .catch(err => {
            console.log(err);
    
        });

});

//Search Pages
router.post('/search', (req, res) => {
    console.log(req.body.info);
    Pages.findAll(
        {
            where: {
                title: {
                    [Op.like]: '%' + req.body.info + '%'
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then(result => {
            console.log(result);
            res.render('search', { result });
        })
        .catch(err => console.log(err));


});

//History
router.get('/history/:title', (req, res) => {

    Pages.findAll(
        {
            where: req.params,
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then(result => {
            console.log(result);
            res.render('history', { result });
        })
        .catch(err => console.log(err));

});

//Changes
router.get('/diff/:id', (req, res) => {
    
    Pages.findOne(
        {
            where: req.params,
        }
    )
        .then(result => {
            console.log(result.dataValues);
            var before = result.dataValues.beforecontent;

            var after = result.dataValues.aftercontent;

            var html = ghDiffHTML(before, after, {
                fileName: 'wiki',
                outputFormat: 'side-by-side' 
            })

            res.render('diff', { html });

        })
        .catch(err => console.log(err));




});


router.get('*', (req, res)=> {
    res.render('notfound');
  });



module.exports = router;
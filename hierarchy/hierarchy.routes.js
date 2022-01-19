const express = require('express');
const router = express.Router();
const _ = require('lodash');
const controller = require('./hierarchy.controller');

router.get('/:id', getHierarchyById);


async function getHierarchyById(req, res, next) {

    try {
        console.log(`[member] getHierarchyById, id: ${req.params.id}`);
        const printString = await controller.getHierarchyForId(req.params.id, true);
        console.log('printString -> getHierarchyById: ', printString);
        res.set('Content-Type', 'text/html');
        res.status(200).send(printString);
    } catch (err) {
        const errMessage = _.get(err, 'message', 'error occurred');
        const errCode = _.get(err, 'status', 500);
        res.status(errCode).json({message: 'error occurred', error: errMessage});
    }
};


module.exports = router;

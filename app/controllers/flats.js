const Flat = require("../models/flats");
const { Op } = require("sequelize");
const clauses = require("../utils/clauses");

const get_all_flats = async(req, res) => {
    const page = req.query.page;
    try {
        const allFlats = await Flat.findAll({
            limit: 20,
            offset: page*20
        });
        return res.status(200).json(allFlats);
    } catch (err){
        console.error(err.message);
    }
}

const add_flat = async(req, res) => {
    try {
        const FLAT_MODEL = {
            flat_href: req.body.flat_href,
            img_href: req.body.img_href,
            address: req.body.address,
            price: req.body.price,
            type: req.body.type,
            surface: req.body.surface,
            price_num: req.body.price_num,
        }
        try {
            const flat = await Flat.create(FLAT_MODEL);
            return res.status(200).json(flat);
        } catch (error) {
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const get_filtered_flats = async(req, res) => {
    try {
        const query = req.query;
        const orClauses = clauses.createClause(query);
        const allTypes = [{type:"1+kk"}, {type:"2+kk"}, {type:"3+kk"}, {type:"4+kk"}, {type:"5+kk"}, {type:"1+1"}, {type:"2+1"}, {type:"3+1"}, {type:"4+1"}, {type:"5+1"}];

        const filteredFlats = await Flat.findAll({
            where: {
                [Op.and]: [
                    {price_num: {
                        [Op.gte]: query.from || 0   
                    }},
                    {price_num: {
                        [Op.lte]: query.to || 1000000   
                    }},
                    {surface: {
                        [Op.gte]: query.surface || 0   
                    }},
                    {[Op.or]: orClauses || allTypes}
                ]
            },
            limit: query.limit || 15
        });

        return res.status(200).json(filteredFlats);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteFlat = async(req, res) => {
    try {
        const deleted_flat = await Flat.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(deleted_flat);
    } catch (err){
        console.error(err.message);
    }
}

module.exports = {
    get_all_flats,
    get_filtered_flats,
    add_flat
}

import express from "express";
import { Op } from 'sequelize'
import { Table } from '../../managers/modelsManager/index'
import env from "dotenv";
import { fileDeleteToAzure } from "../../lib/file";
import { getTokenToUserData } from "../../lib/auth";
env.config();
const route = express.Router();

route.post('/:no', (req, res) => {
    try {
        const userData = getTokenToUserData(req)
        const no=req.params.no
        Table('log_file').findOne({
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                no: {
                    [Op.eq]: no
                },
            }
        })
            .then((data) => {
                const containerName=data.dataValues.file_type
                const blobName=`${data.dataValues.key}_${data.dataValues.name}`
                fileDeleteToAzure(containerName,blobName).then(() => {
                    Table('log_file').destroy({
                        where: {
                            write_id: {
                                [Op.eq]: userData.userId
                            },
                            no: {
                                [Op.eq]: req.params.no
                            },
                        }
                    })
                        .then(() => {
                            res.status(200).json({ reqName: 'log_file-delete', status: true })
                        })
                        .catch((err) => {
                            res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
                        })
                })
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
            })

    } catch (err) {
        res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
    }
})


module.exports = route;
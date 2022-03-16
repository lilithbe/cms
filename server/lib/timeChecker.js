import moment from "moment";
import { Op } from 'sequelize'
import { Table } from "../managers/modelsManager";
import { fileDeleteToAzure } from "./file";

export const temporaryFileHandler = () => {
    const deleteTime=1000 * 60*60
    setInterval(() => {
        console.log(moment().format('YYYY MM-DD hh:mm:ss' , ': 임시 파일 삭제 시작'))
        Table('log_file').findAll({
            where: {
                isWrite: {
                    [Op.eq]: true
                },
                isSave: {
                    [Op.eq]: false
                },
            }
        }).then((list) => {
            if(list){           
                for (let i = 0; i < list.length; i++) {
                    const file = list[i];
                    fileDeleteToAzure(file.file_type,file.key+'_'+file.name)
                    Table('log_file').destroy({
                        where: {
                            no: {
                                [Op.eq]: file.no
                            }
                           
                        }
                    })

                }
            }
        })
    }, deleteTime);
}
import express from "express";
import Accounts from "../managers/modelsManager/Account";
import {Table} from '../managers/modelsManager/index'
import jwt from "jsonwebtoken";
import { updateConfig } from "../data";
import { Op } from 'sequelize'
const route = express.Router();



route.post("/", (req, res) => {
  const tableName = req.body.query.table;
  const type = req.body.query.type;
  let RQ_CBS = false; // result query callback status
  let RQWS = false; //result query where status
  let RQW = {};

  let resStatus = false;
  let _Table;

  //callback status : null & boolean
  if (req.body.query.cb !== undefined) {
    RQ_CBS = req.body.query.cb;
  }

  if (req.body.query.where !== undefined) {
    RQWS = req.body.query.where.status;
    RQW = req.body.query.where;
  }

  if (tableName === null || tableName === undefined || tableName === "") {
    res.status(200).json({ status: false, error: "기본값 누락" });
  } else {
    //테이블 설정
    resStatus = true;
    _Table = Table(tableName)

    if (resStatus === false) {
      res.status(200).json({ status: false, error: "테이블 입력값 에러" });
    } else {
      switch (
      type //findAll,findOne,update,destroy,create
      ) {
        case "findAll":
          findAllHandler(_Table, req, res, RQ_CBS, RQWS, RQW);
          break;
        case "findOne":
          findOneHandler(_Table, req, res, RQ_CBS, RQWS, RQW);
          break;
        case "create":
          createHandler(_Table, req, res, RQ_CBS, RQWS, RQW);
          break;
        case "update":
          updateHandler(_Table, req, res, RQ_CBS, RQWS, RQW);
          break;
        case "destroy":
          destroyHandler(_Table, req, res, RQ_CBS, RQWS, RQW);
          break;
        default:
          res.status(200).json({ status: false, error: "type 입력값 에러" });
          break;
      }
    }
  }
});

/**
 * create
 */
const createHandler = (tableName, req, res, cb_status, w_status, where) => {
  logHandler(req, res, cb_status, w_status, where, "createHandler");
  tableName
    .create(req.body.data)
    .then((data) => {
      if (cb_status) {
        res.status(200).json({ status: true, data: data });
      } else {
        res.status(200).json({ status: true });
      }
    })
    .catch((err) => {
      res.status(200).json({ status: false, error: err, errorType: "catch" });
    });
};
/**
 * select One
 */
const findOneHandler = (tableName, req, res, cb_status, w_status, where) => {
  logHandler(req, res, cb_status, w_status, where, "findOneHandler");
  if (w_status) {
    tableName
      .findOne({
        where: where.w_data,
      })
      .then((data) => {
        if (cb_status) {
          res.status(200).json({ status: true, data: data });
        } else {
          res.status(200).json({ status: true });
        }
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  } else {
    tableName
      .findOne()
      .then((data) => {
        if (cb_status) {
          res.status(200).json({ status: true, data: data });
        } else {
          res.status(200).json({ status: true });
        }
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  }
};
/**
 * select All
 */
const findAllHandler = async (
  tableName,
  req,
  res,
  cb_status,
  w_status,
  where
) => {
  logHandler(req, res, cb_status, w_status, where, "findAllHandler");
  if (w_status) {
    await tableName
      .findAll({
        where: where.w_data,
      })
      .then((data) => {
        if (cb_status) {
          res.status(200).json({ status: true, data: data });
        } else {
          res.status(200).json({ status: true });
        }
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  } else {
    await tableName
      .findAll()
      .then((data) => {
        if (cb_status) {
          res.status(200).json({ status: true, data: data });
        } else {
          res.status(200).json({ status: true });
        }
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  }
};
/**
 * destroy All
 */
const destroyHandler = (tableName, req, res, cb_status, w_status, where) => {
  logHandler(req, res, cb_status, w_status, where, "destroyHandler");
  if (w_status) {
    tableName
      .destroy({
        where: where.w_data,
      })
      .then(() => {
        res.status(200).json({ status: true });
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  } else {
    res.status(200).json({ status: false, errorType: "where error" });
  }
};
/**
 * update
 */
const updateHandler = (tableName, req, res, cb_status, w_status, where) => {
  if (w_status) {
    tableName
      .update(req.body.data, {
        where: where.w_data,
      })
      .then((data) => {
        if (cb_status) {
          if (req.body.query.table === 'accounts') {
            Accounts.findOne({
              where: {
                userId: req.body.data.userId,
              },
            }).then((user) => {
              const day = req.body.data.remember === true ? 1000 * 60 * 60 * 24 : 0;
              user.dataValues.remember = req.body.data.remember;
              (user.dataValues.exp = Math.floor(Date.now()) + day),
                (user.dataValues.iat = Math.floor(Date.now()));
              delete user.dataValues.password
              let token = jwt.sign(
                {
                  ...user.dataValues,
                  exp: Math.floor(Date.now()) + day,
                  iat: Math.floor(Date.now()),
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({ status: true, err: false, data: token, type: "login" });
            })
              .catch((err) => {
                res.status(200).json({ status: false, error: err, errorType: "catch" });
              });

          } else if (req.body.query.table === 'config') {
            updateConfig(req.body.data)
            res.status(200).json({ status: true, data: data });
          } else {
            res.status(200).json({ status: true, data: data });
          }
        } else {
          if (req.body.query.table === 'config') {
            res.status(200).json({ status: true, data: data });
            updateConfig(req.body.data)
          }
          res.status(200).json({ status: true });
        }
      })
      .catch((err) => {
        res.status(200).json({ status: false, error: err, errorType: "catch" });
      });
  } else {
    res.status(200).json({ status: false, errorType: "where error" });
  }
};

const logHandler = (req, res, cb_status, w_status, where, functionName) => {


};


module.exports = route;

/**
 * content Api
 */
import express from "express";
import { Op } from "sequelize";
import { contentTable, commentTable, Table } from "../managers/modelsManager/index";
import jwt from "jsonwebtoken";
import { getIp } from "../lib/getIp";
import { v4 } from "uuid";
import { getConfig, getMyAccount, setMyAccount } from "../data";
const prefix = process.env.PREFIX;

const boardName = (table) => {
  return prefix + "_write_" + table;
};
const commentBoardName = (table) => {
  return prefix + "_write_" + table + "_comment";
};

const route = express.Router();

route.post("/board-count", (req, res) => {
  //findAndCountAll
  console.log("content-group-list");
  res.status(200).json({ reqName: "content-group-list" });
});

//그룹 목록
route.post("/group-list", (req, res) => {
  console.log("content-group-list");
  Table("config_group")
    .findAll()
    .then((group) => {
      res.status(200).json({ reqName: "content-group-list", status: true, list: group });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "content-group-list", status: false, error: err });
    });
});
//요청하는 그룹의 게시판의 컨텐츠 요청
route.post("/group-content-list", (req, res) => {
  console.log("content-group-content-list");
  Table("config_board")
    .findAll({
      where: {
        groupId: {
          [Op.eq]: req.body.groupId
        }
      }
    })
    .then((boardList) => {
      const contentList = boardList.map(async (data) => {
        await contentTable(data.value)
          .findAll()
          .then((list) => {
            return { status: true, list: list };
          })
          .catch((err) => {
            return { status: false };
          });
      });
      res.status(200).json({ reqName: "content-group-content-list", status: true, list: contentList });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "content-group-content-list", status: false, error: err });
    });
});

//게시판 목록  - 미구현
route.post("/board-list", (req, res) => {
  console.log("content-board-list");
  res.status(200).json({ reqName: "content-board-list" });
});

//게시판 전체 컨텐츠 목록
route.post("/list", (req, res) => {
  console.log("content-list", req.body.boardValue);
  contentTable(req.body.boardValue)
    .findAndCountAll({
      offset: req.body.offset,
      limit: req.body.limit,
      order: [["updatedAt", "DESC"]]
    })
    .then((list) => {
      res.status(200).json({ reqName: "comment-list", status: true, list: list.rows, boardCount: list.count });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "content-list", status: false, error: err });
    });
});


//게시판 전체 컨텐츠 목록
route.post("/mylist", (req, res) => {
  console.log("content-my-list", req.body.boardValue);
  const user= jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

  contentTable(req.body.boardValue)
    .findAndCountAll({
      where:{
        writeId: {
          [Op.eq]: user.userId,
        },
        isSeries:{
          [Op.eq]:true
        }
      },
     
      order: [["updatedAt", "DESC"]]
    })
    .then((list) => {
      console.log(list)
      res.status(200).json({ reqName: "ontent-my-list", status: true, list: list.rows, boardCount: list.count });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "ontent-my-list", status: false, error: err });
    });
});


/**
 * 저장
 */
route.post("/write/:boardType", (req, res) => {
  try {
    const result = { reqName: "content-write" };
    const userToken = req.headers.authorization;
    const writeExp = getConfig().dc_expContentWrite;
    const isLogin = req.body.isLogin || false;
    let writer;
    if (isLogin) {
      writer = jwt.verify(userToken, process.env.SECRET_KEY);
      req.body.contentType= req.params.boardType
      getMyAccount(writer.userId)
        .then((myAcc) => {
          console.log(myAcc)
          setMyAccount({...myAcc,
            allExp:myAcc.allExp+ writeExp,
            exp: myAcc.exp+ writeExp
          })
            .then((newMyAcc) => {
              req.body.id = v4();
              contentTable(req.body.boardName)
                .create(req.body)
                .then((data) => {
                  Table("log_file")
                    .findAll({
                      where: {
                        write_id: {
                          [Op.eq]: writer.userId
                        },
                        isWrite: {
                          [Op.eq]: true
                        },
                        isSave: {
                          [Op.eq]: false
                        }
                      },
                      attributes: ["key", "isSave"]
                    })
                    .then((files) => {
                      const update = async () => {
                        if(files.length>0){
                          files.forEach((file, index) => {
                            Table("log_file")
                              .update(
                                { ...file, isSave: true },
                                {
                                  where: {
                                    key: {
                                      [Op.eq]: file.key
                                    }
                                  }
                                }
                              )
                              .then(() => {
                                console.log("update-bulk : ", index);
                              })
                              .catch((err) => {
                                console.log("err-", index, err);
                              });
                          });
                        }
                        
                      };

                      update()
                        .then(() => {
                    
                          res.status(200).json({ reqName: "content-write", status: true, data: data, account: newMyAcc });
                        })
                        .catch((err) => {
                          console.log('bulk---',err)
                          res.status(200).json({ reqName: "content-write", status: false, error: err });
                        });
                    });

                })

                .catch((err) => {
                  console.log(err)
                  resultFunction(res, result, false, "컨텐츠 저장 실패", err);
                });
            })
            .catch((err) => {
              console.log(err)
              resultFunction(res, result, false, "경험치 업데이트 실패", err);
            });
        })
        .catch((err) => {
          console.log(err)
          resultFunction(res, result, false, "유저정보 가져오기 실패", err);
        });
    }
  } catch (err) {
    console.log("토큰만료", err);
    resultFunction(res, result, false, "토큰만료", err); //실패
  }
});
//수정
route.post("/update", (req, res) => {
  console.log("content-update");
  const result = { reqName: "content-update" };
  const userToken = req.headers.authorization;
  try {
    const writer = jwt.verify(userToken, process.env.SECRET_KEY); //토큰검증및 유저정보
    const boardConfig = req.body.boardConfig; //게시판의 기본정보
    if (writer.grade >= boardConfig.createGrade) {
      //게시판 작성 권한 확인:그레이드
      if (writer.level >= boardConfig.createLevel) {
        //게시판 작성 권한 확인:레벨
        //게시물 저장
        contentTable(req.body.tableName)
          .update(req.body.data, {
            where: {
              id: {
                [Op.eq]: req.body.data.id
              }
            }
          })
          .then(() => {
            //게시판 정보 가져오기
            resultFunction(res, result, true, "수정된 데이타 저장완료");
          })
          .catch((err) => {
            resultFunction(res, result, false, "데이터저장실패", err); //실패
          });
      } else {
        resultFunction(res, result, false, "작성자 레벨이 낮음", { message: "작성자의 레벨이 낮음" }); //실패
      }
    } else {
      resultFunction(res, result, false, "작성자 그레이드 레벨이 낮음", { message: "작성자의 그레이드 레벨이 낮음" }); //실패
    }
  } catch (err) {
    console.log("토큰만료", err);
    resultFunction(res, result, false, "토큰만료", err); //실패
  }
});
//삭제 - 미구현
route.post("/delete", (req, res) => {
  console.log("content-delete");
  res.status(200).json({ reqName: "content-delete" });
});

//내용
route.post("/read", (req, res) => {
  console.log("content-read", req.body.boardValue);
  try {
    const userToken = req.headers.authorization;

    let userData;
    if (req.body.isLogin) {
      userData = jwt.verify(userToken, process.env.SECRET_KEY); //토큰검증및 유저정보
    }
    contentTable(req.body.boardValue)
      .findOne({
        where: {
          id: {
            [Op.eq]: req.body.contentId
          }
        }
      })
      .then((post) => {
        let index;
        if (req.body.isLogin) {
          index = post.dataValues.hitUser.findIndex((f) => f.userId === userData.userId);
        } else {
          index = post.dataValues.hitUser.findIndex((f) => f.ip === getIp(req));
        }
        console.log(index);
        // post.dataValues.hitUser
        // post.dataValues.hitUser.findIndex(f=>f.userId===)
        commentTable(req.body.boardValue)
          .findAndCountAll({
            where: {
              commentType: {
                [Op.eq]: "first"
              },
              parentsContentId: {
                [Op.eq]: req.body.contentId
              }
            },
            order: [["updatedAt", "DESC"]]
          })
          .then((commentData) => {
            if (index === -1) {
              const userId = req.body.isLogin ? userData.userId : "geust";
              const hitUser = [...post.dataValues.hitUser, { ip: getIp(req), userId: userId }];
              const updatePost = { hit: post.dataValues.hit + 1, hitUser: hitUser };
              contentTable(req.body.boardValue)
                .update(updatePost, {
                  where: {
                    id: {
                      [Op.eq]: req.body.contentId
                    }
                  }
                })
                .then(() => {
                  res.status(200).json({ reqName: "comment-list", status: true, post: { ...post.dataValues, ...updatePost }, comment: commentData });
                })
                .catch((err) => {
                  res.status(200).json({ reqName: "comment-list", status: false, error: err });
                });
            } else {
              res.status(200).json({ reqName: "comment-list", status: true, post: post, comment: commentData });
            }
          })
          .catch((err) => {
            res.status(200).json({ reqName: "comment-list", status: false, error: err });
          });
      })
      .catch((err) => {
        res.status(200).json({ reqName: "content-list", status: false, error: err });
      });
  } catch (error) {
    res.status(200).json({ reqName: "content-list", status: false, error: error });
  }
});

route.post("/comment-list", (req, res) => {
  console.log("comment-list");
  console.log(req.body.boardValue);
  commentTable(req.body.boardValue)
    .findAll({
      where: {
        commentType: {
          [Op.eq]: "second"
        },
        parentsContentId: {
          [Op.eq]: req.body.parentsContentId
        },
        parentsCommentId: {
          [Op.eq]: req.body.parentsCommentId
        }
      },
      order: [["updatedAt", "DESC"]]
    })
    .then((data) => {
      res.status(200).json({ reqName: "comment-list", status: true, list: data });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "comment-list", status: false, error: err });
    });
});

route.post("/comment-write", (req, res) => {
  console.log("comment-write");
  console.log(req.body.boardValue);
  commentTable(req.body.boardValue)
    .create(req.body.comment)
    .then((data) => {
      res.status(200).json({ reqName: "comment-write", status: true, data: data });
    })
    .catch((err) => {
      res.status(200).json({ reqName: "comment-write", status: false, error: err });
    });
});

// 컨텐츠 좋아요 & 싫어요 클릭 이밴트
route.post("/content-good-bad", (req, res) => {

  try {
    const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY); //토큰검증및 유저정보
    const userId = userData.userId;
    const request = req.body.request;  
    const boardValue = req.body.boardValue;
    contentTable(boardValue)
      .findOne({
        where: {
          id: {
            [Op.eq]: req.body.id
          }
        }
      })
      .then((data) => {
        let _data = data.dataValues;
        console.log(_data.good);
        switch (request) {
          case "goodUp":
            _data.goodUser = [...data.dataValues.goodUser, { userId: userId, ip: getIp(req) }];
            break;
          case "badUp":
            _data.badUser = [...data.dataValues.badUser, { userId: userId, ip: getIp(req) }];
            break;
          case "goodUp-badDown":
            _data.goodUser = [...data.dataValues.goodUser, { userId: userId, ip: getIp(req) }];
            data.dataValues.badUser.splice(
              data.dataValues.badUser.findIndex((f) => f.userId === userId),
              1
            );
            break;
          case "goodDown-badUp":
            data.dataValues.goodUser.splice(
              data.dataValues.goodUser.findIndex((f) => f.userId === userId),
              1
            );
            _data.badUser = [...data.dataValues.badUser, { userId: userId, ip: getIp(req) }];
            break;
          case "goodDown":
            data.dataValues.goodUser.splice(
              data.dataValues.goodUser.findIndex((f) => f.userId === userId),
              1
            );
            break;
          case "badDown":
            data.dataValues.badUser.splice(
              data.dataValues.badUser.findIndex((f) => f.userId === userId),
              1
            );
            break;
          default:
            break;
        }

        _data.good = _data.goodUser.length;
        _data.bad = _data.badUser.length;

        console.log(_data);
        contentTable(boardValue)
          .update(_data, {
            where: {
              no: {
                [Op.eq]: req.body.no
              }
            }
          })
          .then(() => {
            res.status(200).json({ reqName: "comment-gb", status: true, data: _data });
          })
          .catch((error) => {
            res.status(200).json({ reqName: "comment-gb", status: false, error: error });
          });
      })
      .catch((err) => {
        res.status(200).json({ reqName: "comment-gb", status: false, error: err });
      });
  } catch (error) {
    res.status(200).json({ reqName: "comment-gb", status: false, error: error });
  }
});

const resultFunction = (res, result, status, message, err) => {
  res.status(200).json(status ? { ...result, status: status, message: message } : { ...result, status: status, message: message, error: err });
};
module.exports = route;

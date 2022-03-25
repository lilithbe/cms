import {
    BlobServiceClient,
    StorageSharedKeyCredential
} from '@azure/storage-blob'
import env from "dotenv";
import { v4 } from "uuid";
import sharp from "sharp";
import fs from "fs";

env.config();


const account = process.env.AZURE_STORAGE_NAME
const accountKey = process.env.AZURE_STORAGE_KEY
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const defaultUrl = `https://${account}.blob.core.windows.net`
const blobServiceClient = new BlobServiceClient(
    defaultUrl,
    sharedKeyCredential
);


export const multipleUpload = async (req, userData, formName) => {
    try {
        const {containerName} = req.body
        const contents = req.files[formName]
        const containerClient = blobServiceClient.getContainerClient(containerName); //images , 
        const result =[]
        for (let i = 0; i < contents.length; i++) {
            const file = contents[i];        
            let width = 0
            let height = 0
            const key = v4();
            const blobName = key + '_' + file.name
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const src = `${`${defaultUrl}/${containerName}/${blobName}`}`
            await blockBlobClient.upload(file.data, file.size);
            await blockBlobClient.setHTTPHeaders(file.data, { blobContentType: file.mimetype }).then(async () => {
                //image 파일의 경우 파일을 임시 저장하여 width ,height 값 측정후 삭제
                if (file.mimetype.split('/') === 'image') {
                    const userFolder = `./public/u/${userData.userId}`;
                    const exDir = `${userFolder}/key_${blobName}`; //이미지 파일 width height 측정용 임시파일 위치
                    await file.mv(exDir);
                    const image = await sharp(exDir);
                    await image.metadata().then(async (metadata) => {
                        width = metadata.width
                        height = metadata.height
                        return exDir
                    }).then((dir) => {
                        fs.unlink(dir, (err) => {
                            if (err) {
                                //TODO: 에러나서 삭제되지 않았을 경우 에러 로고로 기록할것 관리자 모드에서 강제 삭제 기능적용하기
                                console.error(err)
                            }
                        })
                    })
                }
            })
            await result.push({
                write_data: userData,
                write_id: userData.userId,
                status: 1,
                use_download: 0,
                download_count: 0,
                request: "userUpload",
                file_type: file.mimetype.split("/")[0],
                name: file.name,
                key: key,
                alt: `${key}-${file.name.split(".")[0]} ${file.mimetype.split("/")[0]}`,
                size: file.size,
                extention: file.mimetype.split("/")[1],
                url: src,
                src: src,
                width: width,
                height: height,
                isWrite: false,
                isSave: true
            })
        }
        return await result
    } catch (error) {
        console.log(error)
    }

};

export const singleUpload = async (req, userData, formName) => {
    try {
        const {containerName} = req.body
        const key = v4();
        let width = 0
        let height = 0
   
        const content = req.files[formName]
        const blobName = key + '_' + content.name

        const containerClient = blobServiceClient.getContainerClient(containerName); //images , 
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const src = `${`${defaultUrl}/${containerName}/${blobName}`}`
        await blockBlobClient.upload(content.data, content.size);
        await blockBlobClient.setHTTPHeaders(content.data, { blobContentType: content.mimetype }).then(async () => {
            if (content.mimetype.split("/")[0] === 'image') {
                const userFolder = `./public/u/${userData.userId}`;
                const exDir = `${userFolder}/key_${blobName}`; //이미지 파일 width height 측정용 임시파일 위치
                await content.mv(exDir);
                const image = await sharp(exDir);
                await image.metadata().then(async (metadata) => {
                    width = metadata.width
                    height = metadata.height
                    return exDir
                }).then((dir) => {
                    fs.unlink(dir, (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                })
            }
        })
        return {
            write_data: userData,
            write_id: userData.userId,
            status: 1,
            use_download: 0,
            download_count: 0,
            request: "userUpload",
            file_type: content.mimetype.split("/")[0],
            name: content.name,
            key: key,
            alt: `${key}-${content.name.split(".")[0]} ${content.mimetype.split("/")[0]}`,
            size: content.size,
            extention: content.mimetype.split("/")[1],
            url: src,
            src: src,
            width: width,
            height: height,
        };
    } catch (error) {
        console.log(error)
    }

};

export const editorUpload = async (req, userData, formName) => {
    try {
  
        const key = v4();
        let width = 0
        let height = 0
   
        const content = req.files[formName]
        const blobName = key + '_' + content.name

        const containerClient = blobServiceClient.getContainerClient('editor'); //images , 
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const src = `${`${defaultUrl}/editor/${blobName}`}`
        await blockBlobClient.upload(content.data, content.size);
        await blockBlobClient.setHTTPHeaders(content.data, { blobContentType: content.mimetype }).then(async () => {
            if (content.mimetype.split("/")[0] === 'image') {
                const userFolder = `./public/u/${userData.userId}`;
                const exDir = `${userFolder}/key_${blobName}`; //이미지 파일 width height 측정용 임시파일 위치
                await content.mv(exDir);
                const image = await sharp(exDir);
                await image.metadata().then(async (metadata) => {
                    width = metadata.width
                    height = metadata.height
                    return exDir
                }).then((dir) => {
                    fs.unlink(dir, (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                })
            }
        })
        return {
            write_data: userData,
            write_id: userData.userId,
            status: 1,
            use_download: 0,
            download_count: 0,
            request: "editor",
            file_type: content.mimetype.split("/")[0],
            name: content.name,
            key: key,
            alt: `${key}-${content.name.split(".")[0]} ${content.mimetype.split("/")[0]}`,
            size: content.size,
            extention: content.mimetype.split("/")[1],
            url: src,
            src: src,
            width: width,
            height: height,
        };
    } catch (error) {
        console.log(error)
    }

};

export const fileDownloadToAzure = async (containerName, blobName) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName)
    const downloadBlockBlobResponse = await blobClient.download()
    return downloadBlockBlobResponse.readableStreamBody
};

export const fileDeleteToAzure = async (containerName, blobName) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    containerClient.deleteBlob(blobName)
};
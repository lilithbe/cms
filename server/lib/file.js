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


export const fileUploadToAzure = async (req, userData, formName) => {
    try {
        const key = v4();
        let width = 0
        let height = 0
        const request = req.params.request
        const content = req.files[formName]
        const blobName = key + '_' + content.name

        const containerClient = blobServiceClient.getContainerClient(request); //images , 
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const src = `${`${defaultUrl}/${request}/${blobName}`}`
        await blockBlobClient.upload(content.data, content.size);
        await blockBlobClient.setHTTPHeaders(content.data, { blobContentType: content.mimetype }).then(async () => {
            if (request === 'images') {
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
            file_type: request,
            name: content.name,
            key: key,
            alt: `${key}-${content.name.split(".")[0]} ${request}`,
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
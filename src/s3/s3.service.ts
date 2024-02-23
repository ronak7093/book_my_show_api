import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
    constructor(
        private readonly s3: S3,
    ) { }

    async uploadFileToS3(bucket: string, key: string, file: Buffer) {
        const params = {
            Bucket: bucket,
            Key: key,
            Body: file,
        };

        return new Promise((resolve, reject) => {
            this.s3.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
}
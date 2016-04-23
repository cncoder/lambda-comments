import AWS from 'aws-sdk'
import WError from 'verror'
import config from '../../../config'
import { resources } from './cloudFormation'

const { region } = config
const awsS3 = new AWS.S3({ region })
const s3Bucket = resources.WebsiteS3.PhysicalResourceId

export function upload ({
  key,
  data,
  contentType = 'application/octet-stream'
}) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: s3Bucket
    , Key: key
    , Body: data
    , ContentType: contentType
    }
    awsS3.putObject(params, (err, result) => {
      if (err) {
        return reject(new WError(err, 'S3'))
      }
      resolve()
    })
  })
}

export function download ({ key }) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: s3Bucket
    , Key: key
    }
    awsS3.getObject(params, (err, result) => {
      if (err) {
        return reject(new WError(err, 'S3'))
      }
      resolve(result)
    })
  })
}

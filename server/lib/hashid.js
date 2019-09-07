const Hashids = require('hashids/cjs')

const hashids = new Hashids()

const encodeHashId = ObjectId => hashids.encodeHex(ObjectId + '')
const decodeHashId = hashId => hashids.decodeHex(hashId)

module.exports = {
  encodeHashId,
  decodeHashId,
}
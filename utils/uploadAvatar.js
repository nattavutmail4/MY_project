const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

module.exports = async(req,id)=>{
    if (req.file) {
        const avatarPath = `/uploads/${id}.jpg`
        await sharp(req.file.path).resize(240,240)
        .jpeg({quality:70})
        .flatten({background:'#fff'})
        .toFile(path.join(__dirname,`../public${avatarPath}`))
        await fs.promises.unlink(req.file.path)
    }
}
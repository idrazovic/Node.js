exports.deleteFile = filePath => {
    const fs = require('fs');
    fs.unlink(filePath, err => {
        if (err) {
            console.log(err);
        }
    });
};
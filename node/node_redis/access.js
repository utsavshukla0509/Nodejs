const book = require('./schema');




module.exports.saveBook = function (title, author, text,res, callback,next) {
    var data = {title: title,author: author,text: text}; 
    book.create(data).then(()=>{
        console.log(data);
    }
    ,callback).catch(next);
};

// Without cache function

// module.exports.findBookByTitle = function (title, callback) {
//     book.findOne({
//         title: title
//     }, function (err, doc) {
//         if (err || !doc) callback(null);
//         else callback(doc.text);
//     });
// };



// With cache function

module.exports.findBookByTitleCached = function (redis, title, callback) {
    redis.get(title, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        callback(JSON.parse(reply));
        else {
            //Book doesn't exist in cache - we need to query the main database
            book.findOne({
                title: title
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    // Book found in database, save to cache and return to client
                    redis.set(title, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};
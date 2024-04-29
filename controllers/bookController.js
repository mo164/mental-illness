const Book = require('./../models/bookModel')
exports.getAll = async (req,res,next)=>{
    const queryObj = {...req.query}
    const excludeFields = ['page', 'sort', 'limit' , 'field' ]
    excludeFields.forEach(el=> delete queryObj[el])
 // advanced filtering
 let queryStr = JSON.stringify(queryObj)
 queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
    let query = Book.find(JSON.parse(queryStr))

    // sorting
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }

    const books = await query
    res.status(200).json({
        results: books.length,
        status: 'success',
        books
    })
    console.log('Done!!!')
}
exports.delete = async(req, res,next)=>{
    const books = await Book.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
      });
    };
    exports.getbook = async(req, res, next)=>{
        const book = await Book.findById(req.params.id).populate('Reviews')
        res.status(200).json({
            status: 'success',
            book
        })
    }   

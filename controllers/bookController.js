const Book = require('./../models/bookModel')
exports.getAll = async (req,res,next)=>{
    const books = await Book.find()
    res.status(200).json({
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

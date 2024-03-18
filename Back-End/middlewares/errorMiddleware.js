



//middleware to handle mysql database errors

// database error handling middleware
const databaseErrorHandler = (err, req, res, next) =>{
    switch (err.code) {
      case 'ER_BAD_DB_ERROR':
        return res.status(500).json({ message: 'Database does not exist' });
      case 'ER_ACCESS_DENIED_ERROR':
        return res.status(500).json({ message: 'Access denied' });
      case 'ER_NO_SUCH_TABLE':
        return res.status(500).json({ message: 'Table does not exist' });
      case 'ER_DUP_ENTRY':
        return res.status(500).json({ message: 'Duplicate entry' });
      case 'ER_BAD_FIELD_ERROR':
        return res.status(500).json({ message: 'Bad field error' });
        case 'ER_PARSE_ERROR':
        return res.status(500).json({ message: 'Parse error' });
      default:
        console.log(err)
        return res.status(500).json({ message: 'An unknown error occurred ' });
    }

}


module.exports = {databaseErrorHandler};
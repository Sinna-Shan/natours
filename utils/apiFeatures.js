class APIFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    filter() {
      // 1A) FILTERING
      // take a cope of query object
      const objQuery = { ...this.queryStr };
      // create an array of excluded fields
      const excluded = ['sort', 'limit', 'page', 'fields'];
      // loop over the array and delete excluded fields from the object
      excluded.forEach((el) => delete objQuery[el]);
  
      // 2B) ADVANCED FILTERING
      // { difficulty: 'easy', duration:{$gte: 5}}} // mongoose query
      // { difficulty: 'easy', duration: { gte: '5' } } // req.query
  
      // BUILD QUERY
      let queryStr = JSON.stringify(objQuery);
      queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      //2) SORTING
      if (this.queryStr.sort) {
        // create sort string
        const sortBy = this.queryStr.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        //   query = query.sort('-createdAt');
      }
  
      return this;
    }
  
    limit() {
      if (this.queryStr.fields) {
        // create limit string
        const fields = this.queryStr.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        // excluding mongoose added fields
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

  module.exports = APIFeatures;
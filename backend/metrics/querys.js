var moment = require("moment")
exports.getQuery = (id,from,to) => {
  var query = ''
  let dateFrom = from?from: moment().hours(0).minutes(0).seconds(0).format('x')
  let dateTo = to?to: moment().hours(23).minutes(59).seconds(59).format('x')
  
  switch (id) {
    case 1:
      query = `{"query": { "bool": { "must": [{ "range": { "timestamp":       {       "gte":  :from:,     "lte": :to:   }  } }], "must_not": [], "should": [] } }, "from": 0, "size": 0, "sort": [], "aggs": { "group_by_path": { "terms": { "field": "path.keyword", "size": 100000 }, "aggs": { "users": { "value_count": { "field": "_id" } } } } } }`
      break;
    case 2:
      query = `{ "query": { "bool": { "must": [{ "range": { "timestamp":       {       "gte":  :from:,     "lte": :to:   }  } }], "must_not": [], "should": [] } }, "from": 0, "size": 0, "sort": [], "aggs": { "group_by_status": { "terms": { "field": "status.keyword", "size": 100000 }, "aggs": { "users": { "value_count": { "field": "_id" } } } } } }`
      break;
    default:
      break;
  }
query = query.replace(/:from:/g, dateFrom)
query = query.replace(/:to:/g, dateTo)
return query

}



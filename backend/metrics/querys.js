{
    "query": {
      "bool": {
        "must": [],
        "must_not": [],
        "should": []
      }
    },
    "from": 0,
    "size": 0,
    "sort": [],
    "aggs": {
      "group_by_category": {
        "terms": {
          "field": "path.keyword",
          "size": 100000
        },
        "aggs": {
          "users": {
            "value_count": {
              "field": "_id"
            }
          }
        }
      }
    }
  }



  {
    "query": {
      "bool": {
        "must": [],
        "must_not": [],
        "should": []
      }
    },
    "from": 0,
    "size": 0,
    "sort": [],
    "aggs": {
      "group_by_category": {
        "terms": {
          "field": "status.keyword",
          "size": 100000
        },
        "aggs": {
          "users": {
            "value_count": {
              "field": "_id"
            }
          }
        }
      }
    }
  }


  
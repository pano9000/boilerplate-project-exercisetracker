const createSearchObject = {

  exerciseLog(properties) {
    const { userId, filterDateFrom, filterDateTo } = properties;

    const searchObject = {
      userId
    };

    const date = (() => {
      if (filterDateFrom !== undefined && filterDateTo === undefined) return { $gte: filterDateFrom};
      if (filterDateTo !== undefined && filterDateFrom === undefined) return { $lte: filterDateTo};
      if (filterDateFrom !== undefined && filterDateTo !== undefined) return { $lte: filterDateTo, $gte: filterDateFrom};
    })();

    if (date !== undefined) {
      searchObject.date = date;
    }

    return searchObject
  }

}



module.exports = createSearchObject
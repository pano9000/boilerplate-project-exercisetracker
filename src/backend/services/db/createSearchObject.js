const createSearchObject = {

  exerciseLog(properties) {
    const { userId, filterDateFrom, filterDateTo } = properties;

    const date = (() => {
      if (filterDateFrom !== undefined && filterDateTo === undefined) return { $gte: filterDateFrom};
      if (filterDateTo !== undefined && filterDateFrom === undefined) return { $lte: filterDateTo};
      if (filterDateFrom !== undefined && filterDateTo !== undefined) return { $lte: filterDateTo, $gte: filterDateFrom};
    })();

    return { 
      userId,
      date
    }
  }

}



module.exports = createSearchObject
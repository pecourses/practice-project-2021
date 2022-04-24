module.exports = class Entity {
  constructor({
    client: dbClient,
    modelName,
    tableName,
    primaryKey,
    yupScheme,
    timestamps,
  }) {
    this.dbClient = dbClient;
    this.path = `/${tableName}`;
    try {
      this.dbClient.getData(this.path);
    } catch (error) {
      this.dbClient.push(this.path, []);
    }

    this.name = modelName;
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.yupScheme = yupScheme;
    this.useTimestamps = Boolean(timestamps);
  }

  /**
   * @param {object} data
   */
  create(data) {
    this.yupScheme.validateSync(data);
    const existingData = this.findAll();
    const newRow = Object.assign(
      { ...this.yupScheme.default(), [this.primaryKey]: existingData.length },
      data,
      this.useTimestamps ? { createdAt: Date.now(), updatedAt: Date.now() } : {},
    );
    const newArray = [...existingData, newRow];
    this.dbClient.push(this.path, newArray);
    this.dbClient.save();
    return newRow;
  }

  /**
   * @param {number | string} pk
   */
  findById(pk) {
    const existingData = this.findAll();
    const foundData =
      existingData.find((d) => d[this.primaryKey] === pk) || null;
    return foundData;
  }

  /**
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @param {number | undefined} predicate.limit
   * @returns {array} rows of entity model
   */
  findAll(predicate) {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);

    const newArray = [...existingData];

    if (predicate) {
      // where
      const foundRows = existingData.filter((data) => {
        const verdicts = [];
        for (const key in predicate.where) {
          const comparedValue = predicate[key];
          if (data[key] === comparedValue) {
            verdicts.push(true);
          }
        }
        return verdicts.every((v) => v === true);
      });

      // limit
      const limited = [];
      let limitCount = 0;
      for (const index of foundRows) {
        if (limitCount >= predicate.limit) {
          break;
        }
        limited.push(foundRows[index]);
        limitCount++;
      }
      return limited;
    }

    return newArray;
  }

  /**
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @returns {array} rows of entity model
   */
  findOne(predicate) {
    if (!predicate.where) {
      throw new Error('Where predicate not found');
    }
    const existingData = this.findAll();

    const indexes = [];
    existingData.forEach((data, index) => {
      const verdicts = [];
      for (const key in predicate.where) {
        const comparedValue = predicate[key];
        if (data[key] === comparedValue) {
          verdicts.push(true);
        }
      }
      if (verdicts.every((v) => v === true)) {
        indexes.push(index);
      }
    });

    if (!indexes.length) {
      return null;
    }

    return existingData[indexes[0]];
  }

  /**
   * @param {object} data
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @param {number | undefined} predicate.limit
   * @returns {[number, object[]]]}
   */
  update(data, predicate) {
    const existingData = this.findAll();

    const newArray = [...existingData];
    if (data[this.primaryKey]) {
      delete data[this.primaryKey];
    }
    const rows = [];

    if (predicate) {
      // where
      const indexes = [];
      existingData.forEach((data, index) => {
        const verdicts = [];
        for (const key in predicate.where) {
          const comparedValue = predicate[key];
          if (data[key] === comparedValue) {
            verdicts.push(true);
          }
        }
        if (verdicts.every((v) => v === true)) {
          indexes.push(index);
        }
      });

      // limit
      let limitCount = 0;
      for (const index of indexes) {
        if (limitCount >= predicate.limit) {
          break;
        }
        const newData = Object.assign(
          { ...this.yupScheme.default() },
          newArray[index],
          data,
          this.useTimestamps ? { updatedAt: Date.now() } : {},
        );
        this.yupScheme.validateSync(newData);
        newArray[index] = newData;
        rows.push(newData);
        limitCount++;
      }
    } else {
      const newRows = [];
      let limitCount = 0;
      for (const d of existingData) {
        if (limitCount >= predicate.limit) {
          break;
        }
        const newData = Object.assign(
          { ...this.yupScheme.default() },
          d,
          data,
          this.useTimestamps ? { updatedAt: Date.now() } : {},
        );
        this.yupScheme.validateSync(newData);
        newRows.push(newData);
        rows.push(newData);
        limitCount++;
      }
      newArray.splice(0, newArray.length, ...newRows);
    }

    const count = rows.length;

    this.dbClient.push(this.path, newArray);
    this.dbClient.save();
    return [count, rows];
  }

  /**
   * @param {number | string} pk
   * @param {object} data
   */
  updateById(pk, data) {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);
    const foundIndex =
      existingData.findIndex((d) => d[this.primaryKey] === pk) || null;
    const newArray = [...existingData];
    if (data[this.primaryKey]) {
      delete data[this.primaryKey];
    }
    const newData = Object.assign({ ...this.yupScheme.default() }, newArray[foundIndex], data);
    this.yupScheme.validateSync(newData);
    newArray[foundIndex] = newData;
    this.dbClient.push(this.path, newArray);
    this.dbClient.save();
    return newArray[foundIndex];
  }
};

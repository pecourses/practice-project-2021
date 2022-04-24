module.exports = class Entity {
  constructor(dbClient, modelName, yupScheme, timestamps) {
    this.path = `/${modelName}`;

    try {
      dbClient.getData(this.path);
    } catch (error) {
      dbClient.push(this.path, []);
    }

    this.dbClient = dbClient;
    this.name = modelName;
    this.yupScheme = yupScheme;
    this.useTimestamps = Boolean(timestamps);
  }

  /**
   * @param {object} data
   */
  create(data) {
    this.yupScheme.validateSync(data);
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);
    const newRow = Object.assign({ id: existingData.length }, data,
      (this.useTimestamps ? { createdAt: Date.now(), updatedAt: Date.now() } : {}),
    );
    const newArray = [...existingData, newRow];
    this.dbClient.push(this.path, newArray);
    this.dbClient.save();
    return newRow;
  }

  /**
   * @param {number | string} id
   */
  findById(id) {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);
    const foundData = existingData.find((d) => d.id === id) || null;
    return foundData;
  }

  /**
   * @returns {array} rows of entity model
   */
  findAll() {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);
    return existingData;
  }

  /**
   * @returns {array} rows of entity model
   */
  findOne(predicate) {
    if (!predicate.where) {
      throw new Error('Where predicate not found');
    }
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);

    const indexes = [];
    existingData.forEach((data, index) => {
      const verdicts = [];
      for (const key in predicate.where) {
        const comparedValue = predicate[key];
        if (data[key] === comparedValue) {
          verdicts.push(true);
        }
      }
      if (verdicts.every(v => v === true)) {
        indexes.push(index);
      }
    });

    if(!indexes.length) {
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
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);

    const newArray = [...existingData];
    if (data.id) {
      delete data.id;
    }
    const rows = [];

    if (predicate) {
      const indexes = [];
      existingData.forEach((data, index) => {
        const verdicts = [];
        for (const key in predicate.where) {
          const comparedValue = predicate[key];
          if (data[key] === comparedValue) {
            verdicts.push(true);
          }
        }
        if (verdicts.every(v => v === true)) {
          indexes.push(index);
        }
      });

      let limitCount = 0;
      for (const idx of indexes) {
        if (limitCount >= predicate.limit) {
          break;
        }
        const newData = Object.assign({}, newArray[idx], data,
          {
            ...(this.useTimestamps ? { updatedAt: Date.now() } : {}),
          },
        );
        this.yupScheme.validateSync(newData);
        newArray[idx] = newData;
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
        const newData = Object.assign({}, d, data,
          {
            ...(this.useTimestamps ? { updatedAt: Date.now() } : {}),
          },
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
   * @param {number | string} id
   * @param {object} data
   */
  updateById(id, data) {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);
    const foundIndex = existingData.findIndex(d => d.id === id) || null;
    const newArray = [...existingData];
    if (data.id) {
      delete data.id;
    }
    const newData = Object.assign({}, newArray[foundIndex], data);
    this.yupScheme.validateSync(newData);
    newArray[foundIndex] = newData;
    this.dbClient.push(this.path, newArray);
    this.dbClient.save();
    return newArray[foundIndex];
  }
};

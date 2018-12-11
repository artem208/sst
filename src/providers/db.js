import { DATA_STORAGE_KEY } from '../utils/initialDbState';

class dbMockObject extends Object {

    constructor() {
        super();
        this.db = {};
    }

    loadFromStorage() {
        this.db = JSON.parse(window.localStorage.getItem(DATA_STORAGE_KEY),
            function (key, value) {
                if (key == 'date') return new Date(value);
                return value;
            })
    }

    updateToStorage() {
        window.localStorage.setItem(
            DATA_STORAGE_KEY,
            JSON.stringify(this.db)
        )
    }

    getObjectById(collectionName, id) {
        console.log('gobi',collectionName,id);

        return this.db[collectionName].find(value => value._id == id);
    }

}

export default new dbMockObject();
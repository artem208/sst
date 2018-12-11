import dbMock from './db';

class AuthProvider extends Object {

    authenticate(userName, password) {

        return new Promise((resolve, reject) => {

            const { db } = dbMock;

            const user = db.users.find(user => user.userName === userName);

            if (!user || user.password !== password) {
                reject('Wrong username or password');
            };

            resolve({
                userName: user.userName,
                authToken: user.authToken
            });
        });
    }

    getCurrentUser(token) {

        return new Promise((resolve, reject) => {

            const { db } = dbMock;

            const user = db.users.find(user => user.authToken === token);

            if (!user) {
                reject();
            } 

            resolve({
                userName: user.userName,
                authToken: user.authToken
            })

        });
    }
}

export default new AuthProvider();
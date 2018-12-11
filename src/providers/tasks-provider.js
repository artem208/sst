import dbMock from './db';

class TasksProvider extends Object {

    fetchTasks(token) {

        return new Promise((resolve, reject) => {
            const { db } = dbMock;
            const user = db.users.find(user => user.authToken === token);

            if (!user) {
                reject('problem with authorization token')
            };

            let userId = user._id;

            const tasks = db.tasks
                .filter(task => task.user === userId)
                .map(task => {
                    return { ...task, status: dbMock.getObjectById('statuses', task.status) }
                }, this);

            resolve({ tasks });

        });
    }

    fetchTask(token, taskId) {

        return new Promise((resolve, reject) => {

            const { db } = dbMock;
            const user = db.users.find(user => user.authToken === token);

            if (!user) {
                reject('problem with authorization token');
                return;
            };

            const userId = user._id;
            let task = db.tasks.find(task => task.user == userId && task._id == taskId);
            if (!task) {
                reject('task not found');
                return;
            };

            task = Object.assign({},task);

            task.status = dbMock.getObjectById('statuses', task.status);

            resolve({ task });

        });
    }
}

export default new TasksProvider();
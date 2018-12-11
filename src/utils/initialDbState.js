export const DATA_STORAGE_KEY = 'db-Mockup';

export default () => {
    if (!window.localStorage.getItem(DATA_STORAGE_KEY)) {
        window.localStorage.setItem(
            DATA_STORAGE_KEY,
            JSON.stringify(initialDbState)
        )
    }
}

const initialDbState = {
    users: [
        {   
            _id: '19d82de3-6d10-483e-b83e-e4a97a18afc1',
            userName: 'alex',
            password: 'password1',
            authToken: '91rnjdkwlhqcruo2nh4lwql'
        },
        {
            _id: '4caa793c-86c7-4415-a86f-6aa6c645871c',
            userName: 'nataly',
            password: 'passwordn',
            authToken: 'asnfjkln3u9fp234f9p23imu84r88uf32j'
        },
        {
            _id: 'cb3404d3-350a-4040-87e8-1f69531af5ac',
            userName: 'admin',
            password: 'nosql',
            authToken: 'njlnjk3l21n4j1kdfwqnfj13'
        }
    ],

    tasks: [
        { 
            _id: 'f6aa5c88-6af2-4f90-a128-de9fb198251c',
            user: '19d82de3-6d10-483e-b83e-e4a97a18afc1',
            title: 'learn react-dnd',
            desc: 'Изучить пакет react-dnd, реализовать простой пример',
            date: new Date(2018,10,1),
            priority: 4,
            planTime: 12,
            factTime: 11,
            status: '7aba29eb-ba5c-42eb-a242-65673ef2b706' 
        },
        { 
            _id: 'e6de2c3c-d323-4e07-9b26-0580c857a45b',
            user: '19d82de3-6d10-483e-b83e-e4a97a18afc1',
            title: 'настроить сборку react-проекта webpack с нуля',
            desc: 'настроить простую сборку проекта на реакте без create-react-app',
            date: new Date(2018,10,15),
            priority: 3,
            planTime: 4,
            factTime: 0,
            status: '4c4ebf5a-a4f3-41a6-a5e3-0c8ba70d5cf6' 
        },
        { 
            _id: '1899c065-1d24-47e4-9fdf-287503c5cc74',            
            user: '19d82de3-6d10-483e-b83e-e4a97a18afc1',
            title: 'Curabitur luctus auctor erat in tristique',
            desc: 'Nulla nec aliquet velit, sit amet suscipit turpis. Vivamus efficitur tortor dolor, non posuere elit pharetra vitae. Proin eget hendrerit ante. Maecenas lorem tellus, sagittis a nibh non, consectetur imperdiet enim. Cras in metus dolor. Aenean luctus mattis ornare. Aliquam varius mollis augue. Integer a ligula pharetra, faucibus lectus vel, rutrum erat. Praesent in sapien diam. Proin molestie enim metus, eget euismod mauris tincidunt vitae.',
            date: new Date(2018,8,21),
            priority: 5,
            planTime: 19,
            factTime: 18,
            status: '8c1ac8d7-202e-4e3d-8a45-2edc7dbcef9b' 
        },
        { 
            _id: '61704c15-1e8b-4b51-b794-3af992c17470',            
            user: '19d82de3-6d10-483e-b83e-e4a97a18afc1',
            title: 'Nam vel enim velit',
            desc: 'Fusce tincidunt quam eu turpis bibendum dignissim. Duis ac turpis in tortor feugiat commodo eu vitae elit. Curabitur eget velit a quam accumsan vulputate quis quis dolor. In in est lobortis purus ultrices cursus. Morbi ac nulla quam. Nam ut posuere odio, et lacinia augue. Quisque purus elit, efficitur quis enim sed, ornare rutrum augue.',
            date: new Date(2018,11,1),
            priority: 2,
            planTime: 34,
            factTime: 6,
            status: '4c4ebf5a-a4f3-41a6-a5e3-0c8ba70d5cf6' 
        }, 
        { 
            _id: 'bb8eec07-0a02-421f-ad7d-4d06bd6bb51a',            
            user: '4caa793c-86c7-4415-a86f-6aa6c645871c',
            title: 'fjdskalf;jdskal;fjdskal;fsa',
            desc: 'fdsajkflsdajkfl;sa a;j al;jflasd dfj l;js hfl sdk gslghslhguksl ghlhfdksl hfdksl ghds lhdsklfg sdgh  ghgfldshgukflsdhg ukldshgukshklufdhs ksdghkds hgsdghsdgdks',
            date: new Date(2017,12,1),
            priority: 3,
            planTime: 30,
            factTime: 61,
            status: '7aba29eb-ba5c-42eb-a242-65673ef2b706' 
        },        

    ],

    statuses: [
        {
            _id: '4c4ebf5a-a4f3-41a6-a5e3-0c8ba70d5cf6',
            name: 'План'
        },
        {
            _id: '7aba29eb-ba5c-42eb-a242-65673ef2b706',
            name: 'В процессе'
        },
        {
            _id: '8c1ac8d7-202e-4e3d-8a45-2edc7dbcef9b',
            name: 'Готово'
        }        
    ]
};
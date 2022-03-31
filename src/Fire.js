import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDRfQDHB0KPdJvMBWz8KtorczYTQZ12J8g",
    authDomain: "news-b12ed.firebaseapp.com",
    projectId: "news-b12ed",
    storageBucket: "news-b12ed.appspot.com",
    messagingSenderId: "275177601275",
    appId: "1:275177601275:web:9d6c39a5a052e5d311585e"
}

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("articles");
    }

    getArticles(callback) {
        let ref = this.ref.orderBy("createdAt");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({ id: doc.id, ...doc.data() });
            });
            callback(articles.reverse());
        }, function (error) {
            callback(error);
        });
    }

    addArticle(article) {
        this.ref.add(article);
    }

    deleteArticle(article) {
        this.ref.doc(article.id).delete();
    }

    updateArticle(article) {
        this.ref.doc(article.id).update(article);
    }
}
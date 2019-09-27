var firebase = require("firebase");
import config from "./firebase_config"
import User from "../models/user";
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
var init = false;
const fs = class FirebaseService {
    static async auth(email, password) {
        if (email == "" || password == "") throw "Invalid informations..."
        var test = email.split("@");
        if (test.length < 2) throw "Invalid informations...";
        if (test[1] == "") throw "Invalid informations...";
        var r = await firebase.auth().signInWithEmailAndPassword(email, password);

        var user = await db.collection("users").doc(r.user.uid).get();
        var data = user.data();
        data.token = r.user.toJSON().stsTokenManager.accessToken;
        //sessionStorage.setItem("token",data.token);
        //return(r.user);
        return new User({
            id: r.user.uid,
            data: data
        });
    }
    static async register(email, password, name) {
        var r = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await db.collection("users").doc(r.user.uid).set({
            name: name
        });
        return {
            message: "Success. User has been registered"
        }
    }

    static getCurrentUser() {
        return firebase.auth().currentUser;
    }
    static onInit(func){
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            this.init = true;
            func();
        });
    }

    static async dashSaveConfig(dash_id,config){
        return await db.collection("users").doc(this.getCurrentUser().uid).collection("dashboards").doc(dash_id).set(config);
    }
    static dashLoadConfig(dash_id,action){
        db.collection("users").doc(this.getCurrentUser().uid).collection("dashboards").doc(dash_id).onSnapshot(action);
    }
}
fs.init = false;

export default fs;
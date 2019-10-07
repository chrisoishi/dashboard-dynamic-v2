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
    static async logout(){
        await firebase.auth().signOut();
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
    static onInit(func) {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            this.init = true;
            func();
        });
    }

    static async createSurvey(config) {
        var doc = await db.collection("surveys").doc().get();
        await db.collection("surveys").doc(doc.id).set(config);
        return doc;
    }
    static async saveSurvey(survey_id, config) {
        return await db.collection("surveys").doc(survey_id).update(config);
    }
    static async loadSurvey(survey_id) {
        return await db.collection("surveys").doc(survey_id).get();
    }
    static loadSurveySS(survey_id, action) {
        return db.collection("surveys").doc(survey_id).onSnapshot(action);
    }
    static async dashSaveConfig(dash_id, config) {
        return await db.collection("dashboards").doc(dash_id).set(config);
    }
    static dashboard_configs_load(dash_id, action) {
        return db.collection("dashboards").doc(dash_id).onSnapshot(action);
    }

    static async user_data(withDashboardNames = false) {
        var doc = await db.collection("users").doc(this.getCurrentUser().uid).get();
        var data = doc.data();
        var names = [];
        if (data.hasOwnProperty("dashboards")) {
            var dash;
            var dash_doc;
            if (withDashboardNames) {
                for (var i = 0; i < data["dashboards"].length; i++) {

                    dash_doc = await db.collection("dashboards").doc(data["dashboards"][i]).get();
                    names.push(dash_doc.data().general.title);
                }
            }
        } else {
            data["dashboards"] = [];
        }

        data["names"] = names;
        return data;
    }

    static async dashboard_create() {
        var dash = await db.collection("dashboards").doc().get();
        await db.collection("dashboards").doc(dash.id).set({
            general: {
                title: "Nova Dash"
            }
        });
        var user = await db.collection("users").doc(this.getCurrentUser().uid).get();
        var dashs = [];
        var user_data = user.data();
        if (user_data.hasOwnProperty("dashboards")) dashs = user_data["dashboards"];
        dashs.push(dash.id);
        await db.collection("users").doc(this.getCurrentUser().uid).update({
            "dashboards": dashs
        });

    }
    static async dashboard_delete(id) {
        var user = await this.user_data();
        var index = user.dashboards.indexOf(id);
        user.dashboards.splice(index, 1);
        await db.collection("dashboards").doc(id).delete();
        await db.collection("users").doc(this.getCurrentUser().uid).update({
            "dashboards": user.dashboards
        });
        return;
    }

}
fs.init = false;

export default fs;
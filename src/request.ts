import * as https from "https";
import * as db from "./database";
import * as config from "./config";
import * as model from "./model";

var options = {
    host: "api.github.com",
    path: "",
    headers: { "user-agent": "eliotjones" }
}

export function query(users: string[]): void {
    users.forEach(element => {

        var user = db.default.getUserByName(element);
        if (user) {
            options.headers["if-none-match"] = user.etag;
        } else {
            user = { name: element, languages: [], etag: null };
        }

        options.path = `/users/${element}/repos?access_token=${config.Config.access_token}`;

        var req = https.get(options, function(res) {
            onResponse(res, user);
        }).on("error", handleRequestError);
    });
}

function handleRequestError(error: any) {
    console.error(error);
}

function onResponse(res: any, user: model.User): void {
    res.setEncoding("utf8");

    var str = "";
    res.on("data", function(chunk) {
        str += chunk;
    });

    res.on("end", function() {
        processResponse(str, res, user)
    });
}

function processResponse(body:string, res: any, user: model.User): void {
    if (res.statusCode === 304) {
        console.info(`User has no new repositories ${user.name}`);
        return;
    }
    
    var remaining = res.headers["X-RateLimit-Remaining"];
    
    if (res.statusCode === 200) {
        var data = JSON.parse(body);
        user.languages = data.map(function(x: any): model.Language {
            return { language: x.language, repository: x.name };
        })
        user.etag = res.headers["etag"];

        console.info("Adding or updating user " + user.name);
        db.default.addUser(user);
    }else{
        console.warn(`Querying user repositories failed for the user ${user.name}. The remaining rate limit is ${remaining}`);
    }
    
}
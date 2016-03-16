import * as loki from "lokijs";
import * as model from "./request";

export class Database {
    private db: Loki;
    private users: LokiCollection<model.User>;

    constructor(filename?: string) {
        var db = new loki(filename ? filename : "loki.json", {
            autosave: true,
            autosaveInterval: 10000,
            autoload: true,
            autoloadCallback: onAutoLoad
        });
        
        var self = this;
        
        function onAutoLoad() {
            var users = db.getCollection<model.User>("users")
            
            if (!users) {
                users = db.addCollection<model.User>("users"); 
                console.log("Database not found. Adding the users collection.");
            }
            
            self.users = users;
        };
        
        this.db = db;
    }

    getUsers(): model.User[] {
        return this.users.data;
    }

    getUserByName(name: string): model.User {
        return this.users.findOne({ name: name });
    }

    addUser(user: model.User) : void {
        if (this.users.findOne({ name: user.name })) {
            this.users.update(user);
            return;
        }
        
        this.users.insert(user);
    }
}

const db = new Database();

export default db;
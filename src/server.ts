import * as http from "http";
import * as db from "./database";
import * as fs from "fs";

export function onRequest(request: http.IncomingMessage, response: http.ServerResponse): void {
    if (request.url === "/api") {
        response.writeHead(200, { "content-type": "application/json" });
        
        var users = db.default.getUsers();
        
        var results = [].concat.apply([], users.map(u => {
            return u.languages.map(l => {
                return { user: u.name, repository: l.repository, language: l.language };
            });
        }));
        
        response.write(JSON.stringify(results));
        
        response.end();
    } else {
        var html = fs.readFileSync("index.html").toString()
        
        response.writeHead(200, { "content-type": "text/html" });
        
        response.end(html);
    }
}
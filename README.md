# GitHub Caller #

A Visual Studio Code node.js project written in TypeScript.

To run locally clone the code and open the folder in VS Code. Run ```npm install``` from the command line in the project folder to install dependencies.

Debugging is started using ```F5``` which will launch the program and start the http server listening on port 3000.

Calls the list of government GitHub repositories defined in ```users.txt```. This file can be changed at runtime to add users. 

Polls every x minutes where the interval is defined in ```app.ts```. 

Requires a personal access token from GitHub in config.ts to increase the rate limit from 30/min to 5000/min. 
No handling for rate limit exceptions at present.
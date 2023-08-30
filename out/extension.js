"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = __importDefault(require("vscode"));
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
/*

10 - Failed Parsing
20 - Invalid Method
30 - Success

*/
const Connections = [];
const App = (0, express_ws_1.default)((0, express_1.default)()).app;
App.all("/", (Request, Respond) => {
    Respond.end("Works...");
});
App.ws("/", (WS, Request) => {
    vscode_1.default.window.showInformationMessage("connected");
    WS.on("message", (Unparsed) => {
        const Parsed = (() => { try {
            return JSON.parse(Unparsed);
        }
        catch (Error) {
            return false;
        } })();
        if (!Parsed)
            return WS.send(JSON.stringify({ ["Code"]: 10 }));
        if (!Parsed.Method)
            return WS.send(JSON.stringify({ ["Code"]: 20 }));
        if (Parsed.Method === "Authorization") {
            const Check = Connections.find(Connection => Connection.Name === Parsed.Name);
            if (Check) {
                return Check.WS = WS;
            }
            Connections.push({ WS: WS, Name: Parsed.Name });
        }
        if (Parsed.Method === "Error") {
            vscode_1.default.window.showErrorMessage(Parsed.Message);
        }
        WS.send(JSON.stringify({ ["Code"]: 30 }));
    });
    WS.on("close", () => {
        console.log("WebSocket disconnected.");
        Connections.splice(Connections.findIndex(Connection => Connection.WS === WS), 1);
    });
});
App.listen(9000);
function activate(Context, Status) {
    const Commands = [];
    const Execute = vscode_1.default.window.createStatusBarItem(vscode_1.default.StatusBarAlignment.Left, -1000);
    Execute.command = "roblox-ws-server.execute";
    Execute.text = "$(notebook-execute) WS Execute";
    Execute.show();
    Context.subscriptions.push(vscode_1.default.commands.registerCommand("roblox-ws-server.debug", () => {
        vscode_1.default.window.showInformationMessage("Roblox WS Execution Running.");
    }));
    Context.subscriptions.push(vscode_1.default.commands.registerCommand("roblox-ws-server.execute", () => {
        if (Connections.length == 0)
            return vscode_1.default.window.showErrorMessage("No Connected Clients");
        if (Connections.length == 1) {
            if (!vscode_1.default.window.activeTextEditor)
                return;
            const Table = Connections[0];
            const Name = Table.Name;
            const WS = Table.WS;
            const Data = vscode_1.default.window.activeTextEditor.document.getText();
            WS.send(JSON.stringify({
                ["Method"]: "Execute",
                ["Data"]: Data,
                ["Code"]: 30
            }));
            return vscode_1.default.window.showInformationMessage("Ran File.");
        }
        const UserList = Connections.map(User => {
            return { label: User.Name, description: "Connected User" };
        });
        vscode_1.default.window.showQuickPick(UserList, { placeHolder: "Select a user." }).then(Option => {
            if (!Option)
                return;
            if (!vscode_1.default.window.activeTextEditor)
                return;
            const Table = Connections.find(Connection => Connection.Name === Option.label);
            const Name = Table.Name;
            const WS = Table.WS;
            const Data = vscode_1.default.window.activeTextEditor.document.getText();
            WS.send(JSON.stringify({
                ["Method"]: "Execute",
                ["Data"]: Data,
                ["Code"]: 30
            }));
            return vscode_1.default.window.showInformationMessage("Ran File.");
        });
    }));
    Context.subscriptions.push(Execute);
    Context.subscriptions.push(...Commands);
}
exports.activate = activate;
function deactivate() {
    Connections.forEach(Connection => {
        if (Connection.WS.readyState != Connection.WS.OPEN)
            return;
        Connection.WS.close();
    });
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
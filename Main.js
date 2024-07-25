const VSCode                                = require("vscode")
const Helmet                                = require("helmet")
const Express                               = require("express")
const WebSocket                             = require("express-ws")

const Connections					        = []
const App 									= WebSocket(Express()).app

/*

10 - Failed Parsing
20 - Invalid Method
30 - Success

*/

App.use(Helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		connectSrc: ["'self'", "ws://localhost:9000"]
	},
}))

App.all("/", (Request, Respond) => {
	Respond.end("Roblox WS Execution")
})

App.ws("/", (WS) => {
	setTimeout(() => {
		if (Connections.some(Connection => Connection.WS === WS)) return

		WS.close()
		VSCode.window.showInformationMessage(`Connected user failed to authenticate, Closing connection..`)
	}, 500)

	WS.on("message", (Unparsed) => {
		const Parsed						= (() => { try { return JSON.parse(Unparsed) } catch (Error) { return false } })()

		if (!Parsed) return WS.send(JSON.stringify({ ["Code"]: 10 }))
		if (!Parsed.Method) return WS.send(JSON.stringify({ ["Code"]: 20 }))

		if (Parsed.Method === "Authorization") {
			const Check						= Connections.find(Connection => Connection.Name === Parsed.Name)

			if (Check) { VSCode.window.showInformationMessage(`Updated WS for ${Parsed.Name}.`); return Check.WS = WS }

			VSCode.window.showInformationMessage(`User ${Parsed.Name} Connected.`)
			Connections.push({ WS: WS, Name: Parsed.Name })
		}

		if (Parsed.Method === "Error") {
			VSCode.window.showErrorMessage(Parsed.Message)
		}

		WS.send(JSON.stringify({ ["Code"]: 30 }))
	})

	WS.on("close", () => {
		const Index							= Connections.findIndex(Connection => Connection.WS === WS)

		if (Index == -1) return

		Connections.splice(Index, 1)
		console.log("WebSocket Disconnected.")
	})
})

App.listen(9000)

function Activated(Context, Status) {
	const Commands							= []
	const CheckIfOpened						= Context.globalState.get("CheckIfOpened", false)
	const Execute							= VSCode.window.createStatusBarItem(VSCode.StatusBarAlignment.Left, -1000)
	Execute.command							= "roblox-ws-server.execute"
	Execute.text							= "$(notebook-execute) WS Execute"
	Execute.show()

	if (!CheckIfOpened) {
		VSCode.window.showWarningMessage(`The loadstring has changed, please make sure you updated it.\nThis won't happen again and sorry for the inconvenience.\n`, "OPEN").then((Selection) => {
			if (Selection !== "OPEN") return

			VSCode.env.openExternal(VSCode.Uri.parse(
				"https://raw.githubusercontent.com/Incognito-Tabs/Roblox-WS-Execution/main/Loadstring.lua"
			)).then((Success) => {
				if (!Success) return

				Context.globalState.update("CheckIfOpened", true)
			})

			Context.globalState.update("CheckIfOpened", true)
		})
	}

	Context.subscriptions.push(VSCode.commands.registerCommand("roblox-ws-server.debug", () => {
		VSCode.window.showInformationMessage("Roblox WS Execution Running.")
	}))

	Context.subscriptions.push(VSCode.commands.registerCommand("roblox-ws-server.execute", () => {
		if (Connections.length == 0) return VSCode.window.showErrorMessage("No Connected Clients")

		if (Connections.length == 1) {
			if (!VSCode.window.activeTextEditor) return

			const Table						= Connections[0]
			const Name						= Table.Name
			const WS						= Table.WS
			const Data						= VSCode.window.activeTextEditor.document.getText()

			WS.send(JSON.stringify({
				["Method"]: "Execute",
				["Data"]: Data,
				["Code"]: 30
			}))

			return VSCode.window.showInformationMessage("Ran File.")
		}

		const UserList						= Connections.map(User => {
			return { label: User.Name, description: "Connected User" };
		})

		VSCode.window.showQuickPick(UserList, { placeHolder: "Select a user." }).then((Option) => {
			if (!Option) return
			if (!VSCode.window.activeTextEditor) return

			const Table						= Connections.find(Connection => Connection.Name === Option.label)
			const Name						= Table.Name
			const WS						= Table.WS
			const Data						= VSCode.window.activeTextEditor.document.getText()

			WS.send(JSON.stringify({
				["Method"]: "Execute",
				["Data"]: Data,
				["Code"]: 30
			}))

			return VSCode.window.showInformationMessage("Ran File.")
		})
	}))

	Context.subscriptions.push(Execute)
	Context.subscriptions.push(...Commands)
}

function Deactivated() {
	Connections.forEach(Connection => {
        if (Connection.WS.readyState != Connection.WS.OPEN) return

		Connection.WS.close()
    })
}

module.exports = {
    ["activate"]: Activated,
	["deactivate"]: Deactivated
}
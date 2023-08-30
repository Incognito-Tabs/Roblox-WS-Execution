import VSCode from "vscode"
import Express from "express"
import WebSocket from "express-ws"

/*

10 - Failed Parsing
20 - Invalid Method
30 - Success

*/

const Connections: any[]					= []
const App 									= WebSocket(Express()).app

App.all("/", (Request, Respond) => {
	Respond.end("Works...")
})

App.ws("/", (WS, Request) => {
	WS.on("message", (Unparsed: string) => {
		const Parsed 				= (() => { try { return JSON.parse(Unparsed) } catch (Error) { return false } })()

		if (!Parsed) return WS.send(JSON.stringify({ ["Code"]: 10 }))
		if (!Parsed.Method) return WS.send(JSON.stringify({ ["Code"]: 20 }))

		if (Parsed.Method === "Authorization") {
			const Check 			= Connections.find(Connection => Connection.Name === Parsed.Name)

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
		console.log("WebSocket disconnected.")
		Connections.splice(Connections.findIndex(Connection => Connection.WS === WS), 1)
	})
})

App.listen(9000)

export function activate(Context: VSCode.ExtensionContext, Status: VSCode.StatusBarItem) {
	const Commands: VSCode.Disposable[]		= []

	const Execute: VSCode.StatusBarItem 	= VSCode.window.createStatusBarItem(VSCode.StatusBarAlignment.Left, -1000)
	Execute.command 						= "roblox-ws-server.execute"
	Execute.text 							= "$(notebook-execute) WS Execute"
	Execute.show()

	Context.subscriptions.push(VSCode.commands.registerCommand("roblox-ws-server.debug", () => {
		VSCode.window.showInformationMessage("Roblox WS Execution Running.")
	}))

	Context.subscriptions.push(VSCode.commands.registerCommand("roblox-ws-server.execute", () => {
		if (Connections.length == 0) return VSCode.window.showErrorMessage("No Connected Clients")

		if (Connections.length == 1) {
			if (!VSCode.window.activeTextEditor) return

			const Table 					= Connections[0]
			const Name 						= Table.Name
			const WS 						= Table.WS
			const Data 						= VSCode.window.activeTextEditor.document.getText()

			WS.send(JSON.stringify({
				["Method"]: "Execute",
				["Data"]: Data,
				["Code"]: 30
			}))

			return VSCode.window.showInformationMessage("Ran File.")
		}

		const UserList					 	= Connections.map(User => {
			return { label: User.Name, description: "Connected User" };
		})

		VSCode.window.showQuickPick(UserList, { placeHolder: "Select a user." }).then(Option => {
			if (!Option) return
			if (!VSCode.window.activeTextEditor) return

			const Table 					= Connections.find(Connection => Connection.Name === Option.label)
			const Name 						= Table.Name
			const WS 						= Table.WS
			const Data 						= VSCode.window.activeTextEditor.document.getText()

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

export function deactivate() {
	Connections.forEach(Connection => {
        if (Connection.WS.readyState != Connection.WS.OPEN) return

		Connection.WS.close()
    })
}
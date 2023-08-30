local Services 						= setmetatable({}, { __index = function(Self, Key) return game.GetService(game, Key) end })
local Client 						= Services.Players.LocalPlayer
local Executor 						= identifyexecutor()
local SMethod 						= (string.find(Executor, "Krnl") and WebSocket.connect) or (string.find(Executor, "Fluxus UWP") and WebSocket.connect) or (string.find(Executor, "Oxygen U UWP") and WebSocket.connect) or (string.find(Executor, "Sirhurt") and WebSocket.connect) or (string.find(Executor, "Synapse") and syn.websocket.connect)

if not SMethod then return Client:Kick("Executor is too shitty.") end

local Main 							= function()
	local Success, WebSocket 		= pcall(SMethod, "ws://localhost:9000/")

	if not Success then return end

	WebSocket:Send(Services.HttpService:JSONEncode({
		Method						= "Authorization",
		Name						= Client.Name
	}))

	WebSocket.OnMessage:Connect(function(Unparsed)
		local Parsed 				= Services.HttpService:JSONDecode(Unparsed)
		
		if (Parsed.Method == "Execute") then
			local Function, Error 	= loadstring(Parsed.Data)

			if Error then return WebSocket:Send(Services.HttpService:JSONEncode({
				Method				= "Error",
				Message				= Error
			}))	end
			
			Function()
		end
	end)

	WebSocket.OnClose:Wait()
end

while task.wait(1) do
	local Success, Error 			= pcall(Main)
	if not Success then print(Error) end
end
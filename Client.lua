local Services 						= setmetatable({}, { __index = function(Self, Key) return game.GetService(game, Key) end })
local Client 						= Services.Players.LocalPlayer
local Executor 						= identifyexecutor()
local SMethod 						= (string.find(Executor, "Krnl") and WebSocket.connect) or (string.find(Executor, "Electron") and WebSocket.connect) or (string.find(Executor, "Fluxus") and WebSocket.connect) or (string.find(Executor, "Oxygen U") and WebSocket.connect) or (string.find(Executor, "Valyse") and WebSocket.connect) or (string.find(Executor, "Sirhurt") and WebSocket.connect) or (string.find(Executor, "Synapse") and syn.websocket.connect)

if not SMethod then return Client:Kick("Executor is too shitty.") end

local Main 							= function()
	local Success, WebSocket 		= pcall(SMethod, "ws://localhost:9000/")
    local Closed                    = false

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

    -- i fucking hate you electron
	-- WebSocket.OnClose:Wait()

	WebSocket.OnClose:Connect(function()
        Closed                       = true
    end)

    repeat task.wait() until Closed
end

while task.wait(1) do
	local Success, Error 			= pcall(Main)
	if not Success then print(Error) end
endlocal Services 						= setmetatable({}, { __index = function(Self, Key) return game.GetService(game, Key) end })
local Client 						= Services.Players.LocalPlayer
local Executor 						= identifyexecutor()
local SMethod 						= (string.find(Executor, "Krnl") and WebSocket.connect) or (string.find(Executor, "Electron") and WebSocket.connect) or (string.find(Executor, "Fluxus UWP") and WebSocket.connect) or (string.find(Executor, "Oxygen U UWP") and WebSocket.connect) or (string.find(Executor, "Sirhurt") and WebSocket.connect) or (string.find(Executor, "Synapse") and syn.websocket.connect) or (string.find(Executor, "Valyse") and WebSocket.connect)

if not SMethod then return Client:Kick("Executor is too shitty.") end

local Main 							= function()
	local Success, WebSocket 		= pcall(SMethod, "ws://localhost:9000/")
    local Closed                    = false

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

    -- i fucking hate you electron
	-- WebSocket.OnClose:Wait()

	WebSocket.OnClose:Connect(function()
        Closed                       = true
    end)

    repeat task.wait() until Closed
end

while task.wait(1) do
	local Success, Error 			= pcall(Main)
	if not Success then print(Error) end
endlocal Services 						= setmetatable({}, { __index = function(Self, Key) return game.GetService(game, Key) end })
local Client 						= Services.Players.LocalPlayer
local Executor 						= identifyexecutor()
local SMethod 						= (string.find(Executor, "Krnl") and WebSocket.connect) or (string.find(Executor, "Electron") and WebSocket.connect) or (string.find(Executor, "Fluxus UWP") and WebSocket.connect) or (string.find(Executor, "Oxygen U UWP") and WebSocket.connect) or (string.find(Executor, "Sirhurt") and WebSocket.connect) or (string.find(Executor, "Synapse") and syn.websocket.connect) or (string.find(Executor, "Valyse") and WebSocket.connect)

if not SMethod then return Client:Kick("Executor is too shitty.") end

local Main 							= function()
	local Success, WebSocket 		= pcall(SMethod, "ws://localhost:9000/")
    local Closed                    = false

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

    -- i fucking hate you electron
	-- WebSocket.OnClose:Wait()

	WebSocket.OnClose:Connect(function()
        Closed                       = true
    end)

    repeat task.wait() until Closed
end

while task.wait(1) do
	local Success, Error 			= pcall(Main)
	if not Success then print(Error) end
endlocal Services 						= setmetatable({}, { __index = function(Self, Key) return game.GetService(game, Key) end })
local Client 						= Services.Players.LocalPlayer
local Executor 						= identifyexecutor()
local SMethod 						= (string.find(Executor, "Krnl") and WebSocket.connect) or (string.find(Executor, "Electron") and WebSocket.connect) or (string.find(Executor, "Fluxus UWP") and WebSocket.connect) or (string.find(Executor, "Oxygen U UWP") and WebSocket.connect) or (string.find(Executor, "Sirhurt") and WebSocket.connect) or (string.find(Executor, "Synapse") and syn.websocket.connect) or (string.find(Executor, "Valyse") and WebSocket.connect)

if not SMethod then return Client:Kick("Executor is too shitty.") end

local Main 							= function()
	local Success, WebSocket 		= pcall(SMethod, "ws://localhost:9000/")
    local Closed                    = false

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

    -- i fucking hate you electron
	-- WebSocket.OnClose:Wait()

	WebSocket.OnClose:Connect(function()
        Closed                       = true
    end)

    repeat task.wait() until Closed
end

while task.wait(1) do
	local Success, Error 			= pcall(Main)
	if not Success then print(Error) end
end
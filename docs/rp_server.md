# RP (Server)

Shared base object

## Modules
- [Util](rp_server?id=util)
- [Log](rp_server?id=log)

## RP

- `RP.GetPlayerFromSource(src)` or `RP.GetPlayerFromId(src)` - Gets the [RCPlayer](player) object from source, nil if player is offline
- `RP.GetPlayerFromIdentifier(identfier)` - Gets the [RCPlayer](player) object from identifier, nil if not found
- `RP.IsIdentifierOnline(identifier)` - Checks if the identifier is online
-- `identifier` can also be a table of identifiers, returns on first match
-- Returns true/false and the source of the player if found
-- Example: `local online, src = RP.IsIdentifierOnline(identifier)`
- `RP.RegisterServerCallback(name, handler)` - Registers a server callback
- `RP.GetLevelFromXP(xp)` - Gets level from XP
- `RP.GetXPFromLevel(level)` - Gets XP from level

## Util

- `RP.Util.RoundFloat(number, precision)` - Rounds a number to the specified number of digits after the floating point
- `RP.Util.RandomString(length)` - Generates a random string with specified length
- `RP.Util.GroupDigits(number)` - Formats a number with commas
- `RP.Util.GetDistance(pos1, pos2, useZ)` - Gets distance between coords
-- `useZ` - Wether to use Z (height) or not, if set to false or not provided, it will check in a cylinder rather than a sphere
- `RP.Util.Trim(string)` - Trims whitespace from a string

## Log
- `RP.Log.info(...)` - Logs an info message
- `RP.Log.warning(...)` - Logs a warning message
- `RP.Log.error(...)` - Logs an error message
- `RP.Log.debug(...)` - Logs a debug message
-- Only shows if debug is true
- `RP.Log.custom(...)` - Logs a custom message
-- Prints "[resource_name] ...`
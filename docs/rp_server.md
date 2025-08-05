# RP (Server)

Shared base object

## Modules
- [Util](rp_server?id=util)
- [Log](rp_server?id=log)

## RP

- `RP.GetPlayerFromSource(src)` or `RP.GetPlayerFromId(src)` - Gets the [RCPlayer](player) object from source, nil if player is offline
- `RP.GetPlayerFromIdentifier(identfier)` - Gets the [RCPlayer](player) object from identifier, nil if not found
- `RP.GetPlayerFromPid(pid)` - Gets the [RCPlayer](player) object from database id, nil if not online
- `RP.IsIdentifierOnline(identifier)` - Checks if the identifier is online
-- `identifier` can also be a table of identifiers, returns on first match
-- Returns true/false and the source of the player if found
-- Example: `local online, src = RP.IsIdentifierOnline(identifier)`
- `RP.IsPidOnline(pid)` - Checks if the pid is online
-- Returns true/false and the source of the player if found
-- Example: `local online, src = RP.IsPidOnline(pid)`
- `RP.RegisterServerCallback(name, handler)` - Registers a server callback
- `RP.UpdateChallengeScore(player: RCPlayer|source, challengeId, score, saveGreater)` - Updates (or inserts) a challenge score for a player
-- `saveGreater` - Boolean, if set to true, if an entry already exists, it will only update the score if the provided value is greater than what is saved
-- Always increments attempts

## Events

- none currently
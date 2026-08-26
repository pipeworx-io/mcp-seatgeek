# @pipeworx/seatgeek

[SeatGeek Platform](https://platform.seatgeek.com/) MCP — events, performers, venues. Free client_id required.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

## Auth

- Platform: `PLATFORM_SEATGEEK_KEY`. BYO: `?_apiKey=…` (SeatGeek calls it `client_id`).

## Tools

- `events(q?, performers_id?, venue_id?, taxonomies_id?, datetime_local_gte?, datetime_local_lte?, lat?, lon?, range?, geoip?, postal_code?, country?, per_page?, page?, sort?)` — event search
- `event(id)` — single event
- `performers(q?, slug?, type?, has_upcoming_events?, per_page?, page?, sort?)` — performers search
- `performer(id)` — single performer
- `performer_by_slug(slug)` — performer by slug
- `venues(q?, city?, state?, country?, postal_code?, per_page?, page?, sort?)` — venues search
- `venue(id)` — single venue
- `taxonomies()` — list taxonomies
- `recommendations(events_id?, performers_id?, performers_slug?, postal_code?, geoip?, per_page?, page?)` — recommended events

## Data source

`https://api.seatgeek.com/2`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "seatgeek": {
      "url": "https://gateway.pipeworx.io/seatgeek/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/seatgeek/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Seatgeek data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

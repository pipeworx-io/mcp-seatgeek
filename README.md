# @pipeworx/seatgeek

[SeatGeek Platform](https://platform.seatgeek.com/) MCP — events, performers, venues. Free client_id required.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Seatgeek data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * SeatGeek MCP.
 */


const BASE = 'https://api.seatgeek.com/2';
const UA = 'pipeworx-mcp-seatgeek/1.0 (+https://pipeworx.io)';

const passthrough = { type: 'object' as const, properties: {}, additionalProperties: true };

const tools: McpToolExport['tools'] = [
  { name: 'events', description: 'Event search.', inputSchema: passthrough },
  { name: 'event', description: 'Single event.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'performers', description: 'Performers search.', inputSchema: passthrough },
  { name: 'performer', description: 'Single performer.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'performer_by_slug', description: 'Performer by slug.', inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] } },
  { name: 'venues', description: 'Venue search.', inputSchema: passthrough },
  { name: 'venue', description: 'Single venue.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'taxonomies', description: 'List taxonomies.', inputSchema: { type: 'object', properties: {} } },
  { name: 'recommendations', description: 'Recommended events.', inputSchema: passthrough },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = (args._apiKey as string | undefined)?.trim();
  if (!apiKey) throw new Error('SeatGeek requires a client_id. Set PLATFORM_SEATGEEK_KEY or pass ?_apiKey=… (free at https://platform.seatgeek.com).');
  const get = async (path: string, params?: Record<string, unknown>) => {
    const p = new URLSearchParams({ client_id: apiKey });
    if (params) for (const [k, v] of Object.entries(params)) if (k !== '_apiKey' && v != null) p.set(k, String(v));
    const res = await fetch(`${BASE}${path}?${p}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (res.status === 401 || res.status === 403) throw new Error('SeatGeek: invalid client_id.');
    if (!res.ok) throw new Error(`SeatGeek: ${res.status}`);
    return res.json();
  };
  const reqStr = (k: string, ex: string) => {
    const v = args[k];
    if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${k}" is missing. Pass a string like ${ex}.`);
    return v;
  };
  const reqNum = (k: string, ex: string) => {
    const v = args[k];
    if (v == null || typeof v !== 'number') throw new Error(`Required argument "${k}" is missing. Pass a number like ${ex}.`);
    return v;
  };
  switch (name) {
    case 'events':
      return get('/events', args);
    case 'event':
      return get(`/events/${reqNum('id', '6045123')}`);
    case 'performers':
      return get('/performers', args);
    case 'performer':
      return get(`/performers/${reqNum('id', '5')}`);
    case 'performer_by_slug':
      return get('/performers', { slug: reqStr('slug', '"taylor-swift"') });
    case 'venues':
      return get('/venues', args);
    case 'venue':
      return get(`/venues/${reqNum('id', '100')}`);
    case 'taxonomies':
      return get('/taxonomies');
    case 'recommendations':
      return get('/recommendations', args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;

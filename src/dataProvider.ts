import { fetchUtils, type DataProvider } from "react-admin";

// Where the shop API runs. Can be changed with VITE_API_URL in a .env file
const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// react-admin's helper: sends the request, parses JSON, and throws on 4xx/5xx
const httpClient = fetchUtils.fetchJson;

// What react-admin sends when it asks for a list
interface ListParams {
    pagination?: { page: number; perPage: number };
    sort?: { field: string; order: string };
    filter?: Record<string, unknown>;
}

// Turns react-admin's list request into our API's query string,
// e.g. page=2&limit=10&sort=price&order=desc&search=dress
function buildListQuery(params: ListParams): string {
    const query = new URLSearchParams();
    if (params.pagination) {
        query.set("page", String(params.pagination.page));
        query.set("limit", String(params.pagination.perPage));
    }
    if (params.sort?.field) {
        query.set("sort", params.sort.field);
        // react-admin uses ASC/DESC, our API expects asc/desc
        query.set("order", params.sort.order.toLowerCase());
    }
    for (const [key, value] of Object.entries(params.filter ?? {})) {
        if (value === undefined || value === null || value === "") {
            continue;
        }
        // react-admin calls the search box "q", our API calls it "search"
        query.set(key === "q" ? "search" : key, String(value));
    }
    return query.toString();
}

// Keeps only the fields the user really changed. The API rejects any field
// it does not accept, such as id, createdAt or category, so we never send the whole record
function changedFields(
    data: Record<string, unknown>,
    previousData: Record<string, unknown>,
): Record<string, unknown> {
    const changes: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
        if (JSON.stringify(value) !== JSON.stringify(previousData[key])) {
            changes[key] = value;
        }
    }
    return changes;
}

async function getList(resource: string, params: ListParams) {
    const { json } = await httpClient(
        `${API_URL}/${resource}?${buildListQuery(params)}`,
    );
    // Products come paginated as { data, meta }; categories still come as a plain array
    if (Array.isArray(json)) {
        return { data: json, total: json.length };
    }
    return { data: json.data, total: json.meta.total };
}

export const dataProvider: DataProvider = {
    getList,

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
        return { data: json };
    },

    // Our API has no "get these ids" route, so we fetch them one by one
    getMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map((id) => httpClient(`${API_URL}/${resource}/${id}`)),
        );
        return { data: responses.map(({ json }) => json) };
    },

    // e.g. "products whose categoryId is 3"
    getManyReference: (resource, params) =>
        getList(resource, {
            ...params,
            filter: { ...params.filter, [params.target]: params.id },
        }),

    create: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(changedFields(params.data, params.previousData)),
        });
        return { data: json };
    },

    updateMany: async (resource, params) => {
        await Promise.all(
            params.ids.map((id) =>
                httpClient(`${API_URL}/${resource}/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(params.data),
                }),
            ),
        );
        return { data: params.ids };
    },

    // The API answers 204 with no body, so we hand back the record we already had
    delete: async (resource, params) => {
        await httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: "DELETE",
        });
        return { data: params.previousData! };
    },

    deleteMany: async (resource, params) => {
        await Promise.all(
            params.ids.map((id) =>
                httpClient(`${API_URL}/${resource}/${id}`, { method: "DELETE" }),
            ),
        );
        return { data: params.ids };
    },
};
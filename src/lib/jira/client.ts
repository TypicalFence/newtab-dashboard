import fetch from "node-fetch";
import { Issue } from "./models";

export interface JiraClientInterface {
    getAsiggnedIssues(): Promise<Issue[]>;
    getOpenIssuesOfCurrentSprint(): Promise<Issue[]>;
}

export class JiraClient implements JiraClientInterface {
    private domain: string;
    private email: string;
    private apiKey: string;

    public constructor(domain: string, email: string, apiKey: string) {
        this.email = email;
        this.apiKey = apiKey;
        this.domain = domain;
    }

    private getAuth(): string {
        return `Basic ${Buffer.from(`${this.email}:${this.apiKey}`).toString(
            "base64"
        )}`;
    }

    public async getAsiggnedIssues(): Promise<Issue[]> {
        const args = "startAt=0&validateQuery=True&maxResults=50";
        const response = await fetch(
            `https://${this.domain}/rest/api/2/search?jql=assignee+%3D+currentUser%28%29&${args}`,
            {
                method: "GET",
                headers: {
                    Authorization: this.getAuth(),
                    Accept: "application/json",
                },
            }
        );
        const json = await response.json();
        return json.issues || [];
    }
    //
    public async getOpenIssuesOfCurrentSprint(): Promise<Issue[]> {
        const args = "startAt=0&validateQuery=True&maxResults=50";
        const jql = encodeURIComponent(
            'sprint in openSprints() AND statusCategory = "To Do"'
        );
        const response = await fetch(
            `https://${this.domain}/rest/api/2/search?jql=${jql}&${args}`,
            {
                method: "GET",
                headers: {
                    Authorization: this.getAuth(),
                    Accept: "application/json",
                },
            }
        );
        const json = await response.json();
        return json.issues || [];
    }
}

import { JiraClient } from "./client";

export function getJiraClient(): JiraClient {
    return new JiraClient(
        process.env.JIRA_DOMAIN,
        process.env.JIRA_EMAIL,
        process.env.JIRA_APIKEY
    );
}

export { JiraClient } from "./client";

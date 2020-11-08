import { Gitlab } from "@gitbeaker/node";
import { MergeRequest } from "./model";

interface GitlabClientInterface {
    getOpenMergeRequests(): Promise<MergeRequest[]>;
}

export class GitlabClient implements GitlabClientInterface {
    private gitlab;

    constructor(apiKey: string) {
        this.gitlab = new Gitlab({ token: apiKey });
    }

    public async getOpenMergeRequests(): Promise<MergeRequest[]> {
        return this.gitlab.MergeRequests.all({
            groupId: process.env.GITLAB_GROUP,
            state: "opened",
        });
    }
}

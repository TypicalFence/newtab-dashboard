export interface AvatarUrls {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
}

export interface Project {
    self: string;
    id: string;
    key: string;
    name: string;
    projecTypeKey: string;
    simplified: boolean;
    avatarUrls: AvatarUrls;
}

export interface User {
    self: string;
    accountId: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timezone: string;
    accountType: string;
}

export interface Sprint {
    id: number;
    name: string;
    state: string;
    boardId: number;
    goal: string;
    startDate: string;
    endDate: string;
}

export interface StatusCategory {
    self: string;
    id: number;
    key: string;
    colorName: string;
    name: string;
}

export interface Status {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: StatusCategory;
}

export interface Priority {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
}

export interface IssueType {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: false;
    avatarId: number;
    entityId: string;
}

export interface IssueFields {
    description: string;
    summary: string;
    creator: User;
    statuscategorychangedate: string;
    issuetype: IssueType;
    project: Project;
    priority: Priority;
    assignee: User;
    status: Status;
    customfield_10020: Sprint[];
}

export interface Issue {
    expand: string;
    self: string;
    key: string;
    fields: IssueFields;
}

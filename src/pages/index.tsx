import { GetServerSideProps } from "next";
import Head from "next/head";
import { Link } from "../model";
import { LinksMenu } from "../components/linksMenu";
import Clock from "../components/clock";
import { Issue } from "../lib/jira/models";
import IssueSection from "../components/issueSection";
import { getJiraClient } from "../lib/jira";
import { MergeRequest } from "../lib/gitlab/model";
import { GitlabClient } from "../lib/gitlab/client";
import MergeRequestSection from "../components/mergeRequestSection";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";

interface DashboardProps {
    links: Link[];
    assignedIssues: Issue[];
    todoIssues: Issue[];
    mergeRequests: MergeRequest[];
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await basicAuthMiddleware(req, res, {});
    const links: Link[] = await import("../../links.json").then(
        (module) => module.default
    );

    const jiraClient = getJiraClient();
    const assignedIssues = await jiraClient.getAsiggnedIssues();
    const todoIssues = await jiraClient.getOpenIssuesOfCurrentSprint();

    const gitLab = new GitlabClient(process.env.GITLAB_APIKEY);
    const mergeRequests = await gitLab.getOpenMergeRequests();

    return {
        props: {
            links,
            assignedIssues,
            todoIssues,
            mergeRequests,
        },
    };
};

export const Dashboard = ({
    links,
    assignedIssues,
    todoIssues,
    mergeRequests,
}: DashboardProps): JSX.Element => (
    <div className="container">
        <Head>
            <title>Dashboard</title>
        </Head>
        <main>
            <h1 className="title">Hi There!</h1>
            <Clock />
            <LinksMenu links={links} />
            <div className={"sections"}>
                <IssueSection issues={assignedIssues} title={"Assigned"} />
                <IssueSection issues={todoIssues} title={"TODO"} />
                <MergeRequestSection mergeRequests={mergeRequests} />
            </div>
        </main>
    </div>
);

export default Dashboard;

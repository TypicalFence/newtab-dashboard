import { GetStaticProps } from "next";
import Head from "next/head";
import { Link } from "../model";
import { LinksMenu } from "../components/linksMenu";
import Clock from "../components/clock";
import { Issue } from "../lib/jira/models";
import IssueSection from "../components/issueSection";
import { getJiraClient } from "../lib/jira";

interface HomeModel {
    links: Link[];
    assignedIssues: Issue[];
    todoIssues: Issue[];
}

export const getStaticProps: GetStaticProps = async () => {
    const links: Link[] = await import("../../links.json").then(
        (module) => module.default
    );

    const jiraClient = getJiraClient();
    const assignedIssues = await jiraClient.getAsiggnedIssues();
    const todoIssues = await jiraClient.getOpenIssuesOfCurrentSprint();

    return {
        props: {
            links,
            assignedIssues,
            todoIssues,
        },
    };
};

export const Home = ({
    links,
    assignedIssues,
    todoIssues,
}: HomeModel): JSX.Element => (
    <div className="container">
        <Head>
            <title>Dashboard</title>
        </Head>
        <main>
            <h1 className="title">Hi There!</h1>
            <Clock />
            <LinksMenu links={links} />
            <IssueSection issues={assignedIssues} title={"Assigned"} />
            <IssueSection issues={todoIssues} title={"TODO"} />
        </main>
    </div>
);

export default Home;

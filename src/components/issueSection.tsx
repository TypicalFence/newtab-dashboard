import React from "react";
import { Issue } from "../lib/jira/models";

interface IssueCardProps {
    issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
    const { fields, key } = issue;
    const { summary } = fields;

    return (
        <div className={"issue-card"}>
            <span className="heading">{summary}</span>
            <span className="key">{key}</span>
        </div>
    );
};

interface IssueSectionProps {
    issues: Issue[];
    title: string;
}

const IssueSection = ({ issues, title }: IssueSectionProps) => (
    <div className={"section issue-section"}>
        <h2 className={"heading"}>{title}</h2>
        <div className="section-body">
        {issues.map((i) => (
            <a
                key={i.self}
                href={`https://buildigo.atlassian.net/browse/${i.key}`}
            >
                <IssueCard issue={i} />
            </a>
        ))}
            </div>
    </div>
);

export default IssueSection;

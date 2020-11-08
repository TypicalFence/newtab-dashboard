import React from "react";
import { MergeRequest } from "../lib/gitlab/model";

interface MergeRequestSectionProps {
    mergeRequests: MergeRequest[];
}

const MergeRequestSection = ({ mergeRequests }: MergeRequestSectionProps) => {
    const listItems = mergeRequests.map((mr) => (
        <li key={mr.id}>
            <a href={mr.web_url}>{mr.title}</a>
        </li>
    ));
    return (
        <div className={"section merge-request-section"}>
            <h2 className={"heading"}>Merge Requests</h2>
            <div className="section-body">
                <ul className={"merge-request-list"}>{listItems}</ul>
            </div>
        </div>
    );
};

export default MergeRequestSection;

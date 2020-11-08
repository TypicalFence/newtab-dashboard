// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { getJiraClient } from "../../../../lib/jira";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const jiraClient = getJiraClient();
    const issues = await jiraClient.getOpenIssuesOfCurrentSprint();
    res.statusCode = 200;
    res.json(issues);
};

export default handler;

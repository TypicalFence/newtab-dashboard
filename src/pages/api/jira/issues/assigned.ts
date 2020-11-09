// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { getJiraClient } from "../../../../lib/jira";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { ensureAuth } from "../../../../lib/auth";

const handler = ensureAuth(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await basicAuthMiddleware(req, res, {});

        const jiraClient = getJiraClient();
        const issues = await jiraClient.getAsiggnedIssues();
        res.statusCode = 200;
        res.json(issues);
    }
);

export default handler;

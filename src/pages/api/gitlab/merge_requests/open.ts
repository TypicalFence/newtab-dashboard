import { NextApiRequest, NextApiResponse } from "next";
import { GitlabClient } from "../../../../lib/gitlab/client";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { ensureAuth } from "../../../../lib/auth";

const handler = ensureAuth(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await basicAuthMiddleware(req, res, {});
        const gitlab = new GitlabClient(process.env.GITLAB_APIKEY);
        const mergeRequess = await gitlab.getOpenMergeRequests();
        res.statusCode = 200;
        res.json(mergeRequess);
    }
);
export default handler;

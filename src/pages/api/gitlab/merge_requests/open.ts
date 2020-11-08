import { NextApiRequest, NextApiResponse } from "next";
import { GitlabClient } from "../../../../lib/gitlab/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const gitlab = new GitlabClient(process.env.GITLAB_APIKEY);
    const mergeRequess = await gitlab.getOpenMergeRequests();
    res.statusCode = 200;
    res.json(mergeRequess);
};

export default handler;

import { GetStaticProps } from "next";
import Head from "next/head";
import { Link } from "../model";
import { LinksMenu } from "../components/linksMenu";
import Clock from "../components/clock";

interface HomeModel {
    links: Link[];
}

export const getStaticProps: GetStaticProps = async () => {
    const links: Link[] = await import("../../links.json").then(
        (module) => module.default
    );

    return {
        props: {
            links,
        },
    };
};

export const Home = ({ links }: HomeModel): JSX.Element => (
    <div className="container">
        <Head>
            <title>Dashboard</title>
        </Head>
        <main>
            <h1 className="title">Hi There!</h1>
            <Clock />
            <LinksMenu links={links} />
        </main>
        <style jsx>{`
            .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 80vh;
            }

            .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
                color: white;
            }
        `}</style>
    </div>
);

export default Home;

import React from "react";
import { Link as LinkModel } from "../model";
import styles from "../styles/linksMenu.module.css";

const Link = ({ link }: { link: LinkModel }): JSX.Element => (
    <a className={styles.link} href={link.target}>
        {link.name}
    </a>
);

export const LinksMenu = ({ links }: { links: LinkModel[] }): JSX.Element => (
    <div className={styles.menu}>
        {links.map((l) => (
            // maybe hash the target for the key
            <Link key={l.target} link={l} />
        ))}
    </div>
);

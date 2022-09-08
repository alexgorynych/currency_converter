import { FC } from "react";
import { Location } from "../Location";

export const Header: FC = () => {
    return (
        <header className="app-header">
            <Location />
        </header>
    );
};

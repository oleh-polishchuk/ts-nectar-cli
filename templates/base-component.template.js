module.exports = (options = {}) => {
    return `\
import "./style.scss";
import React from "react";

type TProps = {};

const ${options.name}: React.FC<TProps> = () => (
    <div styleName="${options.className}">
        ${options.name} works!
    </div>
);

export default ${options.name};
`
};

module.exports = (options = {}) => {
    return `\
export { default } from "./${options.name}";
`
};

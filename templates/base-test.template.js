module.exports = (options = {}) => {
    const { componentName } = options;

    return `\
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ${componentName} from "./${componentName}";

const props = {};

describe("${componentName} component", () => {
    it("should match snapshot with default props:", () => {
        const component = shallow(<${componentName} {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
`
};

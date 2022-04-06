import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kama" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kama");
    })

    test("after creation span should be displayed with status", () => {
        const component = create(<ProfileStatus status="it-kama" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    })
    test("after creation input shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status="it-kama" />);
        const root = component.root;

        expect(() => {
            let input = root.findByType("input");

        }).toThrow();
    })
    test("after creation span with status should be displayed with status", () => {
        const component = create(<ProfileStatus status="it-kama" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kama");
    })
    test("input should be displayed in editMode istead of span", () => {
        const component = create(<ProfileStatus status="it-kama" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kama");
    })
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="it-kama" updateStatus={mockCallback} />);
        let instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})
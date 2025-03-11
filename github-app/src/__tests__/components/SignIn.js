import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const mock = jest.fn();
      render(<SignInContainer onSubmit={mock} />);
      const username = await screen.findByTestId("username");
      const password = await screen.findByTestId("password");

      fireEvent.changeText(username, "testi");
      fireEvent.changeText(password, "tomi");

      const submitButton = await screen.findByTestId("submitButton");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mock).toHaveBeenCalledTimes(1);
      });
      expect(mock.mock.calls[0][0]).toEqual({
        username: "testi",
        password: "tomi",
      });
    });
  });
});

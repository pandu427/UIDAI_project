import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SecureDataMask from "./SecureDataMask";

describe("SecureDataMask", () => {
  beforeEach(() => jest.useFakeTimers());

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("renders sensitive data masked by default", () => {
    render(<SecureDataMask value="456712341234" label="Aadhaar number" />);

    expect(screen.getByText("XXXX-XXXX-1234")).toBeInTheDocument();
    expect(screen.queryByText("4567-1234-1234")).not.toBeInTheDocument();
  });

  test("reveals data when clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SecureDataMask value="456712341234" label="Aadhaar number" />);

    await user.click(screen.getByRole("button", { name: /reveal aadhaar number/i }));

    expect(screen.getByText("4567-1234-1234")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Aadhaar number revealed");
  });

  test("automatically masks data after 10 seconds", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SecureDataMask value="456712341234" label="Aadhaar number" />);

    await user.click(screen.getByRole("button", { name: /reveal aadhaar number/i }));
    expect(screen.getByText("4567-1234-1234")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText("XXXX-XXXX-1234")).toBeInTheDocument();
    expect(screen.queryByText("4567-1234-1234")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Aadhaar number is masked");
  });

  test("can manually hide revealed data", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SecureDataMask value="456712341234" label="Aadhaar number" />);

    await user.click(screen.getByRole("button", { name: /reveal aadhaar number/i }));
    await user.click(screen.getByRole("button", { name: /hide aadhaar number/i }));

    expect(screen.getByText("XXXX-XXXX-1234")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/features/auth/login/api/mutation";
import { useRouter } from "next/navigation";
import { renderWithProviders } from "@/test-utils";

jest.mock("@/features/auth/login/api/mutation");
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => new URLSearchParams()),
}));

test("renders login form", () => {
    // Arrange
    (useLogin as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
    });

    // Act
    //   render(<LoginForm />);
    renderWithProviders(<LoginForm />);

    // Assert
    expect(screen.getByText("Login to your account")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
});

test("user can type email and password", async () => {
    const user = userEvent.setup();

    (useLogin as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
    });

    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@gmail.com");
    await user.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("test@gmail.com");
    expect(passwordInput).toHaveValue("123456");
});

test("submits login form", async () => {
    const user = userEvent.setup();

    const mutateMock = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
        mutate: mutateMock,
        isPending: false,
    });

    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
        push: pushMock,
    });

    renderWithProviders(<LoginForm />);

    // fill form
    await user.type(screen.getByLabelText(/email/i), "test@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    // click login
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    // assert mutation called
    expect(mutateMock).toHaveBeenCalled();
});

test("shows loading state when login pending", () => {
    (useLogin as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
        isPending: true,
    });

    renderWithProviders(<LoginForm />);

    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
});

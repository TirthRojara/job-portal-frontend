import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  test("renders recruiter credentials", () => {

    // Arrange
    render(<Home />);

    // Act
    const recruiterTitle = screen.getByText("Recruiter Id & password");
    const recruiterEmail = screen.getByText("Email: test2@gmail.com");
    const recruiterPasswords = screen.getAllByText("Password: test1234");

    // Assert
    expect(recruiterTitle).toBeInTheDocument();
    expect(recruiterEmail).toBeInTheDocument();
    expect(recruiterPasswords).toHaveLength(2);
  });

  test("renders candidate credentials", () => {

    // Arrange
    render(<Home />);

    // Act
    const candidateTitle = screen.getByText("Candidate Id & password");
    const candidateEmail = screen.getByText("Email: test1@gmail.com");
    const passwords = screen.getAllByText("Password: test1234");

    // Assert
    expect(candidateTitle).toBeInTheDocument();
    expect(candidateEmail).toBeInTheDocument();
    expect(passwords).toHaveLength(2);
  });
});
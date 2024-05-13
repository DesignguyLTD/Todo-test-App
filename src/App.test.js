/* eslint-disable no-undef */
import TodoListManager from "./App";
import { render, fireEvent } from "@testing-library/react";

describe("TodoListManager", () => {
  it("renders an empty todo list", () => {
    const { getByText, getByPlaceholderText } = render(<TodoListManager />);
    expect(getByText("Todo List")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter a new task")).toBeInTheDocument();
    expect(getByText("Add Task")).toBeInTheDocument();
  });

  it("adds a new task to the list", () => {
    const { getByText, getByPlaceholderText } = render(<TodoListManager />);
    const input = getByPlaceholderText("Enter a new task");
    fireEvent.change(input, { target: { value: "New task" } });
    const addTaskButton = getByText("Add Task");
    fireEvent.click(addTaskButton);
    expect(getByText("New task")).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    const { getByText, getByPlaceholderText } = render(<TodoListManager />);
    const input = getByPlaceholderText("Enter a new task");
    fireEvent.change(input, { target: { value: "New task" } });
    const addTaskButton = getByText("Add Task");
    fireEvent.click(addTaskButton);
    const taskCheckbox = getByText("New task").previousSibling;
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox.checked).toBe(true);
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox.checked).toBe(false);
  });

  it("toggles task priority", () => {
    const { getByText, getByPlaceholderText } = render(<TodoListManager />);
    const input = getByPlaceholderText("Enter a new task");
    fireEvent.change(input, { target: { value: "New task" } });
    const addTaskButton = getByText("Add Task");
    fireEvent.click(addTaskButton);

    // After adding task
    const taskPriorityButton = getByText("Normal Priority");
    // Change task priority to high and then check if fontWeight is bold
    fireEvent.click(taskPriorityButton);
    const content = document.getElementById("task_1");
    let getContentStyle = window.getComputedStyle(content);
    expect(getContentStyle.fontWeight).toBe("bold");

    // Change task priority to low and check if it's default priority is normal
    fireEvent.click(taskPriorityButton);
    getContentStyle = window.getComputedStyle(content);
    expect(getContentStyle.fontWeight).toBe("normal");
  });

  it("deletes a task", () => {
    const { getByText, getByPlaceholderText } = render(<TodoListManager />);
    const input = getByPlaceholderText("Enter a new task");
    fireEvent.change(input, { target: { value: "New task" } });
    const addTaskButton = getByText("Add Task");
    fireEvent.click(addTaskButton);
    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);
    expect(getByText("Add Task")).toBeInTheDocument();
  });
});

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import WorkoutSet from "../WorkoutSet";

const set = { weight: 10, reps: 12, setId: "anything" };

describe("ExceriseSets component", () => {
  it("calls updateSet when an input is changed", () => {
    const updateSet = jest.fn();
    const deleteSet = jest.fn();

    render(
      <WorkoutSet
        set={set}
        exerciseName="pushup"
        updateSet={updateSet}
        deleteSet={deleteSet}
      />
    );

    const weight = screen.getByLabelText("Weight") as HTMLInputElement;
    const reps = screen.getByLabelText("Reps") as HTMLInputElement;
    fireEvent.change(weight, { target: { value: 12 } });
    fireEvent.change(reps, { target: { value: 10 } });

    expect(updateSet).toHaveBeenCalledTimes(2);
  });

  it("calls deleteSet when the delete button is clicked", () => {
    const updateSet = jest.fn();
    const deleteSet = jest.fn();

    const { container } = render(
      <WorkoutSet
        set={set}
        exerciseName="pushup"
        updateSet={updateSet}
        deleteSet={deleteSet}
      />
    );

    const deleteButton = container.querySelector(
      '[aria-label="delete set"]'
    ) as HTMLButtonElement;
    fireEvent.click(deleteButton);

    expect(deleteSet).toHaveBeenCalled();
  });
});

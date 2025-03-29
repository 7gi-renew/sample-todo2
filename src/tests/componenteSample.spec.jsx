import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Information } from "../components/Information";
import { RecordArea } from "../components/RecordArea";

const user = userEvent.setup();

describe("Title Test", () => {
  test("タイトルが表示されている", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧");
  });

  test("登録ボタンを押した時に数が1つ増えている", async () => {
    render(<App />);

    const nameForm = screen.getByTestId("name-form");
    const timeForm = screen.getByTestId("time-form");

    await userEvent.type(nameForm, "テスト課題1");
    await userEvent.type(timeForm, "16");

    await waitFor(() => {
      const register = screen.getByTestId("register");
      userEvent.click(register);
    });

    await waitFor(() => {
      const itemParent = screen.getByTestId("itemParent");
      const lastItem = itemParent.lastElementChild;
      const lastItemText = lastItem.querySelector("p");

      expect(lastItemText).toHaveTextContent("テスト課題1 16時間");
    });
  });

  test("削除ボタンを押すと今入れたアイテムが消える", async () => {
    render(<App />);

    await waitFor(() => {
      const itemParent = screen.getByTestId("itemParent");
      const itemDeleteButton = itemParent.lastElementChild.querySelector("button");

      userEvent.click(itemDeleteButton);
    });

    await waitFor(() => {
      // expect(screen.getByTestId("assignment")).toHaveTextContent("14");
      expect(screen.queryByText("16時間")).not.toBeInTheDocument();
    });
  });

  test("削除ボタンを押すと今入れたアイテムが消える", async () => {
    render(<App />);

    await waitFor(() => {
      const itemParent = screen.getByTestId("itemParent");
      const itemDeleteButton = itemParent.lastElementChild.querySelector("button");

      userEvent.click(itemDeleteButton);
    });

    await waitFor(() => {
      expect(screen.queryByText("16時間")).not.toBeInTheDocument();
    });
  });

  test("空データでボタンを押すと「入力されていない項目があります」を返す", async () => {
    render(<App />);

    await waitFor(() => {
      const register = screen.getByTestId("register");
      userEvent.click(register);
    });

    await waitFor(() => {
      expect(screen.getByText("入力されていない項目があります")).toBeInTheDocument();
    });
  });
});

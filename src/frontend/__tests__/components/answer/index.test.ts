import { contentsToString } from "../../../components/answer/AnswerPage";

test("contentsToString0", () => {
  expect(contentsToString([], {}, [], [])).toBe("");
});

test("contentsToString1", () => {
  expect(
    contentsToString(
      [
        { type: "normal", id: 0, value: "hog-hog" },
        { type: "tag", id: 0, value: 1 },
        { type: "newLine", id: 0, value: "" },
        { type: "area", id: 0, value: "00000" }
      ],
      {
        "00000": {
          branchId: 0,
          questionId: 2,
          contents: [{ type: "normal", id: 0, value: "hog-hog" }]
        }
      },
      [
        {
          id: 1,
          asking: "",
          ex: "",
          label: "",
          childElements: [],
          type: "normal"
        },
        {
          id: 2,
          asking: "",
          ex: "",
          label: "",
          childElements: [
            {
              id: 0,
              asking: ""
            }
          ],
          type: "branch"
        }
      ],
      [
        { id: 1, value: "-yoy" },
        { id: 2, value: 0 }
      ]
    )
  ).toBe("hog-hog-yoy\nhog-hog");
});

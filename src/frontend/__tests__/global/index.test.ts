import {
  getAreaId,
  doNewLineFormat,
  createTemplate,
  foundNearTag,
  findInputTag,
  findBranchTag
} from "../../global";

test("getAreaId", () => {
  expect(
    getAreaId({
      "00001": { questionId: 3, branchId: 3, contents: [] },
      "00010": { questionId: 3, branchId: 3, contents: [] },
      "00005": { questionId: 3, branchId: 3, contents: [] }
    })
  ).toBe("00011");
});

// ______________________________________________________
//

test("doNewLineFormat", () => {
  expect(
    doNewLineFormat([{ id: 0, type: "normal", value: "梶原で\nすよ" }])
  ).toStrictEqual([
    { id: 0, type: "normal", value: "梶原で" },
    {
      id: 0,
      type: "newLine",
      value: "\n"
    },
    {
      id: 0,
      type: "normal",
      value: "すよ"
    }
  ]);
});
test("doNewLineFormat1", () => {
  expect(
    doNewLineFormat([{ id: 0, type: "normal", value: "梶原で\n\nすよ" }])
  ).toStrictEqual([
    { id: 0, type: "normal", value: "梶原で" },
    {
      id: 0,
      type: "newLine",
      value: "\n"
    },
    {
      id: 0,
      type: "normal",
      value: ""
    },
    {
      id: 0,
      type: "newLine",
      value: "\n"
    },
    {
      id: 0,
      type: "normal",
      value: "すよ"
    }
  ]);
});
test("doNewLineFormat2", () => {
  expect(
    doNewLineFormat([{ id: 0, type: "normal", value: "梶原で\n\nすよ" }])
  ).toStrictEqual([
    { id: 0, type: "normal", value: "梶原で" },
    {
      id: 0,
      type: "newLine",
      value: "\n"
    },
    {
      id: 0,
      type: "normal",
      value: ""
    },
    {
      id: 0,
      type: "newLine",
      value: "\n"
    },
    {
      id: 0,
      type: "normal",
      value: "すよ"
    }
  ]);
});

// ______________________________________________________
//

test("createTemplate0", () => {
  expect(createTemplate("梶原牽制\nYahoo", {}, [])).toStrictEqual({
    areas: {},
    contents: [
      {
        id: 0,
        type: "normal",
        value: "梶原牽制"
      },
      {
        id: 0,
        type: "newLine",
        value: "\n"
      },
      {
        id: 0,
        type: "normal",
        value: "Yahoo"
      }
    ]
  });
});
test("createTemplate1", () => {
  expect(
    createTemplate("梶原牽制\nYahoo{#tag0}", {}, [
      {
        id: 0,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag0"
      }
    ])
  ).toStrictEqual({
    areas: {},
    contents: [
      {
        id: 0,
        type: "normal",
        value: "梶原牽制"
      },
      {
        id: 0,
        type: "newLine",
        value: "\n"
      },
      {
        id: 0,
        type: "normal",
        value: "Yahoo"
      },
      {
        id: 0,
        type: "tag",
        value: 0
      }
    ]
  });
});
test("createTemplate2", () => {
  expect(
    createTemplate("梶原牽制\nY{#tag0}Yahoo{#tag1}", {}, [
      {
        id: 0,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag0"
      },
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag1"
      }
    ])
  ).toStrictEqual({
    areas: {},
    contents: [
      {
        id: 0,
        type: "normal",
        value: "梶原牽制"
      },
      {
        id: 0,
        type: "newLine",
        value: "\n"
      },
      {
        id: 0,
        type: "normal",
        value: "Y"
      },
      {
        id: 0,
        type: "tag",
        value: 0
      },
      {
        id: 0,
        type: "normal",
        value: "Yahoo"
      },
      {
        id: 0,
        type: "tag",
        value: 1
      }
    ]
  });
});
test("createTemplate3", () => {
  expect(
    createTemplate(
      "梶原牽制{tag3|#0{thunk}}{tag3|#0{thunk}}\nY{#tag0}Yahoo{#tag1}",
      {},
      [
        {
          id: 0,
          type: "normal",
          asking: "",
          ex: "",
          childElements: [],
          label: "tag0"
        },
        {
          id: 1,
          type: "normal",
          asking: "",
          ex: "",
          childElements: [],
          label: "tag1"
        },
        {
          id: 3,
          type: "branch",
          asking: "",
          ex: "",
          childElements: [{ id: 0, asking: "" }],
          label: "tag3"
        }
      ]
    )
  ).toStrictEqual({
    areas: {
      "00000": {
        branchId: 0,
        contents: [
          {
            id: 0,
            type: "normal",
            value: "thunk"
          }
        ],
        questionId: 3
      },
      "00001": {
        branchId: 0,
        contents: [
          {
            id: 0,
            type: "normal",
            value: "thunk"
          }
        ],
        questionId: 3
      }
    },
    contents: [
      {
        id: 0,
        type: "normal",
        value: "梶原牽制"
      },
      {
        id: 0,
        type: "area",
        value: "00000"
      },
      {
        id: 0,
        type: "area",
        value: "00001"
      },
      {
        id: 0,
        type: "newLine",
        value: "\n"
      },
      {
        id: 0,
        type: "normal",
        value: "Y"
      },
      {
        id: 0,
        type: "tag",
        value: 0
      },
      {
        id: 0,
        type: "normal",
        value: "Yahoo"
      },
      {
        id: 0,
        type: "tag",
        value: 1
      }
    ]
  });
});

// ______________________________________________________
//

test("foundNearTag0", () => {
  expect(
    foundNearTag("ホゲホゲです{#tag1}", {}, [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag"
      }
    ])
  ).toStrictEqual(-1);
});

test("foundNearTag1", () => {
  expect(
    foundNearTag("ホゲホゲです{#tag1}", {}, [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag1"
      }
    ])
  ).toStrictEqual({
    end: 13,
    questionId: 1,
    start: 6,
    type: "normal"
  });
});

test("foundNearTag2", () => {
  expect(
    foundNearTag("ホゲホゲです{#tag2}{#tag1}", {}, [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag1"
      },
      {
        id: 2,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag2"
      }
    ])
  ).toStrictEqual({
    end: 13,
    questionId: 2,
    start: 6,
    type: "normal"
  });
});
test("foundNearTag3", () => {
  expect(
    foundNearTag("ホゲホゲです{tag3|#0{thunk}}", {}, [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag1"
      },
      {
        id: 2,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag2"
      },
      {
        id: 3,
        type: "branch",
        asking: "",
        ex: "",
        childElements: [{ id: 0, asking: "" }],
        label: "tag3"
      }
    ])
  ).toStrictEqual({
    afterString: "",
    beforeString: "ホゲホゲです",
    childId: 0,
    end: 16,
    questionId: 3,
    start: 6,
    value: "thunk",
    type: "branch"
  });
});
test("foundNearTag4", () => {
  expect(
    foundNearTag("ホゲホゲです{#tag2}{tag3|#0{thunk}}", {}, [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag1"
      },
      {
        id: 2,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag2"
      },
      {
        id: 3,
        type: "branch",
        asking: "",
        ex: "",
        childElements: [{ id: 0, asking: "" }],
        label: "tag3"
      }
    ])
  ).toStrictEqual({
    end: 13,
    questionId: 2,
    start: 6,
    type: "normal"
  });
});

// ______________________________________________________
//

test("findInputTag0", () => {
  expect(
    findInputTag("ホゲホゲです{#tag2}{#tag1}", [
      {
        id: 1,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag11"
      },
      {
        id: 2,
        type: "normal",
        asking: "",
        ex: "",
        childElements: [],
        label: "tag"
      }
    ])
  ).toStrictEqual(-1);
});

// ______________________________________________________
//

test("findBranchTag0", () => {
  expect(
    findBranchTag(
      "ホゲホゲです{#tag2}{#tag1}{tag3|#0{{#tag1}{tag3|#0{{#tag1}thunk}}thunk}}",
      [
        {
          id: 1,
          type: "normal",
          asking: "",
          ex: "",
          childElements: [],
          label: "tag11"
        },
        {
          id: 2,
          type: "normal",
          asking: "",
          ex: "",
          childElements: [],
          label: "tag"
        },
        {
          id: 3,
          type: "branch",
          asking: "",
          ex: "",
          childElements: [{ id: 0, asking: "" }],
          label: "tag3"
        }
      ]
    )
  ).toStrictEqual({
    afterString: "",
    beforeString: "ホゲホゲです{#tag2}{#tag1}",
    childId: 0,
    end: 46,
    questionId: 3,
    start: 20,
    type: "branch",
    value: "{#tag1}{tag3|#0{{#tag1}thunk}}thunk"
  });
});

import { areasType, templateContents } from "../store/template";
import { question } from "../store/questions";

// 文字からタグを見つける
export const createTemplate = (
  editString: string,
  areas: areasType,
  questions: question[]
) => {
  let _editString = editString;
  let count = 0;
  let _areas: areasType = Object.assign({}, areas);
  let contents: templateContents[] = [];

  while (count++ < 1000) {
    const nearTag = foundNearTag(_editString, areas, questions);
    if (nearTag === -1) {
      if (_editString !== "}}")
        contents.push({ id: 0, type: "normal", value: _editString });
      break;
    }
    if (nearTag.type === "normal") {
      contents = [
        ...contents,
        {
          id: 0,
          value: _editString.slice(0, nearTag.start),
          type: "normal"
        },
        { id: 0, value: nearTag.questionId, type: "tag" }
      ];
      _editString = _editString.slice(nearTag.end);
    } else if (nearTag.type === "branch") {
      const areaContents = createTemplate(nearTag.value, _areas, questions); // 中身をタグ化
      _areas = areaContents.areas;
      const areaId = getAreaId(_areas); // areas の id の取得
      _areas[areaId] = {
        questionId: nearTag.questionId,
        branchId: nearTag.childId,
        contents: areaContents.contents
      };
      contents = [
        ...contents,
        {
          id: 0,
          value: nearTag.beforeString,
          type: "normal"
        },
        { id: 0, value: areaId, type: "area" }
      ];
      _editString = nearTag.afterString;
    } else {
      _editString = "";
    }
  }
  contents = doNewLineFormat(contents);
  contents = deleteEmpty(contents);
  return { contents, areas: _areas };
};

export const foundNearTag = (
  editString: string,
  areas: areasType,
  questions: question[]
) => {
  const inputTag = findInputTag(editString, questions);
  const branchTag = findBranchTag(editString, questions);
  if (inputTag === -1 && branchTag === -1) {
    return -1;
  }
  if (inputTag === -1) {
    return branchTag;
  }
  if (branchTag === -1) {
    return inputTag;
  }

  if (inputTag.start > branchTag.start) {
    return branchTag;
  }
  return inputTag;
};

export const findInputTag = (
  editString: string,
  questions: question[]
): -1 | { start: number; end: number; questionId: number; type: "normal" } => {
  let start = 9999;
  let end,
    questionId = 0;
  questions.forEach(question => {
    if (question.type === "normal") {
      const questionStart = editString.indexOf(`{#${question.label}}`);
      if (questionStart === -1) {
        return;
      }
      if (start > questionStart) {
        start = questionStart;
        end = start + `{#${question.label}}`.length;
        questionId = question.id;
      }
    }
  });
  if (start === 9999) {
    return -1;
  }
  return {
    type: "normal",
    start,
    end,
    questionId
  };
};
export const deleteEmpty = (contents: templateContents[]) => {
  const _contents: templateContents[] = [];
  contents.forEach(content => {
    content.value !== "" && _contents.push(content);
  });
  return _contents;
};
export const findBranchTag = (
  editString: string,
  questions: question[]
):
  | -1
  | {
      start: number;
      questionId: number;
      childId: number;
      value: string;
      end: number;
      type: "branch";
      afterString: string;
      beforeString: string;
    } => {
  let start = 9999;
  let value = "";
  let end,
    childId,
    questionId = 0;
  let beforeString = "";
  let afterString = "";
  questions.forEach(question => {
    if (question.type === "branch") {
      question.childElements.forEach(child => {
        const questionStart = editString.indexOf(
          `{${question.label}|#${child.id}{`
        );
        if (questionStart === -1 || editString.indexOf("}}") === -1) {
          return;
        }
        if (start < questionStart) {
          return;
        }
        const childString = editString.slice(questionStart);
        let childEnd = `{${question.label}|#${child.id}{`.length; // とりあえずのタグの中の開始位置
        let _editString = childString; // content.value を弄るための変数
        let count = 0; // タグの中にあるタグの個数が入る変数
        while (
          count < 500 &&
          (childEnd = (_editString = _editString.slice(childEnd)).indexOf(
            "|#"
          )) !== -1
        ) {
          // 50回以内、|#(分岐タグ)があったら
          if (_editString.indexOf("}}") < childEnd) break; // とじタグが先にあれば抜ける
          childEnd += 3;
          count++;
        }

        let sum = 0; //選択タグの終了位置（ "}}" は含んでいない）
        _editString = childString; // 再初期化
        for (let j = 0; j < count; j++) {
          // 閉じタグの位置の取得
          sum += _editString.indexOf("}}") + 2;

          _editString = _editString.slice(_editString.indexOf("}}") + 2);
        }
        sum += _editString.indexOf("}}"); // 閉じタグの位置の取得

        start = questionStart;
        beforeString = editString.slice(0, start);
        end = sum + 2;
        afterString = editString.slice(end + start);
        value = childString.slice(
          `{${question.label}|#${child.id}{`.length,
          sum
        );
        questionId = question.id;
        childId = child.id;
      });
    }
  });
  if (start === 9999) {
    return -1;
  }

  return {
    type: "branch",
    start,
    questionId,
    value,
    end,
    childId,
    afterString,
    beforeString
  };
};

export const doNewLineFormat = (contents: templateContents[]) => {
  let i = 0;
  while (contents.length > i) {
    const content = contents[i];
    if (content.type === "normal") {
      if (content.value.indexOf("\n") !== -1) {
        const nextValue = content.value;
        const start = content.value.indexOf("\n");
        const end = start + 1;
        contents[i].value = nextValue.slice(0, start);
        contents.splice(
          i + 1,
          0,
          { id: 0, type: "newLine", value: "\n" },
          { id: 0, type: "normal", value: nextValue.slice(end) }
        );
      }
    }
    if (i++ > 500) {
      console.log("error");
      break;
    }
  }
  return contents;
};
export const getAreaId = (areas: areasType) => {
  const array = Object.keys(areas).sort((a, b) =>
    Number(a) < Number(b) ? -1 : 1
  );
  if (array.length === 0) return "00000";
  return `${("00000" + (parseInt(array[array.length - 1]) + 1)).slice(-5)}`;
};

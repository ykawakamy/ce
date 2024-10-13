const { expect } = require("chai");

const dblclick = new MouseEvent("dblclick", {
  bubbles: true,
  cancelable: true,
  view: window,
});

function emulateDoubleClick(sortColumnIdx, innerSelector) {
  let headerElement = root.querySelector(`thead td[data-x="${sortColumnIdx}"]`);
  if (innerSelector) {
    headerElement = headerElement.querySelector(innerSelector);
  }
  headerElement.dispatchEvent(dblclick);
}

describe("header", () => {
  it("sorting", () => {
    let test = jspreadsheet(root, {
      columns: [
        { /* default as type: "text"*/ },
        { type: "text" },
        { type: "number" },
      ],
      data: [
        [5, 6, 7, 8],
        [13, 14, 15, 16],
        [1, 2, 3, 4],
        [9, 10, 11, 12],
      ],
    });

    emulateDoubleClick(0);
    // expected to order by column:0 text asc
    expect(test.headers[0].classList.contains("arrow-down")).to.eql(true);
    expect(test.getData()).to.eql([
      [1, 2, 3, 4],
      [13, 14, 15, 16],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]);

    // same column header
    emulateDoubleClick(0);
    // expected to order by column:0 text desc
    expect(test.headers[0].classList.contains("arrow-down")).to.eql(false);
    expect(test.headers[0].classList.contains("arrow-up")).to.eql(true);
    expect(test.getData()).to.eql([
      [9, 10, 11, 12],
      [5, 6, 7, 8],
      [13, 14, 15, 16],
      [1, 2, 3, 4],
    ]);

    emulateDoubleClick(1);
    // expected to order by column:2 as number asc
    expect(test.headers[1].classList.contains("arrow-down")).to.eql(true);
    expect(test.getData()).to.eql([
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);

    emulateDoubleClick(2);
    // expected to order by column:2 as number asc
    expect(test.headers[2].classList.contains("arrow-down")).to.eql(true);
    expect(test.getData()).to.eql([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
  });

  it("header sorting is not work in HTML Column. #1693", () => {
    let test = jspreadsheet(root, {
      stripHTML: false,
      columns: [
        { title: `<div class="in-header">custom HTML header</div>` },
      ],
      data: [
        [5, 6, 7, 8],
        [13, 14, 15, 16],
        [1, 2, 3, 4],
        [9, 10, 11, 12],
      ],
    });

    // header sorting is not work in HTML Column.
    // see https://github.com/jspreadsheet/ce/issues/1693
    emulateDoubleClick(0, "div.in-header");
    expect(test.headers[0].classList.contains("arrow-down")).to.eql(true);
    expect(test.getData()).to.eql([
      [1, 2, 3, 4],
      [13, 14, 15, 16],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]);

    // double click td header
    emulateDoubleClick(0);
    // expected to order by column:0 text desc
    expect(test.headers[0].classList.contains("arrow-down")).to.eql(false);
    expect(test.headers[0].classList.contains("arrow-up")).to.eql(true);
    expect(test.getData()).to.eql([
      [9, 10, 11, 12],
      [5, 6, 7, 8],
      [13, 14, 15, 16],
      [1, 2, 3, 4],
    ]);
  });

});

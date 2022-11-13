const Lotto = require("../src/Lotto");
const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

// describe("로또 클래스 테스트", () => {
//   test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
//     expect(() => {
//       new Lotto([1, 2, 3, 4, 5, 6, 7]);
//     }).toThrow("[ERROR]");
//   });

//   // TODO: 이 테스트가 통과할 수 있게 구현 코드 작성
//   test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
//     expect(() => {
//       new Lotto([1, 2, 3, 4, 5, 5]);
//     }).toThrow("[ERROR]");
//   });

//   // 아래에 추가 테스트 작성 가능
// });

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpyRandom = () => {
  const logSpyRandom = jest.spyOn(
    MissionUtils.Random,
    "pickUniqueNumbersInRange"
  );
  logSpyRandom.mockClear();
  return logSpyRandom;
};

describe("[기능2] 금액 입력 예외 처리", () => {
  test("[2-1] 1000원 이하로 입력하면 예외가 발생한다.", () => {
    mockQuestions(["900"]);
    expect(() => {
      const app = new App();
      app.play();
    }).toThrow("[ERROR]");
  });
  test("[2-2] 숫자 외 문자를 입력하면 예외가 발생한다.", () => {
    mockQuestions(["300a0"]);
    expect(() => {
      const app = new App();
      app.play();
    }).toThrow("[ERROR]");
  });
  test("[2-3] 1000원 단위가 아니면 예외가 발생한다.", () => {
    mockQuestions(["2400"]);
    expect(() => {
      const app = new App();
      app.play();
    }).toThrow("[ERROR]");
  });
});

describe("[기능4] 랜덤 번호 뽑기 테스트", () => {
  test("", () => {
    const logSpyRandom = jest.spyOn(
      MissionUtils.Random,
      "pickUniqueNumbersInRange"
    );

    mockQuestions(["3000"]);

    const app = new App();
    app.play();

    expect(logSpyRandom).toBeCalledTimes(3);
  });
});

import Parser from "./parser";

const parser = new Parser();

test("test_type_1_and_2", async () => {
  expect.assertions(2);
  const country = { name: "India", dial_code: "+91", code: "IN" };
  const opts = { country: country };
  const io = [
    {
      in: " ds test 33 @testuser.com ",
      out: "test@testuser.com",
    },
    {
      in: " ds test 33 hg@testuser.com ",
      out: "test@testuser.com",
    },
  ];
  const res = await parser.parse(io[0].in, opts);
  expect(res).toEqual({ type: 2, data: "+9133" });
  const res2 = await parser.parse(io[1].in, opts);
  expect(res2).toEqual({ type: 1, data: "hg@testuser.com" });
});

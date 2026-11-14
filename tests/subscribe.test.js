import test from "node:test";
import assert from "node:assert/strict";
import subscribe from "../api/subscribe.js";

const valid = { name: " Sam ", email: "SAM@example.test", consent: true };
const subscriber = { id: 42, email_address: "sam@example.test" };
const json = (body, status = 200) => Response.json(body, { status });

async function request(body = valid, method = "POST") {
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.code = code; return this; },
    json(value) { this.body = value; return this; }
  };
  return subscribe({ body, method }, res);
}

test("validates consent and contact details before contacting Kit", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch");
  for (const body of [
    { ...valid, consent: false },
    { ...valid, email: "invalid" },
    { ...valid, name: "  " },
    { ...valid, website: "bot" }
  ]) {
    assert.equal((await request(body)).code, 400);
  }
  const response = await request(valid, "GET");
  assert.equal(response.code, 405);
  assert.equal(response.headers.Allow, "POST");
  assert.equal(fetch.mock.callCount(), 0);
});

test("fails closed without explicit Kit credentials and destination", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch");
  const previous = [process.env.KIT_API_KEY, process.env.KIT_FORM_ID];
  process.env.KIT_API_KEY = "fixture";
  delete process.env.KIT_FORM_ID;
  try {
    assert.equal((await request()).code, 503);
    assert.equal(fetch.mock.callCount(), 0);
  } finally {
    for (const [i, key] of ["KIT_API_KEY", "KIT_FORM_ID"].entries()) {
      if (previous[i] === undefined) delete process.env[key];
      else process.env[key] = previous[i];
    }
  }
});

test("unlocks only after Kit confirms the intended form and accepts an existing subscriber", async (t) => {
  const previous = [process.env.KIT_API_KEY, process.env.KIT_FORM_ID];
  process.env.KIT_API_KEY = "fixture";
  process.env.KIT_FORM_ID = "1234";
  t.after(() => {
    for (const [i, key] of ["KIT_API_KEY", "KIT_FORM_ID"].entries()) {
      if (previous[i] === undefined) delete process.env[key];
      else process.env[key] = previous[i];
    }
  });
  const replies = [];
  const fetch = t.mock.method(globalThis, "fetch", async () => replies.shift());
  for (const status of [201, 200]) {
    replies.push(json({ subscriber }, status), json({ subscriber }, status));
    const response = await request();
    assert.equal(response.code, 200);
    assert.deepEqual(response.body, { ok: true });
  }
  const [url, options] = fetch.mock.calls[0].arguments;
  assert.equal(url, "https://api.kit.com/v4/subscribers");
  assert.equal(options.redirect, "error");
  assert.deepEqual(JSON.parse(options.body), {
    first_name: "Sam", email_address: "sam@example.test", state: "inactive"
  });
  assert.equal(fetch.mock.calls[1].arguments[0], "https://api.kit.com/v4/forms/1234/subscribers/42");

  for (const failedReply of [
    json({}, 502),
    new Response("<html>Unexpected response</html>"),
    Response.redirect("https://example.test"),
    json({ subscriber: { id: 99 } })
  ]) {
    replies.push(json({ subscriber }), failedReply);
    assert.equal((await request()).code, 502);
  }
});

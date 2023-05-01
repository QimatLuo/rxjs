local Rx = require "lib.rx"


describe("Next", function ()
  describe("EMPTY", function ()
    it("empty", testNext(
      Rx.EMPTY,
      {}
    ))
  end)

  describe("from", function ()
    it("empty", testNext(
      Rx.from({ 3, 'a', true, {} }),
      { 3, 'a', true, {} }
    ))
  end)

  describe("of", function ()
    it("empty", testNext(
      Rx.of(1),
      { 1 }
    ))
  end)

  describe("Operators", function()
    it("map", testNext(
      Rx.of(1).pipe(
        Rx.map(function(x) return x + 2 end),
        Rx.map(function(x) return x * 3 end),
        Rx.map(function(x) return x - 4 end)
      ),
      { 5 }
    ))
  end)
end)

describe("Error", function ()
  describe("throwError", function ()
    before_each(function()
    end)
    it("empty", testError(
      Rx.throwError(function() return 1 end),
      {},
      1
    ))
    it("map", testError(
      Rx.from({ 1, {} }).pipe(
        Rx.map(function(x) return x + 2 end),
        Rx.map(function(x) return x * 3 end),
        Rx.map(function(x) return x - 4 end)
      ),
      { 5 }
    ))
  end)
end)

function testNext(o, called)
  return function()
    local n = spy.new(function() end)
    local e = spy.new(function() end)
    local c = spy.new(function() end)
    o.subscribe({ next = n, error = e, complete = c })
    assert.spy(n).was.called(#called)
    for i, v in ipairs(called) do
      assert.spy(n).was.called_with(v)
    end
    assert.spy(e).was.called(0)
    assert.spy(c).was.called(1)
  end
end

function testError(o, called, throw)
  return function()
    local n = spy.new(function() end)
    local e = spy.new(function() end)
    local c = spy.new(function() end)
    o.subscribe({ next = n, error = e, complete = c })
    assert.spy(n).was.called(#called)
    for i, v in ipairs(called) do
      assert.spy(n).was.called_with(v)
    end
    if (throw) then
      assert.spy(e).was.called_with(throw)
    end
    assert.spy(e).was.called(1)
    assert.spy(c).was.called(0)
  end
end

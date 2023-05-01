function Observable(s)
  return {
    _type = 'Observable',
    pipe = function(...)
      local fs = {...}
      return Observable(function(b)
        s(Observer({
          next = function(v)
            for i, f in ipairs(fs) do
              v = f(v, i)
            end
            local o = Observer(b)
            o.next(v)
          end,
          error = b.error,
          complete = b.complete,
        }))
      end)
    end,
    subscribe = function(o) s(Observer(o)) end
  }
end

function Observer(x)
  local stopped = false
  local e = function(...)
    if (not stopped) then
      stopped = true
      local e = x.error or error;
      e(unpack({...}))
    end
  end
  return {
    _type = 'Observer',
    next = function(v)
      local succ, err = pcall(x.next, v)
      if (not succ) then
        e(err)
      end
    end,
    error = e,
    complete = function()
      if (x.complete and not stopped) then
        stopped = true
        x.complete()
      end
    end,
  }
end

local M = {}

M.EMPTY = Observable(function(s) s.complete() end)

function M.from(xs)
  return Observable(function(s)
    for i, v in ipairs(xs) do
      s.next(v)
    end
    s.complete(x)
  end)
end

function M.of(x)
  return Observable(function(s)
    s.next(x)
    s.complete(x)
    s.complete(x)
  end)
end

function M.throwError(f)
  return Observable(function(s)
    s.error(f())
  end)
end

function M.catchError(f)
  return function(x)
    return f(x)
  end
end

function M.map(f)
  return function(x)
    return f(x)
  end
end

return M

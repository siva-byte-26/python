/* Quick reference cheatsheet, grouped by topic. */

window.CHEATSHEET = [
  {
    title: "Strings",
    code: `s = "Hello"
s.lower()           # "hello"
s.upper()           # "HELLO"
s.strip()           # remove whitespace
s.split(",")        # split on delimiter
",".join(list)      # join list to string
s.replace("a", "b")
s[::-1]             # reverse
f"hi {name}"        # f-string
str.isdigit()       # all digits
str.isalpha()       # all letters`
  },
  {
    title: "Lists",
    code: `nums = [1, 2, 3]
nums.append(4)
nums.pop()          # remove last
nums.pop(0)         # remove first
nums.insert(0, 99)
nums.sort()         # in place
sorted(nums)        # new list
nums.reverse()
len(nums)
nums[::-1]          # reverse copy
nums[1:3]           # slice
3 in nums           # membership`
  },
  {
    title: "Dictionaries",
    code: `d = {"a": 1, "b": 2}
d["c"] = 3
d.get("z", 0)       # safe access
d.pop("a")
"a" in d            # key check
for k, v in d.items():
    ...
list(d.keys())
list(d.values())
{**d1, **d2}        # merge`
  },
  {
    title: "Sets",
    code: `s = {1, 2, 3}
s.add(4)
s.discard(99)       # no error
s | t               # union
s & t               # intersection
s - t               # difference
s ^ t               # symmetric diff
len(s)
set(list)           # dedupe`
  },
  {
    title: "Loops and ranges",
    code: `for i in range(5):
    ...
for i in range(2, 10, 2):
    ...
for i, x in enumerate(items):
    ...
for a, b in zip(list1, list2):
    ...
while cond:
    ...
break; continue
for ... else:       # runs if no break`
  },
  {
    title: "Comprehensions",
    code: `[n*n for n in range(5)]
[n for n in nums if n > 0]
{n: n*n for n in nums}
{n for n in nums}
sum(n*n for n in nums)   # generator
[[r[i] for r in m] for i in range(3)]   # transpose`
  },
  {
    title: "Functions",
    code: `def fn(a, b=1, *args, **kwargs):
    return a + b

# type hints
def add(a: int, b: int) -> int:
    return a + b

# lambda
square = lambda x: x*x

# unpack into args
fn(*[1, 2])
fn(**{"a": 1, "b": 2})`
  },
  {
    title: "Classes",
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Dog({self.name})"

class Puppy(Dog):
    def __init__(self, name, owner):
        super().__init__(name)
        self.owner = owner

from dataclasses import dataclass
@dataclass
class User:
    name: str
    age: int = 0`
  },
  {
    title: "Exceptions",
    code: `try:
    risky()
except ValueError as e:
    print(e)
except (TypeError, KeyError):
    pass
else:
    print("no error")
finally:
    cleanup()

raise ValueError("bad input")

class MyError(Exception):
    pass`
  },
  {
    title: "File I/O",
    code: `with open("data.txt") as f:
    text = f.read()

with open("data.txt") as f:
    for line in f:
        print(line.rstrip())

with open("out.txt", "w") as f:
    f.write("hi\\n")

import json
json.dumps(obj)
json.loads(s)`
  },
  {
    title: "Useful built-ins",
    code: `len(x); min(x); max(x); sum(x)
abs(-5); round(3.14, 2)
sorted(x); reversed(x)
zip(a, b); enumerate(x)
map(fn, x); filter(fn, x)
any(iter); all(iter)
type(x); isinstance(x, list)
int(x); float(x); str(x); bool(x)
print(*args, sep=" ", end="\\n")`
  },
  {
    title: "Collections module",
    code: `from collections import (
    Counter, defaultdict, deque, OrderedDict
)

Counter("abca")            # {'a': 2, ...}
Counter(list).most_common(3)

dd = defaultdict(list)
dd["k"].append(1)

q = deque([1, 2, 3])
q.append(4); q.appendleft(0)
q.pop(); q.popleft()`
  }
];

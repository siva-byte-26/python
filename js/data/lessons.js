/* PyQuest lessons.
   Each lesson is sequential. Higher lessons unlock once the previous is complete.
   Content uses simple HTML; the renderer trusts these strings. */

window.LESSONS = [
  /* =============== WEEK 1: Foundations =============== */
  {
    id: "w1-l1",
    week: 1,
    title: "Hello, Python",
    blurb: "Run your first program and feel the syntax difference.",
    xp: 50,
    minutes: 12,
    content: `
      <h3>The smallest program</h3>
      <p>Python aims to read like English. No semicolons, no class boilerplate to print a line. You execute files with <code>python file.py</code> or open an interactive shell by typing <code>python</code>.</p>
      <pre><code>print("Hello, Python!")</code></pre>

      <h3>Indentation is the syntax</h3>
      <p>There are no curly braces. A consistent indent (four spaces) defines a block. Mixing tabs and spaces will break your code.</p>
      <pre><code>if 5 > 2:
    print("Five is bigger")
    print("Same block")
print("Outside")</code></pre>

      <h3>Comments</h3>
      <pre><code># single line comment
"""
Triple quoted strings work as multi-line
notes or docstrings.
"""</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> in Java you write <code>System.out.println("hi");</code> inside a <code>main</code> method inside a class. In Python the whole program can be one line in one file. You also drop the semicolons and the type declarations.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Indentation defines blocks, not braces.</li>
          <li>One file, no boilerplate class needed.</li>
          <li><code>print()</code> auto-adds a newline.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w1-l2",
    week: 1,
    title: "Variables and types",
    blurb: "Dynamic typing, numbers, strings, booleans, None.",
    xp: 50,
    minutes: 15,
    content: `
      <h3>No type declarations</h3>
      <p>Python infers the type at runtime. A name is just a label pointing to a value, and it can point to a different type later.</p>
      <pre><code>age = 22          # int
height = 5.6      # float
name = "Asha"     # str
is_active = True  # bool   (capital T, F)
nothing = None    # like Java's null

age = "twenty"    # totally legal, now it is a str</code></pre>

      <h3>Common types</h3>
      <pre><code>type(42)        # &lt;class 'int'&gt;
type(3.14)      # &lt;class 'float'&gt;
type("hi")      # &lt;class 'str'&gt;
type(True)      # &lt;class 'bool'&gt;
type(None)      # &lt;class 'NoneType'&gt;</code></pre>

      <h3>Casting</h3>
      <pre><code>int("42")     # 42
float("3.14") # 3.14
str(99)       # "99"
bool(0)       # False
bool("")      # False
bool("hi")    # True</code></pre>

      <h3>f-strings (Python's best feature)</h3>
      <pre><code>name = "Asha"
age = 22
print(f"{name} is {age} years old")
print(f"Next year: {age + 1}")
print(f"Pi to 2 places: {3.14159:.2f}")</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> Python booleans are <code>True</code> and <code>False</code>, not lowercase. <code>null</code> becomes <code>None</code>. Integers never overflow, they grow as needed.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>No type declarations, types are inferred.</li>
          <li>Reuse variable names freely, even for different types.</li>
          <li>Reach for f-strings whenever you build a message.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w1-l3",
    week: 1,
    title: "Operators and expressions",
    blurb: "Math, comparisons, logical, identity, membership.",
    xp: 50,
    minutes: 12,
    content: `
      <h3>Arithmetic</h3>
      <pre><code>10 + 3   # 13
10 - 3   # 7
10 * 3   # 30
10 / 3   # 3.3333333333333335   (always float)
10 // 3  # 3                    (integer divide)
10 % 3   # 1                    (modulo)
2 ** 10  # 1024                 (power)</code></pre>

      <h3>Comparison</h3>
      <pre><code>3 == 3     # True
3 != 4     # True
3 &lt; 4      # True
3 &lt;= 3     # True

# Chaining works naturally
age = 25
adult = 18 &lt;= age &lt; 65   # True</code></pre>

      <h3>Logical</h3>
      <pre><code>True and False   # False
True or False    # True
not True         # False

# Falsy values: 0, 0.0, "", [], {}, None
if not items:
    print("List is empty")</code></pre>

      <h3>Identity vs equality</h3>
      <pre><code>a = [1, 2]
b = [1, 2]
c = a

a == b   # True  (same content)
a is b   # False (different objects)
a is c   # True  (same object)

# Always use 'is' with None
x is None
x is not None</code></pre>

      <h3>Membership</h3>
      <pre><code>"py" in "python"      # True
3 in [1, 2, 3]        # True
"name" in {"name": "A"}  # True (checks keys)</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> <code>==</code> in Java compares object identity for non-primitives. In Python <code>==</code> compares value, and <code>is</code> compares identity.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li><code>/</code> is float division, <code>//</code> is integer division.</li>
          <li>Empty containers and zero are falsy. Use that.</li>
          <li><code>x is None</code> over <code>x == None</code>.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w1-l4",
    week: 1,
    title: "Control flow",
    blurb: "if, elif, else, for, while, break, continue.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>if / elif / else</h3>
      <pre><code>score = 78

if score &gt;= 90:
    grade = "A"
elif score &gt;= 75:
    grade = "B"
elif score &gt;= 60:
    grade = "C"
else:
    grade = "F"

print(grade)   # B</code></pre>

      <h3>Ternary</h3>
      <pre><code>tag = "adult" if age &gt;= 18 else "minor"</code></pre>

      <h3>for loop is for-each</h3>
      <pre><code>for fruit in ["apple", "mango", "kiwi"]:
    print(fruit)

# range(stop), range(start, stop), range(start, stop, step)
for i in range(5):       # 0 1 2 3 4
    print(i)

for i in range(2, 8, 2): # 2 4 6
    print(i)</code></pre>

      <h3>enumerate when you need the index</h3>
      <pre><code>for i, fruit in enumerate(["apple", "mango"]):
    print(i, fruit)</code></pre>

      <h3>while</h3>
      <pre><code>n = 5
while n &gt; 0:
    print(n)
    n -= 1   # no n--, Python uses -=</code></pre>

      <h3>break, continue, else</h3>
      <pre><code>for n in range(10):
    if n == 3: continue   # skip
    if n == 7: break      # stop
    print(n)

# else runs if the loop completed without break
for n in nums:
    if n &lt; 0:
        print("found a negative")
        break
else:
    print("all positive")</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> there is no classic <code>for(int i = 0; i &lt; n; i++)</code>. You write <code>for i in range(n):</code>. There is no <code>++</code> or <code>--</code>, use <code>+= 1</code>.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Use <code>range</code> with <code>for</code> for counted loops.</li>
          <li>Reach for <code>enumerate</code> when you need an index.</li>
          <li>The <code>for ... else</code> clause is rare but elegant.</li>
        </ul>
      </div>
    `
  },

  /* =============== WEEK 2: Data structures =============== */
  {
    id: "w2-l1",
    week: 2,
    title: "Strings, deeply",
    blurb: "Slicing, methods, formatting, immutability.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Strings are immutable sequences</h3>
      <pre><code>s = "Python"
s[0]       # 'P'
s[-1]      # 'n'    (negative indexing)
len(s)     # 6

# s[0] = "J"   # TypeError, strings cannot mutate</code></pre>

      <h3>Slicing</h3>
      <pre><code>s = "Python"
s[0:2]   # "Py"   (start inclusive, stop exclusive)
s[2:]    # "thon"
s[:3]    # "Pyt"
s[-3:]   # "hon"
s[::-1]  # "nohtyP"  (reverse)
s[::2]   # "Pto"     (every other)</code></pre>

      <h3>Workhorse methods</h3>
      <pre><code>"  hello  ".strip()           # "hello"
"hello".upper()               # "HELLO"
"HELLO".lower()               # "hello"
"hello".replace("l", "L")     # "heLLo"
"a,b,c".split(",")            # ["a", "b", "c"]
",".join(["a", "b", "c"])     # "a,b,c"
"abc".startswith("ab")        # True
"abc".endswith("c")           # True
"abc".find("b")               # 1   (-1 if missing)
"123".isdigit()               # True</code></pre>

      <h3>f-strings revisited</h3>
      <pre><code>name = "Asha"
items = 3
total = 199.5

print(f"{name} bought {items} items for {total:.2f}")
print(f"{name=}")           # "name='Asha'"  (great for debugging)
print(f"{'.':*&lt;20}")        # "*******************"</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> Java strings are also immutable. Python adds slicing, negative indexing, and built-in reverse, which is the main upgrade you will notice.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Slicing syntax <code>[start:stop:step]</code> applies to lists and tuples too.</li>
          <li><code>"sep".join(list)</code> is the idiomatic way to build a string from a list.</li>
          <li><code>strip</code>, <code>split</code>, <code>join</code> handle 80 percent of real-world string work.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w2-l2",
    week: 2,
    title: "Lists",
    blurb: "Python's ArrayList. Mutable, ordered, mixed types.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Creating and indexing</h3>
      <pre><code>nums = [10, 20, 30, 40]
mixed = [1, "two", 3.0, True]    # allowed
empty = []

nums[0]    # 10
nums[-1]   # 40
nums[1:3]  # [20, 30]</code></pre>

      <h3>Mutating</h3>
      <pre><code>nums.append(50)         # add at end
nums.insert(0, 5)       # insert at index 0
nums.pop()              # remove and return last
nums.pop(0)             # remove and return index 0
nums.remove(20)         # remove first occurrence of value
del nums[0]             # delete by index
nums.extend([60, 70])   # append many
nums.clear()            # empty it</code></pre>

      <h3>Searching and sorting</h3>
      <pre><code>nums = [3, 1, 4, 1, 5, 9, 2]
nums.sort()             # in place,  [1, 1, 2, 3, 4, 5, 9]
nums.sort(reverse=True) # descending
sorted_copy = sorted(nums)   # returns a new list
nums.reverse()
3 in nums               # True
nums.count(1)           # 2
nums.index(4)           # 2</code></pre>

      <h3>Beware: assignment is by reference</h3>
      <pre><code>a = [1, 2, 3]
b = a
b.append(4)
print(a)   # [1, 2, 3, 4]   surprise

# Copy with slice or list()
c = a[:]
d = list(a)</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> a Python list is roughly Java's <code>ArrayList</code>. Indexing is identical. Negative indices and slicing are the new tools.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li><code>sort</code> mutates, <code>sorted</code> returns a new list.</li>
          <li>Always remember references when copying lists.</li>
          <li><code>append</code>, <code>pop</code>, <code>extend</code> are O(1) at the end.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w2-l3",
    week: 2,
    title: "Tuples and sets",
    blurb: "Immutable groups and unique collections.",
    xp: 50,
    minutes: 14,
    content: `
      <h3>Tuples: immutable lists</h3>
      <pre><code>point = (3, 4)
single = (5,)        # comma is required
empty = ()

x, y = point         # unpacking
a, b, c = 1, 2, 3
a, b = b, a          # classic swap, no temp variable</code></pre>

      <p>Tuples are common as dict keys, function return values, and as records.</p>

      <h3>Sets: unique items, fast membership</h3>
      <pre><code>s = {1, 2, 3, 3}    # {1, 2, 3}
empty = set()        # NOT {}, that is a dict

s.add(4)
s.remove(2)          # KeyError if missing
s.discard(99)        # safe, no error

# Set algebra
a = {1, 2, 3}
b = {2, 3, 4}
a | b   # union           {1, 2, 3, 4}
a & b   # intersection    {2, 3}
a - b   # difference      {1}
a ^ b   # symmetric diff  {1, 4}</code></pre>

      <h3>When to reach for a set</h3>
      <ul>
        <li>Removing duplicates: <code>list(set(nums))</code></li>
        <li>Fast <code>in</code> check (O(1) instead of O(n))</li>
        <li>Finding overlaps between two collections</li>
      </ul>

      <div class="java-cmp">
        <strong>From Java:</strong> tuples are like records, sets are like <code>HashSet</code>. The literal syntax with curly braces is the new piece.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Tuples for fixed records, lists for collections that grow.</li>
          <li><code>{}</code> creates a dict. Use <code>set()</code> for an empty set.</li>
          <li>Sets are O(1) lookup, perfect for "have I seen this" loops.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w2-l4",
    week: 2,
    title: "Dictionaries",
    blurb: "Hash maps with first class syntax.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Create and access</h3>
      <pre><code>user = {
    "name": "Asha",
    "age": 22,
    "skills": ["java", "python"]
}

user["name"]                 # "Asha"
user.get("city")             # None, no error
user.get("city", "unknown")  # "unknown"</code></pre>

      <h3>Mutate</h3>
      <pre><code>user["city"] = "Bangalore"   # add or update
del user["age"]              # remove
user.pop("name")             # remove and return
user.update({"role": "dev"}) # merge</code></pre>

      <h3>Iteration patterns</h3>
      <pre><code>for key in user:                 # keys
    print(key)

for value in user.values():
    print(value)

for k, v in user.items():        # most common
    print(k, "=", v)</code></pre>

      <h3>Counting with dict</h3>
      <pre><code>text = "abracadabra"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)   # {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}

# Or the easy way
from collections import Counter
Counter(text)   # same thing in one line</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> a Python dict is a <code>HashMap</code>. Big upgrade: literal syntax, no generics noise, ordered insertion since Python 3.7.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Prefer <code>.get(key, default)</code> over <code>if key in d</code> checks.</li>
          <li>Loop with <code>.items()</code> when you need both key and value.</li>
          <li><code>collections.Counter</code> beats manual counting.</li>
        </ul>
      </div>
    `
  },

  /* =============== WEEK 3: Functions and OOP =============== */
  {
    id: "w3-l1",
    week: 3,
    title: "Functions",
    blurb: "def, return, default args, keyword args, *args, **kwargs.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Defining functions</h3>
      <pre><code>def greet(name):
    return f"Hello, {name}"

print(greet("Asha"))</code></pre>

      <h3>Default and keyword arguments</h3>
      <pre><code>def power(base, exp=2):
    return base ** exp

power(5)            # 25
power(5, 3)         # 125
power(exp=4, base=2) # 16    (any order with names)</code></pre>

      <h3>Multiple return values</h3>
      <pre><code>def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([3, 1, 4, 1, 5])</code></pre>

      <h3>*args and **kwargs</h3>
      <pre><code>def add(*nums):            # tuple of positional args
    return sum(nums)

add(1, 2, 3, 4)            # 10

def show(**info):          # dict of keyword args
    for k, v in info.items():
        print(k, v)

show(name="Asha", age=22)</code></pre>

      <h3>Type hints (optional but useful)</h3>
      <pre><code>def add(a: int, b: int) -&gt; int:
    return a + b</code></pre>

      <p>Hints are not enforced at runtime, they help editors and readers.</p>

      <h3>Watch out: mutable default arguments</h3>
      <pre><code># DANGER: the default list is shared between calls
def add_to(item, bucket=[]):
    bucket.append(item)
    return bucket

# SAFE pattern
def add_to(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> Python has no method overloading. Use default arguments or <code>*args</code> instead. Type hints look like generics but are not enforced.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Default mutable arguments are a famous trap.</li>
          <li>Keyword arguments are great for readability.</li>
          <li>Return a tuple for "multiple return values".</li>
        </ul>
      </div>
    `
  },

  {
    id: "w3-l2",
    week: 3,
    title: "Lambdas, map, filter",
    blurb: "Small anonymous functions and functional helpers.",
    xp: 50,
    minutes: 12,
    content: `
      <h3>Lambdas: one-line functions</h3>
      <pre><code>square = lambda x: x * x
square(5)           # 25

# Mostly used inline as a callback
nums = [3, 1, 4, 1, 5]
sorted(nums, key=lambda n: -n)   # [5, 4, 3, 1, 1]</code></pre>

      <h3>map, filter, sum</h3>
      <pre><code>nums = [1, 2, 3, 4]

list(map(lambda n: n * 2, nums))      # [2, 4, 6, 8]
list(filter(lambda n: n % 2 == 0, nums))  # [2, 4]
sum(nums)                             # 10
sum(nums, start=100)                  # 110</code></pre>

      <h3>sorting by key</h3>
      <pre><code>users = [{"name": "Asha", "age": 22}, {"name": "Bo", "age": 19}]
sorted(users, key=lambda u: u["age"])
# [{'name': 'Bo', 'age': 19}, {'name': 'Asha', 'age': 22}]</code></pre>

      <h3>any and all</h3>
      <pre><code>nums = [1, 2, 3, 4]
all(n &gt; 0 for n in nums)   # True
any(n &gt; 3 for n in nums)   # True</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> these are like <code>Stream</code> operations. The chain is less elegant but very practical. Often a list comprehension reads better than <code>map</code> + lambda.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Use lambda only when it stays on one line.</li>
          <li><code>key=...</code> is the most common use of lambda.</li>
          <li>For longer logic, just define a real function.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w3-l3",
    week: 3,
    title: "Classes and OOP",
    blurb: "self, __init__, methods, attributes.",
    xp: 50,
    minutes: 20,
    content: `
      <h3>A simple class</h3>
      <pre><code>class Dog:
    species = "Canis familiaris"   # class attribute

    def __init__(self, name, age):
        self.name = name           # instance attribute
        self.age = age

    def bark(self):
        return f"{self.name} says woof"

d = Dog("Rex", 3)
print(d.bark())</code></pre>

      <h3>self is just a convention</h3>
      <p>Methods take an explicit first parameter referencing the instance. Python calls <code>d.bark()</code> the same as <code>Dog.bark(d)</code>.</p>

      <h3>String representation</h3>
      <pre><code>class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p = Point(1, 2)
print(p)          # Point(1, 2)</code></pre>

      <h3>Properties (getters and setters that look like attributes)</h3>
      <pre><code>class Circle:
    def __init__(self, r):
        self._r = r

    @property
    def area(self):
        return 3.14159 * self._r ** 2

c = Circle(5)
c.area     # 78.539... no parentheses needed</code></pre>

      <h3>Dataclasses, the modern shortcut</h3>
      <pre><code>from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    role: str = "user"

u = User("Asha", 22)
print(u)   # User(name='Asha', age=22, role='user')</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> no <code>private</code>, <code>protected</code>, <code>public</code>. A leading underscore (<code>_name</code>) signals "internal". Dataclasses kill the boilerplate of getters, setters, and <code>toString</code>.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li><code>__init__</code> is the constructor, <code>self</code> is the instance.</li>
          <li><code>__repr__</code> beats <code>print(obj)</code> showing memory addresses.</li>
          <li>Reach for <code>@dataclass</code> for plain data carriers.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w3-l4",
    week: 3,
    title: "Inheritance and magic methods",
    blurb: "Subclassing and operator overloading basics.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Single inheritance</h3>
      <pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "generic noise"

class Dog(Animal):
    def speak(self):
        return f"{self.name}: woof"

class Puppy(Dog):
    def __init__(self, name, owner):
        super().__init__(name)
        self.owner = owner

p = Puppy("Rex", "Asha")
print(p.speak())</code></pre>

      <h3>isinstance and issubclass</h3>
      <pre><code>isinstance(p, Dog)        # True
isinstance(p, Animal)     # True
issubclass(Dog, Animal)   # True</code></pre>

      <h3>Useful magic methods</h3>
      <pre><code>class Money:
    def __init__(self, amount):
        self.amount = amount

    def __repr__(self):
        return f"&#36;{self.amount}"

    def __add__(self, other):
        return Money(self.amount + other.amount)

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount &lt; other.amount

a = Money(10)
b = Money(15)
print(a + b)   # $25
print(a &lt; b)   # True</code></pre>

      <h3>Multiple inheritance: be careful</h3>
      <p>Python supports it. The Method Resolution Order picks which parent's method runs. For your first month, prefer composition.</p>

      <div class="java-cmp">
        <strong>From Java:</strong> Python supports operator overloading, Java does not. <code>super()</code> works similarly. There is no <code>interface</code> keyword, but abstract base classes serve that role.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li><code>super().__init__(...)</code> initializes the parent.</li>
          <li>Magic methods like <code>__add__</code> let your class behave like a built-in.</li>
          <li>Prefer composition over deep inheritance trees.</li>
        </ul>
      </div>
    `
  },

  /* =============== WEEK 4: Pythonic patterns =============== */
  {
    id: "w4-l1",
    week: 4,
    title: "Exceptions and file I/O",
    blurb: "try, except, finally, with, reading and writing files.",
    xp: 50,
    minutes: 18,
    content: `
      <h3>Catching exceptions</h3>
      <pre><code>try:
    n = int(input("Enter a number: "))
    result = 100 / n
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Unexpected: {e}")
else:
    print(f"Got {result}")
finally:
    print("Done")</code></pre>

      <h3>Raising</h3>
      <pre><code>def withdraw(balance, amount):
    if amount &gt; balance:
        raise ValueError("insufficient funds")
    return balance - amount</code></pre>

      <h3>Custom exceptions</h3>
      <pre><code>class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("balance too low")</code></pre>

      <h3>Files: always use 'with'</h3>
      <pre><code>with open("data.txt", "r") as f:
    content = f.read()             # whole file as string

with open("data.txt") as f:
    for line in f:                 # memory friendly
        print(line.rstrip())

with open("out.txt", "w") as f:
    f.write("Hello\\n")
    f.write("World\\n")</code></pre>

      <p>The <code>with</code> block auto-closes the file even if an exception is raised. Modes: <code>"r"</code> read, <code>"w"</code> write (truncates), <code>"a"</code> append, <code>"r+"</code> read and write.</p>

      <h3>JSON in two lines</h3>
      <pre><code>import json

with open("user.json", "w") as f:
    json.dump({"name": "Asha"}, f)

with open("user.json") as f:
    user = json.load(f)</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> <code>with</code> is the try-with-resources equivalent. No checked exceptions, the compiler does not force you to handle them.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Catch the specific exception you expect, not bare <code>except:</code>.</li>
          <li>Always use <code>with</code> for files.</li>
          <li><code>json.load</code> and <code>json.dump</code> handle 99 percent of config files.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w4-l2",
    week: 4,
    title: "Modules and packages",
    blurb: "import, from, your own modules, pip basics.",
    xp: 50,
    minutes: 14,
    content: `
      <h3>Imports</h3>
      <pre><code>import math
math.sqrt(16)        # 4.0

from math import sqrt, pi
sqrt(16)             # 4.0

from math import sqrt as s
s(16)                # 4.0

# Avoid in production
from math import *   # imports everything, pollutes namespace</code></pre>

      <h3>Useful standard library modules</h3>
      <pre><code>import os         # paths, environment
import sys        # interpreter, argv
import json       # JSON
import datetime   # dates
import random     # randomness
import re         # regex
import collections  # Counter, defaultdict, deque
import itertools    # combinations, permutations</code></pre>

      <h3>Your own module</h3>
      <pre><code># file: utils.py
def greet(name):
    return f"hi {name}"

# file: main.py
from utils import greet
print(greet("Asha"))</code></pre>

      <h3>The <code>__name__ == "__main__"</code> idiom</h3>
      <pre><code># In a script you want to run AND import from
def main():
    print("Running directly")

if __name__ == "__main__":
    main()</code></pre>

      <p>This block runs only when the file is executed directly, not when imported by another file.</p>

      <h3>External packages with pip</h3>
      <pre><code># In your terminal:
pip install requests
pip install pandas
pip freeze &gt; requirements.txt
pip install -r requirements.txt</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> like Maven or Gradle. <code>pip</code> is the package manager. Modules map to Java packages, files map to compilation units.
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Prefer <code>from module import name</code> for specific names.</li>
          <li>Use the <code>if __name__ == "__main__":</code> guard in runnable scripts.</li>
          <li>Always pin dependencies with <code>requirements.txt</code>.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w4-l3",
    week: 4,
    title: "Comprehensions",
    blurb: "The most Pythonic syntax you will use daily.",
    xp: 50,
    minutes: 16,
    content: `
      <h3>List comprehension</h3>
      <pre><code># [expression for item in iterable]
squares = [n * n for n in range(6)]
# [0, 1, 4, 9, 16, 25]

# With a filter
evens = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]

# Transform and filter
upper_long = [w.upper() for w in words if len(w) &gt; 3]</code></pre>

      <h3>Dict comprehension</h3>
      <pre><code>squares = {n: n * n for n in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Swap keys and values
inverted = {v: k for k, v in original.items()}</code></pre>

      <h3>Set comprehension</h3>
      <pre><code>unique_lengths = {len(w) for w in words}</code></pre>

      <h3>Generator expression (lazy)</h3>
      <pre><code># Parentheses instead of brackets, computes on demand
total = sum(n * n for n in range(1_000_000))
# Same result as the list version but uses constant memory</code></pre>

      <h3>Nested comprehensions</h3>
      <pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Transpose
T = [[row[i] for row in matrix] for i in range(3)]</code></pre>

      <div class="java-cmp">
        <strong>From Java:</strong> the closest analog is a Stream pipeline. Comprehensions are tighter and read top-to-bottom: "what I want, where it comes from, the filter".
      </div>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Reach for comprehensions whenever a loop builds a list, set, or dict.</li>
          <li>Stop nesting comprehensions when readability drops, fall back to a for loop.</li>
          <li>Use generator expressions for huge or streaming data.</li>
        </ul>
      </div>
    `
  },

  {
    id: "w4-l4",
    week: 4,
    title: "Pythonic patterns",
    blurb: "The idioms that separate beginners from confident devs.",
    xp: 60,
    minutes: 22,
    content: `
      <h3>Truthiness over explicit checks</h3>
      <pre><code># Not Pythonic
if len(items) &gt; 0:
    ...

# Pythonic
if items:
    ...</code></pre>

      <h3>Multiple assignment and unpacking</h3>
      <pre><code>a, b = 1, 2
a, b = b, a                         # swap

first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

for index, value in enumerate(items):
    ...

for k, v in user.items():
    ...

for a, b in zip(list1, list2):
    ...</code></pre>

      <h3>Walrus operator (Python 3.8+)</h3>
      <pre><code>while (line := input()):    # assign and test in one go
    print(line)</code></pre>

      <h3>Defaultdict and Counter</h3>
      <pre><code>from collections import defaultdict, Counter

groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)

Counter("mississippi").most_common(3)
# [('i', 4), ('s', 4), ('p', 2)]</code></pre>

      <h3>Context managers, EAFP, and ternary</h3>
      <pre><code># Easier to Ask Forgiveness than Permission
try:
    value = d[key]
except KeyError:
    value = default

# Often beats checking 'if key in d:' first</code></pre>

      <h3>One-liner tricks worth knowing</h3>
      <pre><code># reverse a list
reversed_nums = nums[::-1]

# count unique
len(set(items))

# find max with custom key
oldest = max(users, key=lambda u: u.age)

# group adjacent duplicates
from itertools import groupby
[(k, list(g)) for k, g in groupby("aaabbcdaa")]
# [('a', ['a','a','a']), ('b', ['b','b']), ...]</code></pre>

      <div class="takeaways">
        <h4>Key takeaways</h4>
        <ul>
          <li>Lean on truthiness, unpacking, and standard library helpers.</li>
          <li>EAFP often beats LBYL (Look Before You Leap).</li>
          <li><code>collections</code> and <code>itertools</code> are gold mines.</li>
        </ul>
      </div>
    `
  }
];

/* PyQuest problems.
   Curated to cover the fundamentals you will see in 90 percent of early Python interviews. */

window.PROBLEMS = [
  /* ============ EASY ============ */
  {
    id: "p1",
    title: "FizzBuzz",
    difficulty: "easy",
    topic: "Control flow",
    statement: "Print numbers 1 to n. Replace multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
    examples: [
      { input: "n = 5", output: "1, 2, Fizz, 4, Buzz" }
    ],
    hints: [
      "Check the 'both' case first, since 15 is divisible by both 3 and 5.",
      "Use the modulo operator <code>%</code>."
    ],
    solution: `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)`,
    explanation: "Check multiples of 15 first because 15 is a multiple of both 3 and 5. Order matters in chained if-elif. Time O(n), space O(1)."
  },

  {
    id: "p2",
    title: "Reverse a string",
    difficulty: "easy",
    topic: "Strings",
    statement: "Given a string s, return the reversed string.",
    examples: [
      { input: 's = "hello"', output: '"olleh"' }
    ],
    hints: ["Python has slicing.", "Try the step parameter."],
    solution: `def reverse(s):
    return s[::-1]`,
    explanation: "Slice <code>[::-1]</code> walks the string backwards. Works on lists and tuples too. O(n) time and space."
  },

  {
    id: "p3",
    title: "Check palindrome",
    difficulty: "easy",
    topic: "Strings",
    statement: "Return True if s reads the same forwards and backwards. Ignore case and non-alphanumeric characters.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "True" },
      { input: 's = "race a car"', output: "False" }
    ],
    hints: ["Filter the string first.", "Compare to its reverse."],
    solution: `def is_palindrome(s):
    cleaned = "".join(ch.lower() for ch in s if ch.isalnum())
    return cleaned == cleaned[::-1]`,
    explanation: "Build the cleaned string with a generator inside <code>join</code>, then compare to its reverse. O(n) time, O(n) space."
  },

  {
    id: "p4",
    title: "Sum of digits",
    difficulty: "easy",
    topic: "Numbers",
    statement: "Given a non-negative integer n, return the sum of its digits.",
    examples: [
      { input: "n = 1234", output: "10" }
    ],
    hints: ["You can convert the int to a string.", "Or use modulo in a loop."],
    solution: `def digit_sum(n):
    return sum(int(d) for d in str(n))

# alternative
def digit_sum_v2(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`,
    explanation: "The string version is shorter; the modulo version is more idiomatic for low-level interviews. Both are O(d) where d is the digit count."
  },

  {
    id: "p5",
    title: "Count vowels",
    difficulty: "easy",
    topic: "Strings",
    statement: "Count the number of vowels in a given string (case insensitive).",
    examples: [
      { input: 's = "Hello World"', output: "3" }
    ],
    hints: ["Sets give O(1) membership checks.", "Use a generator with sum."],
    solution: `def count_vowels(s):
    vowels = set("aeiou")
    return sum(1 for ch in s.lower() if ch in vowels)`,
    explanation: "<code>sum(1 for ...)</code> is a common counting idiom. The set makes the lookup O(1). O(n) time."
  },

  {
    id: "p6",
    title: "Find max in list",
    difficulty: "easy",
    topic: "Lists",
    statement: "Return the maximum number in a list without using max().",
    examples: [
      { input: "[3, 1, 4, 1, 5, 9, 2]", output: "9" }
    ],
    hints: ["Track a running maximum.", "Initialize carefully for empty input."],
    solution: `def find_max(nums):
    if not nums:
        return None
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best`,
    explanation: "Start from the first element, then walk the rest. Returning None on empty input is a defensive habit interviewers like."
  },

  {
    id: "p7",
    title: "Remove duplicates from list",
    difficulty: "easy",
    topic: "Lists",
    statement: "Remove duplicates while preserving the original order.",
    examples: [
      { input: "[3, 1, 3, 2, 1, 4]", output: "[3, 1, 2, 4]" }
    ],
    hints: ["A set tracks 'seen' items in O(1).", "Append to a result list only when unseen."],
    solution: `def dedupe(nums):
    seen = set()
    result = []
    for n in nums:
        if n not in seen:
            seen.add(n)
            result.append(n)
    return result`,
    explanation: "<code>list(set(nums))</code> drops duplicates but loses order. The seen-set pattern preserves first occurrence in O(n)."
  },

  {
    id: "p8",
    title: "Fibonacci sequence",
    difficulty: "easy",
    topic: "Numbers",
    statement: "Return the first n Fibonacci numbers as a list.",
    examples: [
      { input: "n = 7", output: "[0, 1, 1, 2, 3, 5, 8]" }
    ],
    hints: ["Use two variables, no recursion needed.", "Swap with tuple assignment."],
    solution: `def fib(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result`,
    explanation: "Tuple unpacking lets us update both numbers in one step. O(n) time, O(n) space for the list."
  },

  {
    id: "p9",
    title: "Word count",
    difficulty: "easy",
    topic: "Dictionaries",
    statement: "Given a sentence, return a dict mapping each word to its frequency.",
    examples: [
      { input: '"the cat and the dog"', output: "{'the': 2, 'cat': 1, 'and': 1, 'dog': 1}" }
    ],
    hints: ["Split first.", "Counter from collections is a one-liner."],
    solution: `from collections import Counter

def word_count(sentence):
    return dict(Counter(sentence.split()))

# without Counter
def word_count_v2(sentence):
    counts = {}
    for w in sentence.split():
        counts[w] = counts.get(w, 0) + 1
    return counts`,
    explanation: "<code>Counter</code> handles this in one call. The manual version with <code>dict.get(key, 0)</code> is the classic interview answer."
  },

  {
    id: "p10",
    title: "Check anagram",
    difficulty: "easy",
    topic: "Strings",
    statement: "Return True if two strings are anagrams of each other.",
    examples: [
      { input: 'a = "listen", b = "silent"', output: "True" }
    ],
    hints: ["Sorted characters should match.", "Counter is even cleaner."],
    solution: `from collections import Counter

def is_anagram(a, b):
    return Counter(a) == Counter(b)

# sort version
def is_anagram_v2(a, b):
    return sorted(a) == sorted(b)`,
    explanation: "Counter compares in O(n). Sorting is O(n log n). Both are accepted answers."
  },

  /* ============ MEDIUM ============ */
  {
    id: "p11",
    title: "Two sum",
    difficulty: "med",
    topic: "Lists, Dicts",
    statement: "Given a list of integers and a target, return the indices of two numbers that sum to the target. Exactly one solution exists.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]" }
    ],
    hints: [
      "Brute force is O(n^2). Can you do it in one pass?",
      "Store seen values in a dict mapping value to its index.",
      "For each number, check if (target - num) is in the dict."
    ],
    solution: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i`,
    explanation: "Single pass with a dict. For each element we check whether its complement has been seen. O(n) time, O(n) space. This is the most asked question in early interviews."
  },

  {
    id: "p12",
    title: "Group anagrams",
    difficulty: "med",
    topic: "Dictionaries",
    statement: "Given a list of words, group anagrams together.",
    examples: [
      { input: '["eat", "tea", "tan", "ate", "nat", "bat"]', output: '[["eat","tea","ate"], ["tan","nat"], ["bat"]]' }
    ],
    hints: ["Anagrams share the same sorted form.", "Use that as a dict key.", "defaultdict avoids the existence check."],
    solution: `from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        key = "".join(sorted(w))
        groups[key].append(w)
    return list(groups.values())`,
    explanation: "Sort the characters to build a canonical key. <code>defaultdict(list)</code> spares you the existence check. O(n * k log k) where k is word length."
  },

  {
    id: "p13",
    title: "First non-repeating character",
    difficulty: "med",
    topic: "Strings, Dicts",
    statement: "Return the first character that appears only once in the string. Return None if every character repeats.",
    examples: [
      { input: '"swiss"', output: '"w"' }
    ],
    hints: ["Count in one pass.", "Then scan again in original order."],
    solution: `from collections import Counter

def first_unique(s):
    counts = Counter(s)
    for ch in s:
        if counts[ch] == 1:
            return ch
    return None`,
    explanation: "Two linear passes. Using a dict keeps lookups O(1), so the whole thing is O(n)."
  },

  {
    id: "p14",
    title: "Valid parentheses",
    difficulty: "med",
    topic: "Stack",
    statement: "Given a string containing only '(){}[]', return True if every bracket is properly opened and closed.",
    examples: [
      { input: '"([{}])"', output: "True" },
      { input: '"([)]"', output: "False" }
    ],
    hints: ["A list works as a stack.", "Push openers, pop on closers and check match."],
    solution: `def is_valid(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack`,
    explanation: "Classic stack problem. Closing brackets must match the top of the stack. Returning <code>not stack</code> at the end catches unbalanced openers. O(n)."
  },

  {
    id: "p15",
    title: "Move zeros to the end",
    difficulty: "med",
    topic: "Lists",
    statement: "Move all zeros to the end of the list while keeping non-zero order. Modify in place.",
    examples: [
      { input: "[0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" }
    ],
    hints: ["Two pointers.", "One scanner, one write index."],
    solution: `def move_zeros(nums):
    write = 0
    for n in nums:
        if n != 0:
            nums[write] = n
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0
    return nums`,
    explanation: "First pass compacts non-zeros to the front, second pass fills the rest with zero. O(n) time, O(1) extra space."
  },

  {
    id: "p16",
    title: "Best time to buy and sell stock",
    difficulty: "med",
    topic: "Lists",
    statement: "Given prices where prices[i] is the price on day i, return the maximum profit from a single buy and sell. Return 0 if no profit is possible.",
    examples: [
      { input: "[7, 1, 5, 3, 6, 4]", output: "5" }
    ],
    hints: ["Track the cheapest price seen so far.", "For each day, see if selling today beats current best."],
    solution: `def max_profit(prices):
    cheapest = float("inf")
    best = 0
    for p in prices:
        cheapest = min(cheapest, p)
        best = max(best, p - cheapest)
    return best`,
    explanation: "Greedy single pass. <code>float('inf')</code> seeds the minimum cleanly. O(n) time, O(1) space."
  },

  {
    id: "p17",
    title: "Merge two sorted lists",
    difficulty: "med",
    topic: "Lists",
    statement: "Given two sorted lists a and b, return a merged sorted list.",
    examples: [
      { input: "[1, 3, 5], [2, 4, 6]", output: "[1, 2, 3, 4, 5, 6]" }
    ],
    hints: ["Two pointers, walk both lists together.", "Append the smaller current value."],
    solution: `def merge(a, b):
    i = j = 0
    result = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result`,
    explanation: "Classic merge step from merge sort. After the main loop, one list still has tail elements; <code>extend</code> handles both cases. O(n + m)."
  },

  {
    id: "p18",
    title: "Longest substring without repeating characters",
    difficulty: "med",
    topic: "Strings, Sliding Window",
    statement: "Return the length of the longest substring without repeating characters.",
    examples: [
      { input: '"abcabcbb"', output: "3 (\"abc\")" }
    ],
    hints: ["Sliding window with two pointers.", "A set tracks characters inside the window."],
    solution: `def longest_unique(s):
    seen = set()
    left = 0
    best = 0
    for right, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[left])
            left += 1
        seen.add(ch)
        best = max(best, right - left + 1)
    return best`,
    explanation: "The right pointer extends the window, the left shrinks it on duplicates. Each character enters and leaves the set at most once, so it is O(n)."
  },

  {
    id: "p19",
    title: "Rotate list",
    difficulty: "med",
    topic: "Lists",
    statement: "Rotate a list to the right by k steps.",
    examples: [
      { input: "[1, 2, 3, 4, 5], k = 2", output: "[4, 5, 1, 2, 3]" }
    ],
    hints: ["Slicing handles this in one line.", "Watch out for k larger than the list length."],
    solution: `def rotate(nums, k):
    if not nums:
        return nums
    k = k % len(nums)
    return nums[-k:] + nums[:-k]`,
    explanation: "Modulo handles oversized k. Two slices and a concatenation finish it. O(n) time, O(n) space."
  },

  {
    id: "p20",
    title: "Flatten a nested list",
    difficulty: "med",
    topic: "Recursion",
    statement: "Given a list that may contain other lists, return a single flat list.",
    examples: [
      { input: "[1, [2, [3, 4]], 5]", output: "[1, 2, 3, 4, 5]" }
    ],
    hints: ["Recursion handles arbitrary nesting.", "Check the type of each element."],
    solution: `def flatten(items):
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result`,
    explanation: "Recursive walk. For each element, recurse if it is a list, otherwise append it. O(n) total across all levels."
  },

  {
    id: "p21",
    title: "Sort by frequency",
    difficulty: "med",
    topic: "Sorting, Dicts",
    statement: "Sort the list so that items with higher frequency come first. Break ties by smaller value first.",
    examples: [
      { input: "[1, 1, 2, 2, 2, 3]", output: "[2, 2, 2, 1, 1, 3]" }
    ],
    hints: ["Counter for frequencies.", "Pass a multi-key tuple to sorted."],
    solution: `from collections import Counter

def freq_sort(nums):
    counts = Counter(nums)
    return sorted(nums, key=lambda n: (-counts[n], n))`,
    explanation: "Negative count sorts higher first. Including the value as a secondary key handles ties consistently. O(n log n)."
  },

  /* ============ HARD ============ */
  {
    id: "p22",
    title: "Longest palindromic substring",
    difficulty: "hard",
    topic: "Strings",
    statement: "Find the longest palindromic substring inside s.",
    examples: [
      { input: '"babad"', output: '"bab" (or "aba")' }
    ],
    hints: [
      "Brute force is O(n^3).",
      "Expand around each center for O(n^2).",
      "There are 2n - 1 centers, odd and even."
    ],
    solution: `def longest_palindrome(s):
    if not s:
        return ""

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]

    best = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i + 1)
        for cand in (odd, even):
            if len(cand) > len(best):
                best = cand
    return best`,
    explanation: "Each position can be the center of a palindrome of odd or even length. Expand outward while the ends match. O(n^2) time, O(1) extra space."
  },

  {
    id: "p23",
    title: "LRU cache",
    difficulty: "hard",
    topic: "Design",
    statement: "Design a Least Recently Used cache supporting get(key) and put(key, value) in O(1) average.",
    examples: [
      { input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3); get(2)", output: "1 then -1 (2 was evicted)" }
    ],
    hints: [
      "Python dicts preserve insertion order since 3.7.",
      "OrderedDict has move_to_end, perfect for LRU.",
      "On get, move the key to the end. On put over capacity, popitem(last=False)."
    ],
    solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.store = OrderedDict()

    def get(self, key):
        if key not in self.store:
            return -1
        self.store.move_to_end(key)
        return self.store[key]

    def put(self, key, value):
        if key in self.store:
            self.store.move_to_end(key)
        self.store[key] = value
        if len(self.store) > self.cap:
            self.store.popitem(last=False)`,
    explanation: "OrderedDict tracks insertion order and supports O(1) move-to-end and pop-from-front. Without it you would write a doubly linked list plus a hash map by hand."
  },

  {
    id: "p24",
    title: "Word ladder length",
    difficulty: "hard",
    topic: "Graph, BFS",
    statement: "Given begin, end, and a word list, transform begin into end one letter at a time. Each intermediate word must be in the list. Return the shortest transformation length, or 0 if impossible.",
    examples: [
      { input: 'begin="hit", end="cog", words=["hot","dot","dog","lot","log","cog"]', output: "5 (hit->hot->dot->dog->cog)" }
    ],
    hints: [
      "Model words as nodes, edges between words that differ by one letter.",
      "Shortest path in an unweighted graph is BFS.",
      "Generate neighbors by changing each letter to a-z."
    ],
    solution: `from collections import deque

def ladder_length(begin, end, words):
    word_set = set(words)
    if end not in word_set:
        return 0

    queue = deque([(begin, 1)])
    visited = {begin}

    while queue:
        word, steps = queue.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for c in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + c + word[i + 1:]
                if nxt in word_set and nxt not in visited:
                    visited.add(nxt)
                    queue.append((nxt, steps + 1))
    return 0`,
    explanation: "BFS finds the shortest path. For each word we try replacing each position with every letter. O(L * 26 * N) where L is word length and N is dictionary size."
  },

  {
    id: "p25",
    title: "Course schedule (cycle detection)",
    difficulty: "hard",
    topic: "Graph, DFS",
    statement: "Given numCourses and prerequisites where [a, b] means b must be taken before a, return True if all courses can be finished.",
    examples: [
      { input: "n=2, prereqs=[[1,0]]", output: "True" },
      { input: "n=2, prereqs=[[1,0],[0,1]]", output: "False (cycle)" }
    ],
    hints: [
      "Build an adjacency list.",
      "Detect cycles with DFS and a coloring scheme: unvisited, visiting, done."
    ],
    solution: `def can_finish(n, prereqs):
    graph = {i: [] for i in range(n)}
    for a, b in prereqs:
        graph[b].append(a)

    UNSEEN, VISITING, DONE = 0, 1, 2
    state = [UNSEEN] * n

    def dfs(node):
        if state[node] == VISITING:
            return False
        if state[node] == DONE:
            return True
        state[node] = VISITING
        for nxt in graph[node]:
            if not dfs(nxt):
                return False
        state[node] = DONE
        return True

    return all(dfs(i) for i in range(n))`,
    explanation: "Coloring detects back edges: a node currently in the recursion stack (VISITING) being revisited means a cycle. O(V + E)."
  },

  {
    id: "p26",
    title: "Top k frequent elements",
    difficulty: "hard",
    topic: "Heap",
    statement: "Return the k most frequent elements in a list.",
    examples: [
      { input: "nums=[1,1,1,2,2,3], k=2", output: "[1, 2]" }
    ],
    hints: [
      "Counter gives you frequencies.",
      "Sorting is O(n log n). Can you do better?",
      "heapq.nlargest is exactly this."
    ],
    solution: `from collections import Counter
import heapq

def top_k(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)`,
    explanation: "<code>heapq.nlargest</code> runs in O(n log k), better than sorting when k is small. <code>Counter.most_common(k)</code> is even more direct."
  },

  {
    id: "p27",
    title: "Trap rain water",
    difficulty: "hard",
    topic: "Arrays, Two pointers",
    statement: "Given heights representing an elevation map, compute how much rain water can be trapped.",
    examples: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
    ],
    hints: [
      "Water above index i depends on the highest bar to its left and right.",
      "Two pointers track the running max from each side."
    ],
    solution: `def trap(heights):
    if not heights:
        return 0
    left, right = 0, len(heights) - 1
    left_max = right_max = total = 0
    while left < right:
        if heights[left] < heights[right]:
            if heights[left] >= left_max:
                left_max = heights[left]
            else:
                total += left_max - heights[left]
            left += 1
        else:
            if heights[right] >= right_max:
                right_max = heights[right]
            else:
                total += right_max - heights[right]
            right -= 1
    return total`,
    explanation: "Whichever side has the shorter bar bounds the water on that side, so we can compute it without knowing the other side's max yet. O(n) time, O(1) space."
  },

  {
    id: "p28",
    title: "Serialize and deserialize a tree",
    difficulty: "hard",
    topic: "Tree, Recursion",
    statement: "Encode a binary tree into a string and decode it back. Define a TreeNode with val, left, right.",
    examples: [
      { input: "root = [1, 2, 3, null, null, 4, 5]", output: "round-trip returns the original tree" }
    ],
    hints: [
      "Preorder traversal with markers for None.",
      "Use a deque on deserialize so popping the front is O(1)."
    ],
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def serialize(root):
    parts = []
    def walk(node):
        if not node:
            parts.append("#")
            return
        parts.append(str(node.val))
        walk(node.left)
        walk(node.right)
    walk(root)
    return ",".join(parts)

def deserialize(data):
    from collections import deque
    tokens = deque(data.split(","))
    def build():
        token = tokens.popleft()
        if token == "#":
            return None
        node = TreeNode(int(token))
        node.left = build()
        node.right = build()
        return node
    return build()`,
    explanation: "Preorder uniquely identifies a tree when None placeholders are recorded. Deque's popleft is O(1), important when the string is large."
  },

  {
    id: "p29",
    title: "Median of two sorted arrays",
    difficulty: "hard",
    topic: "Binary search",
    statement: "Find the median of two sorted arrays in O(log(min(m, n))).",
    examples: [
      { input: "[1, 3], [2]", output: "2.0" },
      { input: "[1, 2], [3, 4]", output: "2.5" }
    ],
    hints: [
      "Binary search on the smaller array.",
      "Partition both arrays into left and right halves of equal total size.",
      "The correct partition: max(leftA, leftB) <= min(rightA, rightB)."
    ],
    solution: `def find_median(a, b):
    if len(a) > len(b):
        a, b = b, a
    m, n = len(a), len(b)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        a_left  = a[i - 1] if i > 0 else float("-inf")
        a_right = a[i]     if i < m else float("inf")
        b_left  = b[j - 1] if j > 0 else float("-inf")
        b_right = b[j]     if j < n else float("inf")
        if a_left <= b_right and b_left <= a_right:
            if (m + n) % 2:
                return max(a_left, b_left)
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right:
            hi = i - 1
        else:
            lo = i + 1`,
    explanation: "Search for the partition of A such that left halves combined equal the right halves in size and order. Tricky but a classic. O(log min(m, n))."
  },

  {
    id: "p30",
    title: "Word break",
    difficulty: "hard",
    topic: "DP",
    statement: "Given a string s and a list of words, determine whether s can be segmented into a sequence of words from the list.",
    examples: [
      { input: 's="leetcode", words=["leet","code"]', output: "True" }
    ],
    hints: [
      "dp[i] is True if s[:i] is segmentable.",
      "Look back at all earlier dp[j] where s[j:i] is in the word set."
    ],
    solution: `def word_break(s, words):
    word_set = set(words)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[n]`,
    explanation: "Classic 1D DP. <code>dp[i]</code> means the prefix of length i is segmentable. O(n^2 * k) where k is the average word length cost of the slice."
  }
];

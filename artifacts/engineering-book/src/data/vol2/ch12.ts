import type { Section } from '../types';

export const CH12_SECTIONS: Section[] = [
  {
    id: "12-1",
    number: "12.1",
    title: "What Refactoring Is and Is Not",
    content: `**Refactoring** is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior. Its heart is a series of small behavior-preserving transformations. Each transformation (called a "refactoring") does little, but a sequence of these transformations can produce a significant restructuring. Because each refactoring is small, it's less likely to go wrong. The system is kept fully functional after each small step, reducing the risk of a major breakage.

## The Formal Definition
Martin Fowler defines refactoring as "a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior." The key word here is **observable**. To the user (or another part of the system), the code must behave exactly as it did before. If you are fixing a bug, you are not refactoring. If you are adding a feature, you are not refactoring. If you are improving performance (which might change observable behavior like execution time), you are technically not refactoring in the purest sense, though the techniques are often shared.

## The Two Hats
When you work on software, you should wear two distinct "hats": the **Feature Hat** and the **Refactoring Hat**.
- **Feature Hat**: You are adding new functionality. You may add tests, you write code to make them pass. You track progress by how many requirements are met.
- **Refactoring Hat**: You are improving the design of existing code. You do not add new functionality. You only move, rename, and restructure. You track progress by how much cleaner the code becomes.

You should never wear both hats at the same time. If you realize you need to refactor while adding a feature, swap hats, refactor, and then swap back. Mixing the two is the primary cause of "refactoring regret," where a system ends up in a broken state with no clear path back to stability.

## Why Refactor?
Code naturally tends toward **entropy**. Without constant attention, the original design intent of a system is slowly obscured by patches, quick fixes, and changing requirements. Refactoring is the primary weapon against technical debt. It makes the code:
1. **Understandable**: Code is for humans first, machines second.
2. **Flexible**: A well-structured system is easier to extend.
3. **Bug-Resistant**: Clean code makes bugs visible.

| Aspect | Refactoring | Optimization | Bug Fixing |
| :--- | :--- | :--- | :--- |
| **External Behavior** | Unchanged | Unchanged (mostly) | Changed (corrected) |
| **Internal Structure** | Improved | Often complicated | Varies |
| **Primary Goal** | Maintainability | Performance | Correctness |

Refactoring is not "cleaning up code" in a vague sense; it is a mechanical process of applying known patterns to achieve a verifiable result. If you don't have tests to verify that behavior hasn't changed, you aren't refactoring—you're just changing code and hoping for the best.`
  },
  {
    id: "12-2",
    number: "12.2",
    title: "When to Refactor: The Opportunistic Approach",
    content: `A common mistake in industry is scheduling "refactoring phases" or "cleanup sprints." These are almost always failures. They are difficult to justify to stakeholders and often result in massive, breaking changes that are hard to merge. Instead, the most effective engineers use **Opportunistic Refactoring**, also known as the **Boy Scout Rule**: "Always leave the code cleaner than you found it."

## The Rule of Three
Don't refactor just because you see something "ugly." Refactor when it provides immediate value. A common heuristic is the **Rule of Three**:
1. When you do something for the first time, just get it done.
2. When you do something similar a second time, you wince at the duplication, but you do the duplicate thing anyway.
3. When you do something for the third time, you refactor.

## The Refactoring Workflow
Refactoring should be integrated into your daily workflow. The best times to refactor are:
- **Preparatory Refactoring**: Refactor to make adding a new feature easier. If the current design makes a feature difficult to implement, change the design first, then add the feature.
- **Comprehension Refactoring**: Refactor to understand. When you're trying to figure out what a piece of code does, rename variables and extract functions as you learn. This "activates" your understanding by embedding it in the code.
- **Litter-Pickup Refactoring**: When you see code that is obviously messy, fix it as you pass through.

## When NOT to Refactor
Refactoring is not a panacea. There are times when you should leave code alone:
1. **When you should just rewrite**: If the code is a complete mess and doesn't work, refactoring it is like polishing a sinking ship. Start over.
2. **When you are close to a deadline**: Refactoring has immediate costs for long-term gains. If the "long term" is tomorrow, stay focused on the delivery.
3. **When you cannot test it**: Without a safety net, refactoring is gambling.

## Refactoring and Productivity
There is a common myth that refactoring slows you down. In the short term (hours), yes. In the medium term (days/weeks), **Clean Code = Speed**. By maintaining a high-quality codebase, you avoid the "technical debt interest" that slows down every subsequent feature. High-performing teams refactor constantly because it is the only way to maintain a sustainable pace of delivery.`
  },
  {
    id: "12-3",
    number: "12.3",
    title: "The Refactoring Safety Net: Tests First",
    content: `Refactoring is defined by the preservation of behavior. Without a way to verify that behavior, you are simply "changing things." The only way to refactor safely at scale is to have a robust **Safety Net** of automated tests.

## The Prerequisites
Before you touch a single line of code for refactoring purposes, you must ensure:
1. **Tests Exist**: You have a suite of tests that cover the area you intend to change.
2. **Tests are Green**: The tests pass before you start. Never refactor while tests are failing; you won't know if a failure was caused by your change or existed previously.
3. **Tests are Reliable**: If tests are "flaky" (passing or failing randomly), they cannot serve as a safety net.

## What Kind of Tests?
Not all tests are created equal for refactoring. **Unit Tests** are the most valuable because they are fast and pinpoint exactly where a breakage occurred. However, if your refactoring involves changing the interaction between classes, you may need **Integration Tests**.

The goal is **Structural Independence**. A test that is too tightly coupled to the internal implementation of a class will break even if the refactoring is correct. This is called a "brittle test." Good refactoring tests focus on outcomes (inputs vs. outputs) rather than internal state or private method calls.

## The Refactoring Cycle
The process follows a tight loop:
1. Check that the tests pass.
2. Make a small change (e.g., rename one variable).
3. Run the tests.
4. If they pass, commit (internally or to Git).
5. If they fail, undo the change.

By keeping the cycle short—often less than 60 seconds—you ensure that if a mistake is made, the cause is obvious.

## Dealing with Untested Code
If you must refactor code that has no tests, your first task is not refactoring, but **Characterization Testing**. You write tests that observe the current behavior of the code (including its bugs) to create a "baseline." Once the baseline is established, you can begin the refactoring process. We will cover this in depth in the "Working with Legacy Code" chapter.

---
**Pro Tip**: If your tests take more than a few seconds to run, you will stop running them. Invest in test performance so the "Refactoring Cycle" stays fast.`
  },
  {
    id: "12-4",
    number: "12.4",
    title: "Extract Function and Inline Function",
    content: `**Extract Function** is perhaps the most frequently used refactoring. It is the process of taking a fragment of code and turning it into its own function with a name that explains the purpose of the code.

## Why Extract?
The primary goal is to improve **Readability** and **Decomposition**. A function should do one thing, and its name should describe that thing. If you have to read several lines of code to understand what they do, those lines are candidates for extraction.

### Before:
\`\`\`python
def print_owing(invoice):
    print("***********************")
    print("**** Customer Owes ****")
    print("***********************")
    
    outstanding = 0
    for order in invoice.orders:
        outstanding += order.amount
    
    print(f"name: {invoice.customer}")
    print(f"amount: {outstanding}")
\`\`\`

### After:
\`\`\`python
def print_owing(invoice):
    print_banner()
    outstanding = calculate_outstanding(invoice)
    print_details(invoice, outstanding)

def print_banner():
    print("***********************")
    print("**** Customer Owes ****")
    print("***********************")

def calculate_outstanding(invoice):
    return sum(order.amount for order in invoice.orders)

def print_details(invoice, outstanding):
    print(f"name: {invoice.customer}")
    print(f"amount: {outstanding}")
\`\`\`

## The Reverse: Inline Function
Sometimes, a function's body is as clear as its name. In this case, the extra layer of indirection is unnecessary and adds "cognitive noise." **Inline Function** replaces the function call with the function's body itself.

### When to Inline:
1. When the indirection provides no value.
2. When a group of functions is badly factored and needs to be "collapsed" before being re-extracted correctly.
3. When the function is just a delegation to another function with no added logic.

## Mechanics
When extracting, pay close attention to **Scope** and **Local Variables**. Variables that are read but not written can be passed as arguments. Variables that are written to become more complex; if only one is written, it can often be returned. If multiple are written, you may need to refactor further before extraction (e.g., Split Variable).`
  },
  {
    id: "12-5",
    number: "12.5",
    title: "Extract Variable and Inline Variable",
    content: `While functions organize logic, **Variables** organize data within a function. **Extract Variable** (also known as "Introduce Explaining Variable") is used when an expression is complex or hard to understand.

## Extract Variable
Complex logic, especially in conditional statements, can be difficult to parse. By extracting parts of the expression into variables with meaningful names, you document the code's intent.

### Before:
\`\`\`javascript
if ((platform.toUpperCase().indexOf("MAC") > -1) &&
    (browser.toUpperCase().indexOf("IE") > -1) &&
    wasInitialized() && resize > 0) {
    // do something
}
\`\`\`

### After:
\`\`\`javascript
const isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
const isIE = browser.toUpperCase().indexOf("IE") > -1;
const wasResized = resize > 0;

if (isMacOs && isIE && wasInitialized() && wasResized) {
    // do something
}
\`\`\`

The name of the variable acts as a comment that never gets out of sync with the code.

## Inline Variable
Conversely, if a variable doesn't communicate anything more than the expression itself, or if it gets in the way of other refactorings (like Extract Function), you should inline it.

### Before:
\`\`\`python
base_price = order.base_price
return base_price > 1000
\`\`\`

### After:
\`\`\`python
return order.base_price > 1000
\`\`\`

## When to use which?
- **Extract Variable** when the expression is repeated or complex.
- **Inline Variable** when the variable is used only once and the expression is clear.

In modern IDEs (IntelliJ, VS Code), these refactorings are automated (often \`Ctrl+Alt+V\` for Extract and \`Ctrl+Alt+N\` for Inline). Automated refactoring is significantly safer than manual editing because the IDE handles scope and reference checking correctly.`
  },
  {
    id: "12-6",
    number: "12.6",
    title: "Extract Class and Inline Class",
    content: `As a system grows, a single class often takes on too many responsibilities. This is a violation of the **Single Responsibility Principle (SRP)** and leads to what is known as a "Large Class" smell. **Extract Class** is the solution.

## Extract Class
If you have a group of fields and methods that seem to belong together, move them into a new class. A good sign that a class needs extraction is when a subset of data and a subset of methods are always used together.

### Example: The Person and the Phone
A \`Person\` class might start with a few phone-related fields. As you add logic for formatting numbers and checking area codes, the \`Person\` class becomes bloated.

**Before**: \`Person\` class has \`name\`, \`officeAreaCode\`, and \`officeNumber\`.
**After**: \`Person\` class has a \`name\` and an \`officePhone\` field which holds an instance of a new \`TelephoneNumber\` class.

\`\`\`typescript
// Before
class Person {
  name: string;
  officeAreaCode: string;
  officeNumber: string;

  get telephoneNumber() {
    return \`(\${(this as any).officeAreaCode}) \${(this as any).officeNumber}\`;
  }
}

// After
class TelephoneNumber {
  areaCode: string;
  number: string;

  get toString() {
    return \`(\${(this as any).areaCode}) \${(this as any).number}\`;
  }
}

class Person {
  name: string;
  officePhone: TelephoneNumber;

  constructor() {
    this.officePhone = new TelephoneNumber();
  }

  get telephoneNumber() {
    return this.officePhone.toString;
  }
}
\`\`\`

## Inline Class
**Inline Class** is the reverse. If a class is no longer pulling its weight—perhaps because its responsibilities have been moved elsewhere—you fold it back into another class that uses it most. This reduces the "fragmentation" of the system.

## The Strategy
Don't be afraid to create small classes. A common hesitation is "I don't want too many files." However, ten small, focused classes are much easier to maintain and test than one "God Object" that does everything. Extracting classes is the primary way to achieve **Composition**, which is often more flexible than Inheritance.`
  },
  {
    id: "12-7",
    number: "12.7",
    title: "Move Function and Move Field",
    content: `The essence of good design is putting things where they belong. In Object-Oriented systems, this means placing behavior (functions) close to the data (fields) they operate on.

## Move Function
If a function in Class A uses methods or data from Class B more than its own class, it probably belongs in Class B. This is the fix for the **Feature Envy** smell.

### How to Move:
1. Examine everything the function uses.
2. If it's essentially calculating something for another object, move it there.
3. Turn the old function into a simple delegation or remove it entirely.

### Example:
A \`calculateBankCharge\` method in an \`Account\` class might depend heavily on the \`AccountType\` object. If all the logic is based on the type, move the logic to \`AccountType\`.

## Move Field
Similarly, if a field is used by another class more than the class it lives in, move the field. This often happens after a series of other refactorings.

## Why Move?
Moving functions and fields reduces **Coupling** and increases **Cohesion**.
- **Cohesion**: The degree to which the elements inside a module belong together. High cohesion is good.
- **Coupling**: The degree of interdependence between software modules. Low coupling is good.

When logic is in the "wrong" place, you find yourself jumping between files constantly to understand a single flow. By moving things to their natural home, you make the system's structure more intuitive.

---
**The Clue**: If you find yourself passing an object as an argument to another object's method just so that method can call getters on it, you likely have a "Move Function" candidate.`
  },
  {
    id: "12-8",
    number: "12.8",
    title: "Replace Conditional with Polymorphism",
    content: `One of the most powerful refactorings for removing complexity is **Replace Conditional with Polymorphism**. If you have a \`switch\` statement or a long \`if-else\` chain that performs different actions based on the type of an object, you should use inheritance and polymorphism instead.

## The Problem
Switch statements based on type codes are "change magnets." Every time you add a new type, you have to find and update every switch statement across the codebase. This violates the **Open-Closed Principle** (code should be open for extension but closed for modification).

### Before:
\`\`\`python
def get_speed(bird):
    if bird.type == "EUROPEAN":
        return bird.base_speed
    elif bird.type == "AFRICAN":
        return bird.base_speed - bird.load_factor * bird.num_coconuts
    elif bird.type == "NORWEGIAN_BLUE":
        return 0 if bird.is_nailed else bird.base_speed
\`\`\`

### After:
\`\`\`python
class Bird:
    def get_speed(self):
        pass

class EuropeanBird(Bird):
    def get_speed(self):
        return self.base_speed

class AfricanBird(Bird):
    def get_speed(self):
        return self.base_speed - self.load_factor * self.num_coconuts

class NorwegianBlueBird(Bird):
    def get_speed(self):
        return 0 if self.is_nailed else self.base_speed
\`\`\`

## Benefits
1. **Extensibility**: To add a new bird, you just create a new class. You don't touch existing code.
2. **Clarity**: Each class contains only the logic relevant to its type.
3. **Safety**: You eliminate the risk of forgetting to update one of many switch statements.

## When to use?
Use this when you have several parts of the system that vary based on the same type differentiation. If the conditional only appears once, the overhead of creating classes might not be worth it. But if the "Type" of an object is a fundamental concept in your domain, polymorphism is almost always the right choice.`
  },
  {
    id: "12-9",
    number: "12.9",
    title: "Replace Loop with Pipeline",
    content: `In modern programming, especially in languages with functional features (JS, Python, Java 8+, Ruby, Rust), loops are often less readable than collection pipelines. **Replace Loop with Pipeline** transforms a traditional \`for\` or \`while\` loop into a series of operations like \`map\`, \`filter\`, and \`reduce\`.

## Why Pipelines?
Pipelines describe **what** is being done rather than **how** it is being done. They are declarative. A reader can quickly scan the pipeline to see the data flow: "Filter the actives, map to their names, sort them, and take the top five."

### Before:
\`\`\`javascript
const names = [];
for (const i of input) {
  if (i.job === "programmer") {
    names.push(i.name);
  }
}
\`\`\`

### After:
\`\`\`javascript
const names = input
  .filter(i => i.job === "programmer")
  .map(i => i.name);
\`\`\`

## The Pipeline Toolkit
- **Filter**: Removes elements that don't match a predicate.
- **Map**: Transforms each element.
- **Reduce / Fold**: Combines all elements into a single value (e.g., sum).
- **Find / Some / Every**: Checks for existence or conditions.

## Performance Considerations
In languages like Python or JavaScript, pipelines can sometimes be slightly slower than a highly optimized imperative loop due to function call overhead or intermediate object creation. However, the difference is usually negligible (nanoseconds) compared to the gains in **Maintainability**. Unless you are in a tight inner loop processing millions of items, favor the pipeline.

In languages like Rust or C++ (with C++20 ranges), the compiler can often optimize pipelines into the same machine code as a manual loop, giving you the best of both worlds.`
  },
  {
    id: "12-10",
    number: "12.10",
    title: "Replace Primitive with Object (Value Objects)",
    content: `Early in development, we often represent simple concepts with primitive types (strings, integers). A phone number is a string, a price is a float, a date range is two dates. As the system evolves, logic starts to cluster around these primitives. This is the **Primitive Obsession** smell.

## Value Objects
**Value Objects** are small objects whose equality is based on their value, not their identity. By replacing a primitive with an object, you provide a home for the logic that belongs with that data.

### Example: The Money Class
Floating point numbers are notorious for rounding errors in financial calculations. By creating a \`Money\` object, you can encapsulate the rounding logic and the currency.

\`\`\`python
# Before
price = 9.99
tax = price * 0.05

# After
class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency
    
    def add(self, other):
        # check currency, handle rounding
        return Money(self.amount + other.amount, self.currency)

price = Money(999, "USD") # amount in cents
\`\`\`

## Indicators for this Refactoring:
1. **Validation**: If you find yourself checking if a string is a valid email in multiple places, create an \`Email\` class.
2. **Formatting**: If you have logic to format a phone number for display, it belongs in a \`PhoneNumber\` class.
3. **Behavior**: If you find yourself passing two values together constantly (like \`start_date\` and \`end_date\`), they should likely be a \`DateRange\` object.

Value objects should ideally be **Immutable**. Once created, they cannot be changed; instead, operations return a new instance. This eliminates a whole class of bugs related to shared state and side effects.`
  },
  {
    id: "12-11",
    number: "12.11",
    title: "Replace Parameter with Query",
    content: `A function's interface (its signature) should be as simple as possible. If a function is receiving a value as a parameter, but it could easily look up that value itself, you should **Replace Parameter with Query**.

## The Goal
Reducing the number of parameters makes the function easier to call and reduces coupling between the caller and the callee. The caller doesn't need to know where the data comes from; the function handles it.

### Before:
\`\`\`javascript
const basePrice = quantity * itemPrice;
const finalPrice = discountPrice(basePrice, discountLevel);

function discountPrice(basePrice, discountLevel) {
  if (discountLevel === 2) return basePrice * 0.9;
  else return basePrice * 0.95;
}
\`\`\`

### After:
\`\`\`javascript
const finalPrice = discountPrice();

function discountPrice() {
  const basePrice = quantity * itemPrice;
  const level = getDiscountLevel(); // Query replaces parameter
  if (level === 2) return basePrice * 0.9;
  else return basePrice * 0.95;
}
\`\`\`

## When to avoid this?
You should NOT use this refactoring if:
1. **Purity**: You want the function to be a "Pure Function" (no side effects, output depends only on inputs) for testing or concurrency reasons.
2. **Dependency**: Looking up the value would introduce an unwanted dependency (e.g., the function would now have to know about a global configuration object).

The general rule is: if the function can get the information it needs without increasing complexity or breaking architectural boundaries, it should do so. This makes the caller's life simpler.`
  },
  {
    id: "12-12",
    number: "12.12",
    title: "Introduce Parameter Object",
    content: `When you see a group of parameters that are always passed together, they likely represent a single concept. **Introduce Parameter Object** bundles these parameters into a single object (often a Data Transfer Object or a Value Object).

## Why?
- **Reduces Parameter Count**: Long parameter lists are hard to read and error-prone.
- **Enables Encapsulation**: Once you have the object, you often find logic that can be moved into it (converting it from a simple data container into a proper Value Object).
- **Consistency**: It ensures that all parts of the system use the same structure for that concept.

### Before:
\`\`\`python
def calculate_reading(station, start_date, end_date):
    # logic using start_date and end_date
    pass

calculate_reading(my_station, "2023-01-01", "2023-01-31")
\`\`\`

### After:
\`\`\`python
class DateRange:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def contains(self, date):
        return self.start <= date <= self.end

def calculate_reading(station, date_range):
    # logic using date_range
    pass

calculate_reading(my_station, DateRange("2023-01-01", "2023-01-31"))
\`\`\`

Note how the \`DateRange\` class immediately suggests a \`contains\` method, which might have been duplicated logic scattered around before.

## Mechanics
This refactoring often goes hand-in-hand with **Extract Class**. You start by grouping parameters, and you end up with a cohesive domain object that simplifies the rest of the system.`
  },
  {
    id: "12-13",
    number: "12.13",
    title: "Remove Flag Arguments",
    content: `A **Flag Argument** is a boolean parameter passed to a function to tell it to do one of two things. They are a sign that the function is doing more than one thing and is poorly named.

## The Problem
Flag arguments make the caller's code unreadable. When you see \`doSomething(true)\`, you have no idea what \`true\` means without looking at the function definition.

### Before:
\`\`\`javascript
function setDimension(name, value, isVertical) {
  if (isVertical) this.height = value;
  else this.width = value;
}

// Caller:
setDimension("temp", 10, true); // What is true?
\`\`\`

### After:
\`\`\`javascript
function setHeight(value) { this.height = value; }
function setWidth(value) { this.width = value; }

// Caller:
setHeight(10); // Explicit and clear
\`\`\`

## The Solution
Instead of a single function with a flag, create two (or more) separate functions that represent the different behaviors. If there is shared logic between the behaviors, extract it into a private helper function, but keep the public API explicit.

## When are flags okay?
Flags are occasionally acceptable in private methods or when they represent a genuine state change (e.g., \`setVisible(true)\`), where the name of the function and the value together form a clear sentence. However, if the flag changes the **logic path** of the function, it should be removed.`
  },
  {
    id: "12-14",
    number: "12.14",
    title: "Decompose Conditional",
    content: `Large conditional statements (\`if-then-else\`) are one of the most common sources of complexity. **Decompose Conditional** is a specific application of **Extract Function** to the parts of a conditional.

## The Strategy
Take the \`condition\`, the \`then\` block, and the \`else\` block, and extract each of them into their own functions with names that describe the "why."

### Before:
\`\`\`python
if date < SUMMER_START or date > SUMMER_END:
    charge = quantity * winter_rate + winter_service_charge
else:
    charge = quantity * summer_rate
\`\`\`

### After:
\`\`\`python
if is_summer(date):
    charge = summer_charge(quantity)
else:
    charge = winter_charge(quantity)

def is_summer(date):
    return date >= SUMMER_START and date <= SUMMER_END

def summer_charge(quantity):
    return quantity * summer_rate

def winter_charge(quantity):
    return quantity * winter_rate + winter_service_charge
\`\`\`

## The Result
The top-level logic now reads like a story. You don't have to calculate the dates or the charge math in your head to understand the business rule. The "what" (summer vs. winter rates) is separated from the "how" (date ranges and math).

This refactoring also makes testing easier. You can test \`is_summer\` independently of the charge calculation, ensuring your boundary conditions are correct without setting up a full charge calculation test case.`
  },
  {
    id: "12-15",
    number: "12.15",
    title: "Consolidate Conditional Expression",
    content: `Sometimes you find a sequence of conditional checks that all lead to the same result. Instead of having multiple \`if\` statements, you should **Consolidate Conditional Expression** into a single check with a descriptive name.

## Why Consolidate?
- **Intent**: It makes it clear that these different conditions are all part of the same logical check.
- **Extraction**: Once consolidated, you can often use **Extract Function** on the combined condition to give it a name like \`isEligibleForBonus()\` or \`shouldTriggerAlert()\`.

### Before:
\`\`\`javascript
function disabilityAmount() {
  if (seniority < 2) return 0;
  if (monthsDisabled > 12) return 0;
  if (isPartTime) return 0;
  // compute amount...
}
\`\`\`

### After:
\`\`\`javascript
function disabilityAmount() {
  if (isNotEligibleForDisability()) return 0;
  // compute amount...
}

function isNotEligibleForDisability() {
  return seniority < 2 || monthsDisabled > 12 || isPartTime;
}
\`\`\`

## When NOT to Consolidate
If the conditions are truly independent and only "happen" to return the same value for different reasons, do not consolidate them. Only group conditions that are logically part of the same higher-level check. If they represent distinct "guard clauses" (see 12.16), keeping them separate might be clearer.`
  },
  {
    id: "12-16",
    number: "12.16",
    title: "Replace Nested Conditional with Guard Clauses",
    content: `Deeply nested conditionals create a "pyramid of doom" that makes code hard to follow. **Guard Clauses** are a way to flatten this structure by handling "special cases" early and returning immediately.

## The Philosophy
A function usually has a "main path" and several "exit paths" for edge cases. If all paths are treated as equal using \`if-else\` structures, the main logic gets buried in indentation. Guard clauses say: "If this unusual thing happens, handle it and get out."

### Before:
\`\`\`python
def get_pay_amount():
    if is_dead:
        result = dead_amount()
    else:
        if is_separated:
            result = separated_amount()
        else:
            if is_retired:
                result = retired_amount()
            else:
                result = normal_pay_amount()
    return result
\`\`\`

### After:
\`\`\`python
def get_pay_amount():
    if is_dead: return dead_amount()
    if is_separated: return separated_amount()
    if is_retired: return retired_amount()
    
    return normal_pay_amount()
\`\`\`

## Benefits
1. **Reduced Cognitive Load**: You don't have to maintain a stack of "else" conditions in your head.
2. **Clarity**: The "happy path" is clearly visible at the end of the function.
3. **Flat Structure**: Code is easier to read and maintain.

Guard clauses are a key tool for writing **Clean Code**. They reflect the way we think: "If I'm out of milk, I go to the store. Otherwise, I make coffee." We don't think in nested logic.`
  },
  {
    id: "12-17",
    number: "12.17",
    title: "Introduce Assertion",
    content: `Often, code only works correctly if certain conditions are true (e.g., a square root input must be positive, an object must not be null). These assumptions are often implicit and hidden. **Introduce Assertion** makes these assumptions explicit.

## What is an Assertion?
An assertion is a statement that a condition must be true at a certain point in the code. If it is not true, the program should fail loudly and immediately. This is the **Fail-Fast** principle.

### Example:
\`\`\`javascript
function getDiscount() {
  // We assume discountRate is never negative
  assert(this.discountRate >= 0, "Discount rate cannot be negative");
  return (this.discountRate > 0) ? base * this.discountRate : 0;
}
\`\`\`

## Assertions vs. Error Handling
- **Error Handling**: Used for conditions that *can* happen in production (e.g., user enters bad data, network is down). You should handle these and continue if possible.
- **Assertions**: Used for conditions that *should never* happen if the code is correct. An assertion failure indicates a **bug** in the code, not an environmental error.

## Why use them?
1. **Documentation**: They tell future maintainers what you assumed.
2. **Debugging**: They catch bugs at the source rather than downstream where the symptoms might be confusing.
3. **Communication**: They provide a clear message about why the system failed.

In many languages (like C or Java), assertions can be disabled in production for performance. This means they are purely a tool for development and testing. Use them liberally to document your invariants.`
  },
  {
    id: "12-18",
    number: "12.18",
    title: "Separate Query from Modifier",
    content: `This refactoring is a direct implementation of **Command-Query Separation (CQS)**. A function should either return a value (a query) or change the state of the system (a modifier/command), but never both.

## The Problem
Functions that do both are hard to use and hard to test. If you want to know the current total, you shouldn't have to risk incrementing a counter or sending an email just to get that information.

### Before:
\`\`\`javascript
function getTotalAndIncrementCount() {
  const result = this.total;
  this.count++; // Side effect!
  return result;
}
\`\`\`

### After:
\`\`\`javascript
function getTotal() {
  return this.total;
}

function incrementCount() {
  this.count++;
}
\`\`\`

## Why?
- **Predictability**: Queries can be called as many times as you want without changing anything.
- **Testing**: It's much easier to test a pure query than one with side effects.
- **Concurrency**: Immutable/Query-only operations are thread-safe.

## The "Idempotency" Principle
Ideally, all queries should be **Idempotent**—calling them once is the same as calling them ten times. Commands are rarely idempotent, so separating them allows you to be much more careful about when and how you trigger state changes.`
  },
  {
    id: "12-19",
    number: "12.19",
    title: "Encapsulate Collection",
    content: `A common mistake is to provide a getter that returns a raw collection (like a list or a map) from an object. This allows callers to modify the collection without the owning object knowing about it, breaking encapsulation.

## The Problem
If Class A has a \`List<Order>\` and provides a \`getOrders()\` method, any caller can call \`getOrders().clear()\`, and Class A has no way to prevent or even detect it.

## The Solution
1. **Don't provide a setter** for the collection.
2. **Provide add/remove methods** on the owning object.
3. **Return a read-only view** or a copy of the collection in the getter.

### Before:
\`\`\`python
class Person:
    def __init__(self):
        self.courses = []

    def set_courses(self, courses):
        self.courses = courses

    def get_courses(self):
        return self.courses
\`\`\`

### After:
\`\`\`python
class Person:
    def __init__(self):
        self._courses = []

    def add_course(self, course):
        self._courses.append(course)

    def remove_course(self, course):
        self._courses.remove(course)

    def get_courses(self):
        return self._courses[:] # Return a copy
\`\`\`

## Why?
- **Invariants**: You can check rules (e.g., "a person cannot have more than 5 courses") in the \`add_course\` method.
- **Ownership**: The object remains in control of its data.
- **Decoupling**: Callers don't need to know if the underlying storage is a List, a Set, or a database query.`
  },
  {
    id: "12-20",
    number: "12.20",
    title: "Replace Magic Number with Symbolic Constant",
    content: `A **Magic Number** is a literal value (like \`86400\` or \`0.05\`) that appears in code without explanation. These numbers are a nightmare for maintainability.

## Why are they bad?
1. **Obscurity**: What does \`86400\` mean? (It's the seconds in a day).
2. **Duplication**: If you use \`0.05\` for tax in ten places and the tax rate changes, you have to find and fix all ten.
3. **Bugs**: If you miss one or accidentally change a \`0.05\` that was used for a discount instead of tax, you introduce a bug.

## The Solution
Create a constant (or a variable) with a clear, descriptive name and use it instead.

### Before:
\`\`\`javascript
function calculatePotentialEnergy(mass, height) {
  return mass * 9.81 * height;
}
\`\`\`

### After:
\`\`\`javascript
const GRAVITATIONAL_CONSTANT = 9.81;

function calculatePotentialEnergy(mass, height) {
  return mass * GRAVITATIONAL_CONSTANT * height;
}
\`\`\`

## What about strings?
The same applies to "Magic Strings." Instead of checking \`if (status === "active")\`, use \`const STATUS_ACTIVE = "active"\` or an Enum.

---
**The Rule**: If a literal value has any meaning beyond its literal self, it should be a constant. The only exceptions are 0 and 1 when used for counting or increments, but even then, a name often helps.`
  },
  {
    id: "12-21",
    number: "12.21",
    title: "Large-Scale Refactoring: Strangler Fig Pattern",
    content: `When dealing with massive systems (monoliths) that need restructuring or replacement, small-scale refactorings aren't enough. You need an architectural strategy. The **Strangler Fig Pattern** is the industry standard for safe, incremental replacement of a large system.

## The Metaphor
The name comes from the strangler fig tree, which grows around a host tree. Over time, the fig grows to be a full tree, and the original host tree dies and rots away, leaving a hollow trunk.

## The Strategy
Instead of a "Big Bang Rewrite" (which almost always fails), you replace the system piece by piece:
1. **The Interceptor**: Place a proxy or router in front of the old system.
2. **The New Service**: Create a new service for a specific piece of functionality.
3. **The Divert**: Update the router to send requests for that specific functionality to the new service.
4. **Repeat**: Continue until the old system has no more traffic.

## Real-World Example: API Migration
Imagine you have a legacy PHP API and want to migrate to Go.
- **Phase 1**: Put Nginx in front of PHP.
- **Phase 2**: Build the \`/users\` endpoint in Go.
- **Phase 3**: Tell Nginx to route \`/users\` to Go, and everything else to PHP.
- **Phase 4**: Build the \`/orders\` endpoint in Go and divert traffic.
- **Phase 5**: Decommission the PHP server.

## Benefits
- **Zero Downtime**: You are never taking the system offline.
- **Lower Risk**: If the new Go service has a bug, you can instantly route traffic back to PHP.
- **Immediate Value**: You don't have to wait a year for a full rewrite to see the benefits of the new tech stack.`
  },
  {
    id: "12-22",
    number: "12.22",
    title: "Database Refactoring: Evolutionary Schema",
    content: `Refactoring code is "easy" because code has no state. If you make a mistake, you revert. Refactoring a database is hard because data has **Gravity** and **Persistence**. You cannot simply "revert" a dropped column.

## The Principles of Evolutionary Database Design
Scott Ambler and Pramod Sadalage pioneered the idea of **Database Refactorings**. The key is to treat the schema like code and manage it through versioned migrations.

## The Multi-Phase Change
To safely refactor a database column (e.g., renaming \`cust_name\` to \`customer_full_name\`), you must follow a non-breaking sequence:
1. **Add**: Add the new column (\`customer_full_name\`).
2. **Dual Write**: Update the code to write to both the old and new columns.
3. **Backfill**: Run a script to copy data from the old column to the new column for existing rows.
4. **Switch Read**: Update the code to read from the new column.
5. **Stop Dual Write**: Update the code to only write to the new column.
6. **Remove**: Delete the old column.

## Database Refactoring Patterns
- **Move Column**: Moving a field from the \`Orders\` table to the \`Customers\` table.
- **Split Table**: Splitting a large \`User\` table into \`UserAuth\` and \`UserProfile\`.
- **Introduce Index**: A performance refactoring that adds an index without changing observable behavior (other than speed).

## Tooling
Never run manual SQL to change a schema. Use migration tools like **Flyway**, **Liquibase**, or ORM-integrated tools like **Alembic** (Python) or **Knex** (JS). These ensure that every developer and every environment (Dev, Staging, Prod) has the exact same schema version.`
  },
  {
    id: "12-23",
    number: "12.23",
    title: "Case Study: Fowler's Real-World Refactoring Examples Expanded",
    content: `Martin Fowler's seminal book *Refactoring* uses a "Theater Booking System" as its primary example. Let's look at a modernized, expanded version of a common real-world refactoring scenario: an **E-commerce Checkout Engine**.

## The Starting Point
A 500-line method called \`processOrder(order)\`. It handles:
- Validation (is the SKU in stock?)
- Pricing (applying discounts, taxes, shipping)
- Payment processing (talking to Stripe)
- Notification (sending emails)

## The Refactoring Journey
1. **Decompose Conditional**: The shipping logic was a mess of \`if (country === 'US')\` vs. \`if (country === 'CA')\`. This was refactored into a \`ShippingCalculator\` strategy.
2. **Extract Class**: The pricing logic (discounts, coupons, seasonal sales) was moved to a \`PricingEngine\` class. This allowed testing prices without mocking the entire order object.
3. **Separate Query from Modifier**: The \`calculateTotal()\` method used to also mark the order as "calculated" in the DB. These were separated so that the UI could show the total without triggering a DB write.
4. **Replace Magic Numbers**: Literal tax rates (0.08, 0.05) were replaced with a tax lookup service.
5. **Introduce Parameter Object**: The five different address fields (street, city, zip, state, country) were bundled into an \`Address\` value object.

## The Result
Instead of one massive, untestable function, we ended up with:
- \`CheckoutService\`: A high-level orchestrator (15 lines).
- \`PricingEngine\`: Pure logic, 100% test coverage.
- \`ShippingProvider\`: An interface with implementations for different regions.
- \`OrderRepository\`: Handles the database details.

## The ROI (Return on Investment)
Six months later, the business decided to add "Buy Now, Pay Later" via Klarna. Because the payment logic was already extracted and decoupled from the pricing and shipping logic, adding Klarna took **two days** instead of the estimated **three weeks**. This is the true power of refactoring: it is an investment in the **Velocity** of the future.`
  },
  {
    id: "12-24",
    number: "12.24",
    title: "Exercises",
    content: `Test your understanding of Refactoring with these exercises.

## 1. The Definitions
**Question**: Explain the difference between Refactoring and Performance Optimization.
**Answer**: Refactoring aims to improve code readability and maintainability without changing external behavior. Performance Optimization aims to improve execution speed or resource usage. While both preserve behavior, optimization often makes code *more* complex to gain speed, while refactoring makes it *simpler*.

## 2. Identify the Smell
**Question**: You see a function \`renderPage(content, isAdmin, showSidebar, useDarkMode)\`. What refactorings should you consider?
**Answer**: This is a "Long Parameter List" smell. You should consider **Introduce Parameter Object** for the settings, or **Remove Flag Arguments** by creating specific rendering functions for admin/user views.

## 3. Extract Variable
**Question**: Refactor the following: \`if (platform.indexOf("MAC") > -1 && browser.indexOf("FIREFOX") > -1 && !isExpired(order))\`
**Answer**:
\`\`\`javascript
const isMac = platform.indexOf("MAC") > -1;
const isFirefox = browser.indexOf("FIREFOX") > -1;
const orderIsValid = !isExpired(order);

if (isMac && isFirefox && orderIsValid) { ... }
\`\`\`

## 4. Guard Clauses
**Question**: Rewrite using guard clauses:
\`\`\`javascript
function getReward(user) {
  if (user.isActive) {
    if (user.points > 100) {
      return 10;
    } else {
      return 0;
    }
  } else {
    return -1;
  }
}
\`\`\`
**Answer**:
\`\`\`javascript
function getReward(user) {
  if (!user.isActive) return -1;
  if (user.points > 100) return 10;
  return 0;
}
\`\`\`

## 5. Move Function
**Question**: If Class A has a method that does nothing but call five different getters on Class B to calculate a value, where should that method live?
**Answer**: It should be moved to Class B via **Move Function**. This resolves the **Feature Envy** smell.

## 6. Pipeline Conversion
**Question**: Convert this loop to a pipeline:
\`\`\`python
res = []
for x in data:
    if x > 10:
        res.append(x * 2)
\`\`\`
**Answer**: \`res = [x * 2 for x in data if x > 10]\` (Python list comprehension) or \`list(map(lambda x: x*2, filter(lambda x: x > 10, data)))\`.

## 7. The Two Hats
**Question**: You are refactoring a class and find a small bug. Should you fix it now?
**Answer**: No. You are wearing the Refactoring Hat. Finish your current refactoring step, run tests, commit, then swap to the Feature/Bug-Fix Hat and fix the bug.

## 8. Value Objects
**Question**: Why should Value Objects be immutable?
**Answer**: Immutability prevents side effects. If multiple parts of a program share a \`Money\` object, and one part changes it, the other part's state would unexpectedly change, leading to difficult-to-debug "spooky action at a distance."`
  }
];

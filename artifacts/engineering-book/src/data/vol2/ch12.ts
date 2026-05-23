import type { Section } from '../types';

export const CH12_SECTIONS: Section[] = [
  {
    id: "12-1",
    number: "12.1",
    title: "What Refactoring Is and Is Not",
    content: `Refactoring is disciplined restructuring of existing code — changing its internal structure to make it easier to understand and modify, without changing what it does externally. It is NOT rewriting. It is NOT fixing bugs. It is NOT adding features. Mixing refactoring with behavior change is the source of most refactoring disasters.
The key discipline: refactor in tiny, safe steps. Each step changes one thing about the structure. After each step, run the tests. If they pass, commit. If they fail, you know exactly which one step broke something. This makes refactoring safe even in large codebases without perfect test coverage.
Refactoring is not optional. Code that is never refactored calcifies. Features become harder to add. Bugs become harder to fix. New engineers take longer to understand the system. The cost of reading and modifying the code grows every month it is not refactored. The teams that refactor continuously ship faster than the teams that save it for a dedicated sprint that never comes.


---`
  },
  {
    id: "12-2",
    number: "12.2",
    title: "When to Refactor: The Opportunistic Approach",
    content: `Extract Function is the most frequently used refactoring. You take a fragment of code, give it a descriptive name, and replace the fragment with a call to the new function. Use it whenever: a code block needs a comment to explain it, a block is duplicated, a block is too long to read without scrolling, or a block has a clear single purpose that the enclosing function does not have.

\`\`\`python
# BEFORE: one long function doing everything
def print_order_summary(order):
# Print header
print('=' * 50)
print(f'ORDER #{order.id}')
print(f'Date: {order.created_at.strftime("%Y-%m-%d")}')
print('=' * 50)

# Print items
for item in order.items:
print(f' {item.name:<30} \${item.price/100:>8.2f}')
if item.discount > 0:
discount_amount = item.price * item.discount / 100
print(f' {"Discount " + str(item.discount) + "%":<30} -\${discount_amount/100:>7.2f}')

# Print totals
subtotal = sum(i.price for i in order.items)
tax = int(subtotal * 0.08)
total = subtotal + tax
print('-' * 50)
print(f' {"Subtotal":<30} \${subtotal/100:>8.2f}')
print(f' {"Tax (8%)":<30} \${tax/100:>8.2f}')
print(f' {"TOTAL":<30} \${total/100:>8.2f}')
print('=' * 50)

# AFTER: extracted functions — each does one thing
def print_order_summary(order):
print_order_header(order)
print_order_items(order.items)
print_order_totals(order.items)

def print_order_header(order):
print('=' * 50)
print(f'ORDER #{order.id}')
print(f'Date: {order.created_at.strftime("%Y-%m-%d")}')
print('=' * 50)

def print_order_items(items):
for item in items:
print(f' {item.name:<30} \${item.price/100:>8.2f}')
if item.discount > 0:
print_discount_line(item)

def print_discount_line(item):
discount_amount = item.price * item.discount / 100
label = f'Discount {item.discount}%'
print(f' {label:<30} -\${discount_amount/100:>7.2f}')

def print_order_totals(items):
subtotal = sum(i.price for i in items)
tax = int(subtotal * 0.08)
total = subtotal + tax
print('-' * 50)
print(f' {"Subtotal":<30} \${subtotal/100:>8.2f}')
print(f' {"Tax (8%)":<30} \${tax/100:>8.2f}')
print(f' {"TOTAL":<30} \${total/100:>8.2f}')
print('=' * 50)

# BENEFITS:
# Each function is independently testable
# print_order_totals can be reused (returns values, not prints, ideally)
# Adding GST or VAT tax only touches print_order_totals
# New engineer understands print_order_summary in 10 seconds
\`\`\``
  },
  {
    id: "12-3",
    number: "12.3",
    title: "The Refactoring Safety Net: Tests First",
    content: `Renaming is the simplest refactoring and one of the most valuable. When you understand code well enough to rename something, you have made the code easier to understand for the next reader without changing any behavior. Modern IDEs rename all usages in one operation — there is no excuse for living with a bad name.

\`\`\`python
# BEFORE: names reveal nothing
def calc(d, r, t):
return d * r * t / 100

result = calc(p, 0.05, 12)

# AFTER: names reveal everything
def calculate_simple_interest(principal, annual_rate, months):
return principal * annual_rate * months / 100

interest_earned = calculate_simple_interest(
principal=account_balance,
annual_rate=0.05,
months=12
\`\`\`

)


\`\`\`python
# REFACTORING STEPS (safe rename):
# 1. Use IDE rename (Ctrl+R in PyCharm, F2 in VS Code)
# 2. IDE renames ALL occurrences simultaneously
# 3. Run tests — they must all pass
# 4. Commit with message: 'refactor: rename calc to calculate_simple_interest'

# DO NOT DO MANUALLY:
# Find-and-replace 'd' -> 'principal' across codebase
# You will accidentally rename loop variables, field names, comments
# Always use IDE rename — it is syntax-aware, not text-aware
\`\`\``
  },
  {
    id: "12-4",
    number: "12.4",
    title: "Extract Function and Inline Function",
    content: `\`\`\`python
# BEFORE: magic numbers everywhere
def calculate_shipping(weight_kg, distance_km):
if weight_kg > 30:
return weight_kg * distance_km * 0.085 + 15.00
elif distance_km > 500:
return weight_kg * distance_km * 0.065 + 8.50
else:
return weight_kg * distance_km * 0.045 + 3.00

# What is 30? What is 0.085? What is 15.00?
# A new engineer cannot understand this without reading history or asking someone.

# AFTER: every number is named
HEAVY_SHIPMENT_THRESHOLD_KG = 30
LONG_DISTANCE_THRESHOLD_KM = 500

HEAVY_RATE_PER_KG_KM = 0.085
LONG_DISTANCE_RATE_PER_KG_KM = 0.065
STANDARD_RATE_PER_KG_KM = 0.045

HEAVY_BASE_FEE = 15.00
LONG_DISTANCE_BASE_FEE = 8.50
STANDARD_BASE_FEE = 3.00

def calculate_shipping(weight_kg: float, distance_km: float) -> float:
if weight_kg > HEAVY_SHIPMENT_THRESHOLD_KG:
return weight_kg * distance_km * HEAVY_RATE_PER_KG_KM + HEAVY_BASE_FEE
elif distance_km > LONG_DISTANCE_THRESHOLD_KM:
return weight_kg * distance_km * LONG_DISTANCE_RATE_PER_KG_KM + LONG_DISTANCE_BASE_FEE
else:
return weight_kg * distance_km * STANDARD_RATE_PER_KG_KM + STANDARD_BASE_FEE

# NOW: the business rule is readable
# Changing the heavy threshold: change ONE constant, not hunt through code
# Unit tests can use the same constants: assert result == 30 * 100 * HEAVY_RATE_PER_KG_KM + HEAVY_BASE_FEE
\`\`\``
  },
  {
    id: "12-5",
    number: "12.5",
    title: "Extract Variable and Inline Variable",
    content: `\`\`\`python
# BEFORE: type-checking conditionals that grow forever
def calculate_pay(employee):
if employee.type == 'salaried':
return employee.monthly_salary
elif employee.type == 'hourly':
return employee.hours_worked * employee.hourly_rate
elif employee.type == 'contractor':
return employee.days_worked * employee.daily_rate
elif employee.type == 'commission': # added later
return employee.base_salary + employee.sales * employee.commission_rate
# Every new employee type: modify this function
# Violates Open-Closed Principle

# AFTER: polymorphism — each type knows how to calculate its own pay
from abc import ABC, abstractmethod

class Employee(ABC):
@abstractmethod
def calculate_pay(self) -> float:
\`\`\`

pass


\`\`\`python
class SalariedEmployee(Employee):
def __init__(self, monthly_salary: float):
\`\`\`

self.monthly_salary = monthly_salary

\`\`\`python
def calculate_pay(self) -> float:
return self.monthly_salary

class HourlyEmployee(Employee):
def __init__(self, hours_worked: float, hourly_rate: float):
\`\`\`

self.hours_worked = hours_worked
self.hourly_rate = hourly_rate

\`\`\`python
def calculate_pay(self) -> float:
return self.hours_worked * self.hourly_rate

class ContractorEmployee(Employee):
def __init__(self, days_worked: int, daily_rate: float):
\`\`\`

self.days_worked = days_worked
self.daily_rate = daily_rate

\`\`\`python
def calculate_pay(self) -> float:
return self.days_worked * self.daily_rate

class CommissionEmployee(Employee): # Adding new type: zero changes to existing code
def __init__(self, base_salary: float, sales: float, commission_rate: float):
\`\`\`

self.base_salary = base_salary
self.sales = sales
self.commission_rate = commission_rate

\`\`\`python
def calculate_pay(self) -> float:
return self.base_salary + self.sales * self.commission_rate

# Usage — no conditional needed:
total_payroll = sum(emp.calculate_pay() for emp in employees)
# Adding new employee type: add new class, zero changes to existing code
\`\`\``
  },
  {
    id: "12-6",
    number: "12.6",
    title: "Extract Class and Inline Class",
    content: `\`\`\`python
# BEFORE: class doing too many things (low cohesion)
class Order:
def __init__(self, items, customer_email):
\`\`\`

self.items = items
self.customer_email = customer_email


\`\`\`python
def calculate_subtotal(self): ...
def calculate_tax(self): ...
def calculate_total(self): ...
def format_receipt_text(self): ... # formatting is not order's job
def send_confirmation_email(self): ... # email is not order's job
def validate_email_format(self): ... # validation is not order's job
def log_to_analytics(self): ... # analytics is not order's job

# AFTER: extract classes — each with single responsibility
class Order:
def __init__(self, items: list, customer: 'Customer'):
\`\`\`

self.items = items
self.customer = customer


\`\`\`python
def calculate_subtotal(self) -> float:
return sum(item.price for item in self.items)

def calculate_tax(self, rate: float = 0.08) -> float:
return self.calculate_subtotal() * rate

def calculate_total(self) -> float:
return self.calculate_subtotal() + self.calculate_tax()

class ReceiptFormatter:
def format_text(self, order: Order) -> str:
lines = [f'ORDER #{order.id}']
for item in order.items:
\`\`\`

lines.append(f' {item.name}: \${item.price:.2f}')
lines.append(f'TOTAL: \${order.calculate_total():.2f}')

\`\`\`python
return '\\n'.join(lines)

class OrderNotificationService:
def __init__(self, email_client, formatter: ReceiptFormatter):
\`\`\`

self.email = email_client
self.formatter = formatter


\`\`\`python
def send_confirmation(self, order: Order) -> None:
receipt_text = self.formatter.format_text(order)
\`\`\`

self.email.send(order.customer.email, 'Order Confirmed', receipt_text)


\`\`\`python
# NOW: each class independently testable, reusable, modifiable
# Changing receipt format: touch only ReceiptFormatter
# Changing email provider: touch only OrderNotificationService
# Changing tax calculation: touch only Order
\`\`\``
  },
  {
    id: "12-7",
    number: "12.7",
    title: "Move Function and Move Field",
    content: `\`\`\`python
# INTRODUCE PARAMETER OBJECT: when multiple params always travel together

# BEFORE: lat/lon always passed together
def find_nearby_restaurants(lat: float, lon: float, radius_km: float): ...
def calculate_distance(lat1, lon1, lat2, lon2): ...
def is_within_delivery_zone(lat, lon, zone_lat, zone_lon, zone_radius): ...

# AFTER: introduce Location object
from dataclasses import dataclass

@dataclass(frozen=True)
class Location:
\`\`\`

latitude: float
longitude: float


\`\`\`python
def distance_to(self, other: 'Location') -> float:
# Haversine formula
import math
R = 6371 # Earth radius in km
\`\`\`

lat1, lon1 = math.radians(self.latitude), math.radians(self.longitude)
lat2, lon2 = math.radians(other.latitude), math.radians(other.longitude)

\`\`\`python
dlat = lat2 - lat1; dlon = lon2 - lon1
a = math.sin(dlat/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin(dlon/2)**2
return R * 2 * math.asin(math.sqrt(a))

def is_within(self, center: 'Location', radius_km: float) -> bool:
return self.distance_to(center) <= radius_km

def find_nearby_restaurants(location: Location, radius_km: float): ...
# Now callers build one Location object and pass it around
# distance_to lives with the data that makes sense for it

# PRESERVE WHOLE OBJECT: pass the object, not its fields
# BEFORE: extracting fields and passing them separately
def book_room(hotel_id, check_in_date, check_out_date, guest_name, guest_email):
booking = Booking(
hotel_id=hotel_id,
check_in=check_in_date,
check_out=check_out_date,
guest_name=guest_name,
guest_email=guest_email
\`\`\`

)


\`\`\`python
# Call site pulling fields apart:
book_room(h.id, r.check_in, r.check_out, g.name, g.email)

# AFTER: pass the objects
def book_room(hotel: Hotel, reservation: ReservationRequest, guest: Guest):
booking = Booking.from_objects(hotel, reservation, guest)

book_room(hotel, reservation, guest) # cleaner, self-documenting
# If Hotel grows new needed fields: no changes to call sites
\`\`\``
  },
  {
    id: "12-8",
    number: "12.8",
    title: "Replace Conditional with Polymorphism",
    content: `Refactoring
When to Use
What It Does
Extract Function
Block needs comment, is duplicated, or does one thing
Move code block into named function
Inline Function
Function body is as clear as its name
Replace call with function body, delete function
Rename Variable/Function
Name does not reveal intent
Use IDE rename — renames all usages safely
Extract Variable
Complex expression hard to read
Store sub-expression in named variable
Inline Variable
Variable name adds nothing beyond its value
Replace variable reference with its value
Replace Magic Number with Constant
Literal number in code with non-obvious meaning
Create named constant at module/class level
Replace Conditional with Polymorphism
if/elif chain switching on type
Abstract base class, subclass per type
Replace Nested Conditional with Guard Clauses
Deep nesting for validation/early exit
Return early at the top for each edge case
Extract Class
Class has too many responsibilities
Move related fields and methods to new class
Move Method
Method uses more data from another class than its own
Move to the class whose data it uses most
Introduce Parameter Object
Group of params always pass together
Create dataclass grouping the parameters
Preserve Whole Object
Extracting multiple fields from object for function
Pass the whole object instead
Replace Temp with Query
Temporary variable used in single expression
Replace with method call (enables reuse)
Decompose Conditional
Complex boolean condition hard to read
Extract condition into named predicate function
Consolidate Conditional
Multiple conditions with same result
Combine into single condition, extract to function
Remove Dead Code
Code that is never reached or used
Delete it — version control preserves history`
  },
  {
    id: "12-9",
    number: "12.9",
    title: "Replace Loop with Pipeline",
    content: `\`\`\`python
# BEFORE: deeply nested — the 'arrow anti-pattern'
def process_payment(order, user, payment_method):
if order is not None:
if order.status == 'pending':
if user is not None:
if user.is_active:
if payment_method is not None:
if payment_method.is_valid:
# actual work — buried 6 levels deep
charge = stripe.charge(payment_method.token, order.total)
\`\`\`

order.status = 'paid'

\`\`\`python
return charge
else:
return {'error': 'invalid payment method'}
else:
return {'error': 'no payment method'}
else:
return {'error': 'user inactive'}
else:
return {'error': 'user not found'}
else:
return {'error': 'order not pending'}
else:
return {'error': 'order not found'}

# AFTER: guard clauses — validate first, work at the end
def process_payment(order, user, payment_method):
if order is None: raise OrderNotFoundError()
if order.status != 'pending': raise InvalidOrderStateError(order.status)
if user is None: raise UserNotFoundError()
if not user.is_active: raise UserInactiveError(user.id)
if payment_method is None: raise NoPaymentMethodError()
if not payment_method.is_valid: raise InvalidPaymentMethodError()

# The happy path — not buried, reads naturally
charge = stripe.charge(payment_method.token, order.total)
\`\`\`

order.status = 'paid'

\`\`\`python
return charge

# BENEFITS:
# Maximum nesting: 0 levels (flat code)
# Each validation independently testable
# New validation: add one guard clause at top
# The happy path is immediately visible
# Errors carry specific context (which guard clause fired)
\`\`\``
  },
  {
    id: "12-10",
    number: "12.10",
    title: "Replace Primitive with Object (Value Objects)",
    content: `\`\`\`python
# THE SAFE REFACTORING PROCESS — never lose working code

# STEP 1: Ensure tests exist before refactoring
# If no tests: write characterization tests first
# (tests that capture current behavior, even if wrong)
# The goal: tests that will catch ANY behavioral change

# STEP 2: Take tiny steps
# One refactoring at a time
# Run tests after EVERY single change
# If tests fail: revert that one change and try differently

# STEP 3: Commit after each successful step
# git commit -m 'refactor: extract validate_payment_method function'
# Each commit is a save point — revert is trivial if needed
# This also makes code review much easier: reviewers see intent

# STEP 4: Separate refactoring commits from behavior change commits
# NEVER mix refactoring and bug fixes in one commit
# NEVER mix refactoring and new features in one commit
# Keep them separate so git blame and git bisect stay useful

# STEP 5: Use your IDE — not manual find-replace
# IDE refactoring tools are syntax-aware
# Manual find-replace breaks unrelated things

# REFACTORING COMMIT MESSAGE FORMAT:
# refactor: extract validate_order function from process_order
# refactor: rename calc to calculate_simple_interest
# refactor: replace magic numbers with named constants in shipping module
# refactor: introduce Location dataclass for lat/lon parameters

# WHEN NOT TO REFACTOR:
# During a production incident (stability over cleanliness)
# In code you are about to delete
# When you do not have tests and cannot write them
# (exception: you must first write characterization tests)
# When you are on a hard deadline
# (schedule refactoring for the next sprint instead)
\`\`\``
  },
  {
    id: "12-11",
    number: "12.11",
    title: "Replace Parameter with Query",
    content: `EXTRACT FUNCTION: Take any function longer than 20 lines in a codebase you own or any open-source project. Extract at least 3 functions from it. Each extracted function must have a name that makes the parent function readable without looking at the extracted body. Run tests before and after to verify nothing changed.
REPLACE CONDITIONAL WITH POLYMORPHISM: Find a function or class with an if/elif chain switching on a type field. Refactor using abstract base class and subclasses. Add one new type entirely in the new class without touching existing classes.
GUARD CLAUSE REFACTORING: Find a function with 3+ levels of nesting. Refactor to use guard clauses. Measure cyclomatic complexity before and after (use radon in Python: pip install radon; radon cc -a yourfile.py).
FULL REFACTORING SESSION: Take any 100-line module and apply at least 5 different refactorings from the catalog. Document: which refactoring, why you applied it, what improved. Verify tests pass after each step.
EXTRACT CLASS: Find a class with more than 7 methods covering multiple responsibilities. Extract at least 2 new classes. Move the appropriate methods to each. Verify all tests still pass. Write new tests for the extracted classes independently.
Chapter 12 — Ten Refactoring Truths
Refactoring changes structure without changing behavior. Never mix refactoring with bug fixes or feature additions in the same commit.
Take tiny steps: one refactoring, run tests, commit. If tests fail, you know exactly which single step broke something.
Extract Function is the most valuable refactoring. Any block needing a comment to explain it should become a named function.
Use IDE rename — never manual find-replace. IDE rename is syntax-aware. Manual rename breaks unrelated code.
Replace magic numbers with named constants immediately. The name explains WHY the number exists. One change location when business rules change.
Replace nested conditionals with guard clauses. Validate at the top and return early. The happy path should be flat and visible.
Replace type-switch conditionals with polymorphism. Adding a new type should require zero changes to existing code.
The Boy Scout Rule: leave every function you touch cleaner than you found it. Continuous small improvements prevent big rewrites.
Always have tests before refactoring. Without tests, you cannot verify you have not changed behavior. Write characterization tests first.
Separate refactoring commits keep git blame useful. Future engineers (including you) can see WHY each change was made.

CHAPTER 13
WORKING WITH LEGACY CODE
How to Safely Change Code Without Tests, Understand Systems You Did Not Write, and Rescue Codebases From Themselves

"Legacy code is simply code without tests. It is code we are afraid to change." — Michael Feathers, Working Effectively with Legacy Code`
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

import type { Section } from '../types';

export const CH16_SECTIONS: Section[] = [
  {
    id: "16-1",
    number: "16.1",
    title: "What Patterns Are and Are Not",
    content: `Design patterns are reusable solutions to commonly occurring problems in software design. They are not code you copy — they are templates describing how to structure code to solve a specific class of problem. They give engineers a shared vocabulary: saying 'use the Observer pattern here' communicates an entire structural approach instantly.
The 23 patterns from the Gang of Four book (Gamma, Helm, Johnson, Vlissides, 1994) remain the most important catalog. They are divided into three categories: Creational (how objects are created), Structural (how objects are composed), and Behavioral (how objects communicate and distribute responsibility).


---`
  },
  {
    id: "16-2",
    number: "16.2",
    title: "Creational Patterns: Factory Method",
    content: `\`\`\`python
# SINGLETON: ensure only one instance exists, provide global access point
# Use for: database connection pools, configuration, logging, thread pools
# Warning: overuse leads to hidden global state and tight coupling

import threading

class DatabasePool:
_instance = None
_lock = threading.Lock()

def __new__(cls):
if cls._instance is None:
with cls._lock: # double-checked locking for thread safety
if cls._instance is None:
\`\`\`

cls._instance = super().__new__(cls)
cls._instance._initialized = False

\`\`\`python
return cls._instance

def __init__(self):
if self._initialized: return # prevent re-initialization
\`\`\`

self.connections = []
self.max_connections = 10
self._initialized = True


\`\`\`python
# Usage: DatabasePool() always returns same instance
pool1 = DatabasePool()
pool2 = DatabasePool()
assert pool1 is pool2 # True: same object

# MODERN PYTHON SINGLETON: use module-level instance
# db_pool.py
class _DatabasePool:
def __init__(self): self.connections = []

_pool = _DatabasePool() # module-level: created once, imported everywhere

def get_pool(): return _pool
# import get_pool and call it — always returns same instance
\`\`\``
  },
  {
    id: "16-3",
    number: "16.3",
    title: "Creational Patterns: Abstract Factory",
    content: `\`\`\`python
# FACTORY METHOD: define interface for creating object, let subclass decide type
from abc import ABC, abstractmethod

class Notification(ABC):
@abstractmethod
def send(self, message: str, recipient: str) -> bool: pass

class EmailNotification(Notification):
def send(self, message, recipient) -> bool:
print(f'Email to {recipient}: {message}')
return True

class SMSNotification(Notification):
def send(self, message, recipient) -> bool:
print(f'SMS to {recipient}: {message}')
return True

class PushNotification(Notification):
def send(self, message, recipient) -> bool:
print(f'Push to {recipient}: {message}')
return True

class NotificationFactory:
_registry = {
\`\`\`

'email': EmailNotification,
'sms': SMSNotification,
'push': PushNotification,
}


\`\`\`python
@classmethod
def create(cls, notification_type: str) -> Notification:
klass = cls._registry.get(notification_type)
if not klass:
raise ValueError(f'Unknown notification type: {notification_type}')
return klass()

@classmethod
def register(cls, name: str, klass: type) -> None:
\`\`\`

cls._registry[name] = klass


\`\`\`python
# Usage:
notifier = NotificationFactory.create('email')
\`\`\`

notifier.send('Your order shipped!', 'user@example.com')


\`\`\`python
# Adding WhatsApp: register new class, zero changes to factory or callers
class WhatsAppNotification(Notification):
def send(self, message, recipient) -> bool:
print(f'WhatsApp to {recipient}: {message}')
return True
\`\`\`


NotificationFactory.register('whatsapp', WhatsAppNotification)


\`\`\`python
# ABSTRACT FACTORY: create families of related objects
class UIFactory(ABC):
@abstractmethod
def create_button(self): pass
@abstractmethod
def create_dialog(self): pass

class WindowsUIFactory(UIFactory):
def create_button(self): return WindowsButton()
def create_dialog(self): return WindowsDialog()

class MacOSUIFactory(UIFactory):
def create_button(self): return MacButton()
def create_dialog(self): return MacDialog()

# Application only knows UIFactory — works on both platforms
def build_ui(factory: UIFactory):
button = factory.create_button()
dialog = factory.create_dialog()
return button, dialog
\`\`\``
  },
  {
    id: "16-4",
    number: "16.4",
    title: "Creational Patterns: Builder",
    content: `\`\`\`python
# BUILDER: separate construction of complex object from its representation
# Use when: object has many optional parameters, construction is multi-step

from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class QueryConfig:
\`\`\`

table: str
columns: List[str] = field(default_factory=list)
conditions: List[str] = field(default_factory=list)
order_by: Optional[str] = None
limit: Optional[int] = None
offset: int = 0
joins: List[str] = field(default_factory=list)


\`\`\`python
class QueryBuilder:
def __init__(self, table: str):
\`\`\`

self._config = QueryConfig(table=table)


\`\`\`python
def select(self, *columns: str) -> 'QueryBuilder':
\`\`\`

self._config.columns.extend(columns)

\`\`\`python
return self # return self enables method chaining

def where(self, condition: str) -> 'QueryBuilder':
\`\`\`

self._config.conditions.append(condition)

\`\`\`python
return self

def order_by(self, column: str) -> 'QueryBuilder':
\`\`\`

self._config.order_by = column

\`\`\`python
return self

def limit(self, n: int) -> 'QueryBuilder':
\`\`\`

self._config.limit = n

\`\`\`python
return self

def offset(self, n: int) -> 'QueryBuilder':
\`\`\`

self._config.offset = n

\`\`\`python
return self

def join(self, join_clause: str) -> 'QueryBuilder':
\`\`\`

self._config.joins.append(join_clause)

\`\`\`python
return self

def build(self) -> str:
cols = ', '.join(self._config.columns) if self._config.columns else '*'
sql = f'SELECT {cols} FROM {self._config.table}'
for j in self._config.joins:
\`\`\`

sql += f' {j}'

\`\`\`python
if self._config.conditions:
\`\`\`

sql += ' WHERE ' + ' AND '.join(self._config.conditions)

\`\`\`python
if self._config.order_by:
\`\`\`

sql += f' ORDER BY {self._config.order_by}'

\`\`\`python
if self._config.limit:
\`\`\`

sql += f' LIMIT {self._config.limit}'

\`\`\`python
if self._config.offset:
\`\`\`

sql += f' OFFSET {self._config.offset}'

\`\`\`python
return sql

# Usage: fluent, readable, hard to get wrong
query = (
QueryBuilder('orders')
\`\`\`

.select('id', 'customer_id', 'total_cents', 'status')
.join('JOIN customers ON orders.customer_id = customers.id')
.where('status = "pending"')
.where('total_cents > 1000')
.order_by('created_at DESC')
.limit(50)
.build()
)

\`\`\`python
print(query)
# SELECT id, customer_id, total_cents, status FROM orders
# JOIN customers ON orders.customer_id = customers.id
# WHERE status = 'pending' AND total_cents > 1000
# ORDER BY created_at DESC LIMIT 50
\`\`\`

---`
  },
  {
    id: "16-5",
    number: "16.5",
    title: "Creational Patterns: Prototype",
    content: `\`\`\`python
# ADAPTER: convert interface of a class into another interface clients expect
# Use when: integrating third-party code with incompatible interface
# Real world: every payment gateway adapter, every cloud storage adapter

# Your application expects this interface:
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
@abstractmethod
def charge(self, amount_cents: int, card_token: str) -> dict: pass
@abstractmethod
def refund(self, charge_id: str, amount_cents: int) -> dict: pass

# Stripe has a completely different interface:
class StripeClient:
def create_charge(self, source, amount, currency='usd'): ...
def create_refund(self, charge, amount=None): ...

# PayPal has yet another interface:
class PayPalClient:
def execute_payment(self, token, amount, currency='USD'): ...
def issue_refund(self, transaction_id, amount): ...

# ADAPTERS: wrap third-party clients to match your interface
class StripeAdapter(PaymentGateway):
def __init__(self, stripe_client: StripeClient):
\`\`\`

self._stripe = stripe_client


\`\`\`python
def charge(self, amount_cents: int, card_token: str) -> dict:
result = self._stripe.create_charge(
source=card_token,
amount=amount_cents,
currency='usd'
\`\`\`

)

\`\`\`python
return {'charge_id': result.id, 'status': result.status}

def refund(self, charge_id: str, amount_cents: int) -> dict:
result = self._stripe.create_refund(
charge=charge_id, amount=amount_cents
\`\`\`

)

\`\`\`python
return {'refund_id': result.id, 'status': result.status}

class PayPalAdapter(PaymentGateway):
def __init__(self, paypal_client: PayPalClient):
\`\`\`

self._paypal = paypal_client


\`\`\`python
def charge(self, amount_cents: int, card_token: str) -> dict:
amount_dollars = amount_cents / 100
result = self._paypal.execute_payment(card_token, amount_dollars)
return {'charge_id': result.transaction_id, 'status': 'success'}

def refund(self, charge_id: str, amount_cents: int) -> dict:
result = self._paypal.issue_refund(charge_id, amount_cents / 100)
return {'refund_id': result.refund_id, 'status': 'success'}

# Application code uses PaymentGateway — works with Stripe or PayPal
def process_payment(gateway: PaymentGateway, amount: int, token: str) -> dict:
return gateway.charge(amount, token)

# Switching providers: change which adapter is injected, zero code changes
\`\`\``
  },
  {
    id: "16-6",
    number: "16.6",
    title: "Creational Patterns: Singleton — and Why to Avoid It",
    content: `\`\`\`python
# DECORATOR PATTERN: attach additional responsibilities to objects dynamically
# Use when: want to add behavior to individual objects, not the whole class
# Note: different from Python's @decorator syntax (though related concept)

from abc import ABC, abstractmethod

class DataSource(ABC):
@abstractmethod
def write(self, data: bytes) -> None: pass
@abstractmethod
def read(self) -> bytes: pass

class FileDataSource(DataSource):
def __init__(self, filename: str):
\`\`\`

self.filename = filename


\`\`\`python
def write(self, data: bytes) -> None:
with open(self.filename, 'wb') as f:
\`\`\`

f.write(data)


\`\`\`python
def read(self) -> bytes:
with open(self.filename, 'rb') as f:
return f.read()

class DataSourceDecorator(DataSource): # Base decorator
def __init__(self, wrapped: DataSource):
\`\`\`

self._wrapped = wrapped


\`\`\`python
def write(self, data: bytes) -> None:
\`\`\`

self._wrapped.write(data)


\`\`\`python
def read(self) -> bytes:
return self._wrapped.read()

class EncryptionDecorator(DataSourceDecorator):
def write(self, data: bytes) -> None:
encrypted = self._encrypt(data)
\`\`\`

self._wrapped.write(encrypted)


\`\`\`python
def read(self) -> bytes:
return self._decrypt(self._wrapped.read())

def _encrypt(self, data: bytes) -> bytes:
return bytes(b ^ 0xFF for b in data) # simple XOR for illustration

def _decrypt(self, data: bytes) -> bytes:
return bytes(b ^ 0xFF for b in data) # XOR is its own inverse

class CompressionDecorator(DataSourceDecorator):
def write(self, data: bytes) -> None:
import zlib
\`\`\`

self._wrapped.write(zlib.compress(data))


\`\`\`python
def read(self) -> bytes:
import zlib
return zlib.decompress(self._wrapped.read())

# COMPOSING DECORATORS: stack them in any order
source = FileDataSource('data.bin')
encrypted = EncryptionDecorator(source)
compressed_and_encrypted = CompressionDecorator(encrypted)

# Write: compress -> encrypt -> write to file
\`\`\`

compressed_and_encrypted.write(b'sensitive data here')

\`\`\`python
# Read: read from file -> decrypt -> decompress
data = compressed_and_encrypted.read()

# Adding logging: wrap with LoggingDecorator(compressed_and_encrypted)
# No changes to existing decorators or FileDataSource
\`\`\``
  },
  {
    id: "16-7",
    number: "16.7",
    title: "Structural Patterns: Adapter",
    content: `\`\`\`python
# FACADE: provide simplified interface to complex subsystem
# Use when: subsystem has many classes with complex interactions
# Real world: boto3 is a facade over AWS APIs, Django ORM is a facade over SQL

# COMPLEX SUBSYSTEM: video conversion
class VideoFile:
def __init__(self, filename: str): self.filename = filename

class CodecFactory:
def extract(self, file: VideoFile): ...

class BitrateReader:
def read(self, filename: str, codec): ...
def convert(self, buffer, codec): ...

class AudioMixer:
def fix(self, result): ...

class MPEG4CompressionCodec:
name = 'mp4'

class OggCompressionCodec:
name = 'ogg'

# FACADE: hides all this complexity behind one simple method
class VideoConverter:
def convert(self, filename: str, output_format: str) -> VideoFile:
file = VideoFile(filename)
source_codec = CodecFactory().extract(file)

if output_format == 'mp4':
dest_codec = MPEG4CompressionCodec()
elif output_format == 'ogg':
dest_codec = OggCompressionCodec()
else:
raise ValueError(f'Unsupported format: {output_format}')

buffer = BitrateReader().read(filename, source_codec)
result = BitrateReader().convert(buffer, dest_codec)
result = AudioMixer().fix(result)
return VideoFile(filename.replace('.', f'_{output_format}.'))

# Client code: completely hidden from subsystem complexity
converter = VideoConverter()
mp4 = converter.convert('movie.avi', 'mp4')
ogg = converter.convert('movie.avi', 'ogg')

# REAL-WORLD FACADE EXAMPLES:
# Django's render(): wraps template loading, context processing, HTTP response
# requests.get(): wraps urllib3 connection pool, SSL, redirects, retries
# boto3.client('s3').upload_file(): wraps multipart upload, retry, checksums
\`\`\`

---`
  },
  {
    id: "16-8",
    number: "16.8",
    title: "Structural Patterns: Bridge",
    content: `\`\`\`python
# OBSERVER: define one-to-many dependency so when one object changes state,
# all dependents notified automatically
# Use when: event-driven systems, UI updates, real-time notifications

from abc import ABC, abstractmethod
from typing import List

class EventListener(ABC):
@abstractmethod
def on_event(self, event_type: str, data: dict) -> None: pass

class EventManager:
def __init__(self):
\`\`\`

self._listeners: dict[str, List[EventListener]] = {}


\`\`\`python
def subscribe(self, event_type: str, listener: EventListener) -> None:
if event_type not in self._listeners:
\`\`\`

self._listeners[event_type] = []
self._listeners[event_type].append(listener)


\`\`\`python
def unsubscribe(self, event_type: str, listener: EventListener) -> None:
if event_type in self._listeners:
\`\`\`

self._listeners[event_type].remove(listener)


\`\`\`python
def notify(self, event_type: str, data: dict) -> None:
for listener in self._listeners.get(event_type, []):
\`\`\`

listener.on_event(event_type, data)


\`\`\`python
# CONCRETE OBSERVERS: each handles one concern
class EmailNotificationListener(EventListener):
def on_event(self, event_type: str, data: dict) -> None:
if event_type == 'order.placed':
send_order_confirmation_email(data['customer_email'], data['order_id'])

class InventoryListener(EventListener):
def on_event(self, event_type: str, data: dict) -> None:
if event_type == 'order.placed':
for item in data['items']:
decrement_inventory(item['sku'], item['quantity'])

class AnalyticsListener(EventListener):
def on_event(self, event_type: str, data: dict) -> None:
track_event(event_type, data)

# SUBJECT: the object being observed
class OrderService:
def __init__(self, events: EventManager):
\`\`\`

self.events = events


\`\`\`python
def place_order(self, order_data: dict) -> dict:
order = create_order(order_data)
# Notify all interested listeners — no direct coupling
\`\`\`

self.events.notify('order.placed', {
'order_id': order.id,
'customer_email': order.customer.email,
'items': order.items
})

\`\`\`python
return order

# WIRING IT TOGETHER:
events = EventManager()
\`\`\`

events.subscribe('order.placed', EmailNotificationListener())
events.subscribe('order.placed', InventoryListener())
events.subscribe('order.placed', AnalyticsListener())


\`\`\`python
service = OrderService(events)

# Adding a new reaction to order.placed: add new listener, zero code changes
# Removing email notifications: unsubscribe, zero code changes to OrderService
\`\`\``
  },
  {
    id: "16-9",
    number: "16.9",
    title: "Structural Patterns: Composite",
    content: `\`\`\`python
# STRATEGY: define family of algorithms, encapsulate each, make interchangeable
# Use when: need to switch algorithms at runtime, or have many related variants

from abc import ABC, abstractmethod
from typing import List

class SortStrategy(ABC):
@abstractmethod
def sort(self, data: List) -> List: pass

class QuickSortStrategy(SortStrategy):
def sort(self, data: List) -> List:
if len(data) <= 1: return data
pivot = data[len(data)//2]
left = [x for x in data if x < pivot]
mid = [x for x in data if x == pivot]
right = [x for x in data if x > pivot]
return self.sort(left) + mid + self.sort(right)

class MergeSortStrategy(SortStrategy):
def sort(self, data: List) -> List:
if len(data) <= 1: return data
mid = len(data)//2
left = self.sort(data[:mid])
right = self.sort(data[mid:])
return self._merge(left, right)

def _merge(self, left, right):
result = []; i = j = 0
while i < len(left) and j < len(right):
if left[i] <= right[j]: result.append(left[i]); i+=1
else: result.append(right[j]); j+=1
return result + left[i:] + right[j:]

class TimSortStrategy(SortStrategy):
def sort(self, data: List) -> List:
return sorted(data) # Python's built-in Timsort

class DataProcessor:
def __init__(self, sort_strategy: SortStrategy):
\`\`\`

self._sorter = sort_strategy


\`\`\`python
def set_strategy(self, strategy: SortStrategy) -> None:
\`\`\`

self._sorter = strategy # swap strategy at runtime


\`\`\`python
def process(self, data: List) -> List:
return self._sorter.sort(data)

# Runtime strategy switching based on data characteristics:
processor = DataProcessor(TimSortStrategy())

def process_dataset(data: List) -> List:
if len(data) < 100: # small: quicksort
\`\`\`

processor.set_strategy(QuickSortStrategy())

\`\`\`python
elif data == sorted(data): # already sorted: timsort optimal
\`\`\`

processor.set_strategy(TimSortStrategy())

\`\`\`python
else: # general case
\`\`\`

processor.set_strategy(MergeSortStrategy())

\`\`\`python
return processor.process(data)
\`\`\``
  },
  {
    id: "16-10",
    number: "16.10",
    title: "Structural Patterns: Decorator",
    content: `\`\`\`python
# COMMAND: encapsulate a request as an object
# Use when: need undo/redo, request queuing, logging of operations, transactions

from abc import ABC, abstractmethod
from typing import List

class Command(ABC):
@abstractmethod
def execute(self) -> None: pass

@abstractmethod
def undo(self) -> None: pass

class TextEditor:
def __init__(self):
\`\`\`

self.text = ''
self._history: List[Command] = []
self._redo_stack: List[Command] = []


\`\`\`python
def execute(self, command: Command) -> None:
\`\`\`

command.execute()
self._history.append(command)
self._redo_stack.clear() # new action clears redo history


\`\`\`python
def undo(self) -> None:
if not self._history: return
command = self._history.pop()
\`\`\`

command.undo()
self._redo_stack.append(command)


\`\`\`python
def redo(self) -> None:
if not self._redo_stack: return
command = self._redo_stack.pop()
\`\`\`

command.execute()
self._history.append(command)


\`\`\`python
class InsertTextCommand(Command):
def __init__(self, editor: TextEditor, position: int, text: str):
\`\`\`

self.editor = editor
self.position = position
self.text = text


\`\`\`python
def execute(self) -> None:
\`\`\`

self.editor.text = (
self.editor.text[:self.position] +
self.text +
self.editor.text[self.position:]
)


\`\`\`python
def undo(self) -> None:
\`\`\`

self.editor.text = (
self.editor.text[:self.position] +
self.editor.text[self.position + len(self.text):]
)


\`\`\`python
class DeleteTextCommand(Command):
def __init__(self, editor: TextEditor, position: int, length: int):
\`\`\`

self.editor = editor
self.position = position
self.length = length
self._deleted = '' # saved for undo


\`\`\`python
def execute(self) -> None:
\`\`\`

self._deleted = self.editor.text[self.position:self.position + self.length]
self.editor.text = (
self.editor.text[:self.position] +
self.editor.text[self.position + self.length:]
)


\`\`\`python
def undo(self) -> None:
\`\`\`

self.editor.text = (
self.editor.text[:self.position] +
self._deleted +
self.editor.text[self.position:]
)


\`\`\`python
# Usage:
editor = TextEditor()
\`\`\`

editor.execute(InsertTextCommand(editor, 0, 'Hello World'))
editor.execute(InsertTextCommand(editor, 5, ', Beautiful'))

\`\`\`python
print(editor.text) # 'Hello, Beautiful World'
\`\`\`

editor.undo()

\`\`\`python
print(editor.text) # 'Hello World'
\`\`\`

editor.redo()

\`\`\`python
print(editor.text) # 'Hello, Beautiful World'
\`\`\``
  },
  {
    id: "16-11",
    number: "16.11",
    title: "Structural Patterns: Facade",
    content: `Pattern
Category
Problem It Solves
When to Use
Singleton
Creational
Ensure single instance with global access
Config, connection pools, logging (use sparingly)
Factory Method
Creational
Create objects without specifying exact class
When subclass should decide which object to create
Abstract Factory
Creational
Create families of related objects
Cross-platform UI, database drivers, cloud providers
Builder
Creational
Construct complex objects step by step
Objects with many optional params, SQL builders, HTTP requests
Prototype
Creational
Copy existing objects without depending on their classes
Expensive object creation, configuration templates
Adapter
Structural
Make incompatible interfaces work together
Integrating third-party libraries, legacy code integration
Bridge
Structural
Decouple abstraction from implementation
Multiple dimensions of variation (shape + color)
Composite
Structural
Treat individual objects and groups uniformly
File systems, UI component trees, org charts
Decorator
Structural
Add behavior without modifying original object
I/O streams, middleware, caching, logging, auth
Facade
Structural
Simplified interface to complex subsystem
API clients, ORM wrappers, service layers
Flyweight
Structural
Share common state among many fine-grained objects
Game entities, text rendering, cache objects
Proxy
Structural
Placeholder controlling access to another object
Lazy loading, access control, caching, logging
Chain of Responsibility
Behavioral
Pass request along handler chain
Middleware, event handling, validation pipelines
Command
Behavioral
Encapsulate request as object
Undo/redo, task queues, transactional operations
Iterator
Behavioral
Access elements without exposing internal structure
Collections, generators, lazy sequences
Mediator
Behavioral
Reduce direct dependencies between components
Chat rooms, air traffic control, UI event buses
Memento
Behavioral
Capture and restore object state
Undo history, state snapshots, checkpoints
Observer
Behavioral
Notify multiple objects about state changes
Event systems, UI bindings, message queues
State
Behavioral
Alter behavior when internal state changes
Order status, connection states, game states
Strategy
Behavioral
Family of interchangeable algorithms
Sorting, payment processing, compression, routing
Template Method
Behavioral
Define skeleton of algorithm, subclass fills in steps
Report generation, data processing pipelines
Visitor
Behavioral
Add operations to objects without modifying them
Compilers, document export, type checking
Interpreter
Behavioral
Grammar and interpreter for a language
SQL parsers, regex engines, expression evaluators`
  },
  {
    id: "16-12",
    number: "16.12",
    title: "Structural Patterns: Flyweight",
    content: `IMPLEMENT 5 PATTERNS: Choose 5 patterns from the catalog you have not used before. For each: implement a working example in a domain you understand (not the textbook examples), write tests verifying the pattern behaves correctly, and explain in one paragraph what problem it solves.
PATTERN IDENTIFICATION: Read the source code of a popular open-source Python project (Django, Flask, SQLAlchemy, Celery). Identify 5 design patterns in actual use. For each: name the pattern, show the relevant code, explain why that pattern was the right choice there.
OBSERVER SYSTEM: Build a complete event-driven order management system. Events: order.placed, order.paid, order.shipped, order.delivered, order.cancelled. Listeners: email notifications, inventory management, analytics, fraud detection. Show that adding a new listener requires zero changes to the order management code.
STRATEGY + FACTORY: Build a file compression system using Strategy (different compression algorithms) and Factory (create the right strategy based on file type and size). Support: gzip, zlib, no compression. Factory chooses: no compression for < 1KB, gzip for text, zlib for binary.
COMMAND WITH UNDO: Extend the TextEditor example to support: bulk operations (execute multiple commands as one undoable unit), command history persistence (save history to file, reload on startup), and macro recording (record a sequence of commands, replay on demand).
Chapter 16 — Ten Pattern Truths
Patterns are vocabulary, not recipes. Saying Observer or Strategy communicates an entire structural approach. Learn the vocabulary.
Never force a pattern. Apply patterns only when the problem they solve is actually present. Premature pattern application creates unnecessary complexity.
Creational patterns manage object creation. Factory Method and Abstract Factory decouple clients from concrete classes.
Builder is the right choice when a constructor would need 4+ parameters, especially optional ones. Method chaining makes construction readable.
Adapter is essential for third-party integration. Wrap external APIs with adapters so your code never depends directly on vendor interfaces.
Decorator adds behavior without inheritance. It is more flexible — you can stack decorators in any combination at runtime.
Observer decouples event producers from consumers. Adding a new reaction requires zero changes to the code that produces the event.
Strategy makes algorithms interchangeable. Switch algorithms at runtime based on context without changing the code that uses them.
Command enables undo/redo by encapsulating operations as objects with execute() and undo(). Every action becomes reversible.
Facade reduces cognitive load for complex subsystems. Design facades that expose 20% of the functionality that covers 80% of use cases.

CHAPTER 17
SOFTWARE ARCHITECTURE
Layered, Hexagonal, Event-Driven, Microservices — The Complete Architectural Toolkit

"Architecture is the decisions that are hard to change." — Martin Fowler`
  },
  {
    id: "16-13",
    number: "16.13",
    title: "Structural Patterns: Proxy",
    content: `The **Proxy** pattern provides a surrogate or placeholder for another object to control access to it.

## Types of Proxies
1. **Virtual Proxy:** Delays the creation of a heavy object until it's actually needed (Lazy Loading).
2. **Protection Proxy:** Controls access based on permissions (Security).
3. **Remote Proxy:** Represents an object that exists in a different address space (like a REST API client that looks like a local object).
4. **Logging Proxy:** Logs every call to the target object.

## Implementation (Lazy Loading)
\`\`\`typescript
class ImageProxy implements Graphic {
  private realImage: RealImage | null = null;
  draw() {
    if (!this.realImage) this.realImage = new RealImage();
    this.realImage.draw();
  }
}
\`\`\`
The client thinks it's talking to the image, but the image is only loaded when \`draw()\` is called.`
  },
  {
    id: "16-14",
    number: "16.14",
    title: "Behavioral Patterns: Chain of Responsibility",
    content: `The **Chain of Responsibility** allows you to pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

## The Scenario: Support Ticket System
- **Level 1:** Can handle basic resets.
- **Level 2:** Can handle technical bugs.
- **Level 3:** Can handle billing issues.

## Why use it?
It decouples the sender of a request from its receivers. The sender doesn't know which object will eventually handle the request.

## Middleware: The Modern Implementation
Express.js or ASP.NET Core middleware are chains of responsibility. Each middleware can end the request (send a response) or call \`next()\` to pass it to the next function.`
  },
  {
    id: "16-15",
    number: "16.15",
    title: "Behavioral Patterns: Command",
    content: `The **Command** pattern turns a request into a stand-alone object that contains all information about the request.

## Why?
Turning an action into an object allows you to:
- **Queue actions:** Store commands in a list to execute later.
- **Log actions:** Keep a history of what was done.
- **Undo/Redo:** Commands can implement an \`unexecute()\` method.

## Implementation
\`\`\`typescript
interface Command { execute(): void; undo(): void; }

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}
\`\`\`

## Redux/Action Pattern
The modern "Action" in Redux or Vuex is a lightweight Command pattern. It describes "what happened" as an object, which is then "dispatched" (invoked) by a centralized system.`
  },
  {
    id: "16-16",
    number: "16.16",
    title: "Behavioral Patterns: Iterator",
    content: `The **Iterator** pattern allows you to traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

## The Abstract Interface
The Iterator provides methods like \`next()\`, \`hasNext()\`, and \`current()\`.

## Why it's essential
It allows you to use the same loop logic for a linked list and a complex binary tree. Most modern languages (Python's \`__iter__\`, JS's \`Symbol.iterator\`, Java's \`Iterable\`) have this pattern built into the core syntax.

\`\`\`javascript
// The for..of loop in JS uses the Iterator pattern internally
for (const item of myCollection) {
  console.log(item);
}
\`\`\`
The \`myCollection\` doesn't have to be an array; as long as it implements the Iterator interface, the loop works.`
  },
  {
    id: "16-17",
    number: "16.17",
    title: "Behavioral Patterns: Mediator",
    content: `The **Mediator** pattern reduces chaotic dependencies between objects by forcing them to communicate through a single mediator object.

## The Problem
Objects in a complex system start talking to everyone else. Soon, every object knows about every other object, creating a "spaghetti" of dependencies.

## The Solution: Air Traffic Control
Airplanes don't talk to each other to avoid collisions. They all talk to the Tower (The Mediator). The Tower tells them when to land.

## Benefits
- **Decoupling:** Objects don't need to know who else is in the system.
- **Centralization:** Interaction logic is in one place, making it easier to change.`
  },
  {
    id: "16-18",
    number: "16.18",
    title: "Behavioral Patterns: Memento",
    content: `The **Memento** pattern allows you to capture and restore the internal state of an object without violating encapsulation.

## The Components
1. **Originator:** The object whose state we want to save.
2. **Memento:** A "snapshot" of the state (usually an immutable object).
3. **Caretaker:** Holds the mementos but never modifies them.

## Use Case: Undo in a Text Editor
When the user types, the \`Editor\` (Originator) creates a \`Snapshot\` (Memento). The \`UndoManager\` (Caretaker) pushes it onto a stack. When "Undo" is pressed, the \`Editor\` restores its state from the top snapshot.`
  },
  {
    id: "16-19",
    number: "16.19",
    title: "Behavioral Patterns: Observer",
    content: `The **Observer** pattern (also known as Pub/Sub) defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.

## The Mechanism
- **Subject:** Maintains a list of observers and notifies them of changes.
- **Observer:** Implements an \`update()\` method.

## Modern Examples
- **Frontend Frameworks:** React and Vue use a form of the Observer pattern to re-render components when data changes.
- **Event Listeners:** \`button.addEventListener('click', ...)\` is the Observer pattern. The button is the Subject, and your callback is the Observer.`
  },
  {
    id: "16-20",
    number: "16.20",
    title: "Behavioral Patterns: State",
    content: `The **State** pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

## State vs. if/else
If you have a \`Document\` class with a \`publish()\` method:
- If state is "Draft", it moves to "Review".
- If state is "Review", it moves to "Published".
- If state is "Published", it does nothing.

Instead of a giant \`switch\` statement, each state is its own class.

\`\`\`typescript
interface State { publish(): void; }

class DraftState implements State {
  publish() { this.doc.setState(new ReviewState()); }
}
\`\`\`

## When to use it
When your object's behavior depends on its state, and the number of states is large or the logic is complex. It eliminates massive conditional blocks and makes states "first-class citizens" in your code.`
  },
  {
    id: "16-21",
    number: "16.21",
    title: "Behavioral Patterns: Strategy",
    content: `The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from the clients that use it.

## The Example: Sorting
You have a \`List\` that needs sorting. Depending on the size of the list, you might want \`QuickSort\`, \`MergeSort\`, or \`BubbleSort\`.

## Implementation
\`\`\`typescript
interface SortStrategy { sort(data: any[]): void; }

class Context {
  private strategy: SortStrategy;
  setStrategy(s: SortStrategy) { this.strategy = s; }
  executeSort(data: any[]) { this.strategy.sort(data); }
}
\`\`\`

## Strategy vs. State
- **Strategy** is usually chosen by the client (e.g., "I want to pay by Credit Card").
- **State** is usually managed by the object itself (e.g., "I am now in the 'Review' state").`
  },
  {
    id: "16-22",
    number: "16.22",
    title: "Behavioral Patterns: Template Method",
    content: `The **Template Method** defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.

## The Logic
The base class defines the "algorithm structure" as a \`final\` (non-overridable) method that calls several "hook" methods. Subclasses override the hooks to provide specific behavior.

\`\`\`typescript
abstract class DataMiner {
  // The Template Method
  process() {
    this.openFile();
    this.extractData();
    this.closeFile();
  }
  abstract extractData(): void; // Hook
}
\`\`\`

## Template Method vs. Strategy
- **Template Method** uses Inheritance (fixed structure, variable steps).
- **Strategy** uses Composition (variable whole algorithm).`
  },
  {
    id: "16-23",
    number: "16.23",
    title: "Behavioral Patterns: Visitor",
    content: `The **Visitor** pattern allows you to add new operations to existing object structures without modifying them. It is the OO solution to the **Expression Problem**.

## The Mechanism: Double Dispatch
The visitor pattern uses a trick: the element "accepts" the visitor, and then calls the visitor's method back, passing itself as an argument.

\`\`\`typescript
interface Visitor {
  visitCircle(c: Circle): void;
  visitSquare(s: Square): void;
}

class Circle {
  accept(v: Visitor) { v.visitCircle(this); }
}
\`\`\`

## Use Case: Compilers
In a compiler, the source code is represented as an Abstract Syntax Tree (AST). You might have many visitors: one for type-checking, one for optimization, and one for code generation. None of these operations need to be inside the AST node classes themselves.`
  },
  {
    id: "16-24",
    number: "16.24",
    title: "Concurrency Patterns: Active Object, Monitor, Half-Sync/Half-Async",
    content: `As systems become increasingly parallel, a specific set of patterns has emerged to handle concurrency safely.

## Active Object
The **Active Object** pattern decouples method execution from method invocation. It consists of a proxy, a scheduler, and a queue. When you call a method, it is turned into a request object, put in a queue, and executed on a separate thread. This allows for asynchronous execution without blocking the main thread.

## Monitor Object
A **Monitor** synchronizes method execution to ensure that only one thread at a time executes a method within an object. Languages like Java have this built-in via the \`synchronized\` keyword. It prevents "Race Conditions" by locking the object's state during operation.

## Half-Sync/Half-Async
This pattern is used in high-performance servers (like Node.js or Nginx).
- **Async Layer:** Handles concurrent I/O (like network packets) efficiently using an event loop.
- **Sync Layer:** Handles complex processing that might block (like heavy computation).
- **Queue:** Sits between them to pass work.

This allows the system to remain responsive to new requests even while doing heavy work.`
  },
  {
    id: "16-25",
    number: "16.25",
    title: "Architectural Patterns: Repository, Unit of Work, Specification",
    content: `These patterns focus on the boundary between the Domain Logic and the Data Persistence layer.

## Repository
A **Repository** mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects. It hides the SQL or API calls, allowing the business logic to work with "Objects" instead of "Rows."

## Unit of Work
A **Unit of Work** tracks everything you do during a business transaction that can affect the database. When you're done, it figures out everything that needs to be done to alter the database as a result of your work in a single transaction. It prevents partial saves and optimizes database hits.

## Specification
The **Specification** pattern allows you to encapsulate business rules into small, reusable objects.
\`\`\`typescript
const isPremium = new PremiumUserSpecification();
const hasOrders = new HasRecentOrdersSpecification();

if (isPremium.and(hasOrders).isSatisfiedBy(user)) { ... }
\`\`\`
This keeps complex conditional logic out of the domain entities and the repository queries.`
  },
  {
    id: "16-26",
    number: "16.26",
    title: "Enterprise Patterns: CQRS, Event Sourcing, Saga",
    content: `Enterprise systems often require more robust patterns than a simple CRUD (Create, Read, Update, Delete) approach.

## CQRS (Command Query Responsibility Segregation)
**CQRS** suggests using a different model to update information than the model you use to read information.
- **Commands:** Change state (don't return data).
- **Queries:** Return data (don't change state).
In high-scale systems, the "Read" database might even be a different technology (e.g., Elasticsearch) than the "Write" database (e.g., PostgreSQL).

## Event Sourcing
Instead of storing the *current state* of an object, you store a *sequence of events* that led to that state.
- **Current State:** Balance = $100.
- **Event Source:** +$50, -$20, +$70.
This provides a perfect audit log and the ability to "time travel" to any point in the past.

## Saga Pattern
A **Saga** is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction. If a local transaction fails, the saga executes a series of **compensating transactions** to undo the changes made by the preceding local transactions. This is the standard way to handle distributed transactions in microservices.`
  },
  {
    id: "16-27",
    number: "16.27",
    title: "Anti-Patterns: What They Are and How to Escape Them",
    content: `An **Anti-Pattern** is a common response to a recurring problem that is usually ineffective and risks being highly counterproductive.

## Common Anti-Patterns
1. **The God Object:** A single class that does everything.
   - *Escape:* Use SRP to break it into focused modules.
2. **Golden Hammer:** Using the same tool (e.g., NoSQL) for every problem, regardless of fit.
   - *Escape:* Learn multiple paradigms and evaluate based on requirements.
3. **Spaghetti Code:** Code with no clear structure or flow.
   - *Escape:* Apply layering and design patterns like Facade or Mediator.
4. **Premature Optimization:** Sacrificing clarity for performance that doesn't matter yet.
   - *Escape:* Profile first. Only optimize bottlenecks.
5. **Cargo Cult Programming:** Copying code or patterns without understanding why.
   - *Escape:* Read the docs. Ask "why" before "how."

## The "Pattern Happy" Developer
The most common anti-pattern for senior-level beginners is **Patternitis**—the urge to use as many design patterns as possible in a single project.
- *Symptom:* A "Hello World" app with a \`GreetingFactory\`, \`AbstractLanguageDecorator\`, and a \`StdoutObserver\`.
- *Solution:* Follow YAGNI. Only add a pattern when you can clearly articulate the problem it is solving.`
  },
  {
    id: "16-28",
    number: "16.28",
    title: "Case Study: Patterns in the Django ORM",
    content: `The Django web framework (Python) is a treasure trove of design patterns. Its ORM (Object-Relational Mapper) is a particularly sophisticated example.

## Active Record vs. Data Mapper
Django uses the **Active Record** pattern. Each model class represents a table, and each instance represents a row. The instance has methods like \`.save()\` and \`.delete()\`.

## The Manager (Bridge/Facade)
The \`objects\` attribute on Django models (e.g., \`User.objects.filter(...)\`) is a **Manager**. It acts as a **Facade** for the complex query construction logic. It also uses the **Proxy** pattern—the query isn't actually executed until you try to access the data (Lazy Loading).

## Meta-programming (Prototype/Builder)
Django uses Python's "metaclasses" to implement a variant of the **Prototype** pattern. When you define a class, Django intercepts the creation to build the internal mapping of fields to database columns.

## The Middleware (Chain of Responsibility)
Django's request/response cycle is handled by a chain of middleware. Each piece of middleware (Authentication, CSRF, Session) has a chance to process the request or return a response immediately.

## The Lesson
Django's success isn't just because it's in Python; it's because it uses patterns to provide a **Fluent Interface** that hides immense complexity. It proves that patterns, when used correctly, create a "pit of success" where doing the right thing is the easiest thing.`
  },
  {
    id: "16-29",
    number: "16.29",
    title: "Exercises",
    content: `Test your knowledge of design patterns and their application.

1. **Pattern Identification:** You have a system where multiple objects need to be notified when a configuration file changes. Which pattern should you use?
   *Answer: The Observer pattern.*

2. **Refactoring:** You have a class with a 20-line constructor and 15 optional parameters. Which pattern would make this cleaner?
   *Answer: The Builder pattern.*

3. **Structural Design:** You need to integrate a 3rd-party library that uses different method names than your existing interface. Which pattern applies?
   *Answer: The Adapter pattern.*

4. **Behavioral Logic:** You are building a game where an Orc's behavior changes from "Patrolling" to "Attacking" to "Fleeing" based on its health and the player's distance. Which pattern is best?
   *Answer: The State pattern.*

5. **Resource Management:** You want to ensure that your application only ever creates one connection to a legacy mainframe. Which pattern ensures this?
   *Answer: The Singleton pattern (though use with caution!).*

6. **Optimization:** You are building a map with 10,000 "Grass" tiles. Each tile is an object. How do you prevent your memory usage from exploding?
   *Answer: Use the Flyweight pattern to share the common "Grass" data (color, texture) across all 10,000 instances.*

7. **Undo Support:** How does the Command pattern facilitate "Undo" functionality?
   *Answer: By storing the state changes inside the command object and providing an \`unexecute()\` or \`undo()\` method that reverses the \`execute()\` action.*

8. **Architecture:** What is the difference between a Factory Method and an Abstract Factory?
   *Answer: A Factory Method creates a single product through inheritance (subclasses override a method). An Abstract Factory creates a family of related products through composition (a factory object is passed in).*`
  }
];

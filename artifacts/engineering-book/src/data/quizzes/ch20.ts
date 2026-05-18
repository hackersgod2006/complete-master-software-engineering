import { ChapterQuizData } from "../quizTypes";

export const CH20_QUIZ: ChapterQuizData = {
  chapterId: "ch20",
  sectionQuizzes: {
    "20-1": [
      {
        id: "q20-1-1",
        question: "What is the primary purpose of Creational Design Patterns?",
        options: [
          "To manage object communication",
          "To provide mechanisms for object creation that increase flexibility and reuse",
          "To organize classes into larger structures",
          "To improve database performance"
        ],
        correct: 1,
        explanation: "Creational patterns focus on abstracting the instantiation process and making the system independent of how its objects are created.",
        difficulty: "easy"
      },
      {
        id: "q20-1-2",
        question: "Which pattern ensures that a class has only one instance and provides a global point of access to it?",
        options: [
          "Factory Method",
          "Singleton",
          "Builder",
          "Prototype"
        ],
        correct: 1,
        explanation: "The Singleton pattern restricts a class to a single instance throughout the application.",
        difficulty: "easy"
      },
      {
        id: "q20-1-3",
        question: "What is a common criticism of the Singleton pattern?",
        options: [
          "It uses too much memory",
          "It can introduce global state and make unit testing difficult",
          "It is too slow",
          "It only works in Java"
        ],
        correct: 1,
        explanation: "Singletons are often considered 'anti-patterns' when they create hidden dependencies and global state that is hard to mock during tests.",
        difficulty: "medium"
      }
    ],
    "20-2": [
      {
        id: "q20-2-1",
        question: "What is the primary benefit of the Factory Method pattern?",
        options: [
          "It creates objects faster",
          "It allows a class to defer instantiation to subclasses",
          "It removes the need for constructors",
          "It encrypts object data"
        ],
        correct: 1,
        explanation: "Factory Method provides an interface for creating objects but lets subclasses decide which class to instantiate.",
        difficulty: "medium"
      },
      {
        id: "q20-2-2",
        question: "How does the 'Abstract Factory' pattern differ from 'Factory Method'?",
        options: [
          "It's just a different name",
          "It provides an interface for creating families of related or dependent objects without specifying their concrete classes",
          "It only creates static objects",
          "It is used for structural organization"
        ],
        correct: 1,
        explanation: "Abstract Factory is a level of abstraction higher, managing families of related products rather than just a single product type.",
        difficulty: "hard"
      },
      {
        id: "q20-2-3",
        question: "When should you use the 'Builder' pattern?",
        options: [
          "When you want to copy an existing object",
          "When an object needs to be constructed in several steps and has many optional parameters",
          "When you only need one instance of a class",
          "When you want to change the behavior of an object at runtime"
        ],
        correct: 1,
        explanation: "The Builder pattern is ideal for complex objects that require step-by-step construction, often avoiding 'telescoping constructors'.",
        difficulty: "medium"
      }
    ],
    "20-3": [
      {
        id: "q20-3-1",
        question: "What is the goal of Structural Design Patterns?",
        options: [
          "To manage algorithms",
          "To explain how to assemble objects and classes into larger structures while keeping them flexible and efficient",
          "To handle object instantiation",
          "To manage user input"
        ],
        correct: 1,
        explanation: "Structural patterns are concerned with how classes and objects are composed to form larger structures.",
        difficulty: "easy"
      },
      {
        id: "q20-3-2",
        question: "Which pattern allows objects with incompatible interfaces to collaborate?",
        options: [
          "Decorator",
          "Adapter",
          "Facade",
          "Proxy"
        ],
        correct: 1,
        explanation: "The Adapter pattern acts as a wrapper that converts one interface into another that a client expects.",
        difficulty: "easy"
      },
      {
        id: "q20-3-3",
        question: "What is the difference between an Adapter and a Bridge pattern?",
        options: [
          "There is no difference",
          "Adapter makes things work after they're designed; Bridge pulls them apart so they can be developed independently",
          "Bridge is for classes, Adapter is for objects",
          "Adapter is only for databases"
        ],
        correct: 1,
        explanation: "Adapter is usually used for retrofitting, while Bridge is used up-front to separate abstraction from implementation.",
        difficulty: "hard"
      }
    ],
    "20-4": [
      {
        id: "q20-4-1",
        question: "What does the 'Decorator' pattern allow you to do?",
        options: [
          "Change an object's class at runtime",
          "Attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors",
          "Design better user interfaces",
          "Access private variables of a class"
        ],
        correct: 1,
        explanation: "Decorators provide a flexible alternative to sub-classing for extending functionality.",
        difficulty: "medium"
      },
      {
        id: "q20-4-2",
        question: "How is a Decorator different from Inheritance?",
        options: [
          "It's not; they are the same",
          "Inheritance is static (at compile time), while Decoration is dynamic (at runtime)",
          "Decoration is only for UI components",
          "Inheritance is always better"
        ],
        correct: 1,
        explanation: "Decoration allows you to add responsibilities to an individual object, not an entire class, at runtime.",
        difficulty: "medium"
      },
      {
        id: "q20-4-3",
        question: "What is a 'Facade' pattern?",
        options: [
          "A pattern that hides the complexity of a system by providing a simplified interface",
          "A pattern that replicates an object's interface",
          "A way to decorate an object's UI",
          "A pattern for managing database transactions"
        ],
        correct: 0,
        explanation: "A Facade provides a high-level interface that makes a complex subsystem easier to use.",
        difficulty: "easy"
      }
    ],
    "20-5": [
      {
        id: "q20-5-1",
        question: "What is the primary focus of Behavioral Design Patterns?",
        options: [
          "Object creation",
          "Class structure",
          "Communication between objects and the assignment of responsibilities",
          "Memory management"
        ],
        correct: 2,
        explanation: "Behavioral patterns identify common communication patterns between objects and realize these patterns.",
        difficulty: "easy"
      },
      {
        id: "q20-5-2",
        question: "Which pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified?",
        options: [
          "Strategy",
          "Observer",
          "Command",
          "Mediator"
        ],
        correct: 1,
        explanation: "The Observer pattern is commonly used for implementing distributed event-handling systems.",
        difficulty: "easy"
      },
      {
        id: "q20-5-3",
        question: "What is a 'Strategy' pattern?",
        options: [
          "A way to plan a project",
          "A pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable",
          "A pattern for creating objects",
          "A way to organize files"
        ],
        correct: 1,
        explanation: "Strategy lets the algorithm vary independently from the clients that use it.",
        difficulty: "medium"
      }
    ],
    "20-6": [
      {
        id: "q20-6-1",
        question: "What is the 'Command' pattern used for?",
        options: [
          "Running shell scripts",
          "Turning a request into a stand-alone object that contains all information about the request",
          "Speeding up database queries",
          "Managing user permissions"
        ],
        correct: 1,
        explanation: "Command pattern allows for parameterizing clients with different requests, queuing requests, and supporting undoable operations.",
        difficulty: "medium"
      },
      {
        id: "q20-6-2",
        question: "Which pattern is often used to implement 'Undo' functionality?",
        options: [
          "Singleton",
          "Command",
          "Facade",
          "Proxy"
        ],
        correct: 1,
        explanation: "By storing commands in a stack, a system can easily support undo by calling an 'unexecute' method on the latest command.",
        difficulty: "medium"
      },
      {
        id: "q20-6-3",
        question: "What is the role of the 'Invoker' in the Command pattern?",
        options: [
          "The object that knows how to perform the work",
          "The object that triggers the command to execute",
          "The object that creates the command",
          "The user"
        ],
        correct: 1,
        explanation: "The Invoker holds a command and at some point asks the command to carry out a request.",
        difficulty: "hard"
      }
    ],
    "20-7": [
      {
        id: "q20-7-1",
        question: "What is the 'Template Method' pattern?",
        options: [
          "A way to write HTML templates",
          "A pattern that defines the skeleton of an algorithm in a base class but lets subclasses override specific steps",
          "A pattern for creating many identical objects",
          "A way to manage CSS styles"
        ],
        correct: 1,
        explanation: "Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.",
        difficulty: "medium"
      },
      {
        id: "q20-7-2",
        question: "How does the 'State' pattern work?",
        options: [
          "It stores the application state in a database",
          "It allows an object to alter its behavior when its internal state changes, appearing to change its class",
          "It manages the state of the UI",
          "It is a type of singleton"
        ],
        correct: 1,
        explanation: "The State pattern encapsulates state-specific behaviors into separate classes and delegates work to the current state object.",
        difficulty: "hard"
      },
      {
        id: "q20-7-3",
        question: "What is the 'Visitor' pattern used for?",
        options: [
          "To track website visitors",
          "To separate an algorithm from an object structure on which it operates",
          "To create a welcome screen",
          "To implement a search feature"
        ],
        correct: 1,
        explanation: "Visitor allows you to add new operations to existing object structures without modifying the structures themselves.",
        difficulty: "hard"
      }
    ],
    "20-8": [
      {
        id: "q20-8-1",
        question: "What is the 'Proxy' pattern?",
        options: [
          "A pattern that provides a surrogate or placeholder for another object to control access to it",
          "A pattern for faster network connections",
          "A way to hide private methods",
          "A type of database index"
        ],
        correct: 0,
        explanation: "Proxies are often used for lazy loading, access control, logging, or remote service communication.",
        difficulty: "medium"
      },
      {
        id: "q20-8-2",
        question: "What is 'Lazy Initialization' in the context of the Proxy pattern?",
        options: [
          "Delaying the creation of an expensive object until it is actually needed",
          "Writing code slowly",
          "Initializing all variables to null",
          "Loading the whole database at start"
        ],
        correct: 0,
        explanation: "A Virtual Proxy can manage the creation of a resource-heavy object by only instantiating it when a method is called.",
        difficulty: "medium"
      },
      {
        id: "q20-8-3",
        question: "How is a Proxy different from a Decorator?",
        options: [
          "They are the same",
          "Proxy manages the lifecycle of the object; Decorator adds functionality to an existing object",
          "Decorator is for security; Proxy is for speed",
          "Proxy is only for networks"
        ],
        correct: 1,
        explanation: "A Proxy usually manages the creation and lifecycle of its underlying object, while a Decorator is given the object it decorates.",
        difficulty: "hard"
      }
    ],
    "20-9": [
      {
        id: "q20-9-1",
        question: "What is the 'Flyweight' pattern?",
        options: [
          "A pattern for lightweight airplanes",
          "A pattern that minimizes memory usage by sharing as much data as possible with similar objects",
          "A way to write faster code",
          "A type of data compression"
        ],
        correct: 1,
        explanation: "Flyweight is used when a large number of objects share common state (intrinsic state), which is moved to a shared object.",
        difficulty: "hard"
      },
      {
        id: "q20-9-2",
        question: "What is 'Intrinsic State' in Flyweight?",
        options: [
          "State that is unique to each object",
          "State that is shared across multiple objects and doesn't change based on context",
          "State stored in a database",
          "The internal variables of a class"
        ],
        correct: 1,
        explanation: "Intrinsic state is constant and can be shared, while extrinsic state varies and is passed into methods.",
        difficulty: "hard"
      },
      {
        id: "q20-9-3",
        question: "What is the 'Composite' pattern?",
        options: [
          "A pattern for mixing different data types",
          "A pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects",
          "A way to combine multiple databases",
          "A pattern for building complex UIs with components"
        ],
        correct: 1,
        explanation: "Composite allows clients to treat individual objects and compositions of objects uniformly.",
        difficulty: "medium"
      }
    ],
    "20-10": [
      {
        id: "q20-10-1",
        question: "Which pattern is best for implementing a complex calculation where the algorithm might change at runtime?",
        options: [
          "Singleton",
          "Strategy",
          "Factory",
          "Adapter"
        ],
        correct: 1,
        explanation: "Strategy allows you to swap out the calculation logic easily at runtime.",
        difficulty: "easy"
      },
      {
        id: "q20-10-2",
        question: "What is the 'Chain of Responsibility' pattern?",
        options: [
          "A way to manage employee tasks",
          "A pattern that lets you pass requests along a chain of handlers until one of them handles it",
          "A type of linked list",
          "A pattern for managing database locks"
        ],
        correct: 1,
        explanation: "This pattern decouples the sender of a request from its receivers by giving more than one object a chance to handle the request.",
        difficulty: "medium"
      },
      {
        id: "q20-10-3",
        question: "What is the 'Memento' pattern?",
        options: [
          "A pattern for remembering user names",
          "A pattern that lets you save and restore the previous state of an object without revealing its implementation details",
          "A way to log all database changes",
          "A pattern for caching data"
        ],
        correct: 1,
        explanation: "Memento allows for capturing and restoring an object's internal state without violating encapsulation.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q20-exam-1",
      question: "Which pattern would you use to provide a simplified interface to a large, complex set of classes in a subsystem?",
      options: [
        "Adapter",
        "Facade",
        "Decorator",
        "Proxy"
      ],
      correct: 1,
      explanation: "A Facade provides a single, simple entry point into a complex system.",
      difficulty: "easy"
    },
    {
      id: "q20-exam-2",
      question: "Which pattern is used to add responsibilities to an object dynamically without affecting other objects from the same class?",
      options: [
        "Inheritance",
        "Decorator",
        "Strategy",
        "Prototype"
      ],
      correct: 1,
      explanation: "Decorators wrap objects to extend their behavior at runtime.",
      difficulty: "medium"
    },
    {
      id: "q20-exam-3",
      question: "What is the main difference between the Strategy and State patterns?",
      options: [
        "They are identical",
        "In State, the states are aware of each other and trigger transitions; in Strategy, the client usually specifies the strategy",
        "Strategy is for UI, State is for data",
        "State is a creational pattern, Strategy is structural"
      ],
      correct: 1,
      explanation: "While their structures are similar, their intent is different. State is about changing behavior based on internal state transitions.",
      difficulty: "hard"
    },
    {
      id: "q20-exam-4",
      question: "Which creational pattern uses a 'Director' class to coordinate the construction process?",
      options: [
        "Factory Method",
        "Abstract Factory",
        "Builder",
        "Singleton"
      ],
      correct: 2,
      explanation: "In the Builder pattern, a Director often defines the order in which to call construction steps.",
      difficulty: "medium"
    },
    {
      id: "q20-exam-5",
      question: "What does the 'Liskov Substitution Principle' have to do with design patterns?",
      options: [
        "It's a pattern itself",
        "It's a principle that ensures subclasses can stand in for their base classes, which is fundamental to many patterns like Strategy and Template Method",
        "It's a way to encrypt objects",
        "It's only relevant for the Singleton pattern"
      ],
      correct: 1,
      explanation: "LSP is a core SOLID principle that makes polymorphic design patterns work reliably.",
      difficulty: "medium"
    },
    {
      id: "q20-exam-6",
      question: "Which pattern is most appropriate for implementing a system-wide logging service where only one instance is desired?",
      options: [
        "Factory",
        "Singleton",
        "Adapter",
        "Observer"
      ],
      correct: 1,
      explanation: "Singleton is the classic choice for a single global service like logging.",
      difficulty: "easy"
    },
    {
      id: "q20-exam-7",
      question: "In the Observer pattern, what is the 'Subject'?",
      options: [
        "The object being watched for changes",
        "The object that is watching for changes",
        "The user of the system",
        "The database"
      ],
      correct: 0,
      explanation: "The Subject (or Observable) maintains a list of its observers and notifies them of any state changes.",
      difficulty: "easy"
    },
    {
      id: "q20-exam-8",
      question: "Which pattern is used to decouple an abstraction from its implementation so that the two can vary independently?",
      options: [
        "Adapter",
        "Bridge",
        "Composite",
        "Facade"
      ],
      correct: 1,
      explanation: "The Bridge pattern uses composition instead of inheritance to separate abstraction from implementation.",
      difficulty: "hard"
    },
    {
      id: "q20-exam-9",
      question: "What is the primary disadvantage of the 'Command' pattern?",
      options: [
        "It makes code slower",
        "It can lead to a large number of small classes",
        "It is insecure",
        "It only works in object-oriented languages"
      ],
      correct: 1,
      explanation: "Every command requires a new class, which can increase the complexity of the codebase.",
      difficulty: "medium"
    },
    {
      id: "q20-exam-10",
      question: "Which pattern defines a set of algorithms and allows them to be swapped at runtime?",
      options: [
        "Template Method",
        "Strategy",
        "Command",
        "State"
      ],
      correct: 1,
      explanation: "The Strategy pattern is the standard way to make algorithms interchangeable.",
      difficulty: "easy"
    }
  ]
};

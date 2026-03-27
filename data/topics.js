window.SYSTEM_DESIGN_TOPICS = [
  {
    id: "foundations-system-design",
    title: "Foundations of Software Design",
    module: "Foundations",
    difficulty: "Beginner",
    studyTime: "90 min",
    tags: ["LLD", "HLD", "Service Interview", "Product Interview"],
    order: 1,
    summary: {
      simple: "System design is the skill of turning vague product ideas into reliable software structures.",
      why: "Interviews test whether you can prioritize requirements and reason through tradeoffs.",
      example: "Designing a booking flow means balancing correctness, scale, and user experience.",
      interview: "Start with requirements, define scope, and communicate assumptions early."
    },
    quiz: "Name two non-functional requirements and explain how they affect architecture.",
    diagram: "client -> api -> service -> db"
  },
  {
    id: "ood-basics",
    title: "Object-Oriented Design Basics",
    module: "LLD",
    difficulty: "Beginner",
    studyTime: "120 min",
    tags: ["LLD", "Backend", "Service Interview"],
    order: 2,
    summary: {
      simple: "OOD helps you model real entities as maintainable classes and interactions.",
      why: "Good object models reduce change cost and improve testability.",
      example: "A Cart object should own pricing rules instead of spreading logic across controllers.",
      interview: "Explain class responsibility, lifecycle, and relationship choices."
    },
    quiz: "When would you choose composition over inheritance in an interview design?",
    diagram: "User <>-- Cart --* Item"
  },
  {
    id: "uml-modeling",
    title: "Visual Modeling and UML",
    module: "LLD",
    difficulty: "Intermediate",
    studyTime: "90 min",
    tags: ["LLD", "Big Tech", "Product Interview"],
    order: 3,
    summary: {
      simple: "UML gives a shared visual language for behavior and structure.",
      why: "Clear diagrams prevent misunderstanding before implementation.",
      example: "A sequence diagram can show auth token validation before request execution.",
      interview: "Use just enough UML to clarify flows, not to impress with symbols."
    },
    quiz: "Which diagram best explains runtime interactions and why?",
    diagram: "Client -> API -> Auth -> Service"
  },
  {
    id: "design-principles",
    title: "Core Design Principles",
    module: "LLD",
    difficulty: "Intermediate",
    studyTime: "100 min",
    tags: ["LLD", "Backend", "Big Tech"],
    order: 4,
    summary: {
      simple: "Principles like SOLID and DRY guide code that survives long-term change.",
      why: "Without principles, systems become tightly coupled and hard to extend.",
      example: "Separating payment gateways behind interfaces enables quick provider swaps.",
      interview: "Tie every principle to a practical refactoring decision."
    },
    quiz: "Give one case where over-applying abstraction harms maintainability.",
    diagram: "Controller -> Service -> Repository"
  },
  {
    id: "design-patterns",
    title: "Essential Design Patterns",
    module: "Patterns",
    difficulty: "Intermediate",
    studyTime: "150 min",
    tags: ["LLD", "Service Interview", "Product Interview"],
    order: 5,
    summary: {
      simple: "Patterns are reusable solutions for recurring design problems.",
      why: "They speed up communication and reduce accidental complexity.",
      example: "Use Strategy to select pricing or recommendation logic dynamically.",
      interview: "Discuss when not to use a pattern to show maturity."
    },
    quiz: "What makes Factory preferable to direct constructor usage in interviews?",
    diagram: "Context -> StrategyA | StrategyB"
  },
  {
    id: "lld-case-studies",
    title: "LLD Case Studies",
    module: "Case Studies",
    difficulty: "Intermediate",
    studyTime: "180 min",
    tags: ["LLD", "Service Interview", "Big Tech"],
    order: 6,
    summary: {
      simple: "Case studies train you to translate requirements into concrete object designs.",
      why: "Interviewers judge decomposition, constraints, and extension strategy.",
      example: "A parking lot design tests pricing, spot allocation, and concurrency handling.",
      interview: "State assumptions, model entities, then walk through key workflows."
    },
    quiz: "For a food delivery system, what entity boundaries would you set first?",
    diagram: "Order -> Payment -> Delivery"
  },
  {
    id: "hld-fundamentals",
    title: "High-Level Design Fundamentals",
    module: "HLD",
    difficulty: "Beginner",
    studyTime: "120 min",
    tags: ["HLD", "Scalability", "Backend"],
    order: 7,
    summary: {
      simple: "HLD focuses on components, data flow, and reliability at system scale.",
      why: "Strong HLD prevents expensive rewrites under growth.",
      example: "Choosing monolith first can be smart when product scope is uncertain.",
      interview: "Explain latency, availability, and consistency tradeoffs clearly."
    },
    quiz: "How would CAP tradeoffs appear in a social feed design?",
    diagram: "Client -> Gateway -> Services -> Datastores"
  },
  {
    id: "traffic-routing",
    title: "Traffic Routing and Delivery",
    module: "HLD",
    difficulty: "Intermediate",
    studyTime: "100 min",
    tags: ["HLD", "Scalability", "Backend"],
    order: 8,
    summary: {
      simple: "Routing decides how requests reach healthy servers quickly.",
      why: "Poor routing increases latency and outage blast radius.",
      example: "A CDN serves static assets near users and reduces origin load.",
      interview: "Compare LB algorithms and explain health-check strategy."
    },
    quiz: "When would weighted load balancing beat round robin?",
    diagram: "DNS -> CDN -> LB -> App"
  },
  {
    id: "scaling-systems",
    title: "Scaling Systems",
    module: "HLD",
    difficulty: "Intermediate",
    studyTime: "110 min",
    tags: ["HLD", "Scalability", "Big Tech"],
    order: 9,
    summary: {
      simple: "Scaling is about handling growth without breaking reliability or cost goals.",
      why: "Interview problems usually fail due to bottlenecks, not missing features.",
      example: "Stateless services enable horizontal scaling behind auto-scalers.",
      interview: "Use rough calculations to justify architecture size choices."
    },
    quiz: "What metrics help you detect a scaling bottleneck first?",
    diagram: "Autoscaler -> N stateless service replicas"
  },
  {
    id: "database-storage",
    title: "Database Design and Storage",
    module: "Data",
    difficulty: "Intermediate",
    studyTime: "130 min",
    tags: ["HLD", "Backend", "Product Interview"],
    order: 10,
    summary: {
      simple: "Database design maps business queries to reliable storage structures.",
      why: "Schema and index choices dominate system performance.",
      example: "Read-heavy feeds may use denormalized tables for fast timeline fetches.",
      interview: "Defend SQL vs NoSQL with access patterns, not trends."
    },
    quiz: "Which query patterns signal a need for secondary indexing?",
    diagram: "App -> SQL / NoSQL -> Replica"
  },
  {
    id: "replication-sharding",
    title: "Data Replication and Partitioning",
    module: "Data",
    difficulty: "Advanced",
    studyTime: "120 min",
    tags: ["HLD", "Scalability", "Big Tech"],
    order: 11,
    summary: {
      simple: "Replication improves availability; sharding improves write and storage scale.",
      why: "Global systems require clear failure and rebalancing plans.",
      example: "Consistent hashing reduces key movement during cluster changes.",
      interview: "Discuss hot partitions and recovery tradeoffs explicitly."
    },
    quiz: "How does leaderless replication change conflict handling?",
    diagram: "Shard router -> Shard A/B/C"
  },
  {
    id: "caching-performance",
    title: "Caching and Performance",
    module: "Performance",
    difficulty: "Intermediate",
    studyTime: "100 min",
    tags: ["HLD", "Backend", "Scalability"],
    order: 12,
    summary: {
      simple: "Caching stores expensive results closer to where they are needed.",
      why: "Correct cache strategy can cut latency by orders of magnitude.",
      example: "Cache-aside is simple but needs invalidation discipline.",
      interview: "Explain cache consistency model before proposing Redis usage."
    },
    quiz: "What failure mode appears with stale cache + write-back?",
    diagram: "App <-> Cache <-> DB"
  },
  {
    id: "async-messaging",
    title: "Async Systems and Messaging",
    module: "Distributed Systems",
    difficulty: "Advanced",
    studyTime: "110 min",
    tags: ["HLD", "Backend", "Product Interview"],
    order: 13,
    summary: {
      simple: "Asynchronous messaging decouples producers and consumers for resilience.",
      why: "Queues protect services from traffic spikes and transient failures.",
      example: "Notification pipelines use retries and dead-letter queues for reliability.",
      interview: "Cover idempotency and ordering guarantees early."
    },
    quiz: "When is pub/sub better than point-to-point queues?",
    diagram: "Producer -> Broker -> Consumer groups"
  },
  {
    id: "interview-framework",
    title: "System Design Interview Framework",
    module: "Interview",
    difficulty: "Advanced",
    studyTime: "140 min",
    tags: ["LLD", "HLD", "Big Tech", "Service Interview"],
    order: 14,
    summary: {
      simple: "A framework keeps your answer structured under ambiguous prompts.",
      why: "Interview success depends on communication as much as architecture.",
      example: "Time-box requirements, estimate scale, draw high-level design, then deep dive.",
      interview: "Narrate tradeoffs and close with risk mitigation."
    },
    quiz: "What should you do if requirements remain unclear after initial questions?",
    diagram: "Reqs -> Estimate -> Design -> Deep Dive -> Wrap"
  },
  {
    id: "real-design-problems",
    title: "Real Design Problems",
    module: "Interview",
    difficulty: "Advanced",
    studyTime: "220 min",
    tags: ["HLD", "Big Tech", "Scalability", "Product Interview"],
    order: 15,
    summary: {
      simple: "Practice with realistic products builds confidence and pattern recognition.",
      why: "You learn to adapt principles to different scale and consistency needs.",
      example: "Rate limiter and URL shortener test core primitives and API decisions.",
      interview: "State assumptions, justify datastore, and discuss bottlenecks."
    },
    quiz: "For chat design, how would you choose consistency level for delivery state?",
    diagram: "API -> Services -> Cache/DB/Queue"
  }
];

window.LEARNING_PATHS = [
  {
    id: "beginner",
    name: "Beginner Path",
    description: "Start with foundations, build LLD confidence, then enter HLD basics.",
    topics: ["foundations-system-design", "ood-basics", "uml-modeling", "design-principles", "hld-fundamentals", "database-storage"]
  },
  {
    id: "service",
    name: "Service Company Path",
    description: "Focus on clean LLD modeling, practical tradeoffs, and clear communication.",
    topics: ["foundations-system-design", "ood-basics", "design-principles", "design-patterns", "lld-case-studies", "interview-framework"]
  },
  {
    id: "product",
    name: "Product Company Path",
    description: "Prioritize product metrics, scaling, data modeling, and async architecture.",
    topics: ["hld-fundamentals", "traffic-routing", "scaling-systems", "database-storage", "caching-performance", "async-messaging", "real-design-problems"]
  },
  {
    id: "big-tech",
    name: "Big Tech Interview Path",
    description: "Deep focus on scale, reliability, tradeoffs, and interview storytelling.",
    topics: ["hld-fundamentals", "replication-sharding", "caching-performance", "async-messaging", "interview-framework", "real-design-problems"]
  }
];

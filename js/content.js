/*
  SITE CONTENT: edit this file only to update the website.
  Everything on the page is rendered from this object.
  - Leave a link empty ("") to hide it.
  - To add screenshots to a project, put the image in /assets and add
    { src: "assets/your-folder/shot.png", alt: "...", caption: "..." } to its `screens` list.
*/
window.SITE_CONTENT = {
  meta: {
    title: "Sherif Hamada, Flutter Developer",
    description:
      "Portfolio of Sherif Hamada, a junior Flutter developer building Arabic-first mobile apps with Flutter and Dart.",
  },

  person: {
    name: "Sherif Hamada",
    firstName: "Sherif",
    lastName: "Hamada",
    role: "Flutter Developer",
    headline: "Mobile apps that look right and work the way people expect.",
    bio:
      "Junior Flutter developer building Arabic-first mobile apps with Flutter and Dart. Graduate of the Mobile Development Diploma at Route Academy, open to junior Flutter roles.",
    availability: "Open to junior Flutter Developer roles",
    email: "sherif80898@gmail.com",
    github: "https://github.com/sherifhamadaa",
    linkedin: "https://www.linkedin.com/in/sherif-hamada-281718390/",
  },

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "services", label: "What I do" },
    { id: "contact", label: "Contact" },
  ],

  about: {
    title: "A scientist by degree, a mobile developer by choice.",
    paragraphs: [
      "I graduated from the Faculty of Science at Al-Azhar University, then spent more than two years in remote technical support. That work taught me to take a vague complaint and turn it into a specific, fixable problem.",
      "I started programming with C++ and object-oriented design, then moved to Flutter and Dart through the Mobile Development Diploma at Route Academy. I like mobile because the result is something a person carries and uses every day, so details like spacing, speed and right-to-left text matter.",
      "When something breaks I read the error first, reduce the problem to the smallest case that fails, and fix the cause instead of the symptom. I keep code organised by feature so the next change is easy to find.",
    ],
    facts: [
      { label: "Education", value: "BSc, Faculty of Science, Al-Azhar University (2019 to 2024)" },
      { label: "Training", value: "Mobile Development Diploma, Route Academy (Nov 2026)" },
      { label: "Focus", value: "Flutter, Dart, Arabic-first interfaces" },
      { label: "Learning now", value: "State management, REST APIs, Firebase" },
    ],
  },

  skills: {
    title: "What I work with",
    intro: "Marked “in projects” means I have used it in code I wrote. “Learning” means I am still studying it.",
    primary: [
      { name: "Flutter", note: "Islamic App" },
      { name: "Dart", note: "Islamic App" },
    ],
    groups: [
      {
        title: "Programming languages",
        items: [
          { name: "Dart", level: "projects" },
          { name: "C++", level: "projects" },
        ],
      },
      {
        title: "Mobile development",
        items: [
          { name: "Flutter", level: "projects" },
          { name: "UI development", level: "projects" },
          { name: "Local storage", level: "projects" },
        ],
      },
      {
        title: "Frameworks and libraries",
        items: [
          { name: "shared_preferences", level: "projects" },
          { name: "iconsax_flutter", level: "projects" },
          { name: "State management", level: "learning" },
        ],
      },
      {
        title: "Backend and APIs",
        items: [
          { name: "REST APIs", level: "learning" },
          { name: "Firebase", level: "learning" },
        ],
      },
      {
        title: "Development tools",
        items: [
          { name: "Visual Studio", level: "projects" },
          { name: "File handling", level: "projects" },
          { name: "Data structures", level: "projects" },
        ],
      },
      {
        title: "Version control",
        items: [
          { name: "Git", level: "projects" },
          { name: "GitHub", level: "projects" },
        ],
      },
    ],
  },

  projects: [
    {
      id: "islamic-app",
      name: "Islamic App",
      kind: "Flutter mobile app",
      status: "In active development",
      theme: "dark",
      description:
        "An Arabic-first Quran reader that shows the text in Mushaf page layout. You can browse by surah, search Arabic text, bookmark a page and return to where you stopped.",
      highlights: [
        "Page-by-page Mushaf reader built on PageView.builder, with text and page mapping loaded from local assets.",
        "Surah index that jumps to the first page of each surah.",
        "Arabic search over surah names and verse text that ignores diacritics and letter variants.",
        "Last-read position and a page bookmark saved with shared_preferences.",
      ],
      note: "Prayer times and the verse of the day on the home screen are static placeholder content for now.",
      tech: ["Flutter", "Dart", "shared_preferences", "iconsax_flutter", "flutter_native_splash"],
      repo: "https://github.com/sherifhamadaa/islamic_app",
      demo: "",
      // Real screenshots go here. The first item is the app's actual splash artwork.
      screens: [
        {
          type: "image",
          src: "assets/islamic-app/splash.jpg",
          alt: "Islamic App splash screen: a lit archway over a mosque at night with the app name Islami",
          caption: "Splash screen",
        },
        {
          type: "search-demo",
          caption: "Search logic, live",
          note: "Web demo of the app's Arabic search normalisation on surah names. Not a screenshot.",
        },
      ],
    },
    {
      id: "route-bank-system",
      name: "Route Bank System",
      kind: "C++ desktop application",
      status: "Completed, Jun to Jul 2026",
      theme: "light",
      description:
        "A desktop banking application written in C++ to practise object-oriented design. Clients, employees and administrators each get their own level of access, and all data is stored in files.",
      highlights: [
        "Role-based access for clients, employees and administrators.",
        "Account creation, deposits, withdrawals, transfers and balance inquiries.",
        "Input validation on user entries.",
        "File-based persistent storage.",
      ],
      note: "",
      tech: ["C++", "OOP", "File handling", "Visual Studio"],
      repo: "", // Add the repository URL here when you want the button to link to it.
      demo: "",
      pillars: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
      screens: [], // Add screenshots here, for example { src: "assets/route-bank/menu.png", alt: "Main menu" }
    },
  ],

  journey: {
    title: "How I got here",
    items: [
      {
        date: "2019 to 2024",
        title: "BSc, Faculty of Science",
        place: "Al-Azhar University",
        text: "Completed my undergraduate degree.",
      },
      {
        date: "Dec 2021 to Feb 2024",
        title: "Technical support",
        place: "Angazny, remote",
        text: "Handled customer technical issues remotely and learned to describe a problem clearly enough to fix it.",
      },
      {
        date: "Dec 2025 to Nov 2026",
        title: "Customer Value Management",
        place: "Aura Communications, for Vodafone Egypt",
        text: "Analytical, customer-focused work alongside my studies in programming.",
      },
      {
        date: "Jun to Jul 2026",
        title: "Route Bank System",
        place: "C++ and OOP",
        text: "Built my first complete application, applying encapsulation, inheritance, abstraction and polymorphism.",
      },
      {
        date: "Nov 2026",
        title: "Mobile Development Diploma",
        place: "Route Academy",
        text: "Finished the diploma, focused on Flutter and Dart.",
      },
      {
        date: "Now",
        title: "Islamic App and next topics",
        place: "Flutter",
        text: "Developing the Quran reader and studying state management, REST APIs and Firebase.",
      },
    ],
  },

  services: {
    title: "What I can do for a team",
    items: [
      {
        title: "Build cross-platform mobile apps",
        text: "Flutter and Dart screens, navigation and local data, built from one codebase.",
        status: "Done in Islamic App",
      },
      {
        title: "Turn designs into responsive interfaces",
        text: "Careful layout, spacing and right-to-left Arabic text that holds up on different screen sizes.",
        status: "Done in Islamic App",
      },
      {
        title: "Keep code organised",
        text: "Feature-based folders and object-oriented structure so changes stay easy to find.",
        status: "Done in both projects",
      },
      {
        title: "Save data on the device",
        text: "Persist reading position, bookmarks and other state locally between sessions.",
        status: "Done in Islamic App",
      },
      {
        title: "Connect apps to APIs",
        text: "Fetching data from REST APIs and using Firebase services.",
        status: "Learning now",
      },
    ],
  },

  contact: {
    title: "Let's talk about a junior Flutter role.",
    text: "The fastest way to reach me is email. I reply to messages about jobs, internships and projects.",
  },

  footer: "Built by Sherif Hamada with plain HTML, CSS and JavaScript.",
};

import { v4 } from "uuid";

const notes = [
  {
    title: "Visual Learner Planner",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: [{ tag: "quotes", id: v4() }],
    color: "#cce0ff",
    priority: "high",
    isPinned: true,
    isRead: false,
    date: "2/12/24 10.55 PM",
    createdTime: new Date("Sat Dec 2 2024 22:55:22").getTime(),
    editedTime: null,
    id: v4(),
  },
  {
    title: "Why do we use it?",
    content:
      " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    tags: [{ tag: "quotes", id: v4() }],
    color: "#ffcccc",
    priority: "high",
    isPinned: true,
    isRead: false,
    date: "10/12/22 3.02 PM",
    createdTime: new Date("Sat Dec 10 2022 15:02:22").getTime(),
    editedTime: null,
    id: v4(),
  },
  {
    title: "Why do we use it?",
    content:
      " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    tags: [{ tag: "quotes", id: v4() }],
    color: "#ccffcc",
    priority: "high",
    isPinned: true,
    isRead: false,
    date: "10/12/22 3.02 PM",
    createdTime: new Date("Sat Dec 10 2022 15:02:22").getTime(),
    editedTime: null,
    id: v4(),
  },
   {
    title: "Why do we use it?",
    content:
      " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    tags: [{ tag: "education", id: v4() }],
    color: "#ccffcc",
    priority: "low",
    isPinned: false,
    isRead: false,
    date: "23/5/24 3.10 PM",
    createdTime: new Date("Thu May 23 2024 15:10:22").getTime(),
    editedTime: null,
    id: v4(),
  },
   {
    title: "Where does it come from?",
    content:
      " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    tags: [{ tag: "learning", id: v4() }],
    color: "#ffffcc",
    priority: "low",
    isPinned: false,
    isRead: false,
    date: "15/3/24 3.02 PM",
    createdTime: new Date("Wed Mac 15 2024 15:02:22").getTime(),
    editedTime: null,
    id: v4(),
  },
];

export default notes;
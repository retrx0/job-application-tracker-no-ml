export const testData = [
  {
    from: "Apple",
    address: "noreply@apple.com",
    via: "linkedIn",
    subject: "welcome to apple",
    date: Math.floor(new Date().getTime()),
  },
  {
    from: "Micorsoft",
    address: "noreply@microsoft.com",
    via: "Join.com",
    subject: "welcome to microsoft",
    date: Math.floor(new Date().getTime()),
  },
  {
    from: "Google",
    address: "noreply@agoogle.com",
    via: "Glassdoor",
    subject: "welcome to google",
    date: Math.floor(new Date().getTime()),
  },
  {
    from: "BlackRock",
    address: "noreply@blackrock.com",
    via: "Indeed",
    subject: "welcome to blackrock",
    date: Math.floor(new Date().getTime()),
  },
];

export var testDataWithSection = [
  {
    data: [
      {
        from: "Apple",
        address: "noreply@apple.com",
        via: "linkedIn",
        subject: "welcome to apple",
        date: Math.floor(new Date().getTime()),
      },
    ],
    sectionName: "Applied",
  },
  {
    data: [
      {
        from: "Micorsoft",
        address: "noreply@microsoft.com",
        via: "Join.com",
        subject: "welcome to microsoft",
        date: Math.floor(new Date().getTime()),
      },
    ],
    sectionName: "Rejected",
  },
  {
    data: [
      {
        from: "Google",
        address: "noreply@agoogle.com",
        via: "Glassdoor",
        subject: "welcome to google",
        date: Math.floor(new Date().getTime()),
      },
      {
        from: "BlackRock",
        address: "noreply@blackrock.com",
        via: "Indeed",
        subject: "welcome to blackrock",
        date: Math.floor(new Date().getTime()),
      },
    ],
    sectionName: "Interview",
  },
];

export var testEmptyDataWithSection = [
  {
    data: [],
    sectionName: "Applied",
  },
  {
    data: [],
    sectionName: "Rejected",
  },
  {
    data: [],
    sectionName: "Interview",
  },
];

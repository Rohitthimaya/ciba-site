/*
 * Link data for the TRU Generator page chrome (components/tru/TruShell.jsx).
 * Mirrors the navigation on https://www.tru.ca/generator.html.
 */

/** TRU's "Contact TRU Generator" form (hosted on tru.ca; submissions go to TRU). */
export const GENERATOR_CONTACT_FORM = "https://www.tru.ca/forms/generator/contact/";

/** Section menu under the banner. `key` is matched against TruShell's `active` prop. */
export const SECTION_NAV = [
  { key: "home", label: "TRU Generator", href: "/tru-generator" },
  { key: "events", label: "Events", href: "/tru-generator#calendar" },
  { key: "mentorship", label: "Mentorship", href: "/tru-generator#mentorship" },
  { key: "contact", label: "Contact Us", href: GENERATOR_CONTACT_FORM },
  { key: "resources", label: "Resources", href: "/tru-generator/resources" },
];

/** "TRU Menu" dropdown in the top bar. */
export const TRU_MENU = [
  { label: "TRU Home", href: "https://www.tru.ca" },
  { label: "Programs", href: "https://www.tru.ca/programs" },
  { label: "Future Students", href: "https://www.tru.ca/future" },
  { label: "Current Students", href: "https://www.tru.ca/current" },
  { label: "Open Learning", href: "https://www.tru.ca/distance" },
  { label: "Indigenous", href: "https://www.tru.ca/indigenous" },
  { label: "International", href: "https://www.tru.ca/truworld" },
  { label: "Research", href: "https://www.tru.ca/research" },
];

/** Right-hand links in the top bar. `className` drives TRU's tablet hiding rules. */
export const UTILITY_LINKS = [
  { className: "top-mytru", label: "myTRU", href: "https://mytru.tru.ca/" },
  { className: "top-about", label: "Library", href: "https://www.tru.ca/library" },
  { className: "top-careers", label: "Careers", href: "https://www.tru.ca/careers" },
  { className: "top-athletics", label: "Athletics", href: "https://gowolfpack.ca" },
  { className: "top-about", label: "About", href: "https://www.tru.ca/about" },
  { className: "top-contact", label: "Contact", href: "https://www.tru.ca/contact" },
  { className: "top-giving", label: "Giving", href: "https://www.tru.ca/giving.html" },
];

/** Search panel: each radio retargets the form, exactly as TRU's script does. */
export const SEARCH_MODES = [
  {
    id: "web-button",
    label: "Website",
    action: "https://search.tru.ca/s/search.html",
    method: "get",
    name: "query",
    placeholder: "Search the website...",
  },
  {
    id: "bquery",
    label: "Library",
    action: "http://search.ebscohost.com/login.aspx",
    method: "get",
    name: "bquery",
    placeholder: "Search the Library...",
    library: true,
  },
  {
    id: "programs-button",
    label: "Programs",
    action: "http://www.tru.ca/programs/search-result.html",
    method: "get",
    name: "query",
    placeholder: "Search for a program... (e.g. 'arts' or 'business')",
  },
  {
    id: "course-search",
    label: "Courses",
    action: "http://www.tru.ca/programs/courses.html",
    method: "get",
    name: "query",
    placeholder: "Search for a course... (e.g. 'ABTS' or 'accounting')",
  },
  {
    id: "person-button",
    label: "Find a Person",
    action: "https://eswebapps01pd.tru.ca/telbook/",
    method: "post",
    name: "query",
    placeholder: "Search for a person...",
  },
];

/** Hidden fields the Library (EBSCO) search needs; disabled for every other mode. */
export const LIBRARY_FIELDS = [
  ["direct", "true"],
  ["scope", "site"],
  ["site", "eds-live"],
  ["authtype", "ip,guest"],
  ["custid", "s5672243"],
  ["groupid", "main"],
  ["profile", "eds"],
];

/** Quick links under the search box, in four columns. */
export const QUICK_LINKS = [
  [
    { label: "A-Z Sitemap", href: "https://www.tru.ca/sitemap" },
    {
      label: "Course Schedule",
      href: "https://www.tru.ca/current/enrolment-services/course-schedule.html",
    },
  ],
  [
    {
      label: "Academic Calendars",
      href: "https://www.tru.ca/current/enrolment-services/calendar.html",
    },
    {
      label: "Dates & Deadlines",
      href: "https://www.tru.ca/current/enrolment-services/dates-deadlines.html",
    },
  ],
  [
    { label: "Wolfie's Campus Store", href: "https://thebookstore.tru.ca" },
    {
      label: "Course Registration",
      href: "https://www.tru.ca/current/enrolment-services/course-registration.html",
    },
  ],
  [
    { label: "Kamloops Campus Map", href: "https://www.tru.ca/map" },
    { label: "Faculty & Staff Links", href: "https://www.tru.ca/staff" },
  ],
];

/** Buttons at the top of the phone slide-out menu. */
export const MOBILE_CTAS = [
  { label: "Apply now", href: "https://www.tru.ca/future/admissions.html" },
  {
    label: "Register",
    href: "https://www.tru.ca/current/enrolment-services/course-registration.html",
  },
];

/** Accordions in the phone slide-out menu. */
export const MOBILE_MENU = [
  {
    label: "Programs",
    links: [
      { label: "All Programs", href: "https://www.tru.ca/programs" },
      { label: "Courses", href: "https://www.tru.ca/programs/courses" },
      { label: "Faculties and Schools", href: "https://www.tru.ca/programs/schools" },
      { label: "Trade Programs", href: "https://www.tru.ca/trades/trades-programs.html" },
      { label: "Graduate Programs", href: "https://www.tru.ca/programs/graduate" },
      { label: "Adult Basic Education", href: "https://www.tru.ca/programs/abe.html" },
      { label: "Study English", href: "https://www.tru.ca/programs/esl" },
      { label: "Community Programs", href: "https://www.tru.ca/programs/community" },
    ],
  },
  {
    label: "Future Students",
    links: [
      { label: "Future Students Home", href: "https://www.tru.ca/future" },
      { label: "Apply for Admission", href: "https://www.tru.ca/future/admissions.html" },
      { label: "Tuition and Fees", href: "https://www.tru.ca/future/tuition.html" },
      { label: "Entrance scholarships", href: "https://www.tru.ca/future/tuition/funding.html" },
      { label: "Visit and Events", href: "https://www.tru.ca/future/visit.html" },
      { label: "Housing", href: "https://www.tru.ca/future/housing.html" },
      { label: "Contact Us", href: "https://www.tru.ca/future/contact.html" },
    ],
  },
  {
    label: "Current Students",
    links: [
      { label: "Current Students Home", href: "https://www.tru.ca/current" },
      { label: "Enrolment Services", href: "https://www.tru.ca/current/enrolment-services.html" },
      { label: "Student Awards & Financial Aid", href: "https://www.tru.ca/awards.html" },
      { label: "Student Life", href: "https://www.tru.ca/current/student-life.html" },
      { label: "Academic Supports", href: "https://www.tru.ca/current/academic-supports.html" },
      { label: "Health & Wellness", href: "https://www.tru.ca/current/wellness.html" },
      { label: "Diversity & Equity", href: "https://www.tru.ca/vpacademic/edi-ar-office.html" },
      {
        label: "Career & Experiential Learning",
        href: "https://www.tru.ca/current/jobs-careers.html",
      },
      { label: "Campus Services", href: "https://www.tru.ca/current/campus-services.html" },
    ],
  },
  {
    label: "Open Learning",
    links: [
      { label: "TRU Open Learning Home", href: "https://www.tru.ca/distance" },
      { label: "Programs", href: "https://www.tru.ca/distance/programs" },
      { label: "Courses", href: "https://www.tru.ca/distance/courses/" },
      { label: "Registration", href: "https://www.tru.ca/distance/register" },
      { label: "Student Information", href: "https://www.tru.ca/distance/services" },
      { label: "FAQs", href: "https://www.tru.ca/distance/faq" },
      {
        label: "Prior Learning Assessment and Recognition",
        href: "https://www.tru.ca/distance/plar-ol",
      },
      { label: "Transfer Credit", href: "https://www.tru.ca/distance/transfer-options.html" },
    ],
  },
  {
    label: "Indigenous",
    links: [
      { label: "Indigenous Home", href: "https://www.tru.ca/indigenous.html" },
      { label: "Future Students", href: "https://www.tru.ca/indigenous/future-students.html" },
      { label: "Current Students", href: "https://www.tru.ca/indigenous/current-students.html" },
      { label: "Coyote Project", href: "https://www.tru.ca/indigenous/coyote.html" },
      { label: "Initiatives", href: "https://www.tru.ca/indigenous/initiatives.html" },
      { label: "Research", href: "https://www.tru.ca/indigenous/research.html" },
      { label: "News and Events", href: "https://www.tru.ca/indigenous/news.html" },
      { label: "Indigenous Centre", href: "https://www.tru.ca/giving/indigenous-centre.html" },
      {
        label: "Office of Aboriginal Affairs",
        href: "https://www.tru.ca/indigenous/indigenous-education-team.html",
      },
    ],
  },
  {
    label: "International",
    links: [
      { label: "International Home", href: "https://www.tru.ca/truworld.html" },
      { label: "Study at TRU", href: "https://www.tru.ca/truworld/future-students.html" },
      { label: "Programs", href: "https://www.tru.ca/truworld/future-students/programs.html" },
      { label: "Apply Now", href: "https://www.tru.ca/future/admissions/international.html" },
      { label: "Housing", href: "https://www.tru.ca/truworld/new-students/accommodations.html" },
      {
        label: "Dates and Fees",
        href: "https://www.tru.ca/truworld/future-students/dates-fees.html",
      },
      { label: "Short-term ESL and Training", href: "https://www.tru.ca/truworld/short-term.html" },
    ],
  },
  {
    label: "Research",
    links: [
      { label: "Research Home", href: "https://www.tru.ca/research" },
      { label: "Graduate Studies", href: "https://www.tru.ca/research/graduate-studies" },
      {
        label: "Undergraduate Research",
        href: "https://www.tru.ca/research/undergraduate-research",
      },
      { label: "Faculty Services", href: "https://www.tru.ca/research/research-services" },
      {
        label: "Funding Opportunities",
        href: "https://www.tru.ca/research/research-services/research-services-faculty/faculty-research-funding",
      },
      { label: "Research News", href: "https://inside.tru.ca/category/research" },
      { label: "TRU Wildfire", href: "https://www.tru.ca/wildfire.html" },
    ],
  },
];

/** Footer link columns. The first (untitled) list sits under the FIND / YOUR / TRU motto. */
export const FOOTER_MOTTO_LINKS = [
  { label: "Terms & Privacy", href: "https://www.tru.ca/disclaimer" },
  { label: "Emergency Information", href: "https://www.tru.ca/alerts" },
  { label: "Accreditation", href: "https://www.tru.ca/about/accreditation" },
  { label: "TRU Policy", href: "https://www.tru.ca/policy" },
  {
    label: "Accessibility Feedback",
    href: "https://www.tru.ca/contact/accessibility-feedback.html",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Information",
    links: [
      { label: "Current Students", href: "https://www.tru.ca/current" },
      { label: "Prospective Students", href: "https://www.tru.ca/future" },
      { label: "TRU Open Learning Students", href: "https://www.tru.ca/distance" },
      { label: "Faculty & Staff", href: "https://www.tru.ca/staff" },
      { label: "Alumni", href: "https://www.tru.ca/alumni" },
      { label: "Donors", href: "https://www.tru.ca/foundation" },
      { label: "Media", href: "https://www.tru.ca/marcom/media/info" },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Financial Aid", href: "https://www.tru.ca/awards" },
      { label: "Library", href: "https://www.tru.ca/library" },
      { label: "Wolfie's Campus Store", href: "https://thebookstore.tru.ca/" },
      { label: "Student Email", href: "http://mywebmail.mytru.ca/" },
      { label: "Moodle", href: "https://moodle.tru.ca/" },
      { label: "IT Support", href: "https://www.tru.ca/its" },
      { label: "All Student Services", href: "https://tru.ca/current.html" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Careers at TRU", href: "https://www.tru.ca/careers" },
      { label: "News & Events", href: "http://inside.tru.ca/" },
      { label: "Parking", href: "https://www.tru.ca/transportation/parking.html" },
      { label: "Conference Centre", href: "https://www.tru.ca/conferencecentre" },
      { label: "Find a space", href: "https://www.tru.ca/about/campuses/roombookings" },
      { label: "Tours", href: "https://www.tru.ca/future/visit" },
      { label: "Campus Map", href: "https://www.tru.ca/map.html" },
    ],
  },
];

export const FOOTER_SOCIALS = [
  { icon: "instagram", label: "TRU Instagram", href: "https://instagram.com/thompsonriversu" },
  { icon: "tiktok", label: "TRU TikTok", href: "https://www.tiktok.com/@thompsonriversu" },
  {
    icon: "youtube",
    label: "TRU YouTube",
    href: "https://www.youtube.com/ThompsonRiversUniversityOfficial",
  },
  { icon: "facebook", label: "TRU Facebook", href: "https://www.facebook.com/thompsonriversu" },
  {
    icon: "linkedin",
    label: "TRU LinkedIn",
    href: "https://ca.linkedin.com/school/thompson-rivers-university/",
  },
  {
    icon: "wolfpack",
    label: "TRU WolfPack Athletics",
    href: "https://www.gowolfpack.ca/",
    className: "social-wolfpack",
  },
];

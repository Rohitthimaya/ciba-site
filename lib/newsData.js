import { dummyImage } from "@/lib/siteImages";

/* News posts — listing + individual article pages.
   Drop photos into public/images/news/ as news-1 … news-13
   (any of .jpg/.jpeg/.png/.webp). */

/**
 * Block types for article body:
 *   { type: "p", text }
 *   { type: "h2", text }
 *   { type: "quote", text }
 *   { type: "ul", items: string[] }
 *   { type: "ol", items: string[] }
 *   { type: "about", title, text }
 */

export const NEWS = [
  {
    slug: "new-executive-director",
    base: "images/news/news-1",
    fallback: dummyImage("ciba-n1", 900, 600),
    tag: "Announcement",
    title: "Central Interior Business Accelerator Appoints New Executive Director",
    text: "Visionary leader brings 15+ years of experience driving regional innovation and sustainable economic growth.",
    date: "May 20, 2025",
    readTime: "2 min read",
    views: 453,
    likes: 3,
    author: "CIBA",
    blocks: [
      {
        type: "p",
        text: "KAMLOOPS, BC – May 20, 2025 – The Central Interior Business Accelerator (CIBA) is pleased to announce the appointment of Sachin Singh as its new Executive Director, effective May 19th, 2025. Singh brings over 15 years of experience driving growth and fostering inclusive innovation across technology, agriculture, and startup ecosystems.",
      },
      {
        type: "p",
        text: "As a seasoned entrepreneur and TRU alumnus with an MBA from Thompson Rivers University, Singh has a proven track record of scaling startups and building strategic partnerships between academia, industry, and government. His previous roles at SAP Canada, Farm FinTech, and Agro Sapiens highlight his expertise in securing investments, designing AI-powered solutions, and creating impactful partnerships with Indigenous communities and global organizations.",
      },
      {
        type: "p",
        text: '"We are thrilled to welcome Sachin as our new Executive Director," said Fiona Chan, Board Chair of CIBA. "His vision for transforming Kamloops into a technology hub, combined with his commitment to fostering collaboration with regional stakeholders, makes him the ideal leader to advance CIBA\'s mission of catalyzing innovation and economic growth across the Thompson-Nicola and South Cariboo regions."',
      },
      {
        type: "p",
        text: 'As a PMP®-certified professional, Singh has successfully mentored over 10 ventures and is guided by the principle: "Invest in the success of others—when you help someone up a mountain, you\'ll find yourself close to the summit too." His leadership priorities include:',
      },
      {
        type: "ul",
        items: [
          "Strengthening collaboration with Thompson Rivers University",
          "Launching regional micro-hubs to expand CIBA's reach",
          "Attracting funding to fuel sustainable startup growth",
          "Creating impactful partnerships across sectors and regions",
        ],
      },
      {
        type: "p",
        text: '"I am honoured to lead CIBA at this pivotal moment in our region\'s economic development," said Singh. "Together with our partners across the Thompson-Nicola and South Cariboo regions, we will build an inclusive innovation ecosystem that creates meaningful opportunities for entrepreneurs while driving sustainable economic growth for our communities."',
      },
      {
        type: "p",
        text: "Singh's appointment comes at a strategic time as CIBA continues to expand its programs and services to support entrepreneurs and businesses throughout central British Columbia. His expertise in technology-driven solutions and experience working with diverse stakeholders positions CIBA to accelerate regional economic development while fostering innovation, equity, and job creation.",
      },
      {
        type: "about",
        title: "About Central Interior Business Accelerator (CIBA)",
        text: "For over a decade, the Central Interior Business Accelerator (CIBA) has empowered startups, growth-stage, and scaling companies to thrive and evolve. Since 2012, we've supported more than 100 ventures, created over 150 jobs, generated over $40 million in revenue, and secured approximately $10 million in new investment. Our one-on-one mentorship has guided over 300 entrepreneurs on their journey to success. Our programs foster valuable connections with seasoned mentors, advisors, and industry experts. We provide customized business training in strategy, finance, market validation, marketing, technology integration, and communications. Our expanding network offers access to entrepreneurs, investors, potential partners, and industry connections. We are dedicated to nurturing the business ecosystem across the Thompson-Nicola Regional District and South Cariboo. Additionally, we power the TRU Generator, the on-campus accelerator at Thompson Rivers University, where we stimulate innovation by streamlining pathways to research and commercialization for industry, students, and faculty at TRU.",
      },
    ],
    mediaContact: {
      name: "Sachin Singh",
      role: "Executive Director",
      org: "Central Interior Business Accelerator",
      phone: "250-434-2234",
      email: "executivedirector@acceleratebusiness.ca",
      website: "https://acceleratebusiness.ca",
    },
  },

  {
    slug: "ai-skills-accelerator-launch",
    base: "images/news/news-2",
    fallback: dummyImage("ciba-n2", 900, 600),
    tag: "Press Release",
    title:
      "AI Skills Accelerator program launches to help small and medium-sized businesses harness the power of AI",
    text: "For Immediate Release — April 1, 2025. CIBA launches the Discovery Foundation's AI Skills Accelerator for SMEs across the Thompson, Nicola, and Cariboo regions.",
    date: "Apr 1, 2025",
    readTime: "2 min read",
    views: 163,
    likes: 1,
    author: "CIBA",
    blocks: [
      { type: "p", text: "For Immediate Release — April 1, 2025" },
      {
        type: "p",
        text: "KAMLOOPS, BC – Central Interior Business Accelerator (CIBA) is pleased to announce the launch of the Discovery Foundation's AI Skills Accelerator program, building on the success of last year's pilot initiative. This expanded program is designed to support small and medium-sized businesses throughout the Thompson, Nicola, and Cariboo regions in learning about and integrating no-code AI solutions to enhance their operations and competitiveness.",
      },
      {
        type: "p",
        text: "The AI Skills Accelerator program will offer comprehensive support through hybrid workshops, one-on-one mentorship, hands-on labs, and a summit event. The program aims to make AI more accessible to businesses without requiring extensive coding knowledge, helping them streamline operations, increase efficiency, and drive innovation.",
      },
      {
        type: "p",
        text: '"AI adoption is no longer optional for businesses that want to remain competitive," said Michael Andrews, Executive Director of CIBA. "Our expanded program will build on last year\'s success, enabling more businesses to integrate AI tools that can save time, boost efficiency, and help them focus on mission-critical tasks that require human expertise."',
      },
      {
        type: "quote",
        text: "Last year's participants reported significant benefits, with some businesses saving up to 100 hours per month by integrating AI into a single workflow.",
      },
      {
        type: "p",
        text: "The initiative also provides valuable opportunities for computer science and engineering students at Thompson Rivers University (TRU) to gain practical experience by leading workshops and providing technical support to participating businesses.",
      },
      {
        type: "p",
        text: '"It\'s a win-win opportunity for both businesses and our students," said Kevin O\'Neil, Computer Science faculty and project liaison at TRU. "The businesses gain essential AI skills while our students build valuable real-world experience that will help advance their careers."',
      },
      { type: "p", text: "The program will include:" },
      {
        type: "ul",
        items: [
          "Monthly workshops on specific AI tools and techniques specific to small businesses",
          "120 hours of personalized one-on-one mentorship to integrate AI solutions",
          "In-person hands-on labs at TRU led by upper year Computer Science students",
          "Business summit featuring expert panels",
          "TRU student competition focused on developing AI-driven solutions for key sectors",
        ],
      },
      {
        type: "p",
        text: "Last year's participants reported significant benefits, with some businesses saving up to 100 hours per month by integrating AI into a single workflow. The expanded 2025 program aims to reach more businesses and deepen the impact of AI adoption across the region.",
      },
      {
        type: "p",
        text: "The AI Skills Accelerator will run from April through December 2025, with regular workshops, mentorship opportunities, and special events throughout the program period.",
      },
      {
        type: "about",
        title: "About Central Interior Business Accelerator",
        text: "Central Interior Business Accelerator (previously, Kamloops Innovation) supports emerging and established organizations throughout the Thompson, Nicola, and Cariboo regions of British Columbia. We focus on new business start-ups that need support and guidance as well as seasoned entrepreneurs who want to take their business to the next level. For more information, visit acceleratebusiness.ca.",
      },
      {
        type: "about",
        title: "About the Discovery Foundation",
        text: "A registered charity, the Discovery Foundation has been a committed champion and enabler of the science and technology sector in BC since its formation in 1979. Its principal activity is the delivery of the Technology Education Program via agents that provide education and guidance to entrepreneurs in BC. For more information, visit discoveryfoundation.ca/tep-programs.",
      },
      {
        type: "p",
        text: "This program is made possible through funding provided by the Discovery Foundation's Technology Education Program.",
      },
    ],
    mediaContact: {
      name: "Michael Andrews",
      role: "Executive Director",
      org: "Central Interior Business Accelerator",
      phone: "250-434-2234",
      email: "executivedirector@acceleratebusiness.ca",
      website: "https://acceleratebusiness.ca",
    },
  },

  {
    slug: "swelaps-market-smart-technology",
    base: "images/news/news-3",
    fallback: dummyImage("ciba-n3", 900, 600),
    tag: "Success Story",
    title: "How Sweláps Market Transformed Their Business with Smart Technology Solutions",
    text: "In the competitive grocery industry, independent stores often struggle to match large chains — Sweláps Market shows how the right technology can change that.",
    date: "Mar 18, 2025",
    readTime: "3 min read",
    views: 87,
    likes: 1,
    author: "CIBA",
    blocks: [
      {
        type: "p",
        text: "In the competitive grocery industry, independent stores often struggle to match the efficiency and capabilities of large chains. Sweláps Market, however, has discovered that with the right technology solutions, even a community-focused grocery store can operate with remarkable efficiency while preserving its personal touch.",
      },
      { type: "h2", text: "The Challenge: Too Much to Do, Too Little Time" },
      {
        type: "p",
        text: "Like many small businesses, Sweláps Market found themselves constrained by time-consuming manual processes. Management spent hours organizing strategy notes, creating safety documents, managing customer data, and tracking product information for their \"Made in Canada\" initiative.",
      },
      {
        type: "p",
        text: '"If I had to manually enter all of those, that would be very time-consuming," explains Kara, the store\'s General Manager. With no extra hours in the day, these administrative burdens were limiting their ability to focus on growth and customer service while competing against larger corporate chains.',
      },
      { type: "h2", text: "Smart Solutions for Real Problems" },
      {
        type: "p",
        text: "Central Interior Business Accelerator worked with Sweláps to identify specific pain points and implement targeted technology solutions:",
      },
      {
        type: "ul",
        items: [
          "AI-Powered Documentation: Instead of spending hours transcribing meeting notes, they now capture whiteboard images and use AI to organize them into actionable plans.",
          "Streamlined Safety Protocols: AI assists in generating comprehensive safety documents and standard operating procedures.",
          "Customer Data Analysis: New systems analyze geographic trends based on postal codes, providing valuable insights into their customer base and shopping patterns.",
          "Digital Loyalty Program: Their upcoming loyalty solution will replace outdated hardware, integrating with their point-of-sale system to capture detailed purchasing data while offering customers greater convenience.",
        ],
      },
      { type: "h2", text: "Implementation That Works" },
      {
        type: "p",
        text: "Rather than overwhelming staff with technological change, CIBA helped Sweláps implement these solutions gradually, starting with the highest-impact areas. Training was provided in manageable steps, with systems refined through feedback and iteration.",
      },
      {
        type: "p",
        text: '"When you use the tools right they are very helpful... otherwise it would have been me sitting at home typing it all out, you know, hours on end," Kara explains, highlighting the practical time savings.',
      },
      {
        type: "p",
        text: "This measured approach extends to their upcoming online shopping capabilities, with a \"soft launch\" planned before the full rollout to ensure systems work flawlessly for customers.",
      },
      {
        type: "quote",
        text: 'Sweláps Market proves that "every business is a technology business. They just don\'t know it yet," asserts John Zubak, the CIBA Entrepreneur-in-Residence working with Kara and her team.',
      },
      { type: "h2", text: "Remarkable Results" },
      {
        type: "p",
        text: "The technology integration has delivered impressive benefits across Sweláps' operations:",
      },
      {
        type: "ul",
        items: [
          "Time Reclaimed: Tasks that once consumed hours now take minutes, freeing staff to focus on customer service and business development.",
          "Deeper Customer Insights: Data analysis provides a clearer picture of who shops at Sweláps and what they're buying.",
          "Targeted Marketing: Promotions can now be tailored based on customer preferences and shopping history.",
          "Enhanced Product Management: Their \"Made in Canada\" initiative is easier to manage and promote.",
          "Measurable Growth: Despite operating in traditionally slow months, Sweláps has seen consistent sales growth with their average basket size trending higher.",
        ],
      },
      {
        type: "p",
        text: '"The introduction to AI has been amazing," says Kara, summing up the transformation they\'ve experienced.',
      },
      { type: "h2", text: "The Lesson for Every Business" },
      {
        type: "p",
        text: "Sweláps Market proves that you don't need to be a tech company to benefit from technological solutions. By identifying specific pain points, implementing targeted solutions, and maintaining focus on their unique value proposition, they've achieved greater efficiency while enhancing what makes them special.",
      },
      {
        type: "p",
        text: "Is your business ready to explore how similar technology solutions could address your specific challenges? Contact us today to discover how we can help you identify and implement the right technologies for your unique business needs.",
      },
    ],
  },

  {
    slug: "kamloops-innovation-becomes-ciba",
    base: "images/news/news-4",
    fallback: dummyImage("ciba-n4", 900, 600),
    tag: "Announcement",
    title: "Kamloops Innovation Evolves into Central Interior Business Accelerator",
    text: "Expanded mandate, regional focus, and inclusive business support — a new era of acceleration for B.C.'s Central Interior.",
    date: "Mar 13, 2025",
    readTime: "2 min read",
    views: 130,
    likes: 1,
    author: "CIBA",
    blocks: [
      {
        type: "p",
        text: "Expanded Mandate, Regional Focus, and Inclusive Business Support",
      },
      {
        type: "p",
        text: "A new era of business acceleration and innovation has arrived in British Columbia's Central Interior. On March 11, at a special community reception, the staff and Board officially unveiled the new name and brand: Central Interior Business Accelerator (CIBA). This transformation reflects CIBA's expanded mandate, broader geographic reach, and commitment to driving business success across all industries, including non-profits, municipalities, and educational institutions.",
      },
      {
        type: "p",
        text: '"Our mandate to support and grow the business ecosystem beyond Kamloops and into the wider Central Interior region made it clear that our identity needed to reflect our broader vision," said CIBA\'s Board Chair, Fiona Chan. "We are excited to have the opportunity to work with more and more entrepreneurs no matter where they are in their lifecycle."',
      },
      {
        type: "p",
        text: "For over a decade, Kamloops Innovation (KIC) played an important role in fostering entrepreneurship, guiding startups, and connecting organizational founders with essential resources. Now, as the Central Interior Business Accelerator, the organization seeks to deepen its impact, ensuring businesses of all sizes and stages have access to the mentorship, technology integration, and strategic guidance they need to thrive in today's rapidly evolving market. CIBA has already been working in collaboration with other business support organizations to align their services to enhance and amplify, rather than duplicate.",
      },
      {
        type: "quote",
        text: "CIBA is a regional innovation hub dedicated to empowering organizations through technology, strategy, and investment readiness to thrive and transform.",
      },
      {
        type: "p",
        text: '"We are much more than a startup accelerator—we are a regional innovation hub dedicated to empowering businesses and organizations through technology, strategy, and investment readiness to thrive and transform," shared Michael Andrews, Executive Director of CIBA. "We believe that fostering a strong entrepreneurial ecosystem will benefit everyone. By expanding our network of mentors, partners, and industry leaders, we are enhancing access to the resources and expertise that drive innovation."',
      },
      { type: "p", text: "CIBA serves a diverse range of stakeholders:" },
      {
        type: "ul",
        items: [
          "Startups & Scaleups: support business validation, growth, and commercialization.",
          "Mature Businesses: help established companies improve workflows and integrate technology, including AI.",
          "Non-profits & Public Institutions: enhance operational efficiency and digital transformation.",
          "Municipalities & Regional Districts: drive regional economic development through innovation.",
        ],
      },
      {
        type: "p",
        text: "CIBA invites business leaders, entrepreneurs, and community partners to connect to see how the organization can assist them plus attend upcoming events.",
      },
      {
        type: "p",
        text: '"The future of business in the Central Interior is accelerated, innovative, and connected," noted Andrews. "We\'re ready when you are. Let\'s get started."',
      },
    ],
  },

  {
    slug: "mybrokerpro-ai-journey",
    base: "images/news/news-5",
    fallback: dummyImage("ciba-n5", 900, 600),
    tag: "Success Story",
    title: "Transformative Power of Mentorship + AI: MyBrokerPro's AI Journey",
    text: "How Discovery Foundation mentorship helped Sarah Mathieu of MyBrokerPro integrate AI and reclaim nearly 50 hours a month.",
    date: "Dec 3, 2024",
    readTime: "2 min read",
    views: 90,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "Small businesses must constantly seek ways to optimize operations, enhance efficiency, and ultimately, achieve sustainable growth. The Discovery Foundation's Applied AI for Business and Education project, delivered by Kamloops Innovation, aims to make AI more accessible to businesses and individuals. The project's mentorship program is playing a crucial role in empowering entrepreneurs like Sarah Mathieu from MyBrokerPro to leverage AI for success.",
      },
      {
        type: "p",
        text: "Sarah, the owner of My Broker Pro, has been actively participating in the project's mentorship program, which pairs business owners with AI specialists. The program has provided Sarah with invaluable guidance and support, enabling her to integrate AI seamlessly into her business operations.",
      },
      {
        type: "p",
        text: "Before joining the program, Sarah's business faced several time-consuming challenges, including extensive copywriting and manual customer support. She was already using AI to a limited extent but recognized the need to expand her knowledge and application of AI tools. The mentorship program offered a personalized approach to address her specific business needs.",
      },
      {
        type: "quote",
        text: '"Honestly, for businesses thinking of taking this program, it was almost life-changing for me and I think it\'s something that everybody should be a part of."',
      },
      {
        type: "p",
        text: "The mentorship program provided Sarah with one-on-one sessions with an AI specialist who helped her identify and prioritize the areas where AI could make the most significant impact. Sarah's mentor helped her understand how to build custom GPTs, a powerful AI tool she had not previously utilized. Working collaboratively, they developed a custom GPT for customer support, which has significantly reduced the workload on her team, providing customers with instant answers to their questions and freeing up her team to focus on more complex tasks.",
      },
      {
        type: "quote",
        text: '"After we created the custom GPT, I was able to shave almost 50 hours a month," noted Sarah.',
      },
      {
        type: "p",
        text: "Sarah also used custom GPTs to streamline her content creation process, resulting in a significant reduction in time spent on marketing tasks.",
      },
      {
        type: "p",
        text: "As demonstrated by Sarah's experience, the Discovery Foundation's Applied AI for Business and Education project is making a real difference by equipping entrepreneurs with the knowledge, tools, and support they need to thrive in the rapidly evolving technological landscape.",
      },
      {
        type: "p",
        text: "For businesses hesitant to adopt AI, Sarah emphasizes its crucial role in the future of business operations. Sarah highlighted the program's impact on her team's efficiency and her ability to focus on strategic business growth. By delegating tasks to her team, Sarah has been able to work \"on\" her business rather than \"in\" her business, a crucial shift for any entrepreneur seeking sustainable success.",
      },
      {
        type: "p",
        text: "Kamloops Innovation's commitment to fostering AI adoption through mentorship not only enhances individual businesses but also strengthens the broader economic landscape. By empowering entrepreneurs like Sarah, Kamloops Innovation contributes to a more innovative and competitive business ecosystem.",
      },
      {
        type: "p",
        text: "Learn more about the Discovery Foundation and its Technology Education Program.",
      },
    ],
  },

  {
    slug: "imagine-the-room",
    base: "images/news/news-6",
    fallback: dummyImage("ciba-n6", 900, 600),
    tag: "Success Story",
    title: "Spotlight on Imagine the Room: A Journey of Business Innovation and Growth",
    text: "From a TRU pitch win to 2.5× revenue growth — how mentorship helped Tanner Sherwood build a sustainable custom-closet business.",
    date: "Sep 16, 2024",
    readTime: "3 min read",
    views: 85,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      { type: "h2", text: "Early Beginnings" },
      {
        type: "p",
        text: "Imagine the Room began with a bold vision led by Tanner Sherwood, who made his entry into the business world by winning the Scotiabank business pitch competition at Thompson Rivers University (TRU). Tanner pitched the concept of Imagine the Room as a franchise operation, focusing on expanding the \"custom closet empire.\" This early win set the stage for Tanner's future endeavours and his journey with Kamloops Innovation.",
      },
      { type: "h2", text: "Connecting with Kamloops Innovation" },
      {
        type: "p",
        text: "Driven by a vision to develop a custom software solution for his business, Tanner reached out to Kamloops Innovation. His goal was to create a software system that could communicate effectively with their CNC machinery, something that didn't exist at the time. This initial connection marked the beginning of a fruitful partnership between Imagine the Room and Kamloops Innovation's Venture Acceleration Program (VAP) and entrepreneur-in-residence John Zubak. The VAP is funded through Innovate BC.",
      },
      { type: "h2", text: "Business Expansion and Revenue Growth" },
      {
        type: "p",
        text: "Over the past five years, Imagine the Room has seen remarkable growth under the guidance of Kamloops Innovation and Zubak. The company has successfully doubled its size, both in terms of staff and operational capacity, and achieved a two-and-a-half times increase in revenue. This impressive expansion is a testament to their commitment to innovation and strategic business development.",
      },
      {
        type: "quote",
        text: "Imagine the Room has seen remarkable growth under the guidance of Kamloops Innovation.",
      },
      {
        type: "p",
        text: "A significant part of Imagine the Room's growth story includes expanding to new locations and launching new product lines to diversify its offerings. Notable milestones include their recent venture into providing \"Simply Suite Kitchens,\" showcasing their ability to pivot and adapt to market demands.",
      },
      { type: "h2", text: "Steady and Sustainable Growth" },
      {
        type: "p",
        text: "Rather than chasing quick wins or \"overnight success,\" Imagine the Room has prioritized steady, sustainable growth. This approach has allowed them to build a solid foundation, ensuring resilience against market fluctuations and creating opportunities for future expansion.",
      },
      {
        type: "p",
        text: '"We always hear success stories about people having that magic thing that doubles or triples in size. But the majority of solid businesses grow steadily and they grow smart, and they grow in a way that they leave themselves opportunities if market conditions change. We need to talk more about healthy companies, that are solid, that are sustainable, and that are going to be around because that is what\'s built our country," notes Zubak.',
      },
      { type: "h2", text: "Combining human skills with the latest technology" },
      {
        type: "p",
        text: "Imagine the Room has embraced a unique approach by combining traditional business skills with modern technology. With guidance from Kamloops Innovation, they have integrated essential soft skills like effective communication and relationship-building with advanced tools such as AI and CRM software. For example, they have leveraged AI tools and CRM software to quickly handle client reviews and inquiries, saving valuable time and reducing stress.",
      },
      {
        type: "quote",
        text: "Imagine the Room has embraced a unique approach by combining traditional business skills with modern technology.",
      },
      {
        type: "p",
        text: "Imagine the Room focuses on understanding the needs of its clients and contractors, shifting from simply making sales to building authentic, long-term relationships. This customer-centric philosophy has been crucial in fostering trust and loyalty, driving sustainable growth for the company.",
      },
      { type: "h2", text: "Continuing Partnership with Kamloops Innovation" },
      {
        type: "p",
        text: "The partnership with Kamloops Innovation remains a cornerstone of Imagine the Room's strategy. The ongoing mentorship helps Tanner navigate the challenges of running a business and explore new growth opportunities. He notes, \"I feel like I'm always having to innovate to survive and thrive.\"",
      },
      {
        type: "p",
        text: '"When I first came to Kamloops Innovation, I was looking for a little bit of a magic bullet. I was not looking for more hard things to do," says Sherwood, "But it\'s good because if you have a mentor to encourage you to do those hard things, you\'re forced to do hard things."',
      },
      { type: "h2", text: "Future-proofing the business" },
      {
        type: "p",
        text: "Doing the hard thing sometimes means pivoting your business towards other opportunities. With Kamloops Innovation's guidance, this has taken the form of using their technology and manufacturing prowess to create Simply Suite Kitchens. Sherwood notes this strategy is a way of \"future-proofing\" the business. \"That's what I'm always looking for and why I continue the relationship with Kamloops Innovation,\" says Sherwood.",
      },
      {
        type: "p",
        text: "Imagine the Room exemplifies how innovation, mentorship, and strategic partnerships can fuel growth. With a solid foundation and a commitment to continuous improvement, they are well on their way to achieving even greater success in the years to come.",
      },
    ],
  },

  {
    slug: "centered-space-organizing",
    base: "images/news/news-7",
    fallback: dummyImage("ciba-n7", 900, 600),
    tag: "Success Story",
    title: "How an Organizing Professional Transformed Her Business with Kamloops Innovation",
    text: "Kate Kalnin of Centered Space Organizing found the coach and accountability she needed to work on her business — not just in it.",
    date: "Jun 13, 2024",
    readTime: "3 min read",
    views: 162,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "At the start of the global pandemic four years ago, Kate Kalnin made the transformative decision to pivot from working in interior design to launching her professional organizing business, \"Centered Space Organizing\". The shift not only marked a change in her career path but also set her on a journey of personal and professional growth.",
      },
      {
        type: "p",
        text: "In September 2023, Kate joined Kamloops Innovation's mentorship program, where she has since benefited from essential support and guidance from entrepreneur-in-residence John Zubak. Her choice to work with Kamloops Innovation would significantly shape the trajectory of her business.",
      },
      {
        type: "p",
        text: "Before Kate joined Kamloops Innovation (KI), she was already deeply involved in the professional organizing industry and running her own business. However, she found herself primarily working in her business, rather than on it. This led to a plateau in business growth as most of her time was spent servicing her clients. Recognizing the need for a change, she sought the expertise and guidance of KI to help her scale her operations and focus more strategically on business development.",
      },
      {
        type: "p",
        text: '"I had hit a plateau in my business and needed that extra hand to take the next step. Now, John and I meet weekly with set goals and deliverables. It\'s like having a cheerleader and a coach in your corner," said Kate. "It\'s easy to set goals for yourself when things aren\'t so busy, but when the work ramps up, it\'s much more motivating to have someone else holding you accountable to hit those goals."',
      },
      {
        type: "quote",
        text: "It's like having a cheerleader and a coach in your corner.",
      },
      {
        type: "p",
        text: "Running your own business brings with it an array of challenges, from administrative tasks to client management. Kate quickly recognized the areas where she excelled and those where she needed support.",
      },
      {
        type: "p",
        text: "\"Kate's vision expanded to include building a team where she could focus more on customer interactions and empowering clients to achieve their visions while also training others to handle different aspects of the service,\" explained John. \"A lot of our focus has been on working with Kate to develop systems for having a sales process, looking closely at the areas where she can use efficiency with technology to support what she does.\"",
      },
      {
        type: "p",
        text: "When an entrepreneur like Kate starts with Kamloops Innovation, they start by analyzing every aspect of their business and where they wish to go next. The process begins with an in-depth evaluation akin to a doctor's consultation. Entrepreneurs sit down with KI mentors, and like medical patients explaining symptoms to a doctor, they discuss the current state of their business. This includes operational dynamics, product positioning, and time management strategies.",
      },
      {
        type: "p",
        text: "KI mentors focus on distinguishing the symptoms from the underlying problems of the business. This initial deep dive is crucial for developing a precise understanding of the entrepreneur's business activities and challenges. From there, KI and the entrepreneur collaboratively develop a strategic plan customized to achieve the entrepreneur's long-term goals.",
      },
      {
        type: "p",
        text: '"I am just so grateful that the service exists. Even if you think you have most things in your business dialled in, someone like John will always have a different perspective of how things could be better, and Kamloops Innovation also has a wealth of other professionals in niche fields to help fill in any other gaps," said Kate.',
      },
      {
        type: "quote",
        text: "A fantastic resource for new and experienced entrepreneurs to level up their business.",
      },
      {
        type: "p",
        text: "Not only does Kate work directly with her mentor, John, but she also benefits from the broader support network within KI. This includes quarterly meetings akin to board meetings, where she engages with other entrepreneurs in residence. These sessions provide a forum for ongoing support, advice, and strategic adjustment.",
      },
      {
        type: "p",
        text: "One piece of advice she would share from her journey with other business owners or budding entrepreneurs is to \"Just start.\"",
      },
      {
        type: "p",
        text: '"Start with the rough and just get going; don\'t wait for all the information; buy the business domain, get the social handle, and just get started. You can paralyze yourself chasing perfection," said Kate, adding that those who want to take the leap with KI should also explore that option without hesitation. "Why wouldn\'t you take advantage of the support that\'s out there? This is a fantastic resource for new and experienced entrepreneurs to level up their business with consistent guidance from a mentor who is focused on seeing you grow and succeed."',
      },
    ],
  },

  {
    slug: "ecosystem-mapping-report",
    base: "images/news/news-8",
    fallback: dummyImage("ciba-n8", 900, 600),
    tag: "Research",
    title: "Kamloops Innovation Outlines Key Strategies for Sustainable Ecosystem Development",
    text: "Comprehensive regional research reveals opportunities for impact on the business and innovation ecosystem.",
    date: "May 24, 2024",
    readTime: "2 min read",
    views: 119,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "Comprehensive regional research reveals opportunities for impact on the business and innovation ecosystem.",
      },
      {
        type: "p",
        text: "In today's rapidly evolving business landscape, encouraging innovation is crucial for driving economic growth and sustainability. Recognizing this, Kamloops Innovation (KI) set out to explore the Central Interior of British Columbia's (B.C.) business and technology ecosystem. Between August and October 2023, KI worked with a team of researchers to produce the Business and Technology Regional Ecosystem Mapping Report. In developing the report, the research team aimed to understand key themes, challenges, and opportunities across various sectors, ultimately paving the way for informed strategies and actionable objectives for potential future development in the region.",
      },
      {
        type: "p",
        text: "Kamloops Innovation (KI) is a member of the BC Accelerator Network and was funded by Innovate BC to conduct the research and produce the report. With over a decade of experience in nurturing technology and innovation startups and more seasoned businesses in Kamloops and surrounding regions, KI brought invaluable expertise to the project.",
      },
      {
        type: "p",
        text: 'Michael Andrews, KI\'s executive director, outlined the significant objectives of the report. "The report aims to enhance awareness and understanding of the technology and innovation landscape in British Columbia\'s Interior region. It also aims to provide Kamloops Innovation with deeper insights into the businesses operating within the region, informing our organization\'s services, and future research and development initiatives."',
      },
      {
        type: "p",
        text: "The project team collected data from online sources and reports and conducted interviews with local stakeholders. Several key learnings and themes emerged including the need for:",
      },
      {
        type: "ul",
        items: [
          "Early-stage support for startups",
          "Addressing the funding gap for growth stage companies",
          "Prioritizing Indigenous partnerships and collaborations",
          "Promoting diversity and inclusion in leadership",
          "Addressing recruitment challenges and improving infrastructure",
          "Improving connectivity and technology training for First Nations Youth and communities",
          "Integrating technology across sectors",
          "Addressing the housing crisis",
          "Mitigating climate change impacts",
          "Promoting cross-sectoral collaboration for recruitment efforts",
        ],
      },
      {
        type: "p",
        text: "The report also shared seven recommendations to encourage innovation in the region:",
      },
      {
        type: "ol",
        items: [
          "Develop Specialized Education: Establish specialized programs within academic institutions that focus on current programming gaps and address B.C.'s labour market outlook, including Business and Technology Management and AI education.",
          "Support more than Early-Stage Businesses: Initiate funding programs aimed at closing any gaps in early ideation and scale-up stages but also targeting growth companies.",
          "Promote Diversity and Inclusion: Encourage DEI initiatives and diverse leadership in private businesses to create a more inclusive workforce.",
          "Enhance Infrastructure and Talent Acquisition: Address connectivity, housing, and talent acquisition issues in the resource and energy sectors.",
          "Facilitate Indigenous Collaborations: Foster partnerships and initiatives with Indigenous communities respecting cultural values.",
          "Combat Climate Change Impacts: Connect with technologies and strategies to counteract climate change effects on industries and communities.",
          "Community Collaboration and Recruitment Marketing: Create platforms promoting the region's benefits and fostering collaborative efforts.",
        ],
      },
      {
        type: "p",
        text: "By prioritizing collaboration and attracting investments, communities can collectively lay the foundation for long-term prosperity in the region. Moreover, tackling critical challenges like connectivity, funding gaps, housing shortages, and climate resilience remains essential for sustained ecosystem strength.",
      },
      {
        type: "p",
        text: "Now more than ever, it is crucial to maintain a commitment to collective action and innovation. By strategically focusing on collaboration and resilience, KI will play its part in taking steps to pave the way for its emergence as a thriving hub of innovation and economic vitality.",
      },
    ],
  },

  {
    slug: "applied-ai-program-launch",
    base: "images/news/news-9",
    fallback: dummyImage("ciba-n9", 900, 600),
    tag: "Press Release",
    title:
      "Kamloops Innovation launches project to help small and medium-sized businesses learn and adopt no-code AI solutions",
    text: "Discovery Foundation's Applied AI for Business and Education Program comes to the Kamloops region with workshops, mentorship, and TRU student support.",
    date: "Mar 26, 2024",
    readTime: "3 min read",
    views: 182,
    likes: 2,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "Kamloops – Kamloops Innovation (KI) is pleased to announce the launch of the Discovery Foundation's Applied AI for Business and Education Program aimed at supporting the education and adoption of the latest no-code AI business tools and platforms. Through its partnership as an agent of the Discovery Foundation's Technology Education Program, KI will host a series of educational events, workshops and one-on-one learning and mentorship opportunities for interested businesses in the Kamloops region.",
      },
      {
        type: "p",
        text: "Generative AI and no-code AI tools are designed to make AI more accessible to individuals and businesses without the need for extensive coding knowledge, democratizing access to AI-powered tools and fostering innovation.",
      },
      {
        type: "p",
        text: '"Embracing Artificial Intelligence is no longer an option, but an essential avenue for maintaining a competitive edge in today\'s rapidly evolving business landscape. Our initiative promises to enhance capacity in the business and industrial sectors across Kamloops and its neighbouring regions," said KI executive director, Michael Andrews.',
      },
      {
        type: "p",
        text: '"A key aspect of this project is to reinforce our commitment to fostering growth in Indigenous businesses, providing youth with opportunities to engage with businesses and technology, and ensuring companies led by women and new Canadians have opportunities to engage with the latest AI tools."',
      },
      {
        type: "p",
        text: "Computer Science and Engineering students at TRU will play a key role in educating businesses through hosting hands-on workshops and providing technology adoption and education support for participating businesses.",
      },
      {
        type: "p",
        text: '"This is the right time to be launching this project," said Musfiq Rahman, Associate Professor and Chair, Department of Computing Science. "Businesses will have the opportunity to learn how to navigate use and apply these new tools and platforms, and our students gain valuable experience by supporting them in learning to create powerful, customizable tools."',
      },
      {
        type: "p",
        text: '"It\'s a win/win opportunity for both businesses and our students, who will learn important essential skills to help advance their careers," said Kevin O\'Neil, Computer Science faculty and project liaison.',
      },
      {
        type: "p",
        text: '"Successfully growing my business will require both an understanding of and access to those technologies that can help. AI is fast becoming a key lever in growing revenue, boosting operational efficiency, and improving my customers\' experiences. I\'m excited to be a part of the Kamloops Innovation program that will help my business gain a competitive edge by adopting and implementing no-code AI tools," said Sarah Mathieu, Director & Founder, My Broker Pro Marketing Agency Ltd.',
      },
      {
        type: "p",
        text: "The benefits of learning and using no-code tools in business operations include time and cost savings, increasing efficiency, streamlining business processes and workflows, resulting in better customer service and freeing up employees to focus on mission-critical tasks that require human expertise.",
      },
      {
        type: "about",
        title: "About Kamloops Innovation",
        text: "Kamloops Innovation supports entrepreneurs throughout the Thompson, Nicola, and Cariboo regions of British Columbia. We focus on new business start-ups that need support and guidance as well as seasoned entrepreneurs who want to take their business to the next level.",
      },
      {
        type: "about",
        title: "About the Discovery Foundation",
        text: "A registered charity, the Discovery Foundation has been a committed champion and enabler of the science and technology sector in BC since its formation in 1979. Its principal activity is the delivery of the Technology Education Program via agents that provide education and guidance to entrepreneurs in BC. The Foundation also provides funds for research and scholarship. For more information on the TEP winners, go to https://www.discoveryfoundation.ca/tep-programs.",
      },
    ],
    mediaContact: {
      name: "Michael Andrews",
      role: "Executive Director",
      org: "Kamloops Innovation",
      email: "executivedirector@kamloopsinnovation.com",
    },
  },

  {
    slug: "tree-track",
    base: "images/news/news-10",
    fallback: dummyImage("ciba-n10", 900, 600),
    tag: "Success Story",
    title: "Inside Tree Track's Quest to Plant 100 Million Trees by 2028",
    text: "How drone and seedpod technology — and mentorship from Kamloops Innovation — is helping Tree Track reforest burned landscapes at scale.",
    date: "Mar 14, 2024",
    readTime: "6 min read",
    views: 113,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "Tree Track is poised to become a robust force in reforestation, aiming to plant 100 million trees by 2028 using ground-breaking drone and seedpod technology.",
      },
      {
        type: "p",
        text: '"We might go bigger than that," said Amir Soleimani, chief executive officer and co-founder of Tree Track. "We need to act fast before the shrubs and invasive plants take over. We\'re going to be the primary drone company in Canada and North America."',
      },
      {
        type: "p",
        text: "Port Coquitlam-based Tree Track is experiencing timely ascension — thanks in part to Kamloops Innovation (KI) — and rising into aerial action while staggering wildfire numbers reveal both perilous destruction and important work to be done.",
      },
      {
        type: "p",
        text: "About 18.5 million hectares of Canadian land burned in 2023, according to the Canadian Interagency Forest Fire Centre, making it the worst wildfire year in recorded national history. B.C. is making a habit of setting dubious wildfire records. Nearly three million hectares were razed last year in the province, more than doubling the previous-worst mark established in 2018.",
      },
      {
        type: "p",
        text: "Tree Track notes on its website treetrack.ca that 15 billion trees are lost annually and only five billion are regenerated, with wildfires, invasive pests and uncontrolled logging among culprits.",
      },
      {
        type: "p",
        text: '"There is no solution to replant those lands," Soleimani said, noting Tree Track drones can reach remote areas inaccessible to humans. "First of all, we are short on labour and when you have wildfires, there are safety issues because trees are burned and, at any time, they might just fall down. We are the only option."',
      },
      {
        type: "p",
        text: "Soleimani boasts agrology expertise, with a PhD in horticulture and a post-degree diploma in project management, and his business partner, Tree Track chief technology officer and co-founder Sam Sarabi, is the drone doctor, with master's degrees in engineering and business administration.",
      },
      {
        type: "p",
        text: "Seedling technology is integral to Tree Track's vision. When fires exceed 300 C, ingredients in soil conducive to growth, such as bacteria and fungus, are destroyed. Tree Track seedpods include tree seeds and between 15 and 20 organic ingredients that inoculate seedbeds with precious soil portfolio extinguished in the fire — achieving germination rates of 85 percent, according to Soleimani.",
      },
      {
        type: "p",
        text: "Tree Track was formed in October of 2022 and quickly reached out to KI, a business accelerator that offers professional mentorship relationships funded by Innovate BC. Interior roots formed and have grown to secure a crucial bond.",
      },
      {
        type: "p",
        text: '"We\'re a different company after John," Soleimani said, referring to KI entrepreneur-in-residence John Zubak. "He\'s coaching us on the business side a lot. His advice is amazing."',
      },
      {
        type: "p",
        text: "Zubak is advising on outbound strategies — such as securing pilot projects and contracts in B.C. and beyond — and playing the role of matchmaker, putting Tree Track in touch with key players in Interior reforestation and potential customers that include provincial and federal governments, Indigenous organizations, forestry, mining and oil companies and other non-governmental organizations.",
      },
      {
        type: "p",
        text: '"It\'s really about trying to help them get the right exposure with the people they need, get the initial tests in place and get all the infrastructure they need to scale, grow and deploy this technology," said Zubak, managing partner of Zubak and Associates.',
      },
      {
        type: "p",
        text: "Pleased with the partnership, Soleimani is floating the idea of Tree Track expansion in Kamloops, an office in KI headquarters at Thompson Rivers University that would provide better access to the wildlife hotbed in the Interior. Zubak's direction on partnership with TRU — including two post-doctoral students through the Mitacs program and advisor Dr. Lauchlan Fraser — is among the reasons for Soleimani's vision for the future.",
      },
      {
        type: "p",
        text: '"You\'re talking about a company that is going be very important for our whole area, province-wide, for years to come," said Zubak. "They\'re solving a true problem that we have not just here in B.C., but globally. Just to restore what was burned in 2023, it would take three million people for one week. One drone can do the work of 10 tree planters, but it can work around the clock."',
      },
      {
        type: "p",
        text: "Sarabi said his drone design separates Tree Track from others, noting battery-powered offerings in the market fizzle in comparison to his gas-battery hybrid, which offers major upgrades in maximum payload, flight time and dispersal-mechanism capability. Tree Track drones can fly for about five hours with no payload and 90 minutes with a payload of about 22 pounds — versus roughly 18 minutes and six minutes for similar battery-only models.",
      },
      {
        type: "p",
        text: "Four real-world pilot projects in 2023, including three conducted in partnership with the University of British Columbia (UBC) and one paid pilot test with Tree Canada, explored the viability of 15 diverse tree and shrub species. Test areas included Malcolm Knapp Research Forest in Maple Ridge, Alex Fraser Research Farm near Williams Lake, the UBC campus research farm in Vancouver and the Nicola Watershed near Merritt.",
      },
      {
        type: "p",
        text: '"Our competitors went big, overpromising, and because of that, many relied on them, and they couldn\'t deliver results," Soleimani said. "So, everybody is waiting on our results. They want to know what our results are, and they\'ll start working with us, especially the federal government, with the 2 Billion Trees Program."',
      },
      {
        type: "p",
        text: '"When we have the results, when it\'s successful, we will be the only successful drone-seeding company in North America and we will have tons of contracts," Soleimani said. "We need to introduce seeds and beneficial bacteria and fungus to those fields, otherwise the faces of our forests will change forever."',
      },
    ],
  },

  {
    slug: "john-zubak-eir",
    base: "images/news/news-11",
    fallback: dummyImage("ciba-n11", 900, 600),
    tag: "Spotlight",
    title: "Kamloops Innovation Spotlight: Entrepreneur in Residence John Zubak",
    text: "A look at EIR John Zubak — mentor, innovator, and driving force behind countless founder journeys at Kamloops Innovation.",
    date: "Feb 27, 2024",
    readTime: "3 min read",
    views: 133,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "In the ever-evolving world of innovation, Kamloops Innovation's (KI) Entrepreneurs in Residence are cornerstones of our commitment to fostering groundbreaking ideas. Today, we highlight Entrepreneur in Residence (EIR) John Zubak, a visionary with an unparalleled passion for entrepreneurship. With a wealth of business experience, John exemplifies the driving force behind Kamloops Innovation's relentless pursuit of excellence.",
      },
      {
        type: "p",
        text: "John has over 30 years as an entrepreneur in a diverse range of business ventures, from landscape, construction and wholesale furnishings to real estate and a chain of retail stores.",
      },
      {
        type: "p",
        text: '"From my earliest childhood memories, I always believed I would have my own business. Even in the jobs I worked while young, I was always thinking about how I would make improvements if I owned that business," said John.',
      },
      {
        type: "p",
        text: "John crafted his entrepreneurial path by spearheading successful endeavours, including the establishment of the most extensive retail mattress chain in interior British Columbia during the 1990s. Always fascinated and convinced by the power of technology in businesses, he championed in-store automation and leveraged technology in his business.",
      },
      {
        type: "p",
        text: '"I believe innovation is the key to success in the business world, not just being "different" for the sake of it, but rather being different because you have discovered a way to provide more value to your customer, or a more efficient way to create a solution to a problem," shared John. Reflecting on his role as a business mentor, John said, "It is a pathway allowing me to channel my passion for innovation while working side by side with others in the hopes of creating products or services that are more meaningful."',
      },
      {
        type: "p",
        text: "For John, watching others succeed is very gratifying. This is at the heart of why he has continued to mentor people who wish to create solutions that can be developed into profitable businesses. Through KI, John has mentored several individuals over the past 10 years.",
      },
      {
        type: "p",
        text: '"KI feels like a second family now, and I look at being an EIR as an opportunity to give back to those beginning their entrepreneurial journey, plus those already years into their businesses. I\'ve been extremely fortunate over the years to have had amazing mentors who helped me grow. I\'m at a point in my life where I have more than what I need, and I get huge satisfaction from helping people," he said.',
      },
      {
        type: "p",
        text: "John also supported KI as the interim executive director for the first 7 months of 2023. During this time, he spearheaded the transition of Kamloops Innovation from its North Shore location to its new location at the Thompson Rivers University (TRU) campus — more than a change of location; a change in the direction in which Kamloops Innovation's board wanted to take it.",
      },
      {
        type: "p",
        text: '"Our board of directors is full of visionaries. The board did not see an organization that was just staying stagnant for the future. We needed to be something that grew and became more and had many more partnerships, not just to be sustainable but to be meaningful," said John. "And now having Michael, KI\'s executive director, on board has been exceptional. He has certainly taken the organization forward with a lot of vigour and drive."',
      },
      {
        type: "p",
        text: "John hopes that more people will take advantage of KI's enhanced vision and partnerships. His advice for entrepreneurs is twofold: embrace failure and be inquisitive. More importantly, he insists on looking at the big picture.",
      },
      {
        type: "p",
        text: '"Financial reward is an outcome of running a solid business, but it does not necessarily define one\'s happiness or personal success. My business success has provided me with the free time and financial means to be a better husband to my wife and a better father to my two daughters and the freedom to spend time with friends enjoying the other passions in my life," said John.',
      },
    ],
  },

  {
    slug: "traqspera-trimble",
    base: "images/news/news-12",
    fallback: dummyImage("ciba-n12", 900, 600),
    tag: "Success Story",
    title:
      "Celebrating Traqspera's Journey from Kamloops Innovation startup client to Trimble Inc. Acquisition",
    text: "From a TRU programmer's idea to a Trimble acquisition — Traqspera's story is a win for Kamloops, KI, and the local tech pipeline.",
    date: "Feb 22, 2024",
    readTime: "4 min read",
    views: 191,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "Ever since our inception, Kamloops Innovation has nurtured incredible talent, and we are thrilled to shine a spotlight on the remarkable journeys of some of our clients. Our clients are the heartbeat of innovation in Kamloops, and their stories exemplify the entrepreneurial spirit that is needed to propel us into a more exciting future.",
      },
      {
        type: "p",
        text: "Today we are sharing an extraordinary success story featuring one of our former clients—Traqspera. In 2023, this Kamloops-based technology company was acquired and seamlessly absorbed by Trimble Inc. (Trimble), a multi-billion-dollar industry giant.",
      },
      {
        type: "p",
        text: 'Traqspera co-founder Matt Thurber expressed, "It\'s a story of how it is a win for everybody—for Kamloops, Traqspera, Kamloops Innovation (KI) and for Thompson Rivers University (TRU) — and I think it\'s something everybody here is really proud of."',
      },
      {
        type: "p",
        text: "Traqspera started as an operations platform for construction contractors — a mobile app that connects the field and the office. Trimble is a software, hardware and services technology company that sells products and services to many industries, including construction. Trimble's courtship with Traqspera gathered intensity in 2022 when it began to see great value in the 10-person company's technology.",
      },
      {
        type: "p",
        text: '"Our customers are contractors in construction. Their highest cost of capital is people and equipment, so they need to know they are putting the right people on the right equipment on the right jobs, and then they need to make those people and equipment as efficient as possible," explained Jon Fingland, vice president and category general manager for Trimble.',
      },
      {
        type: "p",
        text: "This is where Traqspera comes into the picture. Traqspera tech helps with payroll and leverages that info in human-resource systems to make sure people are in compliance and operating safely, and it helps track miscellaneous expenses. Traqspera now seamlessly handles the field side of the equation for Trimble.",
      },
      {
        type: "p",
        text: '"They have this great, massive, accounting system with thousands of companies using it, but when the guys in the work boots in the field were filling out their timesheets, there was such a disconnect between that data getting into the accounting system," Thurber said. "Rather than scribbling it down on a napkin at the bar after their 12-hour shift, they are now entering it into a digital format powered by Traqspera."',
      },
      {
        type: "p",
        text: "The Traqspera technology that now operates under the Trimble umbrella began to take form in 2013, when Thurber was still studying at TRU, as a programmer with an idea. Traqspera's brainpower has been developed nearly exclusively at TRU, with about 90 percent of the company's employees having studied at the Kamloops institution — a fact not lost on Trimble.",
      },
      {
        type: "p",
        text: "Thurber came to KI about five years ago through the Venture Acceleration Program funded by Innovate BC. As a part of this program, entrepreneur-in-residence John Zubak was paired with Thurber, and they have met weekly for about five years, forming a bond that extends beyond the business world.",
      },
      {
        type: "p",
        text: 'Zubak quickly identified Thurber as "very much a technical founder" and spotted areas for growth. He encouraged him to hire a direct salesperson, put systems in place to grow and manage larger sales and establish a greater presence in the U.S. market by travelling and networking down south.',
      },
      {
        type: "p",
        text: '"There\'s a community side and networking opportunities that wouldn\'t exist if KI didn\'t exist," said Thurber, who founded Traqspera with business partners Trevor Streek and Rob Couturier.',
      },
      {
        type: "p",
        text: '"It\'s a great career step for all of us, myself included," Thurber said of the acquisition. "We\'re all early in our careers and have a ton of growth and potential ahead of us! Yes, our job titles have changed. Unfortunately, I don\'t get to be the CEO of Trimble. But we still get to be a part of the excitement of continuing to grow our product. We\'re part of bigger teams, with more horsepower and resources behind, being able to grow it a lot faster now."',
      },
    ],
  },

  {
    slug: "kpmg-partnership",
    base: "images/news/news-14",
    fallback: dummyImage("ciba-n14", 900, 600),
    tag: "Partner Spotlight",
    title:
      "Partner Spotlight: KPMG's Collaboration with Kamloops Innovation Empowers Local Entrepreneurs",
    text: "How KPMG Kamloops partners with KI to bring mentorship, workshops, and affordable financial guidance to local founders.",
    date: "Feb 22, 2024",
    readTime: "2 min read",
    views: 69,
    likes: 1,
    author: "Kamloops Innovation",
    blocks: [
      {
        type: "p",
        text: "In the fast-growing entrepreneurial landscape of the Thompson Okanagan region, KPMG has emerged as a steadfast ally to local businesses through its collaboration with Kamloops Innovation. Paula Presta, Partner at KPMG Enterprise, sheds light on the significance of this partnership and its profound impact on the entrepreneurial community.",
      },
      {
        type: "p",
        text: "Presta, a founding member of Kamloops Innovation as a Society in 2012, provided valuable insight and engagement into the setup and purpose of the Society. Since then, KPMG has been a partner to Kamloops Innovation in its journey to provide local innovation and technology support to the local community.",
      },
      {
        type: "p",
        text: '"We believe Kamloops Innovation members benefit from the mentorship, services and advice from KPMG Kamloops by having a steady hand to guide them in their financial journey whilst also getting world-class service locally," said Presta, adding, "KPMG really appreciates the partnership with Kamloops Innovation. It allows us to meet new people, use our skillsets to mentor and assist new entrepreneurs, and share in their excitement."',
      },
      {
        type: "p",
        text: "Kamloops Innovation serves as a vital resource for local entrepreneurs, offering mentorship, seminars, and inspiration. KPMG recognizes the importance of financial acumen for small businesses and actively engages with Kamloops Innovation to provide educational sessions, on-site support, and affordable accounting and tax services.",
      },
      {
        type: "p",
        text: "Through its partnership, KPMG aims to empower entrepreneurs with financial expertise and assist them in navigating often complex financial and tax obligations. Initiatives include providing office hours, hosting educational workshops, and offering discounted services tailored to startups' needs.",
      },
      {
        type: "p",
        text: "KPMG Kamloops takes a hands-on approach to mentorship, working closely with entrepreneurs to enhance their financial literacy and strategic planning. With over 25 entrepreneurs supported by KPMG Kamloops alone, KPMG's commitment to nurturing local talent is profound.",
      },
      {
        type: "p",
        text: '"We partner with the entrepreneur and provide a discounted fixed price for two years as the company is building out. This includes as much mentoring and discussions as required and allows the owner to tap into the KPMG resources without worrying about the cost," explained Presta.',
      },
      {
        type: "p",
        text: "The partnership enriches both KPMG and Kamloops Innovation, fostering collaboration, skill-sharing, and community engagement. While pre-COVID initiatives were predominantly on-site, both organizations are adapting to the changing landscape and embracing online platforms to expand their reach.",
      },
      {
        type: "p",
        text: "KPMG looks forward to continued collaboration with Kamloops Innovation, aligning with its strategic evolution.",
      },
      {
        type: "p",
        text: '"We envision this to be an ongoing partnership through our involvement in education sessions, presentations, the Advisory Board and support of the talented Entrepreneurs in Residence," said Presta.',
      },
      {
        type: "p",
        text: "To learn more about KPMG Enterprises, visit https://kpmg.com/ca/en/home/about/offices/kamloops-1.html. Follow Kamloops Innovation on social media to stay updated on the various workshops and mentorship opportunities offered by Kamloops Innovation through such partnerships.",
      },
    ],
  },
];

export function getPost(slug) {
  return NEWS.find((n) => n.slug === slug) ?? null;
}

export function getRecentPosts(excludeSlug, limit = 3) {
  return NEWS.filter((n) => n.slug !== excludeSlug).slice(0, limit);
}

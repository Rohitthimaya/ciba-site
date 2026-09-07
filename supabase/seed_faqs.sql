-- Optional: seed Generator FAQs (safe if already present)
insert into public.faqs (question, answer, sort_order, published)
select * from (values
  ('What is the TRU Generator?', 'We provide mentorship, education, and entrepreneurial support, as well as helping identify possible grant opportunities for TRU students, alumni, faculty, and staff.', 1, true),
  ('What is Kamloops Innovation Centre?', 'We are a non-profit that supports tech entrepreneurs with programs, mentorship, and shared office spaces in Kamloops and the region.', 2, true),
  ('Can you help me start my business?', 'Definitely! We can provide a business mentor and connect you with community resources.', 3, true),
  ('Does my business need to feature a lot of technology?', 'No. Ventures need to be innovative, but not necessarily technology-focused.', 4, true),
  ('Does the TRU Generator take a share in my company?', 'No. We do not take equity in your company.', 5, true)
) as v(question, answer, sort_order, published)
where not exists (select 1 from public.faqs limit 1);

-- Default site settings keys (safe to re-run)
insert into public.site_settings (key, value) values
  ('contact', '{"email":"hello@acceleratebusiness.ca","generatorEmail":"generator@acceleratebusiness.ca","phone":""}'::jsonb),
  ('socials', '{"instagram":"https://www.instagram.com/","facebook":"https://www.facebook.com/","linkedin":"https://www.linkedin.com/"}'::jsonb),
  ('land_acknowledgment', '{"text":"CIBA acknowledges that we live, work, and gather on the traditional and unceded territory of the Secwépemc Nation."}'::jsonb),
  ('generator', '{"videoId":"teA9WDKivuY"}'::jsonb),
  ('stats', '[{"label":"Ventures supported","value":"100+"},{"label":"Jobs created","value":"150+"},{"label":"Revenue generated","value":"$40M+"},{"label":"New investment","value":"$10M+"}]'::jsonb)
on conflict (key) do nothing;

-- Sample absolute events (editable in admin)
insert into public.events (title, description, location, tag, start_at, end_at, published)
select * from (values
  ('Startup Coffee', 'Casual drop-in for student founders — share ideas over coffee.', 'TRU Generator, Brown Family House of Learning', 'Meetup', now() + interval '2 days' + interval '10 hours', now() + interval '2 days' + interval '11 hours', true),
  ('Lean Startup Workshop', 'Learn Lean Startup principles and map your first experiments.', 'TRU Generator', 'Workshop', now() + interval '5 days' + interval '13 hours', now() + interval '5 days' + interval '15 hours', true),
  ('Open Mentorship Hours', 'Book time with a business mentor to pressure-test your idea.', 'TRU Generator', 'Mentorship', now() + interval '9 days' + interval '14 hours', now() + interval '9 days' + interval '16 hours', true),
  ('Pitch Practice Night', 'Practice your pitch and get feedback from peers and mentors.', 'TRU Generator', 'Workshop', now() + interval '14 days' + interval '17 hours', now() + interval '14 days' + interval '19 hours', true),
  ('Founder Speaker Series', 'Hear from a local founder on building in the Interior.', 'Brown Family House of Learning', 'Speaker', now() + interval '21 days' + interval '18 hours', now() + interval '21 days' + interval '19 hours 30 minutes', true)
) as v(title, description, location, tag, start_at, end_at, published)
where not exists (select 1 from public.events limit 1);

insert into public.resource_links (label, href, sort_order)
select * from (values
  ('Lean Startup Principles', 'http://theleanstartup.com/principles', 1),
  ('Business Model Canvas', 'https://canvanizer.com/new/business-model-canvas', 2)
) as v(label, href, sort_order)
where not exists (select 1 from public.resource_links limit 1);
